"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./ui/useReducedMotion";

/**
 * Stylized, animated recreation of the M.E.G.A. desktop operator window.
 * This is a representation (not a screenshot) of the real product's behavior:
 * a local model receives a command, routes intent, reads the screen, and acts.
 *
 * Replace with a real screen recording or screenshots when available (PRD §13).
 * Content here describes only real capabilities — no invented features.
 */

type Line =
  | { kind: "user"; text: string }
  | { kind: "status"; text: string }
  | { kind: "action"; text: string }
  | { kind: "done"; text: string };

const SCRIPT: Line[] = [
  { kind: "user", text: "Mega, open Spotify and start my Focus playlist." },
  { kind: "status", text: "Normalizing → routing intent → planning" },
  { kind: "action", text: "launch  Spotify.exe" },
  { kind: "action", text: "vision  locate “Focus” playlist" },
  { kind: "action", text: "input   click ▶ play" },
  { kind: "done", text: "Completed locally · no data left this machine" },
];

const STEP_MS = 1100;

export function MegaWindowMock() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(reduced ? SCRIPT.length : 0);

  useEffect(() => {
    if (reduced) {
      setVisible(SCRIPT.length);
      return;
    }
    let step = 0;
    const HOLD = 2; // extra ticks holding the completed state before looping
    setVisible(0);
    const id = setInterval(() => {
      step = (step + 1) % (SCRIPT.length + HOLD + 1);
      setVisible(Math.min(step, SCRIPT.length));
    }, STEP_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const scanning = !reduced && visible >= 3 && visible <= 4;

  return (
    <div className="vision-frame glass rounded-2xl p-1 shadow-lift">
      <div className="overflow-hidden rounded-xl bg-bg-base/80">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-state-error/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-state-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-state-success/70" />
          </div>
          <span className="font-mono text-[11px] text-ink-muted">
            M.E.G.A. — Local Operator
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-accent-cyan">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-state-success" />
            ollama · qwen2.5
          </span>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-[1.4fr_1fr]">
          {/* Transcript */}
          <div className="min-h-[208px] space-y-2 font-mono text-[12.5px] leading-relaxed">
            {SCRIPT.slice(0, visible).map((line, idx) => (
              <LineRow key={idx} line={line} />
            ))}
            {!reduced && visible < SCRIPT.length && (
              <span className="inline-block h-3.5 w-1.5 animate-caret-blink bg-accent-cyan align-middle" />
            )}
          </div>

          {/* Screen preview with vision scan */}
          <div className="relative hidden overflow-hidden rounded-lg border border-white/[0.06] bg-bg-elevated sm:block">
            <div className="absolute inset-0 grid-backdrop opacity-40" />
            {/* Faux desktop elements */}
            <div className="absolute left-3 top-3 h-2 w-16 rounded bg-white/10" />
            <div className="absolute left-3 top-7 h-2 w-10 rounded bg-white/[0.07]" />
            <div className="absolute bottom-3 left-3 right-3 h-8 rounded bg-white/[0.04]" />
            <div className="absolute bottom-4 left-4 h-2 w-2 rounded-full bg-accent" />
            {/* Detected element highlight */}
            {visible >= 4 && (
              <div className="absolute bottom-3.5 left-3.5 h-7 w-7 rounded border border-accent-cyan shadow-glow-cyan" />
            )}
            {/* Scan sweep */}
            {scanning && (
              <div className="absolute inset-x-0 top-0 h-10 animate-scan-sweep bg-gradient-to-b from-accent-cyan/40 to-transparent" />
            )}
            <span className="absolute right-2 top-2 font-mono text-[9px] text-ink-muted">
              vision
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LineRow({ line }: { line: Line }) {
  if (line.kind === "user") {
    return (
      <div className="flex gap-2 text-ink-primary">
        <span className="text-accent">›</span>
        <span>{line.text}</span>
      </div>
    );
  }
  if (line.kind === "status") {
    return <div className="text-ink-muted">{line.text}</div>;
  }
  if (line.kind === "done") {
    return (
      <div className="flex gap-2 text-state-success">
        <span>✓</span>
        <span>{line.text}</span>
      </div>
    );
  }
  // action
  return (
    <div className="flex gap-2 text-ink-secondary">
      <span className="text-accent-cyan">→</span>
      <span>{line.text}</span>
    </div>
  );
}
