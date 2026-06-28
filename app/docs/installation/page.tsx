import type { ReactNode } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { ButtonLink } from "@/components/ui/Button";
import { PRODUCT } from "@/lib/constants";

export const metadata = {
  title: "Installation & Setup Guide",
  description:
    "A complete, step-by-step guide to installing and setting up M.E.G.A. on Windows — Python, Ollama, AI models, dependencies, and first launch.",
};

const CONTENTS = [
  ["before", "Before you begin"],
  ["python", "Step 1 — Install Python 3.11"],
  ["ollama", "Step 2 — Install Ollama"],
  ["models", "Step 3 — Download your AI models"],
  ["setup", "Step 4 — Unzip & run setup"],
  ["launch", "Step 5 — Launch M.E.G.A."],
  ["keys", "API keys & accounts"],
  ["first", "Your first commands"],
  ["updating", "Updating M.E.G.A."],
  ["trouble", "Troubleshooting"],
  ["help", "Get help"],
] as const;

export default function InstallationPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Documentation"
        title="Installation & Setup Guide"
        intro="Everything you need to get M.E.G.A. running on Windows 10 or 11. Plan for about 15–20 minutes, most of which is waiting for the AI models to download. No prior experience required, and no API keys or paid accounts are needed for the core product."
      />

      <div className="shell grid gap-12 py-16 lg:grid-cols-[240px_1fr]">
        {/* Sticky contents */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              On this page
            </p>
            <nav className="space-y-1">
              {CONTENTS.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block rounded-md px-3 py-1.5 text-sm text-ink-secondary transition-colors hover:bg-white/[0.04] hover:text-ink-primary"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Body */}
        <article className="max-w-3xl space-y-16">
          {/* Before you begin */}
          <Section id="before" title="Before you begin">
            <p>
              M.E.G.A. is a local-first application: the AI runs on your own
              computer, so your work stays on your machine. Here is what you need
              before starting.
            </p>
            <Checklist
              items={[
                "A Windows 10 or Windows 11 PC (64-bit).",
                "About 5 GB of free disk space for the AI models.",
                "16 GB of RAM recommended (8 GB works with smaller models).",
                "An internet connection for the one-time downloads.",
                "The M.E.G.A. ZIP file from your purchase.",
              ]}
            />
            <Callout tone="info" title="No API key needed to start">
              Getting started needs no API key, paid subscription, or cloud account —
              M.E.G.A. runs on free, local models through Ollama. You can optionally
              connect a cloud provider (Claude, GPT-4o, Gemini, or Grok) later if you
              want; that is covered below.
            </Callout>
          </Section>

          {/* Step 1 */}
          <Section id="python" title="Step 1 — Install Python 3.11" step="01">
            <p>
              M.E.G.A. is built in Python. Install version 3.11 specifically — some
              packages are not yet compatible with 3.13 and newer.
            </p>
            <ol className="ml-1 list-decimal space-y-3 pl-5 text-ink-secondary marker:text-ink-muted">
              <li>
                Download the Python 3.11 installer from{" "}
                <ExtLink href="https://www.python.org/downloads/release/python-3119/">
                  python.org/downloads/release/python-3119
                </ExtLink>
                . Choose “Windows installer (64-bit).”
              </li>
              <li>
                Run the installer. On the first screen, <strong>tick the box that
                says “Add python.exe to PATH.”</strong> This step is essential — if
                you miss it, nothing else will work.
              </li>
              <li>Click “Install Now” and let it finish.</li>
              <li>
                Confirm it worked: open the Start menu, type{" "}
                <Inline>cmd</Inline>, open Command Prompt, and run:
              </li>
            </ol>
            <CodeBlock>python --version</CodeBlock>
            <p>
              You should see <Inline>Python 3.11.9</Inline> (or another 3.11.x
              number). If you see an error instead, see the note below.
            </p>
            <Callout tone="warn" title="“python is not recognized”?">
              This almost always means the “Add python.exe to PATH” box was not
              ticked during install. Re-run the installer, choose “Modify,” enable
              the PATH option, then restart your PC and try again.
            </Callout>
          </Section>

          {/* Step 2 */}
          <Section id="ollama" title="Step 2 — Install Ollama" step="02">
            <p>
              Ollama is the free engine that runs AI models locally on your machine.
              M.E.G.A. talks to it behind the scenes.
            </p>
            <ol className="ml-1 list-decimal space-y-3 pl-5 text-ink-secondary marker:text-ink-muted">
              <li>
                Download Ollama for Windows from{" "}
                <ExtLink href="https://ollama.com/download">ollama.com/download</ExtLink>
                .
              </li>
              <li>
                Run the installer and follow the prompts. Once installed, Ollama runs
                quietly in the background (you will see its icon in the system tray).
              </li>
              <li>Confirm it installed by opening a new Command Prompt and running:</li>
            </ol>
            <CodeBlock>ollama --version</CodeBlock>
            <p>
              If a version number prints, you are ready for the next step. (M.E.G.A.
              will start Ollama for you automatically each time you launch it, so you
              do not need to start it manually.)
            </p>
          </Section>

          {/* Step 3 */}
          <Section id="models" title="Step 3 — Download your AI models" step="03">
            <p>
              These are the “brains” M.E.G.A. uses. They are free, downloaded once,
              and run entirely on your computer. No account or key is involved. Open
              Command Prompt and run the commands below — each download can take a few
              minutes, and progress shows in the terminal.
            </p>

            <h3 className="pt-2 text-lg font-semibold text-ink-primary">
              Recommended setup (the defaults)
            </h3>
            <p className="text-sm">
              A capable reasoning model plus a modern vision model for reading your
              screen — these are what M.E.G.A. expects by default:
            </p>
            <CodeBlock>{`ollama pull qwen2.5:7b
ollama pull gemma3:4b`}</CodeBlock>
            <p className="text-sm text-ink-muted">
              qwen2.5:7b is about 4.7 GB (the text/reasoning model). gemma3:4b is about
              3 GB and is a 2025-era vision model that reads on-screen interfaces far
              more accurately than older options.
            </p>

            <h3 className="pt-4 text-lg font-semibold text-ink-primary">
              Lighter option (lower-spec PCs)
            </h3>
            <p className="text-sm">
              If you are tight on memory or disk, these smaller models still work:
            </p>
            <CodeBlock>{`ollama pull llama3.2
ollama pull moondream`}</CodeBlock>
            <p className="text-sm text-ink-muted">
              llama3.2 is about 2 GB and moondream about 1.7 GB (it needs only ~2 GB of
              RAM).
            </p>

            <h3 className="pt-4 text-lg font-semibold text-ink-primary">
              More power (16 GB+ RAM)
            </h3>
            <p className="text-sm">
              For stronger reasoning and the best screen understanding:
            </p>
            <CodeBlock>{`ollama pull qwen2.5:14b
ollama pull llava:13b`}</CodeBlock>
            <p className="text-sm text-ink-muted">
              With 32 GB of RAM you can go further still with{" "}
              <Inline>qwen2.5:32b</Inline> (~20 GB) and <Inline>llava:34b</Inline>{" "}
              (~20 GB).
            </p>

            <Callout tone="info" title="Which model does M.E.G.A. use?">
              M.E.G.A. uses the model set in its configuration and can fall back to the
              best one you have installed, so you do not have to fuss with setup. You
              can switch the active text or vision model at any time — locally or to a
              cloud provider — using the commands shown in the next sections.
            </Callout>
          </Section>

          {/* Step 4 */}
          <Section id="setup" title="Step 4 — Unzip & run setup" step="04">
            <ol className="ml-1 list-decimal space-y-3 pl-5 text-ink-secondary marker:text-ink-muted">
              <li>
                Unzip the M.E.G.A. download to a folder you can find easily — for
                example, <Inline>C:\Users\You\Desktop\MEGA</Inline>.
              </li>
              <li>
                Open the folder and double-click <Inline>setup.bat</Inline>. This
                installs every Python package M.E.G.A. needs, automatically. A window
                will open and show progress.
              </li>
            </ol>
            <p className="text-sm">
              Setup installs these packages: customtkinter, ollama, SpeechRecognition,
              pyttsx3, pyaudio, mss, Pillow, pyautogui, pygetwindow, pynput, pyperclip,
              psutil, requests, duckduckgo-search, and pywhatkit.
            </p>

            <Callout tone="warn" title="If the microphone package (PyAudio) fails">
              PyAudio can occasionally fail to install. Setup automatically tries a
              fallback. If it still fails, that is fine — M.E.G.A. works perfectly in
              text mode without a microphone. You will just launch it with{" "}
              <Inline>python main.py --text</Inline> (covered in the next step).
            </Callout>

            <p className="pt-2 text-sm">
              Prefer to install manually, or want to verify everything is present? From
              inside the MEGA folder you can run:
            </p>
            <CodeBlock>{`pip install -r requirements.txt
python check_deps.py`}</CodeBlock>
            <p className="text-sm text-ink-muted">
              <Inline>check_deps.py</Inline> prints exactly which packages are
              installed or missing, so you always know where you stand.
            </p>
          </Section>

          {/* Step 5 */}
          <Section id="launch" title="Step 5 — Launch M.E.G.A." step="05">
            <p>
              You are ready to go. The easiest way to start is to double-click{" "}
              <Inline>run.bat</Inline> in the MEGA folder — it starts the Ollama engine
              for you and then opens the M.E.G.A. window.
            </p>
            <p className="text-sm">Prefer the command line? From the MEGA folder:</p>
            <CodeBlock>{`python main.py          (voice + text)
python main.py --text   (text only, no microphone)`}</CodeBlock>
            <p>
              The M.E.G.A. window opens with a chat area and an input bar. Type a
              command, or press the microphone button to speak. To get its attention,
              start spoken commands with the wake word <Inline>mega</Inline>. Try a few
              simple ones to confirm everything works:
            </p>
            <CodeBlock label="Try saying or typing">{`mega what time is it
mega what's on my screen
mega open notepad`}</CodeBlock>
            <Callout tone="info" title="If screen reading says Ollama isn't running">
              Launch with <Inline>run.bat</Inline> (it starts Ollama automatically), or
              open a separate Command Prompt and run <Inline>ollama serve</Inline>,
              leaving it open.
            </Callout>
          </Section>

          {/* API keys */}
          <Section id="keys" title="AI providers & API keys">
            <p className="text-lg text-ink-primary">
              Do you need an API key to use M.E.G.A.? <strong>No — not to get
              started.</strong>
            </p>
            <p>
              By default, M.E.G.A. runs entirely on your own machine using local
              models through Ollama, so the out-of-the-box experience needs no API
              key, no paid AI subscription, and no credit card:
            </p>
            <Checklist
              items={[
                "Local models run through Ollama — free, private, and no key.",
                "Web search uses DuckDuckGo, which requires no API key.",
                "Your conversations are processed on your machine by default.",
              ]}
            />

            <div className="rounded-2xl border border-white/[0.08] bg-bg-elevated/40 p-6">
              <span className="rounded-full bg-accent/15 px-2.5 py-1 text-[11px] uppercase tracking-wider text-accent-cyan">
                Optional
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink-primary">
                Use a cloud provider instead (or as well)
              </h3>
              <p className="mt-2 text-sm text-ink-secondary">
                M.E.G.A. supports five AI backends, and you can pick which one powers
                its thinking and its screen vision — independently. Local Ollama is the
                default; the four cloud options each need an API key from that provider.
                This is entirely optional and never required.
              </p>

              <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-bg-card/60 text-left">
                      <th className="px-4 py-2.5 font-medium text-ink-secondary">Provider</th>
                      <th className="px-4 py-2.5 font-medium text-ink-secondary">Example model</th>
                      <th className="px-4 py-2.5 font-medium text-ink-secondary">Key?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    <ProviderRow name="Ollama (local)" model="qwen2.5, gemma3" keyed="No — default" />
                    <ProviderRow name="Anthropic" model="Claude (claude-sonnet-4-6)" keyed="Yes" />
                    <ProviderRow name="OpenAI" model="GPT-4o" keyed="Yes" />
                    <ProviderRow name="Google" model="Gemini (gemini-2.0-flash)" keyed="Yes" />
                    <ProviderRow name="xAI" model="Grok (grok-2-vision-1212)" keyed="Yes" />
                  </tbody>
                </table>
              </div>

              <h4 className="mt-6 text-sm font-semibold text-ink-primary">
                Step A — Get an API key from your chosen provider
              </h4>
              <div className="mt-3 space-y-4">
                <Provider
                  name="OpenAI (GPT models)"
                  steps={[
                    "Go to platform.openai.com and sign in or create an account.",
                    "Open the profile menu (top-right) and choose “API keys.”",
                    "Click “Create new secret key,” name it, and copy the key (it starts with sk- and is shown only once).",
                    "Add a payment method under Settings → Billing — usage is pay-as-you-go.",
                  ]}
                  url="https://platform.openai.com/api-keys"
                />
                <Provider
                  name="Anthropic (Claude models)"
                  steps={[
                    "Go to console.anthropic.com and sign in or create an account.",
                    "Open “API Keys” in the left sidebar.",
                    "Click “Create Key,” name it, and copy the key.",
                    "Add credit under “Plans & Billing” to enable usage.",
                  ]}
                  url="https://console.anthropic.com/settings/keys"
                />
                <Provider
                  name="Google Gemini"
                  steps={[
                    "Go to aistudio.google.com and sign in with a Google account.",
                    "Click “Get API key,” then “Create API key.”",
                    "Copy the generated key. A free tier is available to start.",
                  ]}
                  url="https://aistudio.google.com/app/apikey"
                />
                <Provider
                  name="xAI (Grok models)"
                  steps={[
                    "Go to console.x.ai and sign in or create an account.",
                    "Open the “API Keys” section and create a new key.",
                    "Copy the key and add billing to enable requests.",
                  ]}
                  url="https://console.x.ai"
                />
              </div>

              <h4 className="mt-6 text-sm font-semibold text-ink-primary">
                Step B — Add the key to M.E.G.A.
              </h4>
              <p className="mt-2 text-sm text-ink-secondary">
                M.E.G.A. stores keys in a local <strong>encrypted vault</strong> on
                your machine — they are never uploaded, and they persist between
                sessions so you only enter them once. You can add a key two ways.
              </p>
              <p className="mt-3 text-sm text-ink-secondary">
                From a terminal (you will be prompted to paste the key, hidden as you
                type):
              </p>
              <CodeBlock>{`python -m mega setkey --provider openai
python -m mega setkey --provider anthropic
python -m mega setkey --provider gemini
python -m mega setkey --provider grok`}</CodeBlock>
              <p className="mt-3 text-sm text-ink-secondary">
                Or from inside the M.E.G.A. window, using the built-in commands:
              </p>
              <CodeBlock label="In the M.E.G.A. input bar">{`/setkey openai sk-your-key-here
/provider openai          (switch active provider)
/llm                      (show current provider & model)`}</CodeBlock>
              <p className="mt-3 text-sm text-ink-muted">
                When resolving a key, M.E.G.A. checks the encrypted vault first, then
                falls back to an environment variable for that provider. You can mix
                and match — for example, a local model for chat and a cloud model for
                screen vision.
              </p>

              <Callout tone="warn" title="Keep your keys safe">
                An API key is like a password tied to your billing. Never share it,
                never post it publicly, and never commit it to a public repository. Set
                a spending limit in the provider’s dashboard, and if a key is ever
                exposed, delete it and create a new one.
              </Callout>
            </div>
          </Section>

          {/* First commands */}
          <Section id="first" title="Your first commands">
            <p>
              Start spoken commands with <Inline>mega</Inline> (in text mode you can
              skip it). Here is a taste of what M.E.G.A. can do — all locally.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <CommandGroup
                title="Apps & system"
                items={["mega open chrome", "mega volume up 20", "mega system info", "mega battery"]}
              />
              <CommandGroup
                title="Screen reading"
                items={["mega what's on my screen", "mega read all text on screen", "mega is there a save button"]}
              />
              <CommandGroup
                title="Files"
                items={["mega list my desktop", "mega search for *.pdf in Documents", "mega zip report.pdf as out.zip"]}
              />
              <CommandGroup
                title="Web & code"
                items={["mega search youtube for lo-fi", "mega calculate 512 * 7 + 33", "mega run python: print('hi')"]}
              />
            </div>

            <Callout tone="warn" title="Agent mode safety — read this">
              When you ask M.E.G.A. to carry out a multi-step task on its own, it
              controls your mouse and keyboard. To stop it at any time:
              <ul className="mt-2 space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-state-error">•</span>
                  <span>
                    Move your mouse to the <strong>top-left corner</strong> of the
                    screen for an instant emergency stop.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-state-warning">•</span>
                  <span>
                    Type or say <Inline>stop agent</Inline> to stop gracefully.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-ink-secondary">•</span>
                  <span>Close the M.E.G.A. window to force everything to stop.</span>
                </li>
              </ul>
              M.E.G.A. only enters agent mode when you explicitly ask it to.
            </Callout>
          </Section>

          {/* Updating */}
          <Section id="updating" title="Updating M.E.G.A.">
            <p>
              Your purchase includes beta-channel updates. When a new build is
              available, you will download a fresh ZIP just like the first time.
            </p>
            <Checklist
              items={[
                "Back up any personal files inside your current MEGA folder first (for example, your saved memories and custom tasks, which are stored as .json files in the folder).",
                "Unzip the new build to a new folder, or replace the old files.",
                "Run setup.bat again only if the update notes mention new dependencies.",
                "Launch with run.bat as usual.",
              ]}
            />
          </Section>

          {/* Troubleshooting */}
          <Section id="trouble" title="Troubleshooting">
            <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.08] bg-bg-card/60 text-left">
                    <th className="px-5 py-3 font-medium text-ink-secondary">Problem</th>
                    <th className="px-5 py-3 font-medium text-ink-secondary">Fix</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  <Row p="“Cannot connect to Ollama”" f="Launch with run.bat, or open a terminal and run ollama serve and keep it open." />
                  <Row p="“Model not found”" f="Run ollama pull llama3.2 (and ollama pull moondream for vision)." />
                  <Row p="Microphone / PyAudio errors" f="Run python main.py --text to use text-only mode. The mic is optional." />
                  <Row p="The window is blank or broken" f="Reinstall the GUI package: pip install customtkinter." />
                  <Row p="“python is not recognized”" f="Reinstall Python 3.11 with “Add python.exe to PATH” ticked, then restart." />
                  <Row p="Agent clicks the wrong place" f="The vision model estimates coordinates and isn't pixel-perfect. For games, use windowed or borderless mode rather than exclusive fullscreen." />
                  <Row p="Responses are slow" f="Use a smaller model, or add more RAM. Larger models are smarter but need more memory." />
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-muted">
              Want detailed error output to share with support? Run{" "}
              <Inline>run_debug.bat</Inline> — it checks your setup and prints full
              error messages.
            </p>
          </Section>

          {/* Help */}
          <Section id="help" title="Get help">
            <p>
              Stuck on something, or found a bug? Reach out directly — please include
              what you were trying to do, the exact command, and any error text (the
              output from <Inline>run_debug.bat</Inline> is especially helpful).
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <ContactCard
                label="Email"
                value={PRODUCT.supportEmail}
                href={`mailto:${PRODUCT.supportEmail}`}
              />
              <ContactCard
                label="Phone"
                value={PRODUCT.supportPhoneDisplay}
                href={`tel:${PRODUCT.supportPhoneTel}`}
              />
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <ButtonLink href="/docs" variant="secondary">
                Back to documentation
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost">
                Contact page →
              </ButtonLink>
            </div>
          </Section>
        </article>
      </div>
    </PageShell>
  );
}

/* ─── Local presentational helpers ─────────────────────────────────────────── */

function Section({
  id,
  title,
  step,
  children,
}: {
  id: string;
  title: string;
  step?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-center gap-3">
        {step && (
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg accent-gradient font-mono text-xs font-bold text-bg-base">
            {step}
          </span>
        )}
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      <div className="mt-5 space-y-4 leading-relaxed text-ink-secondary [&_strong]:font-semibold [&_strong]:text-ink-primary">
        {children}
      </div>
    </section>
  );
}

function Inline({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.85em] text-accent-cyan">
      {children}
    </code>
  );
}

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent-cyan underline decoration-accent-cyan/30 underline-offset-2 transition-colors hover:decoration-accent-cyan"
    >
      {children}
    </a>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-ink-secondary">
          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-state-success/15 text-state-success">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Callout({
  tone,
  title,
  children,
}: {
  tone: "info" | "warn";
  title: string;
  children: ReactNode;
}) {
  const styles =
    tone === "warn"
      ? "border-state-warning/25 bg-state-warning/[0.06]"
      : "border-accent/25 bg-accent/[0.06]";
  const dot = tone === "warn" ? "text-state-warning" : "text-accent-cyan";
  return (
    <div className={`rounded-xl border p-5 ${styles}`}>
      <div className={`flex items-center gap-2 text-sm font-semibold text-ink-primary`}>
        <span className={dot}>
          {tone === "warn" ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {title}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-ink-secondary">{children}</div>
    </div>
  );
}

function Provider({
  name,
  steps,
  url,
}: {
  name: string;
  steps: string[];
  url: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-bg-base/50 p-5">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-ink-primary">{name}</h4>
        <ExtLink href={url}>Open console →</ExtLink>
      </div>
      <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-ink-secondary marker:text-ink-muted">
        {steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>
    </div>
  );
}

function ProviderRow({
  name,
  model,
  keyed,
}: {
  name: string;
  model: string;
  keyed: string;
}) {
  const isLocal = keyed.startsWith("No");
  return (
    <tr>
      <td className="px-4 py-2.5 align-top font-medium text-ink-primary">{name}</td>
      <td className="px-4 py-2.5 align-top text-ink-secondary">{model}</td>
      <td className="px-4 py-2.5 align-top">
        <span
          className={
            isLocal ? "text-state-success" : "text-ink-secondary"
          }
        >
          {keyed}
        </span>
      </td>
    </tr>
  );
}

function CommandGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-bg-card/40 p-5">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {title}
      </h4>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="font-mono text-xs text-ink-secondary">
            <span className="text-accent-cyan">›</span> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Row({ p, f }: { p: string; f: string }) {
  return (
    <tr>
      <td className="px-5 py-3.5 align-top text-ink-primary">{p}</td>
      <td className="px-5 py-3.5 align-top text-ink-secondary">{f}</td>
    </tr>
  );
}

function ContactCard({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-bg-card/40 p-5 transition-all hover:border-accent/30"
    >
      <div>
        <div className="text-xs uppercase tracking-wider text-ink-muted">{label}</div>
        <div className="mt-1 font-medium text-ink-primary">{value}</div>
      </div>
      <span className="text-ink-muted transition-colors group-hover:text-accent-cyan">
        →
      </span>
    </a>
  );
}
