import { LegalSection, LegalList, LastUpdated } from "@/components/ui/Legal";
import { PRODUCT } from "@/lib/constants";

export const metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Cookie Policy</h1>
        <LastUpdated date="June 2026" />
        <p className="text-sm leading-relaxed text-ink-secondary">
          This Cookie Policy explains how this website uses cookies and similar
          technologies. {PRODUCT.name} is designed to keep tracking to a minimum.
        </p>
      </header>

      <LegalSection title="1. What cookies are">
        <p>
          Cookies are small text files stored on your device by your browser. They are
          widely used to make websites work and to provide basic functionality and
          analytics.
        </p>
      </LegalSection>

      <LegalSection title="2. Essential cookies">
        <p>
          We use only the cookies and local storage necessary for the website and
          checkout to function — for example, to maintain a secure session during the
          purchase and download process. These are required for the site to work and
          cannot be turned off through the site.
        </p>
      </LegalSection>

      <LegalSection title="3. Optional analytics">
        <p>
          We may use privacy-respecting, non-personalized analytics to understand
          aggregate usage such as page views and conversions. Any such analytics are
          configured to avoid identifying individual visitors.
        </p>
      </LegalSection>

      <LegalSection title="4. No advertising cookies">
        <p>
          We do not use advertising or cross-site tracking cookies, and we do not sell
          your data to advertisers.
        </p>
      </LegalSection>

      <LegalSection title="5. Third-party processing during checkout">
        <p>
          When you make a purchase, our payment processor (Square) may set cookies
          required to process the transaction securely. Those cookies are governed by
          Square's own policies.
        </p>
      </LegalSection>

      <LegalSection title="6. Controlling cookies">
        <p>You can control or delete cookies through your browser settings:</p>
        <LegalList
          items={[
            "Block or delete cookies for this site at any time in your browser.",
            "Use private/incognito browsing to limit cookie persistence.",
            "Note that disabling essential cookies may prevent checkout from working.",
          ]}
        />
      </LegalSection>

      <LegalSection title="7. Changes">
        <p>
          We may update this Cookie Policy from time to time. Changes are reflected by
          the date at the top of this page.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>
          Questions? Contact{" "}
          <a href={`mailto:${PRODUCT.supportEmail}`}>{PRODUCT.supportEmail}</a>.
        </p>
      </LegalSection>
    </article>
  );
}
