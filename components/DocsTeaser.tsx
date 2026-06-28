import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";
import { BuyButton } from "./BuyButton";
import { PRODUCT } from "@/lib/constants";

const DOC_LINKS = [
  { title: "Installation Guide", desc: "Every step, from Python to first launch.", href: "/docs/installation" },
  { title: "Documentation", desc: "Commands, capabilities, and how it works.", href: "/docs" },
  { title: "Changelog", desc: "What's new across beta builds.", href: "/changelog" },
  { title: "Contact & Support", desc: "Report an issue or ask a question.", href: "/contact" },
];

export function DocsTeaser() {
  return (
    <section className="border-t border-white/[0.06] py-24 sm:py-32">
      <div className="shell">
        <div className="grid gap-5 md:grid-cols-2">
          {DOC_LINKS.map((link, i) => (
            <Reveal key={link.href} delay={(i % 2) * 0.08}>
              <a
                href={link.href}
                className="group flex items-center justify-between rounded-2xl border border-white/[0.06] bg-bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-accent/30"
              >
                <div>
                  <h3 className="text-base font-semibold tracking-tight">{link.title}</h3>
                  <p className="mt-1 text-sm text-ink-secondary">{link.desc}</p>
                </div>
                <span className="text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-cyan">
                  →
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Final CTA */}
        <Reveal className="mt-16">
          <div className="vision-frame relative overflow-hidden rounded-3xl border border-white/10 bg-bg-elevated/60 p-10 text-center sm:p-14">
            <div className="absolute inset-0 -z-10 grid-backdrop opacity-30" />
            <h2 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Give your computer an{" "}
              <span className="text-gradient">intelligent operator.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-ink-secondary">
              {PRODUCT.name} installs in minutes and runs entirely on your machine.
              One-time ${PRODUCT.priceUsd}.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BuyButton size="lg" />
              <ButtonLink href="/docs/installation" variant="secondary" size="lg">
                See how to install
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
