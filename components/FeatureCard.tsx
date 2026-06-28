import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  examples?: string[];
};

export function FeatureCard({ icon, title, description, examples }: Props) {
  return (
    <div className="group h-full rounded-2xl border border-white/[0.06] bg-bg-card/50 p-6 backdrop-blur-glass transition-all duration-300 ease-premium hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-glow">
      <div className="grid h-11 w-11 place-items-center rounded-xl border border-white/[0.08] bg-bg-base/60 text-accent-cyan transition-colors group-hover:border-accent/40">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-secondary">{description}</p>
      {examples && examples.length > 0 && (
        <ul className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-4">
          {examples.map((ex) => (
            <li
              key={ex}
              className="flex items-start gap-2 font-mono text-xs text-ink-muted"
            >
              <span className="text-accent-cyan">›</span>
              <span>{ex}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
