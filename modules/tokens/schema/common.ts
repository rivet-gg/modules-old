import { Trace } from '@ogs/runtime';

export interface Token {
    id: string,
    type: string,
    meta: { [key: string]: any },
    created_at: string,
    expire_at: string | null,
    revoked_at: string | null,
}