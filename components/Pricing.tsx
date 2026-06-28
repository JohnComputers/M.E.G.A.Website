import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { PricingCard } from "./PricingCard";

export function Pricing() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-backdrop opacity-30" />
      <div className="shell">
        <SectionHeader
          eyebrow="Pricing"
          title={
            <>
              Simple pricing. <span className="text-gradient">No subscriptions.</span>
            </>
          }
          intro="One payment, one download, yours to keep. M.E.G.A. is a local software product — there is nothing to renew."
        />

        <div className="mt-12">
          <Reveal>
            <PricingCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
