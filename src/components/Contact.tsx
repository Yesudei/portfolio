"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("esudei2845@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = "mailto:esudei2845@gmail.com";
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-line",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
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
      className="section min-h-screen flex flex-col justify-center items-center px-6 py-32 text-center"
    >
      <div className="section-counter hidden md:block">05</div>
      <div className="section-label hidden md:block">CONTACT</div>
      <div className="space-y-4 mb-16">
        <div
          className="contact-line text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] opacity-0"
          style={{ fontFamily: "var(--font-display)" }}
          data-cursor="text"
        >
          LET&apos;S
        </div>
        <div
          className="contact-line text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] opacity-0"
          style={{ fontFamily: "var(--font-display)" }}
          data-cursor="text"
        >
          BUILD
        </div>
        <div
          className="contact-line text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] text-[var(--accent)] opacity-0"
          style={{ fontFamily: "var(--font-display)" }}
          data-cursor="text"
        >
          SOMETHING.
        </div>
      </div>

      <div className="space-y-8">
        <button
          onClick={copyEmail}
          className="contact-line font-mono text-sm tracking-[0.15em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300 opacity-0"
          data-cursor="hover"
        >
          {copied ? "EMAIL COPIED" : "esudei2845@gmail.com"} →
        </button>

        <div className="contact-line font-mono text-xs text-[var(--muted)] tracking-wider opacity-0">
          Ulaanbaatar, Mongolia
        </div>

        <div className="contact-line flex items-center justify-center gap-6 pt-4 opacity-0">
          <a
            href="https://github.com/Yesudei"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--muted)] tracking-wider uppercase hover:text-[var(--accent)] transition-colors duration-300"
            data-cursor="hover"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-[var(--muted)] tracking-wider uppercase hover:text-[var(--accent)] transition-colors duration-300"
            data-cursor="hover"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="mt-24 contact-line opacity-0">
        <span className="font-mono text-[10px] text-[var(--muted)] tracking-wider">
          © 2026 — Built with Next.js, GSAP & obsessive attention to detail
        </span>
      </div>
    </section>
  );
}
