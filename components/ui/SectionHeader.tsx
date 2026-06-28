import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: Props) {
  const alignment = align === "center" ? "mx-auto text-center items-center" : "text-left items-start";
  return (
    <Reveal className={`flex max-w-2xl flex-col ${alignment} ${className ?? ""}`}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-[1.1]">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-ink-secondary">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
