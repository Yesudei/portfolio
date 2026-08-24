"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2025 — 2026",
    role: "INFORMATICS TEACHER",
    company: "NOMCH SCHOOL",
    description: "Teaching Computer Science and Informatics at a secondary school. Turning programming logic into lessons a classroom actually wants to sit through.",
  },
  {
    period: "2025",
    role: "FRONTEND DEVELOPER",
    company: "NUDEN SOLUTION LLC",
    description: "Built and improved UI with React, connected features to REST APIs, and shipped real work over one intense summer.",
  },
  {
    period: "2024",
    role: "HOUSEKEEPER",
    company: "HOLIDAY INN — LANDRY'S INC.",
    description: "Work & Travel program. Houston / Galveston Island, Texas. Three months of hardwork in a Holiday Inn 4 star hotel.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".exp-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".exp-row-item",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".exp-list",
            start: "top 75%",
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
      aria-label="Experience"
      className="section h-screen flex items-center justify-center"
    >
      <div className="section-counter hidden md:block" aria-hidden="true">03</div>
      <div className="section-label hidden md:block" aria-hidden="true">EXPERIENCE</div>
      <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
        <div className="exp-header opacity-0 mb-12">
          <h2 className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase">
            Experience
          </h2>
        </div>

        <div className="exp-list space-y-0">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="exp-row py-8 md:py-10 exp-row-item opacity-0"
              data-cursor="hover"
            >
              <div className="flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8">
                <span className="font-mono text-sm text-[var(--accent)] tracking-wider md:w-40 shrink-0">
                  {exp.period}
                </span>
                <div className="flex-1">
                  <h3
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight uppercase leading-[0.9] mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                    data-cursor="text"
                  >
                    {exp.role}
                  </h3>
                  <p className="font-mono text-sm text-[var(--muted)] tracking-wider uppercase mb-2">
                    {exp.company}
                  </p>
                  <p className="text-base text-[var(--muted)] leading-relaxed max-w-xl">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
