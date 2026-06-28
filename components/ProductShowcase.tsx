"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { useReducedMotion } from "./ui/useReducedMotion";

/**
 * Interactive product showcase (PRD §13) — the centerpiece.
 * Three scripted flows that mirror how M.E.G.A. actually operates. Each step
 * is labeled with the meaning of the motion (vision scan, cursor move, plan
 * progression), never random decoration (PRD §32).
 */

type Step = { label: string; detail: string; tone?: "scan" | "cursor" | "done" };

type Flow = {
  id: string;
  tab: string;
  command: string;
  steps: Step[];
};

const FLOWS: Flow[] = [
  {
    id: "voice",
    tab: "Voice Command",
    command: "“Mega, open Spotify.”",
    steps: [
      { label: "Speech captured", detail: "Wake word “mega” recognized" },
      { label: "Intent routed", detail: "Matched: launch application" },
      { label: "Action", detail: "Open Spotify", tone: "cursor" },
      { label: "Completed", detail: "Spotify is now open", tone: "done" },
    ],
  },
  {
    id: "vision",
    tab: "Screen Understanding",
    command: "“Mega, save this document.”",
    steps: [
      { label: "Screen captured", detail: "Current window read locally" },
      { label: "Vision scan", detail: "Interpreting visible UI", tone: "scan" },
      { label: "Element located", detail: "Detected: Save button", tone: "scan" },
      { label: "Cursor moved", detail: "Click target", tone: "cursor" },
      { label: "Completed", detail: "Document saved", tone: "done" },
    ],
  },
  {
    id: "planning",
    tab: "Planning",
    command: "“Mega, organize my Downloads folder.”",
    steps: [
      { label: "Request received", detail: "Multi-step task detected" },
      { label: "Plan generated", detail: "3 steps prepared" },
      { label: "Step 1", detail: "Scan files in Downloads" },
      { label: "Step 2", detail: "Group by file type" },
      { label: "Step 3", detail: "Move into folders", tone: "cursor" },
      { label: "Completed", detail: "Folder organized", tone: "done" },
    ],
  },
];

const STEP_MS = 1200;

export function ProductShowcase() {
  const reduced = useReducedMotion();
  const [activeFlow, setActiveFlow] = useState(0);
  const [step, setStep] = useState(reduced ? 99 : 0);
  const flow = FLOWS[activeFlow];

  useEffect(() => {
    if (reduced) {
      setStep(flow.steps.length);
      return;
    }
    setStep(0);
    let s = 0;
    const id = setInterval(() => {
      s += 1;
      if (s > flow.steps.length + 1) s = 0;
      setStep(s);
    }, STEP_MS);
    return () => clearInterval(id);
  }, [activeFlow, reduced, flow.steps.length]);

  const shown = Math.min(step, flow.steps.length);
  const progress = reduced ? 1 : shown / flow.steps.length;

  return (
    <section id="showcase" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="Product Showcase"
          title={
            <>
              See M.E.G.A. <span className="text-gradient">operate.</span>
            </>
          }
          intro="Each step below reflects the real request pipeline: perceive, decide, act. Switch between flows to watch how M.E.G.A. handles voice, vision, and multi-step tasks."
        />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          {/* Tabs */}
          <div
            className="flex flex-wrap justify-center gap-2"
            role="tablist"
            aria-label="Product flows"
          >
            {FLOWS.map((f, i) => (
              <button
                key={f.id}
                role="tab"
                aria-selected={i === activeFlow}
                onClick={() => setActiveFlow(i)}
                className={`rounded-full px-4 py-2 text-sm transition-all ${
                  i === activeFlow
                    ? "accent-gradient text-bg-base shadow-glow"
                    : "border border-white/10 text-ink-secondary hover:text-ink-primary"
                }`}
              >
                {f.tab}
              </button>
            ))}
          </div>

          {/* Stage */}
          <div className="vision-frame glass mt-7 rounded-2xl p-6 shadow-card sm:p-8">
            {/* Command bar */}
            <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-bg-base/60 px-4 py-3">
              <Waveform animate={!reduced} />
              <span className="font-mono text-sm text-ink-primary">{flow.command}</span>
            </div>

            {/* Progress rail */}
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full accent-gradient"
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>

            {/* Steps */}
            <ol className="mt-6 space-y-2.5">
              <AnimatePresence initial={false}>
                {flow.steps.slice(0, shown).map((s, idx) => (
                  <motion.li
                    key={`${flow.id}-${idx}`}
                    initial={reduced ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="flex items-center gap-4 rounded-lg border border-white/[0.05] bg-bg-elevated/40 px-4 py-3"
                  >
                    <StepBadge tone={s.tone} index={idx} />
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-ink-primary">{s.label}</div>
                      <div className="font-mono text-xs text-ink-muted">{s.detail}</div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ol>
          </div>

          <p className="mt-5 text-center text-xs text-ink-muted">
            Illustrative recreation of real flows. Performance and exact behavior
            depend on your hardware, installed models, and the applications involved.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function StepBadge({ tone, index }: { tone?: Step["tone"]; index: number }) {
  if (tone === "done") {
    return (
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-state-success/15 text-state-success">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
          <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    );
  }
  const color =
    tone === "scan"
      ? "border-accent-cyan/40 text-accent-cyan"
      : tone === "cursor"
        ? "border-accent/40 text-accent"
        : "border-white/15 text-ink-secondary";
  return (
    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border ${color} font-mono text-xs`}>
      {index + 1}
    </span>
  );
}

function Waveform({ animate }: { animate: boolean }) {
  const bars = [0.4, 0.8, 0.5, 1, 0.6, 0.9, 0.45];
  return (
    <div className="flex h-5 items-center gap-0.5" aria-hidden>
      {bars.map((h, i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-accent-cyan"
          style={{ height: `${h * 100}%` }}
          animate={animate ? { scaleY: [1, 0.4, 1] } : {}}
          transition={
            animate
              ? { duration: 0.9, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }
              : {}
          }
        />
      ))}
    </div>
  );
}
