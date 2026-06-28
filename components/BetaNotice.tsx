import { Reveal } from "./ui/Reveal";

/**
 * Beta warning banner (PRD §22). Appears near the Buy button on the home page
 * and on the pricing page. Mandatory and intentionally honest.
 */
export function BetaNotice() {
  return (
    <Reveal className="mx-auto max-w-3xl">
      <div className="flex items-start gap-4 rounded-2xl border border-state-warning/25 bg-state-warning/[0.06] p-5 sm:p-6">
        <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-state-warning/15 text-state-warning">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <h3 className="text-sm font-semibold text-ink-primary">
            M.E.G.A. is currently in beta testing.
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-ink-secondary">
            Some features may be incomplete, unstable, or behave inconsistently
            depending on your system configuration and installed models. Automation
            can move your mouse, type, and run commands — use it with supervision.
          </p>
        </div>
      </div>
    </Reveal>
  );
}
