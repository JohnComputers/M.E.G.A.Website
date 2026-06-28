import { PageShell } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { BuyButton } from "@/components/BuyButton";
import { PRODUCT } from "@/lib/constants";

export const metadata = {
  title: "Checkout cancelled",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <PageShell>
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white/[0.05] text-ink-secondary">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">
          Checkout cancelled
        </h1>
        <p className="mt-3 max-w-md text-sm text-ink-secondary">
          No payment was taken. You can pick up where you left off whenever you are
          ready — M.E.G.A. is a one-time ${PRODUCT.priceUsd} purchase.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <BuyButton size="lg" />
          <ButtonLink href="/" variant="secondary" size="lg">
            Back to home
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-ink-muted">
          Ran into a problem at checkout?{" "}
          <a className="text-accent-cyan" href="/contact">
            Contact support
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}
