import { BuyButton } from "./BuyButton";
import { PRODUCT } from "@/lib/constants";

const INCLUDED = [
  "Full M.E.G.A. application (ZIP download)",
  "Step-by-step installation guide",
  "Local setup & Ollama instructions",
  "Beta-channel updates",
  "Basic documentation",
];

const NOT_INCLUDED = [
  "No cloud service or hosted backend",
  "No AI API bills",
  "No recurring charges",
];

export function PricingCard() {
  return (
    <div className="relative mx-auto max-w-md">
      {/* Glow frame */}
      <div className="absolute -inset-px rounded-3xl accent-gradient opacity-40 blur-sm" aria-hidden />
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-bg-card/80 p-8 backdrop-blur-glass">
        <div className="flex items-center justify-between">
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-ink-secondary">
            One-time license
          </span>
          <span className="rounded-full bg-state-warning/15 px-3 py-1 text-xs text-state-warning">
            Beta
          </span>
        </div>

        <div className="mt-6 flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight">${PRODUCT.priceUsd}</span>
          <span className="mb-2 text-sm text-ink-muted">USD · pay once</span>
        </div>
        <p className="mt-2 text-sm text-ink-secondary">
          No subscription. No tiers. No upsells. Pay once and the software is yours
          to use.
        </p>

        <div className="my-7 h-px bg-white/[0.08]" />

        <ul className="space-y-3">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-ink-primary">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-state-success/15 text-state-success">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>

        <ul className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
          {NOT_INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-3 text-xs text-ink-muted">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-ink-muted" />
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <BuyButton size="lg" className="w-full" />
        </div>
        <p className="mt-3 text-center text-xs text-ink-muted">
          Secure checkout via Square · Windows 10 &amp; 11 only
        </p>
      </div>
    </div>
  );
}
