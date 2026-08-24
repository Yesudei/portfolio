"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const yesudeiRef = useRef<HTMLDivElement>(null);
  const erdenesukhRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const yesudei = yesudeiRef.current;
    const erdenesukh = erdenesukhRef.current;
    const subtitle = subtitleRef.current;
    if (!yesudei || !erdenesukh || !subtitle) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        yesudei,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        erdenesukh,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.4 }
      );
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.7 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section aria-label="Hero" className="section relative h-screen flex flex-col justify-center items-center overflow-hidden px-14 md:px-20 lg:px-28">
      <div className="section-counter hidden md:block" aria-hidden="true">01</div>
      <div className="section-label hidden md:block" aria-hidden="true">HERO</div>
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-center">
          <span
            ref={yesudeiRef}
            className="block text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold leading-[0.85] tracking-tighter uppercase opacity-0"
            style={{ fontFamily: "var(--font-display)" }}
            data-cursor="text"
          >
            YESUDEI
          </span>
          <span
            ref={erdenesukhRef}
            className="block text-[12vw] md:text-[10vw] lg:text-[9vw] font-bold leading-[0.85] tracking-tighter uppercase text-[var(--muted)] opacity-0"
            style={{ fontFamily: "var(--font-display)" }}
            data-cursor="text"
          >
            ERDENESUKH
          </span>
        </h1>
        <p
          ref={subtitleRef}
          className="mt-8 font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase opacity-0"
        >
          Frontend Developer — Ulaanbaatar, MN
        </p>
      </div>
    </section>
  );
}
