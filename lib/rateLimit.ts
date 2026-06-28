/**
 * Tiny per-IP fixed-window rate limiter for the download endpoints (PRD §20).
 *
 * Like lib/store.ts, this in-memory version is for development/demo. In a
 * serverless deployment, back it with Vercel KV / Upstash so limits are shared
 * across instances. Only this file needs to change.
 */

type Window = { count: number; resetAt: number };
const windows = new Map<string, Window>();

export type RateResult = { allowed: boolean; remaining: number; resetAt: number };

export function rateLimit(
  key: string,
  limit = 10,
  windowMs = 60_000,
): RateResult {
  const now = Date.now();
  const existing = windows.get(key);

  if (!existing || now > existing.resetAt) {
    const fresh: Window = { count: 1, resetAt: now + windowMs };
    windows.set(key, fresh);
    return { allowed: true, remaining: limit - 1, resetAt: fresh.resetAt };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/** Best-effort client IP from common proxy headers. */
export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
