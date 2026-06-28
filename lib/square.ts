import crypto from "crypto";
import { PRODUCT } from "@/lib/constants";

/**
 * Minimal Square integration over the REST API (no SDK dependency, in keeping
 * with a lean, auditable surface).
 *
 * Two responsibilities:
 *   1. createCheckoutLink() — builds a Square-hosted payment page for the
 *      $50 one-time license and points the success redirect at /download.
 *   2. verifyWebhookSignature() — validates that an inbound webhook genuinely
 *      came from Square before any download token is minted (PRD §19/§20).
 */

export function isSquareConfigured(): boolean {
  return Boolean(
    process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID,
  );
}

function apiBase(): string {
  return process.env.SQUARE_ENVIRONMENT === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";
}

export type CheckoutLink = { url: string; orderRef: string };

/**
 * Creates a hosted Square payment link. `orderRef` is our own reference that we
 * embed so the webhook and the redirect can be tied back to one purchase.
 */
export async function createCheckoutLink(baseUrl: string): Promise<CheckoutLink> {
  const orderRef = crypto.randomBytes(16).toString("hex");

  const res = await fetch(`${apiBase()}/v2/online-checkout/payment-links`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Square-Version": "2024-09-19",
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      idempotency_key: orderRef,
      quick_pay: {
        name: `${PRODUCT.name} — ${PRODUCT.fullName} (License)`,
        price_money: {
          amount: PRODUCT.priceCents,
          currency: PRODUCT.currency,
        },
        location_id: process.env.SQUARE_LOCATION_ID,
      },
      checkout_options: {
        redirect_url: `${baseUrl}/download?ref=${orderRef}`,
        ask_for_shipping_address: false,
      },
      // Stored on the order so we can reconcile it in the webhook handler.
      payment_note: `mega_ref:${orderRef}`,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Square payment link failed (${res.status}): ${detail}`);
  }

  const data = (await res.json()) as {
    payment_link?: { url?: string };
  };
  const url = data.payment_link?.url;
  if (!url) throw new Error("Square did not return a payment link URL");

  return { url, orderRef };
}

/**
 * Verifies a Square webhook signature.
 * Square signs `notificationUrl + rawBody` with HMAC-SHA256 using your
 * webhook signature key, and sends the result in the `x-square-hmacsha256-signature`
 * header (base64).
 */
export function verifyWebhookSignature(
  rawBody: string,
  signatureHeader: string | null,
  notificationUrl: string,
): boolean {
  const key = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;
  if (!key || !signatureHeader) return false;

  const hmac = crypto.createHmac("sha256", key);
  hmac.update(notificationUrl + rawBody);
  const expected = hmac.digest("base64");

  const a = Buffer.from(signatureHeader);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
