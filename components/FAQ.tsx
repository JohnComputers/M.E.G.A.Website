"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeader } from "./ui/SectionHeader";
import { Reveal } from "./ui/Reveal";
import { useReducedMotion } from "./ui/useReducedMotion";

const FAQS = [
  {
    q: "Is M.E.G.A. cloud-based?",
    a: "By default, no — it runs locally on your computer using Ollama, so your conversations and files stay on your machine. If you prefer, you can optionally connect a cloud provider (Claude, GPT-4o, Gemini, or Grok) with your own API key, but it's never required.",
  },
  {
    q: "Does it always work perfectly?",
    a: "No. Performance depends on your hardware, the models you choose, and your system configuration. As a beta product, you may encounter bugs or features that need supervision.",
  },
  {
    q: "Do I need internet?",
    a: "Only for setup, downloading AI models, and optional web or cloud-provider features. Day-to-day local tasks work offline once everything is installed.",
  },
  {
    q: "Is this a subscription?",
    a: "No. It's a one-time $50 purchase. There are no recurring charges, tiers, or hidden fees. (If you choose to use a cloud AI provider, you pay that provider directly for usage — that's separate and optional.)",
  },
  {
    q: "Can it damage my system?",
    a: "M.E.G.A. has system-level control capabilities — it can move your mouse, type, and run commands. Misuse or automation errors can affect your system, so use it responsibly and supervise automated tasks.",
  },
  {
    q: "Do I need an API key or paid AI account?",
    a: "Not to get started. M.E.G.A. uses local Ollama models by default — no key, no paid account — and its web search is keyless. API keys are only needed if you choose to switch to a cloud provider (Claude, GPT-4o, Gemini, or Grok), which is entirely optional.",
  },
];

export function FAQ() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="text-gradient">answered.</span>
            </>
          }
          intro="Straight answers about how M.E.G.A. works, what it needs, and what to expect from a beta product."
        />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <ul className="divide-y divide-white/[0.06] overflow-hidden rounded-2xl border border-white/[0.06] bg-bg-card/40">
            {FAQS.map((faq, i) => {
              const isOpen = open === i;
              return (
                <li key={faq.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-medium text-ink-primary">{faq.q}</span>
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-ink-secondary transition-transform duration-300 ${
                        isOpen ? "rotate-45 border-accent/40 text-accent-cyan" : ""
                      }`}
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm leading-relaxed text-ink-secondary">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
