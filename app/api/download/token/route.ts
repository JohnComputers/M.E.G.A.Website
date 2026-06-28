import { NextResponse } from "next/server";
import { getPaidOrder, seedDemoOrder } from "@/lib/store";
import { createDownloadToken } from "@/lib/downloadTokens";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { PRODUCT } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/download/token   body: { ref: string, demo?: boolean }
 *
 * Returns a fresh one-time download token IF the order reference has been
 * confirmed paid by the verified webhook. This is the only path that mints
 * tokens — the ZIP route accepts nothing else.
 */
export async function POST(req: Request) {
  const ip = clientIp(req.headers);
  const limit = rateLimit(`token:${ip}`, 20, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  let body: { ref?: string; demo?: boolean } = {};
  try {
    body = await req.json();
  } catch {
    /* ignore — handled below */
  }

  const ref = body.ref?.trim();
  if (!ref) {
    return NextResponse.json({ error: "Missing order reference." }, { status: 400 });
  }

  // Demo mode lets the UX be exercised without a real payment.
  if (body.demo && process.env.MEGA_DEMO_MODE === "true") {
    seedDemoOrder(ref);
  }

  const order = getPaidOrder(ref);
  if (!order) {
    // Payment not yet confirmed (webhook may still be in flight) or invalid ref.
    return NextResponse.json(
      { error: "Payment not confirmed yet.", status: "pending" },
      { status: 402 },
    );
  }

  const token = createDownloadToken(ref);
  return NextResponse.json({
    token,
    fileName: PRODUCT.downloadFileName,
    size: PRODUCT.downloadDisplaySize,
    version: `${PRODUCT.version} (${PRODUCT.channel})`,
    expiresInSeconds: 600,
  });
}
