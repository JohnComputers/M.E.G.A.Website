import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

const REQS = [
  { label: "Operating system", value: "Windows 10 or 11 (64-bit)", required: true },
  { label: "Python", value: "Python 3.11 (avoid 3.13+)", required: true },
  { label: "AI runtime", value: "Ollama (free, installed locally)", required: true },
  { label: "Memory", value: "16 GB RAM recommended", required: true },
  { label: "Disk space", value: "~5 GB free for AI models", required: true },
  { label: "Graphics", value: "GPU optional — better for vision models", required: false },
  { label: "Microphone", value: "Optional — text mode works without one", required: false },
  { label: "Internet", value: "Only for setup, model downloads & web features", required: false },
];

export function SystemRequirements() {
  return (
    <section className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="System Requirements"
          title={
            <>
              What you need to <span className="text-gradient">run it.</span>
            </>
          }
          intro="M.E.G.A. runs on standard Windows hardware. More capable local models reward more RAM and a GPU, but the essentials are modest."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2">
            {REQS.map((req) => (
              <div key={req.label} className="bg-bg-base/60 p-5">
                <dt className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-muted">
                  {req.label}
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] ${
                      req.required
                        ? "bg-accent/15 text-accent-cyan"
                        : "bg-white/[0.05] text-ink-muted"
                    }`}
                  >
                    {req.required ? "required" : "optional"}
                  </span>
                </dt>
                <dd className="mt-1.5 text-sm text-ink-primary">{req.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
