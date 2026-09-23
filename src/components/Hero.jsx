"use client";

import { useRef } from "react";
import Image from "next/image";
import { personalInfo } from "@/data/portfolioData";
import { gsap, useGSAP, Draggable } from "@/lib/gsap";
import {
  ArrowDownTrayIcon,
  CodeBracketIcon,
  MapPinIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export default function Hero() {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);

  useGSAP(
    () => {
      // Draggable status pill with Inertia physics
      if (badgeRef.current) {
        Draggable.create(badgeRef.current, {
          type: "x,y",
          inertia: true,
          edgeResistance: 0.65,
          onRelease: function () {
            gsap.to(this.target, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.4)",
            });
          },
        });
      }

      // Respect reduced motion for entrance animations
      if (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      // Staggered entrance animation
      gsap.from(".hero-anim-item", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="overview"
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Narrative Column */}
          <div className="flex-1 max-w-3xl text-left">
            {/* Draggable Status Pill with Inertia Physics */}
            <div className="hero-anim-item inline-block mb-6">
              <div
                ref={badgeRef}
                title="Drag me! Physics inertia enabled"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-tiny font-sans uppercase tracking-wider font-semibold shadow-xs cursor-grab active:cursor-grabbing select-none hover:shadow-md hover:border-teal-400 transition-shadow"
              >
                <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                <span>{personalInfo.statusBadge}</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="hero-anim-item text-h1 font-heading font-bold text-[#0F172A] tracking-tight leading-snug mb-6">
              Learning, building, and{" "}
              <span className="text-teal-700 font-bold">improving</span> through
              software.
            </h1>

            {/* Calibrated Bio & Narrative */}
            <p className="hero-anim-item text-base text-[#334155] leading-relaxed mb-8 max-w-2xl font-sans">
              Hi, I’m{" "}
              <strong className="text-[#0F172A] font-semibold">
                {personalInfo.name}
              </strong>
              , an Informatics Engineering student at Politeknik Negeri Batam and
              an aspiring software developer. I build web applications and
              backend services, explore practical applied AI, and enjoy
              understanding how software systems work under the hood through
              hands-on project work.
            </p>

            {/* CTAs */}
            <div className="hero-anim-item flex flex-wrap items-center gap-4 mb-10">
              <a
                href={personalInfo.cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-base font-sans font-semibold text-white bg-teal-700 hover:bg-teal-800 border border-teal-600/30 shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download CV (PDF)
              </a>

              <a
                href="#featured"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-base font-sans font-medium text-[#0F172A] bg-white hover:bg-gray-50 border border-gray-300 shadow-xs hover:border-teal-600/40 transition-all transform hover:-translate-y-0.5"
              >
                <CodeBracketIcon className="w-4 h-4 text-teal-700" />
                View Projects
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-base font-sans text-gray-700 hover:text-teal-800 transition-colors"
              >
                <EnvelopeIcon className="w-4 h-4 text-teal-700" />
                Get in Touch
              </a>
            </div>

            {/* Context Details */}
            <div className="hero-anim-item grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2.5 text-tiny font-sans text-[#475569]">
                <MapPinIcon className="w-4 h-4 text-teal-700 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-tiny font-sans text-[#475569]">
                <AcademicCapIcon className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Politeknik Negeri Batam</span>
              </div>
              <div className="flex items-center gap-2.5 text-tiny font-sans text-[#475569]">
                <BriefcaseIcon className="w-4 h-4 text-teal-700 shrink-0" />
                <span>PT Volex (EV Assembly)</span>
              </div>
            </div>
          </div>

          {/* Right Brand Badge Showcase */}
          <div className="hero-anim-item w-full lg:w-auto flex justify-center">
            <div className="w-72 sm:w-[21.5rem] rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-7 flex flex-col items-center text-center shadow-sm">
              {/* Brand Logo Avatar */}
              <div className="relative w-28 h-28 mb-4 rounded-2xl overflow-hidden border-2 border-teal-200/80 shadow-sm transition-all duration-300">
                <Image
                  src="/brand/cell-logo-square.png"
                  alt="Christian Marcelino Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Identity Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-tiny font-sans font-semibold text-teal-800 mb-2">
                <SparklesIcon className="w-3.5 h-3.5 text-teal-700" />
                <span>Junior Developer</span>
              </div>

              <h3 className="text-h3 font-heading font-bold text-[#0F172A] mb-1">
                Christian Marcelino
              </h3>
              <p className="text-tiny text-teal-800/90 mb-5 font-sans">
                Informatics Engineering Student
              </p>

              {/* Core Focus Badges */}
              <div className="w-full space-y-2 text-left">
                {personalInfo.expertise.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80 hover:border-teal-300 hover:bg-teal-50/40 transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0" />
                    <span className="text-base text-gray-800 font-sans font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
