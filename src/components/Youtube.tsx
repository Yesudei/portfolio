"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";

function YoutubeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M22.5 12c0-1.8-.1-3.6-.5-5.4-.2-1-1-1.8-2-2C18.2 4 12 4 12 4s-6.2 0-8 .6c-1 .2-1.8 1-2 2C1.6 8.4 1.5 10.2 1.5 12s.1 3.6.5 5.4c.2 1 1 1.8 2 2 1.8.6 8 .6 8 .6s6.2 0 8-.6c1-.2 1.8-1 2-2 .4-1.8.5-3.6.5-5.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 15.5 16 12l-6-3.5v7Z" fill="currentColor" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function YoutubeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".youtube-header",
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
        ".youtube-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".youtube-grid",
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
      aria-label="YouTube Streaming"
      className="section min-h-[100dvh] md:h-screen md:min-h-0 flex items-center justify-center px-6 md:px-10 lg:px-12 py-16 md:py-0"
    >
      <div className="section-counter hidden md:block" aria-hidden="true">
        05
      </div>
      <div className="section-label hidden md:block" aria-hidden="true">
        YOUTUBE
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="youtube-header opacity-0 mb-10 md:mb-14">
          <h2 className="font-mono text-xs tracking-[0.25em] text-[var(--muted)] uppercase block mb-4">
            Beyond Code — Gaming
          </h2>
          <div className="w-full h-px bg-[rgba(245,240,235,0.1)]" aria-hidden="true" />
        </div>

        <div className="youtube-grid grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text */}
          <div className="youtube-content opacity-0 space-y-6 order-2 md:order-1">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-2 font-mono text-xs tracking-wider text-[var(--accent)]">
                <YoutubeIcon size={14} />
                YOUTUBE
              </span>
              <span className="font-mono text-xs text-[var(--muted)] tracking-wider">2022 — Present</span>
            </div>

            <h3
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-[0.95]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              STREAMING
              <br />
              <span className="text-[var(--muted)]">&amp; GAMING</span>
            </h3>

            <p className="font-mono text-xs text-[var(--muted)] tracking-wider uppercase">YouTube — @yesudei</p>

            <p className="text-[var(--muted)] leading-relaxed max-w-md">
              I stream gaming sessions on YouTube — casual plays, competitive moments, and the other side of me
              beyond code. It&apos;s where I share what I love outside development.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Gaming", "Live Stream", "Community", "YouTube"].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 border border-[rgba(245,240,235,0.15)] text-[var(--muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="https://www.youtube.com/@yesudei"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.15em] uppercase bg-[#FF0000] text-white px-6 py-3 hover:bg-[#cc0000] transition-colors duration-300"
                data-cursor="hover"
                aria-label="Visit YouTube channel @yesudei"
              >
                <YoutubeIcon size={16} />
                Visit Channel
                <ExternalLink size={14} aria-hidden="true" />
              </a>
              <p className="font-mono text-[10px] tracking-wider text-[var(--muted)] mt-3">@yesudei • gaming • occasionally live</p>
            </div>
          </div>

          {/* Preview */}
          <div className="youtube-content opacity-0 order-1 md:order-2">
            <a
              href="https://www.youtube.com/@yesudei"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open YouTube channel @yesudei"
              className="group relative aspect-[16/9] md:aspect-[4/3] overflow-hidden bg-[#0f0f0f] border border-[rgba(245,240,235,0.08)] block focus-visible:outline-offset-[-4px]"
              data-cursor="project"
            >
              {/* Channel header mock */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a0000]" />
              <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              
              {/* Center play */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#FF0000] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M8 5.14v14l11-7-11-7z" />
                  </svg>
                </div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase">YouTube Channel</p>
                <p className="text-xl md:text-2xl font-bold tracking-tight text-white mt-1" style={{ fontFamily: "var(--font-display)" }}>
                  @yesudei
                </p>
                <p className="font-mono text-xs text-white/50 mt-1">Gaming • Streams • Highlights</p>
              </div>

              {/* Bottom bar */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-4 pb-4 pt-12">
                <p className="font-mono text-[10px] tracking-[0.18em] text-[#FF0000]">YOUTUBE — GAMING</p>
                <p className="mt-1 font-mono text-xs tracking-wide text-white/80">youtube.com/@yesudei</p>
              </div>
            </a>
            <p className="font-mono text-[10px] tracking-[0.15em] text-[var(--muted)] mt-3 text-center md:text-right uppercase">
              Occasional gaming streams • Ulaanbaatar, MN
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
