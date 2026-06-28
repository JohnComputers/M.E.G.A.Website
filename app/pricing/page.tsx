import { PageShell, PageHeader } from "@/components/PageShell";
import { PricingCard } from "@/components/PricingCard";
import { BetaNotice } from "@/components/BetaNotice";
import { SystemRequirements } from "@/components/SystemRequirements";
import { FAQ } from "@/components/FAQ";

export const metadata = {
  title: "Pricing",
  description:
    "M.E.G.A. is a one-time $50 purchase. No subscriptions, no tiers, no hidden fees.",
};

export default function PricingPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Pricing"
        title="One-time $50. No subscriptions."
        intro="M.E.G.A. is a local software product you buy once and keep. There is nothing to renew and no usage bills — the AI runs on your own machine."
      />

      <section className="py-16">
        <div className="shell">
          <PricingCard />
          <div className="mt-10">
            <BetaNotice />
          </div>
        </div>
      </section>

      <SystemRequirements />
      <FAQ />
    </PageShell>
  );
}
