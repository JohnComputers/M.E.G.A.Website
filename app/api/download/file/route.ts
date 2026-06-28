import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { redeemToken, verifyDownloadToken } from "@/lib/downloadTokens";
import { clientIp, rateLimit } from "@/lib/rateLimit";
import { PRODUCT } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/download/file?token=...
 *
 * The ONLY way to obtain the ZIP. The file lives in /private (outside /public),
 * so it is never directly reachable. A valid, unexpired, unused token is
 * required; the token is consumed the moment the stream starts (single use).
 */
export async function GET(req: Request) {
  const ip = clientIp(req.headers);
  const limit = rateLimit(`file:${ip}`, 10, 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment." },
      { status: 429 },
    );
  }

  const token = new URL(req.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token." }, { status: 400 });
  }

  const result = verifyDownloadToken(token);
  if (!result.ok) {
    const messages: Record<string, string> = {
      malformed: "This download link is invalid.",
      bad_signature: "This download link is invalid.",
      expired: "This download link has expired. Return to your purchase to refresh it.",
      used: "This download link has already been used.",
    };
    return NextResponse.json(
      { error: messages[result.reason], reason: result.reason },
      { status: 410 },
    );
  }

  const zipPath =
    process.env.MEGA_ZIP_PATH ||
    path.join(process.cwd(), "private", "mega-app.zip");

  if (!fs.existsSync(zipPath)) {
    console.error(`[download] ZIP not found at ${zipPath}`);
    return NextResponse.json(
      {
        error:
          "The download file is temporarily unavailable. Please contact support.",
      },
      { status: 503 },
    );
  }

  // Consume the token now so a second click cannot re-download.
  redeemToken(result.claims);
  console.log(`[download] released ZIP for order ${result.claims.orderRef}`);

  const stat = fs.statSync(zipPath);
  const stream = fs.createReadStream(zipPath);

  return new NextResponse(stream as unknown as ReadableStream, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Length": String(stat.size),
      "Content-Disposition": `attachment; filename="${PRODUCT.downloadFileName}"`,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
