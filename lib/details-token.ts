import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Short-lived signed token that lets the success screen's optional "details" form
 * update the lead it just created, and no other. Format: `<leadId>.<expiresAtMs>.<signature>`.
 */
const TTL_MS = 30 * 60 * 1000;

/**
 * LEAD_TOKEN_SECRET, falling back to IP_HASH_SALT so no new variable is required.
 * Without either, development uses a fixed secret and production turns step 2 off.
 */
function secret(): string | null {
  const value = process.env.LEAD_TOKEN_SECRET || process.env.IP_HASH_SALT;
  if (value) return value;
  return process.env.NODE_ENV === "production" ? null : "dev-only-details-token-secret";
}

function sign(payload: string, key: string) {
  return createHmac("sha256", key).update(`lead-details:${payload}`).digest("base64url");
}

/** Returns null when no secret is configured, which hides step 2. */
export function createDetailsToken(leadId: string, now = Date.now()): string | null {
  const key = secret();
  if (!key) return null;
  const payload = `${leadId}.${now + TTL_MS}`;
  return `${payload}.${sign(payload, key)}`;
}

export type TokenCheck = { ok: true; leadId: string } | { ok: false; reason: "invalid" | "expired" };

export function verifyDetailsToken(token: string, now = Date.now()): TokenCheck {
  const key = secret();
  const parts = token.split(".");
  if (!key || parts.length !== 3) return { ok: false, reason: "invalid" };

  const [leadId, expires, signature] = parts;
  const expected = Buffer.from(sign(`${leadId}.${expires}`, key));
  const given = Buffer.from(signature);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return { ok: false, reason: "invalid" };
  if (!/^[0-9a-f-]{36}$/i.test(leadId)) return { ok: false, reason: "invalid" };
  if (Number(expires) < now) return { ok: false, reason: "expired" };
  return { ok: true, leadId };
}
