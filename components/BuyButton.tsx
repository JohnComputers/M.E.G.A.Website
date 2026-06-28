"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import { BetaModal } from "./BetaModal";
import { PRODUCT } from "@/lib/constants";

type Props = {
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  className?: string;
  label?: string;
};

/**
 * Drives the full purchase entry point:
 *   click → Beta Software Agreement modal → POST /api/checkout → redirect.
 * Used in the nav, hero, and pricing section.
 */
export function BuyButton({
  variant = "primary",
  size = "md",
  className,
  label = `Buy ${PRODUCT.name} — $${PRODUCT.priceUsd}`,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not start checkout. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => {
          setError(null);
          setOpen(true);
        }}
      >
        {label}
      </Button>
      <BetaModal
        open={open}
        loading={loading}
        error={error}
        onCancel={() => {
          if (!loading) setOpen(false);
        }}
        onConfirm={startCheckout}
      />
    </>
  );
}
