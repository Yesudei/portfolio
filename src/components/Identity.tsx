"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Identity() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".identity-main",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".identity-about",
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 45%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="About"
      className="section h-screen flex items-center justify-center px-6 md:px-10 lg:px-12"
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center">
        <div className="identity-main opacity-0 w-full flex flex-col items-center">
          <p className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase mb-4 text-center">
            21 years old
          </p>
          <h2 className="space-y-1 mb-12 w-full flex flex-col items-center">
            <span
              className="block text-[10vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[1.05] tracking-tight uppercase text-center"
              style={{ fontFamily: "var(--font-display)" }}
              data-cursor="text"
            >
              DEVELOPER
            </span>
            <span
              className="block text-[10vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[1.05] tracking-tight uppercase text-[var(--muted)] text-center"
              style={{ fontFamily: "var(--font-display)" }}
              data-cursor="text"
            >
              &amp; CREATIVE
            </span>
          </h2>
        </div>

        <div className="identity-about opacity-0 grid grid-cols-2 gap-x-10 gap-y-3 font-mono text-xs tracking-wider w-full max-w-2xl mx-auto place-items-center md:place-items-start text-left">
          <div className="flex gap-2">
            <span className="text-[var(--muted)] uppercase w-20 shrink-0">Based</span>
            <span className="text-[var(--text)]">Ulaanbaatar, MN</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--muted)] uppercase w-20 shrink-0">Focus</span>
            <span className="text-[var(--text)]">Frontend &amp; Creative</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--muted)] uppercase w-20 shrink-0">Hobby</span>
            <span className="text-[var(--text)]">Music, Drawing, Gaming</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[var(--muted)] uppercase w-20 shrink-0">Status</span>
            <span className="text-[var(--text)]">Open to work</span>
          </div>
        </div>
      </div>
    </section>
  );
}
