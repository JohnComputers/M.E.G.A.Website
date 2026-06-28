import { Reveal } from "./ui/Reveal";

const TECHNOLOGIES = [
  { name: "Ollama", note: "Local LLM runtime" },
  { name: "Python", note: "Automation engine" },
  { name: "Windows", note: "Native input control" },
  { name: "CustomTkinter", note: "Desktop interface" },
  { name: "PyAutoGUI", note: "Mouse & keyboard" },
  { name: "MSS", note: "Screen capture" },
];

export function TrustSection() {
  return (
    <section className="border-y border-white/[0.06] bg-bg-elevated/40 py-16">
      <div className="shell">
        <Reveal className="text-center">
          <p className="text-sm font-medium text-ink-secondary">
            Built on proven local AI infrastructure.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-ink-muted">
            M.E.G.A. is powered by established open-source and local-first
            technologies. No proprietary cloud dependency is required for core
            functionality.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-3 lg:grid-cols-6">
            {TECHNOLOGIES.map((tech) => (
              <li
                key={tech.name}
                className="bg-bg-base/60 px-4 py-5 text-center transition-colors hover:bg-bg-card/60"
              >
                <div className="font-mono text-sm font-semibold text-ink-primary">
                  {tech.name}
                </div>
                <div className="mt-1 text-[11px] text-ink-muted">{tech.note}</div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-6 text-center text-xs text-ink-muted">
            M.E.G.A. integrates with these technologies and is not affiliated with
            or endorsed by their respective owners. All trademarks belong to their
            holders.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
