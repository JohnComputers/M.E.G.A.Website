import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustSection } from "@/components/TrustSection";
import { WhyMega } from "@/components/WhyMega";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Capabilities } from "@/components/Capabilities";
import { Architecture } from "@/components/Architecture";
import { PrivacySection } from "@/components/PrivacySection";
import { Comparison } from "@/components/Comparison";
import { Gallery } from "@/components/Gallery";
import { SystemRequirements } from "@/components/SystemRequirements";
import { InstallationOverview } from "@/components/InstallationOverview";
import { BetaNotice } from "@/components/BetaNotice";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { DocsTeaser } from "@/components/DocsTeaser";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1 */} <Hero />
        {/* 2 */} <TrustSection />
        {/* 3 */} <WhyMega />
        {/* 4 */} <ProductShowcase />
        {/* 5 */} <Capabilities />
        {/* 6 */} <Architecture />
        {/* 7 */} <PrivacySection />
        {/* 8 */} <Comparison />
        {/* 9 */} <Gallery />
        {/* 10 */} <SystemRequirements />
        {/* 11 */} <InstallationOverview />
        {/* 12 — Beta notice sits directly above pricing, near the buy button */}
        <section className="pt-4">
          <div className="shell">
            <BetaNotice />
          </div>
        </section>
        {/* 13 */} <Pricing />
        {/* 14 */} <FAQ />
        {/* 15 */} <DocsTeaser />
      </main>
      {/* 16 */} <Footer />
    </>
  );
}
