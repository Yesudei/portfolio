"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "hover" | "project" | "text" | "scroll";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const nearRight = e.clientX > window.innerWidth - 140;
      // use functional update to avoid stale closure on state
      if (nearRight) {
        setState((prev) => (prev !== "hover" && prev !== "project" ? "scroll" : prev));
      }
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    let raf: number;
    const animate = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(animate);
        return;
      }
      dotPos.current.x += (pos.current.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (pos.current.y - dotPos.current.y) * 0.25;
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 17}px, ${ringPos.current.y - 17}px)`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile, visible]);

  useEffect(() => {
    if (isMobile) return;

    const handleEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='hover']")) setState("hover");
      else if (target.closest("[data-cursor='project']")) setState("project");
      else if (target.closest("[data-cursor='text']")) setState("text");
      else if (target.closest("a, button")) setState("hover");
      else setState("default");
    };

    document.addEventListener("mouseover", handleEnter);
    return () => document.removeEventListener("mouseover", handleEnter);
  }, [isMobile]);

  if (isMobile) return null;

  const ringSize = state === "project" ? 80 : state === "hover" ? 56 : state === "scroll" ? 34 : 40;
  const dotScale = state === "hover" ? 0 : state === "project" ? 0 : state === "scroll" ? 0 : 1;
  const borderColor = state === "project" ? "var(--accent)" : state === "scroll" ? "var(--accent)" : "rgba(245,240,235,0.4)";

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--accent)",
          opacity: visible ? 1 : 0,
          transform: `scale(${dotScale})`,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: ringSize,
          height: ringSize,
          borderRadius: "50%",
          border: `1px solid ${borderColor}`,
          opacity: visible ? 1 : 0,
          transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, opacity 0.3s ease",
          mixBlendMode: "difference",
        }}
      >
        {state === "project" && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-mono text-accent tracking-wider">
            VIEW
          </span>
        )}
        {state === "scroll" && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono text-accent tracking-wider">
            SCROLL
          </span>
        )}
      </div>
    </>
  );
}
