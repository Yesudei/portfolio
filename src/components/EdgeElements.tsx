"use client";

import { useEffect, useRef, useState } from "react";

export default function EdgeElements() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Status tag — top right */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-2 font-mono text-[11px] tracking-[0.04em] text-[var(--muted)]">
        <span className="w-[6px] h-[6px] rounded-full bg-[var(--accent)]" />
        AVAILABLE FOR WORK
      </div>

      {/* Scroll rail — right edge */}
      <div className="fixed right-6 top-16 bottom-16 z-50 hidden md:block">
        <div className="relative h-full w-px bg-[rgba(245,240,235,0.15)]">
          <div
            ref={dotRef}
            className="absolute left-1/2 -translate-x-1/2 w-[9px] h-[9px] rounded-full bg-[var(--accent)]"
            style={{ top: `${scrollPct * 100}%` }}
          />
        </div>
      </div>

      {/* Rotated label — bottom right */}
      <div className="fixed right-11 bottom-12 z-50 hidden md:block origin-right-right">
        <span
          className="font-mono text-[10px] tracking-[0.15em] text-[var(--muted)] whitespace-nowrap"
          style={{ transform: "rotate(90deg)", display: "block" }}
        >
          FRONTEND DEVELOPER — 2026
        </span>
      </div>
    </>
  );
}
