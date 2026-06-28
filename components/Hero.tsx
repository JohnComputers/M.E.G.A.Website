"use client";

import { motion } from "framer-motion";
import { ParallaxBackground } from "./ParallaxBackground";
import { MegaWindowMock } from "./MegaWindowMock";
import { BuyButton } from "./BuyButton";
import { ButtonLink } from "./ui/Button";
import { useReducedMotion } from "./ui/useReducedMotion";
import { PRODUCT } from "@/lib/constants";

const COMPAT_POINTS = [
  "Windows 10 & 11 only",
  "Requires Ollama",
  "Runs locally",
  "No subscription",
];

export function Hero() {
  const reduced = useReducedMotion();

  // Page-load sequence: staggered fade + rise (PRD §30.6.1). Disabled if reduced.
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.12, delayChildren: reduced ? 0 : 0.1 },
    },
  };
  const item = reduced
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
      };

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-40">
      <ParallaxBackground />

      <div className="shell relative">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mega-monogram.png"
              alt={`${PRODUCT.name} — ${PRODUCT.fullName}`}
              width={88}
              height={88}
              className="h-20 w-20 rounded-2xl object-cover shadow-glow ring-1 ring-white/10 sm:h-24 sm:w-24"
            />
          </motion.div>

          <motion.div variants={item} className="mt-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-ink-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-state-warning" />
              Currently in beta · v{PRODUCT.version}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tightest sm:text-6xl"
          >
            Your AI That <span className="text-gradient">Actually Uses</span> Your Computer.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-ink-secondary sm:text-lg"
          >
            {PRODUCT.name} is a local-first AI assistant for Windows that can see your
            screen, control your computer, automate workflows, and execute complex tasks
            using fully local AI models.
            <span className="mt-2 block text-ink-muted">
              Local-first by design. No subscriptions. Your data stays on your machine
              by default.
            </span>
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <BuyButton size="lg" />
            <ButtonLink href="#showcase" variant="secondary" size="lg">
              Watch Demo
            </ButtonLink>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-xs text-ink-muted"
          >
            {COMPAT_POINTS.map((point, i) => (
              <li key={point} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/15">•</span>}
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Operator window */}
        <motion.div
          className="mx-auto mt-14 max-w-3xl"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: reduced ? 0 : 0.6 }}
        >
          <MegaWindowMock />
        </motion.div>
      </div>
    </section>
  );
}
