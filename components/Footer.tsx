import Link from "next/link";
import { PRODUCT } from "@/lib/constants";

const LEGAL = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Terms", href: "/legal/terms" },
  { label: "EULA", href: "/legal/eula" },
  { label: "Refund Policy", href: "/legal/refund" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Acceptable Use", href: "/legal/acceptable-use" },
  { label: "Beta Terms", href: "/legal/beta-terms" },
];

const PRODUCT_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const RESOURCES = [
  { label: "Documentation", href: "/docs" },
  { label: "Installation Guide", href: "/docs/installation" },
  { label: "Changelog", href: "/changelog" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-bg-base">
      <div className="shell py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mega-monogram.png"
                  alt={`${PRODUCT.name} logo`}
                  width={36}
                  height={36}
                  className="h-full w-full scale-110 object-cover"
                />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold tracking-tight">
                  {PRODUCT.name}
                </span>
                <span className="block text-[11px] text-ink-muted">
                  {PRODUCT.fullName}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-ink-secondary">
              A local-first AI assistant for Windows. Sees your screen, controls your
              PC, and runs entirely on your machine.
            </p>
            <div className="mt-5 space-y-1 text-sm">
              <a
                href={`mailto:${PRODUCT.supportEmail}`}
                className="block text-ink-secondary transition-colors hover:text-accent-cyan"
              >
                {PRODUCT.supportEmail}
              </a>
              <a
                href={`tel:${PRODUCT.supportPhoneTel}`}
                className="block text-ink-secondary transition-colors hover:text-accent-cyan"
              >
                {PRODUCT.supportPhoneDisplay}
              </a>
            </div>
          </div>

          {/* Columns */}
          <FooterCol title="Product" links={PRODUCT_LINKS} />
          <FooterCol title="Resources" links={RESOURCES} />
          <FooterCol title="Legal" links={LEGAL} />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-7 sm:flex-row">
          <p className="text-xs text-ink-muted">
            © {PRODUCT.copyrightYear} {PRODUCT.name} — {PRODUCT.fullName}. All rights
            reserved.
          </p>
          <p className="text-xs text-ink-muted">
            Windows 10 &amp; 11 · Powered locally by Ollama
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-ink-secondary transition-colors hover:text-ink-primary"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
