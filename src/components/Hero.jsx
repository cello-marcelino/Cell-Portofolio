"use client";

import Image from "next/image";
import { personalInfo } from "@/data/portfolioData";
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
  return (
    <section
      id="overview"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Narrative Column */}
          <div className="flex-1 max-w-3xl text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono mb-6 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
              </span>
              <span>{personalInfo.statusBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-[#0F172A] tracking-tight leading-[1.14] mb-6">
              Learning, building, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-teal-600 to-teal-700">improving</span> through software.
            </h1>

            {/* Calibrated Bio & Narrative */}
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed mb-8 max-w-2xl font-sans">
              Hi, I’m <strong className="text-[#0F172A] font-semibold">{personalInfo.name}</strong>, an Informatics Engineering student at Politeknik Negeri Batam and an aspiring software developer. I build web applications and backend services, explore practical applied AI, and enjoy understanding how software systems work under the hood through hands-on project work.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href={personalInfo.cvDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold font-mono text-white bg-teal-600 hover:bg-teal-700 border border-teal-500/30 shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ArrowDownTrayIcon className="w-4 h-4" />
                Download CV (PDF)
              </a>

              <a
                href="#featured"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium font-mono text-[#0F172A] bg-white hover:bg-gray-50 border border-gray-300 shadow-xs hover:border-purple-300 transition-all transform hover:-translate-y-0.5"
              >
                <CodeBracketIcon className="w-4 h-4 text-teal-600" />
                View Projects
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-mono text-gray-600 hover:text-[#0F172A] transition-colors"
              >
                <EnvelopeIcon className="w-4 h-4 text-purple-600" />
                Get in Touch
              </a>
            </div>

            {/* Context Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2.5 text-xs text-[#475569]">
                <MapPinIcon className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#475569]">
                <AcademicCapIcon className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Politeknik Negeri Batam</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#475569]">
                <BriefcaseIcon className="w-4 h-4 text-teal-600 shrink-0" />
                <span>PT Volex (EV Assembly)</span>
              </div>
            </div>
          </div>

          {/* Right Brand Badge Showcase */}
          <div className="w-full lg:w-auto flex justify-center">
            <div className="relative group p-1.5 rounded-3xl bg-gradient-to-b from-purple-100 via-teal-50 to-purple-50 shadow-md">
              <div className="w-72 sm:w-80 rounded-2xl bg-white border border-purple-100 p-6 flex flex-col items-center text-center shadow-xs">
                {/* Brand Logo Avatar */}
                <div className="relative w-28 h-28 mb-4 rounded-2xl overflow-hidden border-2 border-purple-200 shadow-sm group-hover:border-teal-500 transition-all duration-300">
                  <Image
                    src="/brand/cell-logo-square.png"
                    alt="Christian Marcelino Logo"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Identity Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-xs font-mono text-teal-700 mb-2">
                  <SparklesIcon className="w-3.5 h-3.5 text-teal-600" />
                  <span>Junior Developer</span>
                </div>

                <h3 className="text-xl font-heading font-bold text-[#0F172A] mb-1">
                  Christian Marcelino
                </h3>
                <p className="text-xs text-purple-700/80 mb-5 font-mono">
                  Informatics Engineering Student
                </p>

                {/* Core Focus Badges */}
                <div className="w-full space-y-2 text-left">
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                    <span className="text-xs text-gray-800 font-mono font-medium">Web Development</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                    <span className="text-xs text-gray-800 font-mono font-medium">Backend Service</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200/80">
                    <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                    <span className="text-xs text-gray-800 font-mono font-medium">AI & NLP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
