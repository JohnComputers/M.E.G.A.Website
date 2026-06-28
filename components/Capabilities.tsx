import { Reveal } from "./ui/Reveal";
import { SectionHeader } from "./ui/SectionHeader";
import { FeatureCard } from "./FeatureCard";
import {
  IconAutomation,
  IconVision,
  IconFiles,
  IconWeb,
  IconCode,
  IconLocalAI,
} from "./icons";

const CAPABILITIES = [
  {
    icon: <IconAutomation />,
    title: "Desktop Automation",
    description:
      "Control Windows applications using natural language commands. M.E.G.A. drives the mouse and keyboard to carry out what you ask.",
    examples: ['“Open Chrome and search YouTube”', '“Type my notes into Word”'],
  },
  {
    icon: <IconVision />,
    title: "Screen Understanding",
    description:
      "M.E.G.A. interprets what is visible on your screen to help locate interface elements and assist with navigation.",
    examples: ['“Find the Save button”', '“What’s on screen right now?”'],
  },
  {
    icon: <IconFiles />,
    title: "File Management",
    description:
      "Create, move, rename, delete, and organize files and folders. Compress archives and search your directories — only when you ask.",
    examples: ['“Organize my Downloads”', '“Zip this folder”'],
  },
  {
    icon: <IconWeb />,
    title: "Web Interaction",
    description:
      "Open websites, perform searches, and navigate pages where supported. Page layouts vary, so results can differ between sites.",
    examples: ['“Open my email”', '“Search for flights to Tokyo”'],
  },
  {
    icon: <IconCode />,
    title: "Code Execution",
    description:
      "Run Python scripts, system commands, and automation routines locally — a tool for hands-on automation on your own machine.",
    examples: ['“Run this Python script”', '“Calculate this expression”'],
  },
  {
    icon: <IconLocalAI />,
    title: "Local AI, or Your Choice",
    description:
      "Runs on your computer through Ollama by default — private, offline-capable, with no conversations sent away unless you opt in. Prefer a cloud model? Connect Claude, GPT-4o, Gemini, or Grok with your own key.",
    examples: ["Local by default — or bring your own key", "Switch models anytime"],
  },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 grid-backdrop opacity-30" />
      <div className="shell">
        <SectionHeader
          eyebrow="Core Capabilities"
          title={
            <>
              One assistant. <span className="text-gradient">Real control.</span>
            </>
          }
          intro="M.E.G.A. ships with a focused set of capabilities for operating your PC. Each one runs locally and only acts when you ask it to."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap, i) => (
            <Reveal key={cap.title} delay={(i % 3) * 0.08}>
              <FeatureCard {...cap} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
