"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "HTML", accent: true },
  { name: "CSS", accent: true },
  { name: "JAVASCRIPT", accent: true },
  { name: "TYPESCRIPT", accent: false },
  { name: "REACT", accent: false },
  { name: "NEXT.JS", accent: true },
  { name: "PYTHON", accent: false },
  { name: "FIGMA", accent: false },
  { name: "PHOTOSHOP", accent: false },
  { name: "GIT", accent: true },
  { name: "OBS STUDIO", accent: false },
];

const languages = [
  { name: "Mongolian", level: "Native" },
  { name: "English", level: "Upper-intermediate" },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const words = wordsRef.current;
    if (!section || !words) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-header",
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
        ".skill-word-item",
        { opacity: 0, y: 30, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: words,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section h-screen flex flex-col justify-center pl-14 pr-10 md:pl-20 md:pr-16 lg:pl-28 lg:pr-28 py-16">
      <div className="section-counter hidden md:block">04</div>
      <div className="section-label hidden md:block">SKILLS</div>
      <div className="max-w-5xl mx-auto w-full">
        <div className="skills-header opacity-0 mb-16">
          <span className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase block mb-4">
            Capabilities
          </span>
          <div className="w-full h-px bg-[rgba(245,240,235,0.1)]" />
        </div>

        <div ref={wordsRef} className="flex flex-wrap gap-3 md:gap-4 mb-20">
          {skills.map((skill) => (
            <span
              key={skill.name}
              className="skill-word-item inline-flex items-center px-5 py-3 md:px-6 md:py-3.5 border border-[rgba(245,240,235,0.15)] font-mono text-xs md:text-sm tracking-[0.12em] uppercase opacity-0 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              style={{
                fontFamily: "var(--font-mono)",
                color: skill.accent ? "var(--accent)" : "var(--text)",
              }}
              data-cursor="text"
            >
              {skill.name}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-8 pt-8 border-t border-[rgba(245,240,235,0.1)]">
          <span className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase">
            Languages
          </span>
          {languages.map((lang) => (
            <div key={lang.name} className="flex items-center gap-2">
              <span className="text-sm font-medium">{lang.name}</span>
              <span className="text-xs text-[var(--muted)]">({lang.level})</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
