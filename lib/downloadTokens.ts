import crypto from "crypto";
import { consumeToken, isTokenConsumed } from "@/lib/store";

/**
 * One-time, time-limited download tokens.
 *
 * A token is a base64url payload `{ orderRef, nonce, exp }` plus an HMAC-SHA256
 * signature. The token is only valid if:
 *   1. the signature matches (no tampering),
 *   2. it has not expired,
 *   3. the nonce has not already been consumed (single use).
 *
 * Default lifetime: 10 minutes (PRD §20 / §36).
 */

const DEFAULT_TTL_MS = 10 * 60 * 1000;

function secret(): string {
  const s = process.env.DOWNLOAD_SIGNING_SECRET;
  if (!s || s.length < 16) {
    // Fail loud in production; allow a dev fallback so local preview still runs.
    if (process.env.NODE_ENV === "production") {
      throw new Error("DOWNLOAD_SIGNING_SECRET is not set");
    }
    return "dev-only-insecure-secret-change-me";
  }
  return s;
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromB64url(input: string): Buffer {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  return Buffer.from(input.replace(/-/g, "+").replace(/_/g, "/") + pad, "base64");
}

function sign(payload: string): string {
  return b64url(crypto.createHmac("sha256", secret()).update(payload).digest());
}

export type TokenClaims = {
  orderRef: string;
  nonce: string;
  exp: number;
};

export function createDownloadToken(
  orderRef: string,
  ttlMs: number = DEFAULT_TTL_MS,
): string {
  const claims: TokenClaims = {
    orderRef,
    nonce: crypto.randomBytes(18).toString("hex"),
    exp: Date.now() + ttlMs,
  };
  const payload = b64url(JSON.stringify(claims));
  return `${payload}.${sign(payload)}`;
}

export type VerifyResult =
  | { ok: true; claims: TokenClaims }
  | { ok: false; reason: "malformed" | "bad_signature" | "expired" | "used" };

export function verifyDownloadToken(token: string): VerifyResult {
  const parts = token.split(".");
  if (parts.length !== 2) return { ok: false, reason: "malformed" };
  const [payload, sig] = parts;

  // Constant-time signature comparison.
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { ok: false, reason: "bad_signature" };
  }

  let claims: TokenClaims;
  try {
    claims = JSON.parse(fromB64url(payload).toString("utf8"));
  } catch {
    return { ok: false, reason: "malformed" };
  }

  if (typeof claims.exp !== "number" || Date.now() > claims.exp) {
    return { ok: false, reason: "expired" };
  }
  if (isTokenConsumed(claims.nonce)) {
    return { ok: false, reason: "used" };
  }
  return { ok: true, claims };
}

/** Marks a token's nonce as spent. Call this once the file stream begins. */
export function redeemToken(claims: TokenClaims): void {
  consumeToken(claims.nonce);
}
