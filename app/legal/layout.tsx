import type { ReactNode } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const LEGAL_NAV = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms of Service", href: "/legal/terms" },
  { label: "End User License Agreement", href: "/legal/eula" },
  { label: "Refund Policy", href: "/legal/refund" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Acceptable Use Policy", href: "/legal/acceptable-use" },
  { label: "Beta Program Terms", href: "/legal/beta-terms" },
];

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <div className="shell grid gap-12 py-16 lg:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside className="lg:border-r lg:border-white/[0.06] lg:pr-6">
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                Legal
              </p>
              <nav className="space-y-1">
                {LEGAL_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm text-ink-secondary transition-colors hover:bg-white/[0.04] hover:text-ink-primary"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="max-w-3xl">
            <div className="mb-8 rounded-xl border border-white/[0.08] bg-bg-elevated/40 p-4 text-xs leading-relaxed text-ink-muted">
              These documents are provided as a starting template for M.E.G.A. and do
              not constitute legal advice. You should have a qualified attorney review
              and adapt them for your business and jurisdiction before relying on them.
            </div>
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
