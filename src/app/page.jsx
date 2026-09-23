"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import FeaturedProjects from "@/components/FeaturedProjects";
import CuratedProjects from "@/components/CuratedProjects";
import JourneyTimeline from "@/components/JourneyTimeline";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const sections = gsap.utils.toArray(".overlap-section");
      sections.forEach((section, index) => {
        // Last section does not need to scale down
        if (index === sections.length - 1) return;

        const nextSection = sections[index + 1];

        gsap.to(section, {
          scale: 0.965,
          opacity: 0.85,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: nextSection,
            start: "top bottom",
            end: "top 15%",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <main ref={containerRef} className="relative z-10 flex flex-col">
      {/* 01. Hero */}
      <div className="overlap-section relative z-10 bg-transparent">
        <Hero />
      </div>

      {/* 02. Tech Ecosystem */}
      <div className="overlap-section relative z-20 bg-transparent rounded-t-[2.5rem] border-t border-slate-200/80 shadow-[0_-16px_36px_rgba(0,0,0,0.03)] backdrop-blur-[1px]">
        <TechStack />
      </div>

      {/* 03. Featured Projects */}
      <div className="overlap-section relative z-30 bg-transparent rounded-t-[2.5rem] border-t border-slate-200/80 shadow-[0_-16px_36px_rgba(0,0,0,0.03)] backdrop-blur-[1px]">
        <FeaturedProjects />
      </div>

      {/* 04. Curated Projects / Experiments */}
      <div className="overlap-section relative z-40 bg-transparent rounded-t-[2.5rem] border-t border-slate-200/80 shadow-[0_-16px_36px_rgba(0,0,0,0.03)] backdrop-blur-[1px]">
        <CuratedProjects />
      </div>

      {/* 05. Journey Timeline */}
      <div className="overlap-section relative z-50 bg-transparent rounded-t-[2.5rem] border-t border-slate-200/80 shadow-[0_-16px_36px_rgba(0,0,0,0.03)] backdrop-blur-[1px]">
        <JourneyTimeline />
      </div>

      {/* 06. Contact Section */}
      <div className="overlap-section relative z-[60] bg-transparent rounded-t-[2.5rem] border-t border-slate-200/80 shadow-[0_-16px_36px_rgba(0,0,0,0.03)] backdrop-blur-[1px]">
        <ContactSection />
      </div>
    </main>
  );
}
