import { LegalSection, LegalList, LastUpdated } from "@/components/ui/Legal";
import { PRODUCT } from "@/lib/constants";

export const metadata = { title: "Refund Policy" };

export default function RefundPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Refund Policy</h1>
        <LastUpdated date="June 2026" />
        <p className="text-sm leading-relaxed text-ink-secondary">
          {PRODUCT.name} is a one-time ${PRODUCT.priceUsd} digital software purchase.
          Because it is delivered as an immediate digital download, the following
          refund terms apply.
        </p>
      </header>

      <LegalSection title="1. All sales are final, with limited exceptions">
        <p>
          All sales are final except in the following cases, where you may be eligible
          for a refund:
        </p>
        <LegalList
          items={[
            "The ZIP file is corrupted or inaccessible due to a system error on our side and cannot be delivered to you.",
            "You were charged more than once for the same purchase (a duplicate charge).",
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Situations that are not eligible for a refund">
        <LegalList
          items={[
            "Change of mind or general dissatisfaction.",
            "Hardware incompatibility or insufficient system resources.",
            "Differences in performance between AI models, or model output quality.",
            "Misuse or misunderstanding of the software's capabilities.",
            "Issues that fall within the expected behavior of beta software.",
          ]}
        />
        <p>
          Because {PRODUCT.name} runs on your own hardware with models you choose, we
          encourage you to review the{" "}
          <a href="/docs/installation">installation guide</a> and{" "}
          <a href="/#faq">FAQ</a> before purchasing to confirm it fits your needs.
        </p>
      </LegalSection>

      <LegalSection title="3. How to request a refund">
        <p>
          To request a refund under the exceptions above, email{" "}
          <a href={`mailto:${PRODUCT.supportEmail}`}>{PRODUCT.supportEmail}</a> with
          your purchase reference and a description of the issue. You can also reach us
          at <a href={`tel:${PRODUCT.supportPhoneTel}`}>{PRODUCT.supportPhoneDisplay}</a>.
        </p>
      </LegalSection>

      <LegalSection title="4. Response time">
        <p>
          We aim to respond to refund requests within 3–7 business days. Approved
          refunds are issued through Square to the original payment method.
        </p>
      </LegalSection>

      <LegalSection title="5. Payment processing">
        <p>
          Payments and refunds are processed by Square. Refund timing to your account
          may depend on your bank or card issuer.
        </p>
      </LegalSection>
    </article>
  );
}
