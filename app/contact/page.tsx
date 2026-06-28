import { PageShell, PageHeader } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { PRODUCT } from "@/lib/constants";

export const metadata = {
  title: "Contact & Support",
  description: "Get in touch about M.E.G.A. — support, bug reports, and questions.",
};

export default function ContactPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Contact"
        title="Contact & Support"
        intro="Questions about M.E.G.A., need a hand with setup, or found a bug? Reach out directly using the details below — this is also the place to report any issues."
      />

      <div className="shell py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <a
            href={`mailto:${PRODUCT.supportEmail}`}
            className="group vision-frame rounded-2xl border border-white/[0.06] bg-bg-card/40 p-8 transition-all hover:-translate-y-1 hover:border-accent/30"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] text-accent-cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-5 text-lg font-semibold tracking-tight">Email</h2>
            <p className="mt-1 text-sm text-ink-secondary">
              Best for detailed questions and bug reports.
            </p>
            <p className="mt-4 break-all font-mono text-sm text-accent-cyan">
              {PRODUCT.supportEmail}
            </p>
          </a>

          <a
            href={`tel:${PRODUCT.supportPhoneTel}`}
            className="group vision-frame rounded-2xl border border-white/[0.06] bg-bg-card/40 p-8 transition-all hover:-translate-y-1 hover:border-accent/30"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] text-accent-cyan">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-5 text-lg font-semibold tracking-tight">Phone</h2>
            <p className="mt-1 text-sm text-ink-secondary">
              For general questions and point of contact.
            </p>
            <p className="mt-4 font-mono text-sm text-accent-cyan">
              {PRODUCT.supportPhoneDisplay}
            </p>
          </a>
        </div>

        {/* Reporting tips */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-bg-elevated/40 p-7">
          <h2 className="text-lg font-semibold tracking-tight">Reporting an issue</h2>
          <p className="mt-2 text-sm text-ink-secondary">
            To help resolve things quickly, please include:
          </p>
          <ul className="mt-4 space-y-2.5">
            {[
              "What you were trying to do and the exact command you used.",
              "Any error message — running run_debug.bat prints detailed output you can copy.",
              "Your Windows version and which AI models you have installed.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-ink-secondary">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-cyan">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                    <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/docs/installation" variant="secondary">
              Installation guide
            </ButtonLink>
            <ButtonLink href="/docs" variant="ghost">
              Documentation →
            </ButtonLink>
          </div>
        </div>

        <p className="mt-8 text-sm text-ink-muted">
          For billing or refund questions, please see the{" "}
          <a className="text-accent-cyan" href="/legal/refund">
            Refund Policy
          </a>
          . M.E.G.A. is a beta product — your reports genuinely help improve it.
        </p>
      </div>
    </PageShell>
  );
}
