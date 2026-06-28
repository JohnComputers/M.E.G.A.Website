import { NextResponse } from "next/server";
import { createCheckoutLink, isSquareConfigured } from "@/lib/square";
import { seedDemoOrder } from "@/lib/store";
import crypto from "crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function baseUrl(req: Request): string {
  if (process.env.BASE_URL) return process.env.BASE_URL.replace(/\/$/, "");
  return new URL(req.url).origin;
}

/**
 * POST /api/checkout
 * Begins the purchase. Returns a URL the client redirects to.
 *  - Square configured  → real hosted checkout page.
 *  - Demo mode on       → a working /download page (no payment) for previewing UX.
 *  - Neither            → 503 with a clear message (no dead end on the client).
 */
export async function POST(req: Request) {
  try {
    if (isSquareConfigured()) {
      const { url } = await createCheckoutLink(baseUrl(req));
      return NextResponse.json({ url, mode: "square" });
    }

    if (process.env.MEGA_DEMO_MODE === "true") {
      const ref = crypto.randomBytes(16).toString("hex");
      seedDemoOrder(ref);
      return NextResponse.json({ url: `/download?ref=${ref}&demo=1`, mode: "demo" });
    }

    return NextResponse.json(
      {
        error:
          "Checkout is not configured yet. Add your Square credentials to enable purchases.",
      },
      { status: 503 },
    );
  } catch (err) {
    console.error("[checkout] error", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
