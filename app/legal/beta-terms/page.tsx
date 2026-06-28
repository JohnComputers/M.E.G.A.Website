import { LegalSection, LegalList, LastUpdated } from "@/components/ui/Legal";
import { PRODUCT } from "@/lib/constants";

export const metadata = { title: "Beta Program Terms" };

export default function BetaTermsPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Beta Program Terms
        </h1>
        <LastUpdated date="June 2026" />
        <p className="text-sm leading-relaxed text-ink-secondary">
          {PRODUCT.name} ({PRODUCT.fullName}) is currently offered as beta software.
          These Beta Program Terms describe what that means and supplement the{" "}
          <a href="/legal/terms">Terms of Service</a> and{" "}
          <a href="/legal/eula">EULA</a>.
        </p>
      </header>

      <LegalSection title="1. Beta nature of the software">
        <p>
          As beta software, {PRODUCT.name} is still under active development. It may be
          unstable or incomplete, may contain bugs, and may change significantly between
          builds.
        </p>
      </LegalSection>

      <LegalSection title="2. No guarantees of reliability">
        <LegalList
          items={[
            "We do not guarantee uptime, reliability, or uninterrupted operation.",
            "Features may be added, changed, or removed without notice.",
            "Behavior may vary depending on your hardware, configuration, and the AI models you install.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. AI and vision accuracy">
        <p>
          {PRODUCT.name} uses AI models, including vision models that interpret your
          screen. Their output and accuracy are not guaranteed. The software may
          misread the screen, misidentify elements, or take unintended actions, and you
          should not rely on it for tasks where errors could cause harm or loss.
        </p>
      </LegalSection>

      <LegalSection title="4. Supervision and responsibility">
        <p>
          Automated tasks require your supervision. You assume responsibility for
          running the software locally on your system, for the actions you direct it to
          perform, and for maintaining backups of important data.
        </p>
      </LegalSection>

      <LegalSection title="5. Feedback">
        <p>
          We welcome feedback and bug reports. By submitting feedback, you grant us the
          right to use it to improve {PRODUCT.name} without obligation or compensation to
          you. Please do not include confidential information in your reports.
        </p>
      </LegalSection>

      <LegalSection title="6. No warranty">
        <p>
          Beta software is provided "as is," without warranties of any kind. To the
          maximum extent permitted by law, we disclaim all warranties and limit our
          liability as described in the <a href="/legal/terms">Terms of Service</a>.
        </p>
      </LegalSection>

      <LegalSection title="7. Updates and changes">
        <p>
          Your purchase includes beta-channel updates. We may modify these Beta Program
          Terms as the software evolves; changes are reflected by the date at the top of
          this page.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact">
        <p>
          Questions or bug reports? Contact{" "}
          <a href={`mailto:${PRODUCT.supportEmail}`}>{PRODUCT.supportEmail}</a> or{" "}
          <a href={`tel:${PRODUCT.supportPhoneTel}`}>{PRODUCT.supportPhoneDisplay}</a>.
        </p>
      </LegalSection>
    </article>
  );
}
