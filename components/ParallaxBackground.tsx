"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./ui/useReducedMotion";

/**
 * Ambient hero backdrop (PRD §8 / §30.6.3 / §30.7).
 * Layers: aurora gradients (CSS), cursor-reactive particle field (canvas),
 * floating translucent shapes, and a radial light that trails the cursor.
 * Everything below is purely decorative and fully disabled under reduced motion.
 */
export function ParallaxBackground() {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  // Particle field + cursor light.
  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: number };
    let particles: P[] = [];

    function seed() {
      const count = Math.min(64, Math.floor((width * height) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.6 + 0.4,
        a: Math.random() * 0.4 + 0.15,
      }));
    }

    function resize() {
      const parent = canvas!.parentElement;
      width = parent?.clientWidth ?? window.innerWidth;
      height = parent?.clientHeight ?? window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);

      // Ease the trailing light toward the pointer.
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      if (lightRef.current) {
        lightRef.current.style.transform = `translate(${pointer.x}px, ${pointer.y}px)`;
      }

      for (const p of particles) {
        // Gentle repulsion from cursor.
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0.01) {
          const force = (110 - dist) / 110;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;

        // Drift baseline so motion never fully stops.
        p.vx += (Math.random() - 0.5) * 0.02;
        p.vy += (Math.random() - 0.5) * 0.02;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(170, 205, 255, ${p.a})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.tx = e.clientX - rect.left;
      pointer.ty = e.clientY - rect.top;

      // Shape parallax: clamp to ±8px X / ±5px Y (PRD §30.6.3).
      if (shapesRef.current) {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        shapesRef.current.style.transform = `translate(${nx * 8}px, ${ny * 5}px)`;
      }
    }

    resize();
    tick();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Aurora gradient blobs */}
      <div className="absolute inset-0">
        <div
          className={`absolute -top-1/3 left-1/4 h-[60vh] w-[60vh] rounded-full bg-[#1f4bff]/25 blur-[120px] ${
            reduced ? "" : "animate-aurora-drift"
          }`}
        />
        <div
          className={`absolute top-1/4 -right-1/4 h-[55vh] w-[55vh] rounded-full bg-[#4dd9ff]/20 blur-[130px] ${
            reduced ? "" : "animate-aurora-drift"
          }`}
          style={{ animationDelay: "-14s" }}
        />
        <div
          className={`absolute -bottom-1/3 left-1/3 h-[50vh] w-[50vh] rounded-full bg-[#6c3bff]/15 blur-[140px] ${
            reduced ? "" : "animate-aurora-drift"
          }`}
          style={{ animationDelay: "-28s" }}
        />
      </div>

      {/* Floating translucent shapes */}
      <div ref={shapesRef} className="absolute inset-0 transition-transform duration-300 ease-out">
        <div className="absolute left-[12%] top-[22%] h-24 w-24 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm rotate-12" />
        <div className="absolute right-[16%] top-[30%] h-16 w-16 rounded-full border border-accent-cyan/20 bg-accent-cyan/[0.03]" />
        <div className="absolute left-[20%] bottom-[20%] h-20 w-20 rounded-xl border border-white/10 bg-white/[0.02] -rotate-12" />
      </div>

      {/* Particle field */}
      {!reduced && <canvas ref={canvasRef} className="absolute inset-0" />}

      {/* Cursor-trailing radial light */}
      {!reduced && (
        <div
          ref={lightRef}
          className="absolute -left-[300px] -top-[300px] h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(79,140,255,0.10) 0%, rgba(79,140,255,0) 60%)",
            willChange: "transform",
          }}
        />
      )}

      {/* Top vignette + base fade for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-base" />
    </div>
  );
}
