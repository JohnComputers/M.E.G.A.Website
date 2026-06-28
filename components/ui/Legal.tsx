import type { ReactNode } from "react";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-ink-primary">
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed text-ink-secondary [&_a]:text-accent-cyan [&_strong]:text-ink-primary">
        {children}
      </div>
    </section>
  );
}

export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="ml-1 list-disc space-y-2 pl-5 marker:text-ink-muted">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function LastUpdated({ date }: { date: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
      Last updated · {date}
    </p>
  );
}
