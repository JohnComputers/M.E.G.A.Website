"use client";

import { useEffect, useRef } from "react";
import { SectionHeader } from "./ui/SectionHeader";
import { useReducedMotion } from "./ui/useReducedMotion";

/**
 * AI Architecture (PRD §15 / §35) — the request pipeline.
 * GSAP ScrollTrigger drives a vertical progress line that fills as you scroll,
 * and reveals each stage in turn. The motion maps directly to meaning: the line
 * is the flow of a request through the system (PRD §32). Fully static under
 * reduced motion.
 */

const STAGES = [
  {
    n: "01",
    title: "User Input",
    body: "Your command arrives by voice (wake word “mega”) or text.",
  },
  {
    n: "02",
    title: "Normalization",
    body: "The request is cleaned and standardized so it can be parsed reliably.",
  },
  {
    n: "03",
    title: "Intent Routing",
    body: "Fast pattern matching handles common commands; anything else is passed to the model.",
  },
  {
    n: "04",
    title: "AI Processing (Ollama)",
    body: "A local model reasons about the request. Deeper reasoning engages only when a task needs it.",
  },
  {
    n: "05",
    title: "Tool Selection",
    body: "M.E.G.A. chooses the right capability — automation, vision, files, web, or code.",
  },
  {
    n: "06",
    title: "Execution",
    body: "The selected action runs directly on your machine.",
  },
  {
    n: "07",
    title: "Response",
    body: "You receive the result and a clear confirmation of what happened.",
  },
];

export function Architecture() {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const root = rootRef.current;
    if (!root) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    // Load GSAP + ScrollTrigger on the client only.
    (async () => {
      const gsapMod = await import("gsap");
      const stMod = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      const gsap = gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Progress line fills with scroll.
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 70%",
                end: "bottom 70%",
                scrub: 0.6,
              },
            },
          );
        }

        // Each stage fades + rises as it enters.
        const nodes = gsap.utils.toArray<HTMLElement>(".arch-node");
        nodes.forEach((node) => {
          gsap.fromTo(
            node,
            { opacity: 0.15, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: { trigger: node, start: "top 82%" },
            },
          );
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="AI Architecture"
          title={
            <>
              How M.E.G.A. <span className="text-gradient">works.</span>
            </>
          }
          intro="Every request flows through the same local pipeline — from your words to a finished action on your PC. Here is the path it takes."
        />

        <div ref={rootRef} className="relative mx-auto mt-16 max-w-3xl">
          {/* Track */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/[0.08] sm:left-1/2 sm:-translate-x-1/2" />
          {/* Animated fill */}
          <div
            ref={lineRef}
            className="absolute left-[19px] top-2 bottom-2 w-px origin-top accent-gradient sm:left-1/2 sm:-translate-x-1/2"
            style={{ transform: reduced ? "scaleY(1)" : undefined }}
          />

          <ul className="space-y-6">
            {STAGES.map((stage, i) => (
              <li
                key={stage.n}
                className={`arch-node relative flex gap-5 sm:gap-0 ${
                  i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                } sm:items-center`}
              >
                {/* Node marker */}
                <span className="absolute left-0 top-1.5 z-10 grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-bg-base font-mono text-xs text-accent-cyan shadow-glow sm:left-1/2 sm:-translate-x-1/2">
                  {stage.n}
                </span>

                {/* Card */}
                <div
                  className={`ml-14 w-full sm:ml-0 sm:w-[calc(50%-2.5rem)] ${
                    i % 2 === 0 ? "sm:mr-auto sm:pr-10 sm:text-right" : "sm:ml-auto sm:pl-10"
                  }`}
                >
                  <div className="rounded-xl border border-white/[0.06] bg-bg-card/50 p-5 backdrop-blur-glass">
                    <h3 className="text-base font-semibold tracking-tight">{stage.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-secondary">
                      {stage.body}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
