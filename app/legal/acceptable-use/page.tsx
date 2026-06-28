import { LegalSection, LegalList, LastUpdated } from "@/components/ui/Legal";
import { PRODUCT } from "@/lib/constants";

export const metadata = { title: "Acceptable Use Policy" };

export default function AcceptableUsePage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Acceptable Use Policy
        </h1>
        <LastUpdated date="June 2026" />
        <p className="text-sm leading-relaxed text-ink-secondary">
          This Acceptable Use Policy describes activities that are prohibited when using
          {" "}{PRODUCT.name} ({PRODUCT.fullName}). It supplements the{" "}
          <a href="/legal/terms">Terms of Service</a>. Because {PRODUCT.name} can
          control your computer, responsible use is essential.
        </p>
      </header>

      <LegalSection title="1. Lawful use only">
        <p>
          You must use {PRODUCT.name} in compliance with all applicable laws and
          regulations. You may not use the software to engage in, facilitate, or
          promote any illegal activity.
        </p>
      </LegalSection>

      <LegalSection title="2. Prohibited activities">
        <p>You may not use {PRODUCT.name} to:</p>
        <LegalList
          items={[
            "Create, distribute, or operate malware, viruses, or other malicious code.",
            "Gain or attempt to gain unauthorized access to any system, network, account, or data.",
            "Harm, harass, defraud, or violate the rights of others.",
            "Circumvent, disable, or interfere with security, licensing, or the gated download mechanisms of this product or website.",
            "Automate interactions with third-party services in violation of those services' terms of service or acceptable use rules.",
            "Scrape, collect, or process data in violation of applicable law or others' rights.",
            "Infringe intellectual property rights or misappropriate confidential information.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Responsible automation">
        <p>
          {PRODUCT.name} can move your mouse, type, run commands, and operate
          applications. You are responsible for supervising automated tasks and for
          ensuring that the actions you direct the software to perform are lawful and
          authorized.
        </p>
      </LegalSection>

      <LegalSection title="4. No interference or abuse of the service">
        <p>
          You may not attempt to disrupt or abuse this website or its download and
          payment infrastructure, including through excessive automated requests,
          attempts to bypass rate limits, or attempts to obtain the software without a
          valid purchase.
        </p>
      </LegalSection>

      <LegalSection title="5. Consequences of violations">
        <p>
          Violation of this policy may result in termination of your license without
          refund and, where appropriate, referral to law enforcement. Nothing in this
          policy limits any other rights or remedies available to us.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p>
          To report misuse or ask a question, contact{" "}
          <a href={`mailto:${PRODUCT.supportEmail}`}>{PRODUCT.supportEmail}</a> or{" "}
          <a href={`tel:${PRODUCT.supportPhoneTel}`}>{PRODUCT.supportPhoneDisplay}</a>.
        </p>
      </LegalSection>
    </article>
  );
}
