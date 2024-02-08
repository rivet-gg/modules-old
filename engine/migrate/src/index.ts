// TODO: Pin this version
import * as path from "https://deno.land/std/path/mod.ts";
import * as postgres from "https://deno.land/x/postgres/mod.ts";
import { Registry } from '../../registry/src/index.ts';
import { validateString, assertValidString } from "./validate.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

async function main() {
    // Load registry
    let rootPath = path.join(__dirname, '..', '..', '..');
    let registry = await Registry.load(rootPath);

    // Setup database
    const databaseUrl = Deno.env.get("DATABASE_URL") ?? "postgres://postgres:password@localhost:5432/postgres"
    await createDatabases(registry, databaseUrl);

    // Run migrations
    for (const mod of registry.modules.values()) {
        await runModuleMigrations(mod, databaseUrl);
    }
}

async function createDatabases(registry: Registry, databaseUrl: string) {
    const client = new postgres.Client(databaseUrl);
    await client.connect();

    try {
        for (const mod of registry.modules.values()) {
            // Create database
            let existsQuery = await client.queryObject`SELECT EXISTS (SELECT FROM pg_database WHERE datname = ${mod.name})`;
            if (!existsQuery.rows[0].exists) {
                await client.queryArray(`CREATE DATABASE ${assertValidString(mod.name)}`);
            }
        }
    } catch (err) {
        throw err;
    } finally {
        await client.end();
    }
}

async function runModuleMigrations(mod: Module, databaseUrl: string) {
    // Connect to database for this module
    const databaseUrlParsed = new URL(databaseUrl);
    databaseUrlParsed.pathname = `/${mod.name}`;

    const client = new postgres.Client(databaseUrlParsed.toString());
    await client.connect();
    try {
        // Create migrations table
        await client.queryArray`
            CREATE TABLE IF NOT EXISTS _migrations (
                idx INTEGER PRIMARY KEY,
                name TEXT UNIQUE NOT NULL,
                executed_at TIMESTAMP NOT NULL DEFAULT timezone('UTC', now())
            );
        `;

        // Read migration names
        let migrationsPath = path.join(mod.path, "db", "migrations");
        let migrationNames = [];
        for await (const migration of Deno.readDir(migrationsPath)) {
            migrationNames.push(migration.name);
        }
        migrationNames.sort();

        // Run migrations
        for (let i = 0; i < migrationNames.length; i++) {
            let migrationName = migrationNames[i];
            let absolutePath = path.join(migrationsPath, migrationName);
            let source = await Deno.readTextFile(absolutePath);
            await runMigration(client, mod, i, migrationName, source);
        }
    } catch (err) {
        throw err;
    } finally {
        await client.end();
    }
}

async function runMigration(client: pg.Client, mod: Module, idx: number, name: string, source: string) {
    const transaction = client.createTransaction("migrate");
    await transaction.begin();
    try {
        // Check if migration already ran
        const result = await transaction.queryObject`SELECT name FROM _migrations WHERE idx = ${idx}`;

        // Validate the migration name hasn't changed
        if (result.rows.length > 0 && result.rows[0].name != name) throw new Error(`Migration name mismatch at index ${idx}: ${result.rows[0].name} != ${name}`)

        if (result.rows.length === 0) {
            // Run migration

            console.log(`${mod.name}@${name}: Running`);
            await transaction.queryArray(source);
            await transaction.queryArray`INSERT INTO _migrations (idx, name) VALUES (${idx}, ${name})`;
            console.log(`${mod.name}@${name}: Complete`);
        } else {
            // Migration already ran

            console.log(`${mod.name}@${name}: Already ran`);
        }
    } catch (err) {
        throw err;
    } finally {
        await transaction.commit();
    }
}

main();

