import { LegalSection, LegalList, LastUpdated } from "@/components/ui/Legal";
import { PRODUCT } from "@/lib/constants";

export const metadata = { title: "End User License Agreement" };

export default function EulaPage() {
  return (
    <article className="space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          End User License Agreement
        </h1>
        <LastUpdated date="June 2026" />
        <p className="text-sm leading-relaxed text-ink-secondary">
          This End User License Agreement ("EULA") is a legal agreement between you and
          the developer of {PRODUCT.name} ({PRODUCT.fullName}) governing your use of the
          software. By installing or using the software, you agree to this EULA.
        </p>
      </header>

      <LegalSection title="1. License grant">
        <p>
          Subject to your compliance with this EULA, you are granted a personal,
          non-exclusive, non-transferable, revocable license to install and use one
          copy of {PRODUCT.name} for personal use and your own internal use. One
          license is granted per purchase.
        </p>
      </LegalSection>

      <LegalSection title="2. Restrictions">
        <p>You may not:</p>
        <LegalList
          items={[
            "Redistribute, resell, sublicense, rent, lease, or otherwise make the software available to third parties.",
            "Reverse engineer, decompile, or disassemble the software, except to the limited extent such restriction is prohibited by applicable law.",
            "Remove or alter any proprietary notices or labels on the software.",
            "Transfer your license to another person or entity.",
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Modifications">
        <p>
          You may modify configuration and local files for your own personal use. You
          may not distribute modified versions of the software, and any modification is
          undertaken at your own risk and does not transfer any ownership rights to you.
        </p>
      </LegalSection>

      <LegalSection title="4. Ownership">
        <p>
          The software is licensed, not sold. The developer retains all right, title,
          and interest in and to the software, including all intellectual property
          rights. No rights are granted except as expressly set out in this EULA.
        </p>
      </LegalSection>

      <LegalSection title="5. Third-party components">
        <p>
          {PRODUCT.name} relies on third-party software, including Ollama and the local
          AI models you choose to install, which are subject to their own licenses. You
          are responsible for complying with the licenses of any models or software you
          install and use.
        </p>
      </LegalSection>

      <LegalSection title="6. Beta software">
        <p>
          {PRODUCT.name} is provided as beta software and may contain bugs or
          incomplete features. Your use is also subject to the{" "}
          <a href="/legal/beta-terms">Beta Program Terms</a>.
        </p>
      </LegalSection>

      <LegalSection title="7. No warranty; limitation of liability">
        <p>
          The software is provided "as is" without warranty of any kind. To the maximum
          extent permitted by law, the developer disclaims all warranties and shall not
          be liable for any damages arising from your use of the software, as further
          described in the <a href="/legal/terms">Terms of Service</a>.
        </p>
      </LegalSection>

      <LegalSection title="8. Termination">
        <p>
          This license terminates automatically if you breach any term of this EULA.
          Upon termination, you must stop using and delete all copies of the software.
          Sections relating to ownership, disclaimers, and limitations of liability
          survive termination.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>
          Questions about this EULA? Contact{" "}
          <a href={`mailto:${PRODUCT.supportEmail}`}>{PRODUCT.supportEmail}</a>.
        </p>
      </LegalSection>
    </article>
  );
}
