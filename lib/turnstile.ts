const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verifies a Turnstile token with Cloudflare. Tokens are single use and last 5 minutes.
 * Without TURNSTILE_SECRET_KEY this passes in development and fails in production.
 */
export async function verifyTurnstile(token: string, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      console.error("[turnstile] TURNSTILE_SECRET_KEY is not set; rejecting submission");
      return false;
    }
    console.warn("[turnstile] TURNSTILE_SECRET_KEY is not set; skipping verification in development");
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(SITEVERIFY_URL, { method: "POST", body, signal: AbortSignal.timeout(8000) });
    const data = (await res.json()) as { success: boolean; "error-codes"?: string[] };
    if (!data.success) console.warn("[turnstile] verification failed", data["error-codes"]);
    return data.success;
  } catch (err) {
    console.error("[turnstile] siteverify request failed", err);
    return false;
  }
}
