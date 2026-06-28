import type { ReactNode } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ButtonLink } from "@/components/ui/Button";
import { PRODUCT } from "@/lib/constants";

export const metadata = {
  title: "Documentation",
  description:
    "Learn how M.E.G.A. works, what it can do, and the commands it understands.",
};

const QUICK_LINKS = [
  { title: "Installation & Setup", desc: "Full step-by-step guide from Python to first launch.", href: "/docs/installation" },
  { title: "Changelog", desc: "What's new across beta builds.", href: "/changelog" },
  { title: "Contact & Support", desc: "Report an issue or ask a question.", href: "/contact" },
];

const COMMAND_GROUPS: { title: string; items: string[] }[] = [
  {
    title: "Apps & System",
    items: [
      "mega open chrome / spotify / vs code / notepad",
      "mega shutdown in 60 seconds  ·  mega cancel shutdown",
      "mega sleep / lock / restart",
      "mega kill process chrome  ·  mega list processes by cpu",
    ],
  },
  {
    title: "Volume & Media",
    items: [
      "mega volume up / down 20  ·  mega mute",
      "mega play pause  ·  mega next track  ·  mega previous track",
    ],
  },
  {
    title: "System Info",
    items: [
      "mega system info  ·  mega cpu usage  ·  mega ram usage",
      "mega battery  ·  mega network info  ·  mega check internet",
      "mega what time is it  ·  mega what's today's date",
    ],
  },
  {
    title: "Files",
    items: [
      "mega read C:\\Users\\me\\notes.txt",
      "mega write a file called todo.txt with content: buy milk",
      "mega list my desktop  ·  mega search for *.pdf in Documents",
      "mega zip report.pdf summary.docx as reports.zip",
    ],
  },
  {
    title: "Browser & Web",
    items: [
      "mega search google for best coffee shops",
      "mega search youtube for lo-fi music",
      "mega open gmail  ·  mega translate 'bonjour' to english",
      "mega get directions from New York to Boston",
    ],
  },
  {
    title: "Computer Control",
    items: [
      "mega press the spacebar  ·  mega hold W for 3 seconds",
      "mega click at 800 450  ·  mega press Ctrl C",
      "mega type hello world and press Enter",
      "mega focus Minecraft  ·  mega scroll down 5",
    ],
  },
  {
    title: "Screen Reading",
    items: [
      "mega what's on my screen",
      "mega read all text on screen",
      "mega is there a save button  ·  mega save a screenshot",
    ],
  },
  {
    title: "Agent Mode (autonomous)",
    items: [
      "mega complete the tutorial on screen",
      "mega fill out the form",
      "stop agent   (or move mouse to the top-left corner)",
    ],
  },
  {
    title: "Code & Calculations",
    items: [
      "mega calculate 512 * 7 + 33",
      "mega run python: print([i**2 for i in range(10)])",
      "mega run powershell: Get-Process | Sort CPU -desc",
    ],
  },
  {
    title: "Memory",
    items: [
      "mega remember my name is Sam",
      "mega what's my name  ·  mega show all my memories",
      "mega forget my name",
    ],
  },
];

export default function DocsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Documentation"
        title="How to use M.E.G.A."
        intro="M.E.G.A. understands natural language — you don't need to memorize exact phrasing. Start spoken commands with the wake word “mega,” or just type in text mode. Below is a reference of what it can do."
      />

      <div className="shell space-y-16 py-16">
        {/* Quick links */}
        <section className="grid gap-5 md:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-white/[0.06] bg-bg-card/40 p-6 transition-all hover:-translate-y-1 hover:border-accent/30"
            >
              <h3 className="text-base font-semibold tracking-tight">{link.title}</h3>
              <p className="mt-1.5 text-sm text-ink-secondary">{link.desc}</p>
              <span className="mt-4 inline-block text-sm text-accent-cyan opacity-0 transition-opacity group-hover:opacity-100">
                Open →
              </span>
            </a>
          ))}
        </section>

        {/* New here */}
        <section className="vision-frame rounded-2xl border border-white/10 bg-bg-elevated/50 p-7 sm:p-9">
          <h2 className="text-xl font-semibold tracking-tight">New to M.E.G.A.?</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-secondary">
            Start with the installation guide — it walks through installing Python and
            Ollama, downloading the AI models, and launching the app for the first
            time. It also explains why no API keys are required.
          </p>
          <div className="mt-5">
            <ButtonLink href="/docs/installation" size="lg">
              Open the installation guide
            </ButtonLink>
          </div>
        </section>

        {/* Command reference */}
        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Command reference</h2>
          <p className="mt-2 max-w-2xl text-sm text-ink-secondary">
            A sample of supported commands. M.E.G.A. also understands casual,
            shorthand phrasing — “yo open chrome pls” works just as well as the formal
            version.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {COMMAND_GROUPS.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-white/[0.06] bg-bg-card/40 p-6"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-cyan">
                  {group.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="font-mono text-xs leading-relaxed text-ink-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Safety note */}
        <Callout>
          <strong className="text-ink-primary">Agent mode safety.</strong> When
          M.E.G.A. carries out tasks autonomously, it controls your mouse and
          keyboard. Move your mouse to the top-left corner of the screen for an
          instant emergency stop, say or type “stop agent” to stop gracefully, or
          close the window to halt everything. M.E.G.A. only acts when you ask it to.
        </Callout>

        <p className="text-sm text-ink-muted">
          Questions? Email{" "}
          <a className="text-accent-cyan" href={`mailto:${PRODUCT.supportEmail}`}>
            {PRODUCT.supportEmail}
          </a>{" "}
          or call{" "}
          <a className="text-accent-cyan" href={`tel:${PRODUCT.supportPhoneTel}`}>
            {PRODUCT.supportPhoneDisplay}
          </a>
          .
        </p>
      </div>
    </PageShell>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-state-warning/25 bg-state-warning/[0.06] p-5 text-sm leading-relaxed text-ink-secondary">
      {children}
    </div>
  );
}
