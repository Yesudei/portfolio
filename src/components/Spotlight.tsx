"use client";

import { useEffect, useRef } from "react";

export default function Spotlight() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const brightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bright = brightRef.current;
    if (!overlay || !bright) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const isCoarse = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let hasPointer = false;
    const ease = 0.12;
    let rafId: number;

    const handlePointerMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      hasPointer = true;
    };

    const handlePointerLeave = () => {
      hasPointer = false;
    };

    const loop = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(loop);
        return;
      }
      if (isCoarse) {
        // autonomous drift on mobile/coarse pointer — no cursor, so keep grid alive
        const t = Date.now();
        const w = window.innerWidth;
        const h = window.innerHeight;
        // slow figure-8 across viewport
        target.x = w * (0.5 + 0.28 * Math.sin(t * 0.00035));
        target.y = h * (0.5 + 0.25 * Math.cos(t * 0.00028));
        current.x += (target.x - current.x) * 0.015;
        current.y += (target.y - current.y) * 0.015;
        const mask = `radial-gradient(circle 160px at ${current.x}px ${current.y}px, black 0%, transparent 75%)`;
        bright.style.maskImage = mask;
        bright.style.webkitMaskImage = mask;
      } else if (hasPointer) {
        current.x += (target.x - current.x) * ease;
        current.y += (target.y - current.y) * ease;
        const mask = `radial-gradient(circle 160px at ${current.x}px ${current.y}px, black 0%, transparent 75%)`;
        bright.style.maskImage = mask;
        bright.style.webkitMaskImage = mask;
      }
      rafId = requestAnimationFrame(loop);
    };

    const handleVisibility = () => {
      if (document.hidden) hasPointer = false;
    };

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("visibilitychange", handleVisibility);
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={overlayRef} aria-hidden="true" className="spotlight-overlay">
      <div className="spotlight-overlay__grid spotlight-overlay__grid--dim" />
      <div
        ref={brightRef}
        className="spotlight-overlay__grid spotlight-overlay__grid--bright"
      />
      <div className="spotlight-overlay__grain" />
    </div>
  );
}
