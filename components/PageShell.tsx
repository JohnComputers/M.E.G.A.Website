import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-[72px]">{children}</main>
      <Footer />
    </>
  );
}

/** Standard page header used across docs/legal/contact pages. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/[0.06] py-16 sm:py-20">
      <div className="absolute inset-0 -z-10 grid-backdrop opacity-30" />
      <div className="shell">
        {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-secondary">
            {intro}
          </p>
        )}
      </div>
    </header>
  );
}
