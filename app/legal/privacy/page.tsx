import { LegalSection, LegalList, LastUpdated } from "@/components/ui/Legal";
import { PRODUCT } from "@/lib/constants";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <LastUpdated date="June 2026" />
        <p className="text-sm leading-relaxed text-ink-secondary">
          This Privacy Policy explains how {PRODUCT.name} ({PRODUCT.fullName}) handles
          information in connection with the software and this website. {PRODUCT.name}{" "}
          is a local-first application: its core functionality runs on your own device.
        </p>
      </header>

      <LegalSection title="1. Local-first by design">
        <p>
          {PRODUCT.name} runs on your computer using local AI models through Ollama. No
          cloud servers are required for the software's core functionality, and your
          conversations, files, and workflows are processed locally on your machine.
        </p>
      </LegalSection>

      <LegalSection title="2. Information we do not collect">
        <LegalList
          items={[
            "We do not transmit your conversations with the software to us.",
            "We do not collect the contents of your files, screen, or local activity.",
            "We do not require you to create an account to use the software.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Information processed when you purchase">
        <p>
          Payments are processed by Square, a third-party payment provider. When you
          buy a license, Square handles your payment details in accordance with{" "}
          <a href="https://squareup.com/legal/general/privacy" target="_blank" rel="noopener noreferrer">
            Square's privacy practices
          </a>
          . We do not receive or store your full card details. We may receive limited
          transaction information (such as a payment confirmation and reference) needed
          to deliver your download and handle support or refunds.
        </p>
      </LegalSection>

      <LegalSection title="4. Download and fraud-prevention logs">
        <p>
          To protect the gated download and prevent abuse, our download system may log
          technical information such as download events, timestamps, and IP addresses
          associated with token requests. These logs are used for security and
          fraud-prevention purposes and are not used to build advertising profiles.
        </p>
      </LegalSection>

      <LegalSection title="5. Optional website analytics">
        <p>
          This website may use privacy-respecting analytics to understand aggregate
          usage, such as page views, conversion events, and button clicks. Any such
          analytics are non-personalized and are not used to identify individual
          visitors.
        </p>
      </LegalSection>

      <LegalSection title="6. No sale or external sharing of personal data">
        <p>
          We do not sell your personal data, and we do not share it with third parties
          except as necessary to operate the service (for example, Square for payment
          processing) or as required by law.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-party technologies">
        <p>
          {PRODUCT.name} integrates with third-party technologies, including Ollama
          (which runs locally) and Square (for payments). Your use of those
          technologies is also governed by their respective terms and privacy
          policies. We are not affiliated with or endorsed by them.
        </p>
      </LegalSection>

      <LegalSection title="8. Data retention">
        <p>
          We retain transaction and security logs only for as long as reasonably
          necessary for the purposes described above, including support, accounting,
          fraud prevention, and legal compliance.
        </p>
      </LegalSection>

      <LegalSection title="9. Children">
        <p>
          {PRODUCT.name} is not directed to children, and you must be old enough to
          form a binding contract in your jurisdiction to purchase a license.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to this policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes will be
          reflected by updating the date at the top of this page.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p>
          Questions about privacy? Contact us at{" "}
          <a href={`mailto:${PRODUCT.supportEmail}`}>{PRODUCT.supportEmail}</a> or{" "}
          <a href={`tel:${PRODUCT.supportPhoneTel}`}>{PRODUCT.supportPhoneDisplay}</a>.
        </p>
      </LegalSection>
    </article>
  );
}
