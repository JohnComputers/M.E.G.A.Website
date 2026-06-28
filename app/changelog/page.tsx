import { PageShell, PageHeader } from "@/components/PageShell";
import { PRODUCT } from "@/lib/constants";

export const metadata = {
  title: "Changelog",
  description: "What's new in M.E.G.A. across beta builds.",
};

const RELEASES = [
  {
    version: `v${PRODUCT.version}`,
    tag: "Current · Beta",
    summary:
      "The current beta build. M.E.G.A. operates as a local-first desktop assistant with screen understanding, full computer control, file and system tools, web actions, local code execution, and an autonomous agent mode. It runs on local Ollama models by default, and can also use cloud providers when you choose.",
    points: [
      "Five AI providers: local Ollama (default) plus Claude, GPT-4o, Gemini, and Grok — each selectable for both reasoning and screen vision.",
      "API keys stored in a local encrypted vault that persists between sessions, with simple in-app commands to add a key or switch provider.",
      "Permanent, cross-session memory: M.E.G.A. can remember useful details, and you can tell it what to keep or forget.",
      "Screen understanding for locating on-screen elements and reading visible content, with handling for loading and transient states.",
      "Desktop automation (mouse, keyboard, windows), file management, system control, web actions, and local code execution.",
      "Autonomous agent mode with file editing, running files by type, and cross-step orchestration — with built-in safety stops.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Changelog"
        title="What's new"
        intro="M.E.G.A. is in active beta. Builds focus on reliability, broader capabilities, and a smoother local setup. Purchases include beta-channel updates."
      />

      <div className="shell py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          {RELEASES.map((release) => (
            <article
              key={release.version}
              className="relative rounded-2xl border border-white/[0.06] bg-bg-card/40 p-7"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-xl font-semibold tracking-tight">
                  {release.version}
                </h2>
                <span className="rounded-full bg-state-warning/15 px-3 py-1 text-xs text-state-warning">
                  {release.tag}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-secondary">
                {release.summary}
              </p>
              <ul className="mt-5 space-y-2.5">
                {release.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-ink-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-cyan" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-sm text-ink-muted">
          Detailed release notes accompany each beta update. As a beta product,
          features may change between builds. Have feedback?{" "}
          <a className="text-accent-cyan" href="/contact">
            Get in touch
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}
