"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ButtonLink } from "./ui/Button";
import { BuyButton } from "./BuyButton";
import { NAV_SECTIONS, PRODUCT } from "@/lib/constants";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label={`${PRODUCT.name} home`}>
      <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-lg bg-black ring-1 ring-white/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/mega-monogram.png"
          alt={`${PRODUCT.name} logo`}
          width={36}
          height={36}
          className="h-full w-full scale-110 object-cover"
        />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold tracking-tight">{PRODUCT.name}</span>
        <span className="hidden text-[11px] text-ink-muted sm:block">
          {PRODUCT.fullName}
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = NAV_SECTIONS.filter((s) => s.href.startsWith("#")).map((s) =>
      s.href.slice(1),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-premium ${
        scrolled ? "glass border-b border-white/[0.06]" : "border-b border-transparent"
      }`}
    >
      <nav
        className={`shell flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-14" : "h-[72px]"
        }`}
        aria-label="Primary"
      >
        <Logo />

        {/* Center links (desktop) */}
        <div className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive ? "text-ink-primary" : "text-ink-secondary hover:text-ink-primary"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-accent-cyan" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right actions (desktop) */}
        <div className="hidden items-center gap-3 lg:flex">
          <ButtonLink href="/docs" variant="secondary" size="md">
            Documentation
          </ButtonLink>
          <BuyButton size="md" label={`Buy Now — $${PRODUCT.priceUsd}`} />
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-px w-5 bg-ink-primary transition-transform ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-ink-primary transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 bg-ink-primary transition-transform ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="glass border-t border-white/[0.06] lg:hidden">
          <div className="shell flex flex-col gap-1 py-4">
            {NAV_SECTIONS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2 py-2.5 text-sm text-ink-secondary hover:bg-white/[0.04] hover:text-ink-primary"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <ButtonLink href="/docs" variant="secondary" size="md" className="w-full">
                Documentation
              </ButtonLink>
              <BuyButton size="md" className="w-full" label={`Buy Now — $${PRODUCT.priceUsd}`} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
