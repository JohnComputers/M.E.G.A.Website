"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";

type RevealProps = {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span";
  y?: number;
};

/**
 * Scroll reveal: opacity 0→1 with a small upward translate, triggered once when
 * ~60% into the viewport (PRD §30.6.2). When reduced motion is on, content
 * simply appears with no transform.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 20,
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  if (reduced) {
    const Tag = as as any;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </MotionTag>
  );
}
