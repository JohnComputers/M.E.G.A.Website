import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const TRADITIONAL = [
  "Answers questions",
  "Writes text",
  "No system access",
  "Cannot click buttons",
  "Cannot organize files",
];

const MEGA = [
  "Sees your screen",
  "Controls mouse and keyboard",
  "Automates applications",
  "Executes workflows",
  "Runs fully locally",
];

export function WhyMega() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="Why M.E.G.A."
          title={
            <>
              Finally, an AI that doesn&rsquo;t stop at{" "}
              <span className="text-gradient">chatting.</span>
            </>
          }
          intro="Cloud chatbots can describe how to do something. M.E.G.A. does it — on your actual machine, with your real applications."
        />

        <div className="mx-auto mt-14 grid max-w-4xl gap-5 md:grid-cols-2">
          {/* Traditional AI */}
          <Reveal>
            <div className="h-full rounded-2xl border border-white/[0.06] bg-bg-elevated/40 p-7">
              <div className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                Traditional AI
              </div>
              <ul className="mt-5 space-y-3.5">
                {TRADITIONAL.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink-secondary">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-state-error/30 text-state-error">
                      <Cross />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* M.E.G.A. */}
          <Reveal delay={0.12}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-accent/30 bg-bg-card/60 p-7 shadow-glow">
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/[0.06] to-transparent" />
              <div className="font-mono text-xs uppercase tracking-wider text-accent-cyan">
                M.E.G.A.
              </div>
              <ul className="mt-5 space-y-3.5">
                {MEGA.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-ink-primary">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-state-success/15 text-state-success">
                      <Check />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Cross() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
