import { createHash } from "node:crypto";
import { and, count, eq, gt } from "drizzle-orm";
import { headers } from "next/headers";
import type { getDb } from "@/db";
import { leadSubmissions } from "@/db/schema";

const RATE_LIMIT = { max: 3, windowMinutes: 10 };

/** The visitor's IP, from the headers Vercel sets. */
export async function requestIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || null;
}

export function hashIp(ip: string | null) {
  return createHash("sha256")
    .update(`${process.env.IP_HASH_SALT ?? ""}:${ip ?? "unknown"}`)
    .digest("hex");
}

/** True when this IP hash has more than the allowed saved submissions in the window. */
export async function isRateLimited(db: ReturnType<typeof getDb>, ipHash: string) {
  const since = new Date(Date.now() - RATE_LIMIT.windowMinutes * 60_000);
  const [{ recent }] = await db
    .select({ recent: count() })
    .from(leadSubmissions)
    .where(and(eq(leadSubmissions.ipHash, ipHash), gt(leadSubmissions.createdAt, since)));
  return recent >= RATE_LIMIT.max;
}
