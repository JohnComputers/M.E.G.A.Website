import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PRODUCT } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL || "http://localhost:3000"),
  title: {
    default: `${PRODUCT.name} — Your AI That Actually Uses Your Computer`,
    template: `%s — ${PRODUCT.name}`,
  },
  description:
    "M.E.G.A. is a local-first AI assistant for Windows that can see your screen, control your computer, and automate workflows using local AI models. Local-first by design, no subscription. One-time $50 purchase.",
  keywords: [
    "local AI assistant",
    "Windows AI",
    "Ollama",
    "desktop automation",
    "screen understanding",
    "local LLM",
    "M.E.G.A.",
  ],
  openGraph: {
    title: `${PRODUCT.name} — Your AI That Actually Uses Your Computer`,
    description:
      "A local-first AI operator for Windows. Sees your screen, controls your PC, runs entirely on your machine with Ollama.",
    type: "website",
    siteName: PRODUCT.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${PRODUCT.name}`,
    description:
      "A local-first AI operator for Windows. Runs on your machine with Ollama.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05070B",
  width: "device-width",
  initialScale: 1,
};

/**
 * Fonts are loaded from Google Fonts via <link> (Inter + JetBrains Mono) and
 * exposed as CSS variables consumed by tailwind.config.ts. This keeps the build
 * network-free and matches the PRD type system (Inter / JetBrains Mono).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
            --font-mono: 'JetBrains Mono', ui-monospace, monospace;
          }
        `}</style>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
