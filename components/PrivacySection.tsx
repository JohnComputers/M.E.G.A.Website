import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { IconShield } from "./icons";

const POINTS = [
  "Runs entirely on your device",
  "Uses your local Ollama models",
  "No recurring subscription for the software",
  "No mandatory cloud account",
  "Conversations stay on your machine",
  "You choose which models to install",
];

const FLOW = ["User", "M.E.G.A.", "Ollama", "Windows"];

export function PrivacySection() {
  return (
    <section className="relative border-y border-white/[0.06] bg-bg-elevated/40 py-24 sm:py-32">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Local AI & Privacy"
              title={
                <>
                  Your computer. Your data.{" "}
                  <span className="text-gradient">Your control.</span>
                </>
              }
              intro="M.E.G.A. runs entirely on your device. Your conversations, files, and workflows remain local unless you explicitly use external services (such as web browsing or Square checkout for payment)."
            />

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {POINTS.map((point, i) => (
                <Reveal as="li" key={point} delay={(i % 2) * 0.06}>
                  <div className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="mt-0.5 text-state-success">
                      <IconShield />
                    </span>
                    {point}
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Local data-flow diagram */}
          <Reveal delay={0.15}>
            <div className="vision-frame glass rounded-2xl p-8">
              <div className="text-center font-mono text-xs uppercase tracking-wider text-ink-muted">
                Default workflow · stays on your PC
              </div>
              <div className="mt-7 flex flex-col items-center gap-3">
                {FLOW.map((node, i) => (
                  <div key={node} className="flex w-full flex-col items-center gap-3">
                    <div className="w-full max-w-[220px] rounded-xl border border-white/10 bg-bg-base/70 py-3.5 text-center text-sm font-medium">
                      {node}
                    </div>
                    {i < FLOW.length - 1 && (
                      <svg width="16" height="22" viewBox="0 0 16 22" fill="none" aria-hidden>
                        <path
                          d="M8 1v18M3 14l5 6 5-6"
                          stroke="#4DD9FF"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          opacity="0.7"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-7 text-center text-xs text-ink-muted">
                No external servers appear in the default workflow. Optional web
                features reach the internet only when you ask them to.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
