"use client";

import { useState } from "react";
import Cursor from "@/components/Cursor";
import Spotlight from "@/components/Spotlight";
import EdgeElements from "@/components/EdgeElements";
import Intro from "@/components/Intro";
import Hero from "@/components/Hero";
import Identity from "@/components/Identity";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Youtube from "@/components/Youtube";
import Contact from "@/components/Contact";
import { Analytics } from "@vercel/analytics/next"

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <Cursor />
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}
      <noscript>
        <style>{`main.invisible{visibility:visible !important}`}</style>
      </noscript>
      <main id="main-content" className={introComplete ? "" : "invisible"}>
        {introComplete && <Spotlight />}
        {introComplete && <EdgeElements />}
        <Hero />
        <Identity />
        <Projects />
        <Experience />
        <Skills />
        <Youtube />
        <Contact />
      </main>
    </>
  );
}
