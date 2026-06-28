import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

/**
 * Gallery (PRD §9 #gallery). These are stylized representations of M.E.G.A.
 * screens. Replace each frame with a real screenshot when available — drop an
 * <img> in place of the mock body and keep the frame chrome.
 */

function WindowFrame({
  title,
  badge,
  children,
}: {
  title: string;
  badge: string;
  children: React.ReactNode;
}) {
  return (
    <div className="vision-frame glass overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-state-error/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-state-warning/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-state-success/60" />
        </div>
        <span className="font-mono text-[11px] text-ink-muted">{title}</span>
        <span className="font-mono text-[10px] text-accent-cyan">{badge}</span>
      </div>
      <div className="relative h-48 bg-bg-base/70 p-4">{children}</div>
    </div>
  );
}

function Bar({ w, dim }: { w: string; dim?: boolean }) {
  return (
    <div
      className={`h-2.5 rounded ${dim ? "bg-white/[0.05]" : "bg-white/10"}`}
      style={{ width: w }}
    />
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-backdrop opacity-20" />
      <div className="shell">
        <SectionHeader
          eyebrow="Gallery & Screenshots"
          title={
            <>
              A look at the <span className="text-gradient">interface.</span>
            </>
          }
          intro="M.E.G.A. ships as a clean desktop app. These views show the operator console, the vision system, and the task planner in action."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <WindowFrame title="Operator Console" badge="chat">
              <div className="space-y-2.5">
                <div className="flex justify-end">
                  <div className="rounded-lg rounded-br-sm bg-accent/20 px-3 py-2">
                    <Bar w="120px" />
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="space-y-2 rounded-lg rounded-bl-sm bg-white/[0.04] px-3 py-2">
                    <Bar w="160px" />
                    <Bar w="90px" dim />
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-state-success" />
                  <Bar w="70px" dim />
                </div>
              </div>
            </WindowFrame>
          </Reveal>

          <Reveal delay={0.1}>
            <WindowFrame title="Vision System" badge="scan">
              <div className="relative h-full rounded-lg border border-white/[0.06]">
                <div className="absolute inset-0 grid-backdrop opacity-50" />
                <div className="absolute left-3 top-3 h-2 w-20 rounded bg-white/10" />
                <div className="absolute right-4 top-8 h-10 w-10 rounded border border-accent-cyan shadow-glow-cyan" />
                <div className="absolute bottom-4 left-3 h-7 w-24 rounded bg-white/[0.05]" />
                <div className="absolute inset-x-0 top-0 h-8 animate-scan-sweep bg-gradient-to-b from-accent-cyan/30 to-transparent" />
                <span className="absolute bottom-2 right-2 font-mono text-[9px] text-accent-cyan">
                  3 elements detected
                </span>
              </div>
            </WindowFrame>
          </Reveal>

          <Reveal delay={0.2}>
            <WindowFrame title="Task Planner" badge="plan">
              <ol className="space-y-2.5">
                {["Scan files", "Group by type", "Move into folders"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-accent/40 font-mono text-[10px] text-accent-cyan">
                      {i + 1}
                    </span>
                    <Bar w={`${130 - i * 18}px`} />
                  </li>
                ))}
                <li className="flex items-center gap-3 pt-1">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-state-success/15 text-state-success">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="font-mono text-xs text-state-success">Completed</span>
                </li>
              </ol>
            </WindowFrame>
          </Reveal>
        </div>

        <p className="mt-8 text-center text-xs text-ink-muted">
          Interface representations. Visual details may change between beta builds.
        </p>
      </div>
    </section>
  );
}
