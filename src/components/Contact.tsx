"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const contactLinks = [
  { icon: Phone, label: "+976 8980 1905", href: "tel:+97689801905" },
  { icon: InstagramIcon, label: "@pusudei", href: "https://instagram.com/pusudei" },
  { icon: FacebookIcon, label: "Pususobased", href: "https://facebook.com/pusudei" },
  { icon: GithubIcon, label: "Yesudei", href: "https://github.com/Yesudei" },
  { icon: Mail, label: "esudei2845@gmail.com", href: "mailto:esudei2845@gmail.com" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (open) {
      document.body.classList.add("no-scroll");
      const prev = document.activeElement as HTMLElement | null;
      // focus close button after mount
      setTimeout(() => closeBtnRef.current?.focus(), 50);
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          (triggerRef.current ?? prev)?.focus();
        }
        if (e.key === "Tab" && panelRef.current) {
          const focusable = panelRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        document.body.classList.remove("no-scroll");
        if (prev) prev.focus();
      };
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  return (
    <>
      <section
        ref={sectionRef}
        className="section min-h-screen flex flex-col justify-center items-center px-6 py-32 text-center"
      >
        <div className="section-counter hidden md:block">06</div>
        <div className="section-label hidden md:block">CONTACT</div>
        <h2 className="space-y-4 mb-16" aria-label="Let's build something">
          <span
            className="contact-line block text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] opacity-0"
            style={{ fontFamily: "var(--font-display)" }}
            data-cursor="text"
          >
            LET&apos;S
          </span>
          <span
            className="contact-line block text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] opacity-0"
            style={{ fontFamily: "var(--font-display)" }}
            data-cursor="text"
          >
            BUILD
          </span>
          <span
            className="contact-line block text-[10vw] md:text-[8vw] lg:text-[7vw] font-bold tracking-tighter uppercase leading-[0.85] text-[var(--accent)] opacity-0"
            style={{ fontFamily: "var(--font-display)" }}
            data-cursor="text"
          >
            SOMETHING.
          </span>
        </h2>

        <div className="space-y-8">
          <button
            ref={triggerRef}
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls="contact-dialog"
            className="contact-line font-mono text-sm tracking-[0.15em] uppercase text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-300 opacity-0 border border-[rgba(245,240,235,0.2)] px-8 py-4 hover:border-[var(--accent)]"
            data-cursor="hover"
          >
            CONTACT ME →
          </button>

          <div className="contact-line font-mono text-xs text-[var(--muted)] tracking-wider opacity-0">
            Ulaanbaatar, Mongolia
          </div>
        </div>

        <div className="mt-24 contact-line opacity-0">
          <span className="font-mono text-[10px] text-[var(--muted)] tracking-wider">
            © 2026 — Built with Next.js, GSAP & obsessive attention to detail
          </span>
        </div>
      </section>

      {open && (
        <div className="contact-modal" onClick={() => setOpen(false)} role="presentation">
          <div
            ref={panelRef}
            id="contact-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            className="contact-modal__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeBtnRef}
              onClick={() => setOpen(false)}
              aria-label="Close contact dialog"
              className="contact-modal__close"
              data-cursor="hover"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <div className="space-y-1 mb-10">
              <h2
                id="contact-dialog-title"
                className="text-3xl md:text-4xl font-bold tracking-tight uppercase"
                style={{ fontFamily: "var(--font-display)" }}
              >
                GET IN TOUCH
              </h2>
            </div>

            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="contact-modal__link"
                  data-cursor="hover"
                >
                  <link.icon size={18} strokeWidth={1.5} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
