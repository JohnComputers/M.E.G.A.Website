import { NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/square";
import { recordPaidOrder } from "@/lib/store";
import { PRODUCT } from "@/lib/constants";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/webhooks/square
 *
 * Server-side payment confirmation. The client is NEVER trusted to confirm a
 * payment (PRD §19). Flow:
 *   1. Verify the Square HMAC signature against the raw body.
 *   2. Confirm the event is a completed payment for the correct amount.
 *   3. Record the order as paid so the download token endpoint can release it.
 */
export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-square-hmacsha256-signature");

  // Square signs against the exact URL it was configured to call.
  const notificationUrl =
    (process.env.BASE_URL?.replace(/\/$/, "") ?? new URL(req.url).origin) +
    "/api/webhooks/square";

  if (!verifyWebhookSignature(rawBody, signature, notificationUrl)) {
    console.warn("[square-webhook] rejected: bad signature");
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  try {
    const type: string = event?.type ?? "";
    const payment = event?.data?.object?.payment;

    // We only act on completed payments.
    const isCompleted =
      type.startsWith("payment") &&
      payment?.status === "COMPLETED" &&
      payment?.amount_money?.amount === PRODUCT.priceCents &&
      payment?.amount_money?.currency === PRODUCT.currency;

    if (isCompleted) {
      // Recover our reference from the payment note set at checkout time.
      const note: string = payment?.note ?? "";
      const match = note.match(/mega_ref:([a-f0-9]+)/i);
      const orderRef = match?.[1] ?? payment?.order_id ?? payment?.id;

      if (orderRef) {
        recordPaidOrder({
          orderRef,
          amountCents: payment.amount_money.amount,
          paidAt: Date.now(),
        });
        console.log(`[square-webhook] order paid: ${orderRef}`);
      }
    }

    // Always 200 a verified event so Square stops retrying.
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[square-webhook] processing error", err);
    return NextResponse.json({ error: "processing error" }, { status: 500 });
  }
}
