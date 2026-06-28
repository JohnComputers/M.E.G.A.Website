import { LegalSection, LegalList, LastUpdated } from "@/components/ui/Legal";
import { PRODUCT } from "@/lib/constants";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms of Service</h1>
        <LastUpdated date="June 2026" />
        <p className="text-sm leading-relaxed text-ink-secondary">
          These Terms of Service ("Terms") govern your purchase and use of{" "}
          {PRODUCT.name} ({PRODUCT.fullName}). By purchasing or using the software, you
          agree to these Terms. If you do not agree, do not purchase or use the
          software.
        </p>
      </header>

      <LegalSection title="1. The software">
        <p>
          {PRODUCT.name} is a local-first Windows application that can interpret your
          screen and control your computer through operating-system-level mouse,
          keyboard, and system inputs. It runs on your own machine using local AI
          models. It is currently provided as beta software.
        </p>
      </LegalSection>

      <LegalSection title="2. Acceptance of risk">
        <p>You acknowledge and agree that:</p>
        <LegalList
          items={[
            "The software interacts directly with operating-system-level inputs.",
            "Automation may move your mouse, type, click, run commands, and operate applications on your behalf.",
            "Misuse, misconfiguration, or automation errors may cause unintended system behavior.",
            "You are responsible for supervising automated tasks and for the consequences of running the software on your system.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Beta software disclaimer">
        <p>
          {PRODUCT.name} is in beta. Features may be incomplete, unstable, or behave
          inconsistently depending on your hardware and the models you install. Vision
          and AI accuracy is not guaranteed, and there are no guarantees of uptime or
          reliability.
        </p>
      </LegalSection>

      <LegalSection title="4. Local execution responsibility">
        <p>You are solely responsible for:</p>
        <LegalList
          items={[
            "What you choose to run locally with the software.",
            "The AI models you install and use.",
            "Your system configuration and the environment in which the software operates.",
            "Ensuring your use complies with applicable laws and any third-party terms.",
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Prohibited use">
        <p>You may not use {PRODUCT.name} to:</p>
        <LegalList
          items={[
            "Engage in illegal activities.",
            "Create, distribute, or operate malware or malicious automation.",
            "Gain unauthorized access to systems, accounts, or data.",
            "Violate the rights of others or any applicable law or regulation.",
          ]}
        />
        <p>
          Further detail is provided in the{" "}
          <a href="/legal/acceptable-use">Acceptable Use Policy</a>.
        </p>
      </LegalSection>

      <LegalSection title="6. No warranty">
        <p>
          The software is provided "as is" and "as available," without warranties of
          any kind, whether express, implied, or statutory, including any implied
          warranties of merchantability, fitness for a particular purpose, and
          non-infringement, to the maximum extent permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="7. Limitation of liability">
        <p>
          To the maximum extent permitted by law, the developer of {PRODUCT.name} shall
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages, or for any loss arising out of or related to your use of
          the software, including without limitation:
        </p>
        <LegalList
          items={[
            "System damage or instability.",
            "Loss of data or files.",
            "Unintended automation outcomes.",
            "Conflicts with third-party software.",
          ]}
        />
        <p>
          To the maximum extent permitted by law, the developer's total aggregate
          liability for any claim relating to the software will not exceed the amount
          you paid for the license.
        </p>
      </LegalSection>

      <LegalSection title="8. License">
        <p>
          Your use of the software is governed by the{" "}
          <a href="/legal/eula">End User License Agreement</a>. Purchases and refunds
          are governed by the <a href="/legal/refund">Refund Policy</a>.
        </p>
      </LegalSection>

      <LegalSection title="9. Third-party services">
        <p>
          {PRODUCT.name} relies on third-party technologies such as Ollama (local model
          runtime) and Square (payment processing). Your use of those services is
          subject to their respective terms. We are not responsible for third-party
          services and are not affiliated with or endorsed by them.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to these Terms">
        <p>
          We may update these Terms from time to time. Continued use of the software
          after changes take effect constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p>
          Questions about these Terms? Contact{" "}
          <a href={`mailto:${PRODUCT.supportEmail}`}>{PRODUCT.supportEmail}</a> or{" "}
          <a href={`tel:${PRODUCT.supportPhoneTel}`}>{PRODUCT.supportPhoneDisplay}</a>.
        </p>
      </LegalSection>
    </article>
  );
}
