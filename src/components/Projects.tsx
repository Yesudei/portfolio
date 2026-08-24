"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  stack: string[];
  repo: string;
  url?: string;
  github?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI MUSIC PRODUCTION SYSTEM",
    category: "FULLSTACK / AI / DIPLOMA PROJECT",
    year: "2026",
    description:
      "MUST diploma project — an AI-powered music training platform with RAG chatbot, audio marketplace, user authentication, and real-time audio management. Built with Next.js, Supabase, and Ollama.",
    stack: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Ollama", "RAG"],
    repo: "diploma",
    github: "https://github.com/Yesudei/diploma",
    url: "https://melodexmusic.vercel.app/",
  },
  {
    id: 2,
    title: "NUDEN SOLUTION FRONTEND",
    category: "FRONTEND / REACT",
    year: "2025",
    description:
      "Frontend work completed at Nuden Solution LLC, with responsive UI implementation, component work, and product-focused iteration.",
    stack: ["React", "JavaScript", "CSS", "Vite"],
    repo: "4tugu",
    github: "https://github.com/Yesudei/4tugu",
  },
  {
    id: 3,
    title: "FACIAL RECOGNITION INSIGHTFACE",
    category: "COMPUTER VISION / PYTHON",
    year: "2026",
    description:
      "Computer vision work using InsightFace and ArcFace embeddings for face recognition and identity analysis.",
    stack: ["Python", "InsightFace", "ArcFace", "Computer Vision"],
    repo: "facial-recognition-insightface",
    github: "https://github.com/Yesudei/facial-recognition-insightface",
  },
];

function ProjectPreview({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  const imageUrl = project.url
    ? "/projects/melodex-landing.png"
    : `https://opengraph.githubassets.com/portfolio/Yesudei/${project.repo}`;
  const sourceLabel = project.url ? "LIVE SITE - MELODEX" : "GITHUB REPOSITORY";
  const alt = `${project.title} preview — ${project.category}`;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#161b22]">
      {!imgError ? (
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out"
          loading="lazy"
          unoptimized={imageUrl.startsWith("https://opengraph")}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] px-6 text-center">
          <p className="font-mono text-xs tracking-wider text-[var(--muted)]">{project.title} — preview unavailable</p>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-4 pb-4 pt-12 text-white pointer-events-none">
        <p className="font-mono text-[10px] tracking-[0.18em] text-[#c8ff00]">{sourceLabel}</p>
        <p className="mt-1 font-mono text-xs tracking-wide">{project.url ? "melodexmusic.vercel.app" : `Yesudei/${project.repo}`}</p>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card.querySelector(".project-content"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 60%",
            toggleActions: "play none none none",
          },
        }
      );
    }, card);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    const img = card.querySelector(".project-img") as HTMLElement;
    if (img) {
      img.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    const img = card.querySelector(".project-img") as HTMLElement;
    if (img) {
      img.style.transform = "translate(0, 0) scale(1)";
    }
  };

  return (
    <div
      ref={cardRef}
      className="section h-screen flex items-center justify-center px-6 md:px-10 lg:px-12"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {index === 0 && <h2 className="sr-only">Projects</h2>}
      {index === 0 && <div className="section-counter hidden md:block" aria-hidden="true">02</div>}
      {index === 0 && <div className="section-label hidden md:block" aria-hidden="true">PROJECTS</div>}
      <div className="project-content w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center opacity-0">
        {/* Text */}
        <div className={`space-y-6 ${index % 2 === 1 ? "md:order-2 md:pl-6 lg:pl-10" : ""}`}>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs text-[var(--accent)] tracking-wider">
              {String(project.id).padStart(2, "0")}
            </span>
            <span className="font-mono text-xs text-[var(--muted)] tracking-wider">
              {project.year}
            </span>
          </div>
          <h3
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight uppercase leading-[0.95]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {project.title}
          </h3>
          <p className="font-mono text-xs text-[var(--muted)] tracking-wider uppercase">
            {project.category}
          </p>
          <p className="text-[var(--muted)] leading-relaxed max-w-md">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 border border-[rgba(245,240,235,0.15)] text-[var(--muted)]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--accent)] tracking-wider uppercase hover:underline"
                data-cursor="hover"
              >
                GitHub →
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[var(--accent)] tracking-wider uppercase hover:underline"
                data-cursor="hover"
              >
                Live →
              </a>
            )}
          </div>
        </div>

        <div className={`relative aspect-[4/3] overflow-hidden ${index % 2 === 1 ? "md:order-1" : ""}`}>
          {project.url || project.github ? (
            <a href={project.url ?? project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} className="project-image-wrap block h-full w-full border border-[rgba(245,240,235,0.08)] focus-visible:outline-offset-[-4px]" data-cursor="project">
              <div className="project-img h-full w-full transition-transform duration-700 ease-out"><ProjectPreview project={project} /></div>
            </a>
          ) : (
            <div className="project-image-wrap h-full w-full border border-[rgba(245,240,235,0.08)]"><div className="project-img h-full w-full transition-transform duration-700 ease-out"><ProjectPreview project={project} /></div></div>
          )}
          <span className="pointer-events-none absolute bottom-3 right-3 bg-black/70 px-2 py-1 font-mono text-[9px] tracking-[0.16em] text-white/80">{project.url || project.github ? "OPEN PREVIEW" : "WORK SAMPLE"}</span>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <>
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} />
      ))}
    </>
  );
}
