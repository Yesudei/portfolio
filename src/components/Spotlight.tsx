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
      if (hasPointer) {
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
