"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Intro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setDone(true);
          onComplete();
        },
      });

      tl.set(".intro-line", { opacity: 0, y: 20 });

      tl.to(".intro-ub", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.3,
      })
        .to(".intro-ub", {
          opacity: 0,
          y: -10,
          duration: 0.4,
          ease: "power2.in",
          delay: 0.6,
        })
        .to(".intro-name", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(".intro-name", {
          opacity: 0,
          y: -20,
          duration: 0.5,
          ease: "power2.in",
          delay: 0.8,
        })
        .to(".intro-role", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
        .to(".intro-role", {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
          delay: 0.5,
        })
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[var(--bg)] flex items-center justify-center cursor-hidden"
    >
      <div className="text-center space-y-4">
        <div
          className="intro-line intro-ub font-mono text-xs tracking-[0.3em] text-[var(--muted)] uppercase opacity-0"
        >
          UB / MN — 2026
        </div>
        <div
          className="intro-line intro-name font-[var(--font-display)] text-5xl md:text-7xl font-bold tracking-tight opacity-0"
          style={{ fontFamily: "var(--font-display)" }}
        >
          YESUDEI
        </div>
        <div
          className="intro-line intro-role font-mono text-sm tracking-[0.2em] text-[var(--muted)] uppercase opacity-0"
        >
          Frontend Developer
        </div>
      </div>
    </div>
  );
}
