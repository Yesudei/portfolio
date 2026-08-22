"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const manifesto = [
  "I BUILD INTERFACES.",
  "I BUILD SYSTEMS.",
  "I BUILD THINGS PEOPLE USE.",
];

export default function Identity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLine, setActiveLine] = useState(0);

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
        ".identity-manifesto",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 50%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % manifesto.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section h-screen flex items-center justify-start pl-14 pr-10 md:pl-20 md:pr-16 lg:pl-28 lg:pr-28"
    >
      <div className="max-w-3xl">
        <div className="space-y-1 mb-10 identity-main opacity-0">
          <div
            className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-light leading-[1.05] tracking-tight uppercase"
            style={{ fontFamily: "var(--font-display)" }}
            data-cursor="text"
          >
            I BUILD
          </div>
          <div
            className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[1.05] tracking-tight uppercase"
            style={{ fontFamily: "var(--font-display)" }}
            data-cursor="text"
          >
            DIGITAL
          </div>
          <div
            className="text-[10vw] md:text-[7vw] lg:text-[6vw] font-bold leading-[1.05] tracking-tight uppercase mb-4"
            style={{ fontFamily: "var(--font-display)" }}
            data-cursor="text"
          >
            EXPERIENCES.
          </div>
        </div>

        <div className="identity-manifesto opacity-0 font-mono text-sm tracking-[0.03em] space-y-1">
          {manifesto.map((line, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                color: i === activeLine ? "var(--text)" : "var(--muted)",
                opacity: i === activeLine ? 1 : 0.4,
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
