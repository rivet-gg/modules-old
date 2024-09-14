import { RuntimeError, ScriptContext } from "../module.gen.ts";

export interface Request {
    flowToken: string;
}

export interface Response {
    status: "complete" | "pending" | "expired" | "cancelled";
}

export async function run(
	ctx: ScriptContext,
	req: Request,
): Promise<Response> {
    // Intended to be once per second plus some leeway
	await ctx.modules.rateLimit.throttlePublic({
        requests: 11,
        period: 10,
    });

    if (!req.flowToken) throw new RuntimeError("missing_token", { statusCode: 400 });
    const { tokens: [flowToken] } = await ctx.modules.tokens.fetchByToken({ tokens: [req.flowToken] });
    if (!flowToken) throw new RuntimeError("invalid_token", { statusCode: 400 });
    if (new Date(flowToken.expireAt ?? 0) < new Date()) return { status: "expired" };

    const flowId = flowToken.meta.flowId;
    if (!flowId) throw new RuntimeError("invalid_token", { statusCode: 400 });

    const flow = await ctx.db.loginAttempts.findFirst({
        where: {
            id: flowId,
        }
    });
    if (!flow) throw new RuntimeError("invalid_token", { statusCode: 400 });

    if (flow.identifier && flow.tokenData) {
        return { status: "complete" };
    } else if (new Date(flow.expiresAt) < new Date()) {
        return { status: "expired" };
    } else if (flow.invalidatedAt) {
        return { status: "cancelled" };
    } else {
        return { status: "pending" };
    }
}
