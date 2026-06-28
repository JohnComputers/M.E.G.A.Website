import type { Config } from "tailwindcss";

/**
 * Design tokens are taken directly from the M.E.G.A. PRD (sections 6 & 30).
 * Nothing here is decorative — every value maps to a documented brand decision.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#05070B",
          elevated: "#0E131A",
          card: "#151C26",
        },
        accent: {
          DEFAULT: "#4F8CFF",
          cyan: "#4DD9FF",
        },
        state: {
          success: "#00D084",
          warning: "#FFC857",
          error: "#FF5D73",
        },
        ink: {
          primary: "#F5F7FA",
          secondary: "#AEB6C2",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        shell: "1280px",
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      borderColor: {
        hairline: "rgba(255,255,255,0.08)",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(79,140,255,0.45)",
        "glow-cyan": "0 0 48px -10px rgba(77,217,255,0.45)",
        card: "0 24px 60px -24px rgba(0,0,0,0.75)",
        lift: "0 32px 80px -28px rgba(0,0,0,0.85)",
      },
      backdropBlur: {
        glass: "16px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) rotate(0deg) scale(1)" },
          "33%": { transform: "translate3d(4%, -3%, 0) rotate(8deg) scale(1.1)" },
          "66%": { transform: "translate3d(-3%, 4%, 0) rotate(-6deg) scale(1.05)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "scan-sweep": {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%, 80%": { opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "caret-blink": {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "aurora-drift": "aurora-drift 42s ease-in-out infinite",
        "fade-up": "fade-up 600ms cubic-bezier(0.4,0,0.2,1) both",
        "pulse-soft": "pulse-soft 3.2s ease-in-out infinite",
        "scan-sweep": "scan-sweep 3.6s cubic-bezier(0.4,0,0.2,1) infinite",
        shimmer: "shimmer 2s infinite",
        "caret-blink": "caret-blink 1.1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
