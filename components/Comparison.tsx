import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";

type Cell = boolean | "partial" | string;

const ROWS: { label: string; mega: Cell; cloud: Cell }[] = [
  { label: "Controls your mouse & keyboard", mega: true, cloud: false },
  { label: "Understands what's on your screen", mega: true, cloud: false },
  { label: "Automates Windows applications", mega: true, cloud: false },
  { label: "Runs AI locally (no cloud)", mega: true, cloud: false },
  { label: "Works offline after setup", mega: true, cloud: false },
  { label: "Conversations stay on your machine", mega: true, cloud: false },
  { label: "Executes scripts & commands locally", mega: true, cloud: "partial" },
  { label: "Answers questions & writes text", mega: true, cloud: true },
  { label: "Monthly subscription", mega: "One-time $50", cloud: "Recurring" },
];

function CellMark({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full bg-state-success/15 text-state-success">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="grid h-6 w-6 place-items-center rounded-full border border-white/10 text-ink-muted">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
          <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
    );
  }
  if (value === "partial") {
    return <span className="text-xs text-state-warning">Limited</span>;
  }
  return <span className="text-xs font-medium text-ink-primary">{value}</span>;
}

export function Comparison() {
  return (
    <section className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="Feature Comparison"
          title={
            <>
              A different kind of <span className="text-gradient">assistant.</span>
            </>
          }
          intro="Cloud chatbots are great at talking. M.E.G.A. is built to act on your machine. Here's how they compare."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-white/[0.06]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-bg-card/60">
                  <th className="px-5 py-4 text-left font-medium text-ink-secondary">
                    Capability
                  </th>
                  <th className="px-4 py-4 text-center font-semibold text-accent-cyan">
                    M.E.G.A.
                  </th>
                  <th className="px-4 py-4 text-center font-medium text-ink-muted">
                    Cloud assistants
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={`border-b border-white/[0.05] last:border-0 ${
                      i % 2 ? "bg-white/[0.015]" : ""
                    }`}
                  >
                    <td className="px-5 py-3.5 text-left text-ink-secondary">
                      {row.label}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex justify-center">
                        <CellMark value={row.mega} />
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex justify-center">
                        <CellMark value={row.cloud} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-ink-muted">
            Comparison reflects M.E.G.A.&rsquo;s local-first design. Cloud assistants
            vary by provider; this is a general illustration, not a claim about any
            specific product.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
