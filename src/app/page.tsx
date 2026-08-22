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
import Contact from "@/components/Contact";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <>
      <Cursor />
      {!introComplete && <Intro onComplete={() => setIntroComplete(true)} />}
      <main className={introComplete ? "" : "invisible"}>
        {introComplete && <Spotlight />}
        {introComplete && <EdgeElements />}
        <Hero />
        <Identity />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
