import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { ButtonLink } from "./ui/Button";

const STEPS = [
  {
    n: "01",
    title: "Install Python & Ollama",
    body: "Install Python 3.11 (add it to PATH) and Ollama for Windows. Both are free.",
  },
  {
    n: "02",
    title: "Download your AI models",
    body: "Pull a local text model and a vision model with Ollama — no account or key needed.",
  },
  {
    n: "03",
    title: "Run setup",
    body: "Unzip M.E.G.A. and double-click setup.bat to install all Python packages automatically.",
  },
  {
    n: "04",
    title: "Launch M.E.G.A.",
    body: "Double-click run.bat. The app opens in its own window — start commands with “mega.”",
  },
];

export function InstallationOverview() {
  return (
    <section className="border-y border-white/[0.06] bg-bg-elevated/40 py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="Installation Overview"
          title={
            <>
              Up and running in <span className="text-gradient">four steps.</span>
            </>
          }
          intro="Setup is straightforward and scripted. The full guide walks through every detail, including exact commands and troubleshooting."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={(i % 4) * 0.08}>
              <div className="h-full rounded-2xl border border-white/[0.06] bg-bg-card/50 p-6">
                <span className="font-mono text-sm text-accent-cyan">{step.n}</span>
                <h3 className="mt-3 text-base font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <ButtonLink href="/docs/installation" variant="secondary" size="lg">
            Read the full installation guide →
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
