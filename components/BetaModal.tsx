"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";

const BETA_TERMS = [
  "This is beta software and may be incomplete or unstable.",
  "Features may not work as expected on every system.",
  "Automation may require your supervision while running.",
  "Behavior can vary depending on your hardware and installed models.",
  "Vision and AI accuracy is not guaranteed.",
  "You assume responsibility for what M.E.G.A. runs locally on your machine.",
  "There are no guarantees of uptime or reliability.",
];

type Props = {
  open: boolean;
  loading: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
};

/**
 * Beta Software Agreement modal (PRD §22). The user MUST explicitly accept
 * before any redirect to Square checkout.
 */
export function BetaModal({ open, loading, error, onCancel, onConfirm }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.getElementById("beta-confirm")?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, loading, onCancel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="beta-modal-title"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => !loading && onCancel()}
          />
          <motion.div
            className="glass relative z-10 w-full max-w-lg rounded-2xl p-7 shadow-lift"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="eyebrow mb-3">Required before purchase</div>
            <h2
              id="beta-modal-title"
              className="text-2xl font-semibold tracking-tight"
            >
              Beta Software Agreement
            </h2>
            <p className="mt-2 text-sm text-ink-secondary">
              M.E.G.A. is in active beta. Please read and accept before
              continuing to payment.
            </p>

            <ul className="mt-5 space-y-2.5">
              {BETA_TERMS.map((term) => (
                <li key={term} className="flex gap-3 text-sm text-ink-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-state-warning" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>

            {error && (
              <p className="mt-4 rounded-lg border border-state-error/30 bg-state-error/10 px-3 py-2 text-sm text-state-error">
                {error}
              </p>
            )}

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button variant="secondary" onClick={onCancel} disabled={loading}>
                Cancel
              </Button>
              <Button
                id="beta-confirm"
                variant="primary"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? "Starting checkout…" : "I Understand — Continue to Purchase"}
              </Button>
            </div>

            <p className="mt-4 text-center text-xs text-ink-muted">
              Secure payment is processed by Square. You will be redirected to
              complete your purchase.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
