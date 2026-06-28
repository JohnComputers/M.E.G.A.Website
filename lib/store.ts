/**
 * Reference store for paid orders and consumed download tokens.
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PRODUCTION NOTE                                                          │
 * │  This implementation is an in-memory Map. It exists so the full flow      │
 * │  works in local development and demos. It will NOT behave correctly on    │
 * │  serverless platforms (e.g. Vercel) where each request may hit a fresh    │
 * │  instance, nor will it survive a restart.                                 │
 * │                                                                           │
 * │  Before going live, swap the bodies of these functions for a durable      │
 * │  store — Vercel KV, Upstash Redis, or a database table. The function      │
 * │  signatures are designed so only this file needs to change.              │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

export type PaidOrder = {
  orderRef: string;
  amountCents: number;
  paidAt: number;
};

// Orders confirmed paid by the verified Square webhook.
const paidOrders = new Map<string, PaidOrder>();

// One-time token nonces that have already been redeemed (single-use enforcement).
const consumedTokens = new Map<string, number>();

export function recordPaidOrder(order: PaidOrder): void {
  paidOrders.set(order.orderRef, order);
}

export function getPaidOrder(orderRef: string): PaidOrder | undefined {
  return paidOrders.get(orderRef);
}

export function isTokenConsumed(nonce: string): boolean {
  return consumedTokens.has(nonce);
}

export function consumeToken(nonce: string): void {
  consumedTokens.set(nonce, Date.now());
}

/**
 * Demo helper: seeds a fake paid order so the download flow can be exercised
 * locally without a real Square payment. Only callable when demo mode is on.
 */
export function seedDemoOrder(orderRef: string): void {
  paidOrders.set(orderRef, {
    orderRef,
    amountCents: 5000,
    paidAt: Date.now(),
  });
}
