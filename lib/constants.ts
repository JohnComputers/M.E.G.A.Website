/**
 * Single source of truth for product facts shown across the site.
 * Edit values here; do not hard-code them in components.
 *
 * IMPORTANT (per PRD §29 & §34): copy describes ONLY capabilities that exist in
 * the shipping product. Do not add features here that M.E.G.A. does not have.
 */

export const PRODUCT = {
  name: "M.E.G.A.",
  fullName: "Machine Enhanced General Assistant",
  tagline: "Your AI That Actually Uses Your Computer.",
  version: "8.0",
  channel: "Beta",
  // One-time price. PRD §18 fixes this at $50 USD with no tiers or subscriptions.
  priceUsd: 50,
  priceCents: 5000,
  currency: "USD",
  // Display value for the download page. Update to match your real ZIP.
  downloadDisplaySize: "≈ 45 MB",
  // Filename presented to the user when the ZIP downloads.
  downloadFileName: "MEGA-v8.0-Windows.zip",
  // Real contact details for support and issue reports.
  supportEmail: "johncomputers2024@gmail.com",
  supportPhoneDisplay: "(786) 452-6881",
  supportPhoneTel: "+17864526881",
  copyrightYear: 2026,
} as const;

export const COMPAT = {
  os: "Windows 10 & Windows 11 (64-bit)",
  ramRecommended: "16 GB RAM recommended",
  runtime: "Local Ollama installation required",
  gpu: "GPU optional (recommended for vision models)",
  internet:
    "Internet required only for model downloads and optional web features",
} as const;

export type NavItem = { label: string; href: string };

export const NAV_SECTIONS: NavItem[] = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Documentation", href: "/docs" },
];
