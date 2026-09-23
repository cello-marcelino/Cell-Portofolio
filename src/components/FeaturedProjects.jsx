"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { featuredProjects } from "@/data/portfolioData";
import ImageModal from "./ImageModal";
import { Flip } from "@/lib/gsap";
import {
  SparklesIcon,
  ArrowsPointingOutIcon,
  CommandLineIcon,
  BookOpenIcon,
  CpuChipIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { BootstrapGitHubIcon } from "@/components/icons/BootstrapIcons";

function ProjectScreenshotSlider({ screenshots, onOpenModal }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const tabContainerRef = useRef(null);

  const currentScreenshot = screenshots[currentIndex] || screenshots[0];

  const handlePrev = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  const handleNext = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % screenshots.length);
  };

  const handleSelectTab = (idx) => {
    if (idx === currentIndex) return;
    if (tabContainerRef.current) {
      const state = Flip.getState(tabContainerRef.current.querySelectorAll("button"));
      setDirection(idx > currentIndex ? "next" : "prev");
      setCurrentIndex(idx);
      requestAnimationFrame(() => {
        Flip.from(state, {
          duration: 0.35,
          ease: "power2.out",
        });
      });
    } else {
      setDirection(idx > currentIndex ? "next" : "prev");
      setCurrentIndex(idx);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3.5 my-6">
      {/* Quick Switcher Tabs */}
      <div
        ref={tabContainerRef}
        className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-xl bg-gray-100/90 border border-gray-200/80"
      >
        {screenshots.map((s, sIdx) => (
          <button
            key={sIdx}
            type="button"
            onClick={() => handleSelectTab(sIdx)}
            className={`px-3 py-1.5 rounded-lg text-tiny font-sans transition-all cursor-pointer ${
              currentIndex === sIdx
                ? "bg-white text-teal-800 border border-teal-200/80 font-semibold shadow-xs"
                : "text-gray-600 hover:text-[#0F172A] hover:bg-gray-200/60"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Main Slide Stage */}
      <div className="relative h-72 sm:h-96 md:h-[420px] lg:h-[460px] w-full rounded-2xl overflow-hidden bg-slate-900/5 border border-gray-200/90 shadow-sm group">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-teal-800 shadow-md border border-gray-200/80 transition-all backdrop-blur-sm z-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-teal-800 shadow-md border border-gray-200/80 transition-all backdrop-blur-sm z-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-600"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>

        {/* Active Animated Slide */}
        <div
          key={currentIndex}
          onClick={() => onOpenModal(screenshots, currentIndex)}
          className={`relative w-full h-full cursor-pointer ${
            direction === "next" ? "animate-slide-right" : "animate-slide-left"
          }`}
        >
          <Image
            src={currentScreenshot.src}
            alt={currentScreenshot.title}
            fill
            className="object-contain p-2 sm:p-4 transition-transform duration-500 hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 896px"
            priority={currentIndex === 0}
          />
        </div>

        {/* Zoom Lightbox Trigger */}
        <button
          type="button"
          onClick={() => onOpenModal(screenshots, currentIndex)}
          aria-label="Zoom image"
          className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-gray-600 hover:text-teal-700 border border-gray-200 shadow-xs backdrop-blur-md transition-all z-20 cursor-pointer"
        >
          <ArrowsPointingOutIcon className="w-4 h-4" />
        </button>

        {/* Translucent Caption Bar */}
        <div className="absolute bottom-3 left-3 right-3 p-3 sm:px-4 rounded-xl bg-white/95 border border-gray-200/90 backdrop-blur-md shadow-xs flex items-center justify-between gap-4 z-20 pointer-events-none">
          <div className="min-w-0">
            <p className="text-base font-sans font-semibold text-[#0F172A] truncate leading-tight">
              {currentScreenshot.title}
            </p>
            <p className="text-tiny font-sans text-[#475569] mt-0.5 truncate hidden sm:block">
              {currentScreenshot.caption}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-tiny font-mono font-semibold bg-teal-50 text-teal-800 border border-teal-200/80 tabular-nums">
              {String(currentIndex + 1).padStart(2, "0")} / {String(screenshots.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedProjects() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const openModal = (images, index) => {
    setModalState({
      isOpen: true,
      images,
      currentIndex: index,
    });
  };

  return (
    <section id="featured" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-tiny font-sans uppercase tracking-wider font-semibold mb-3">
            <SparklesIcon className="w-3.5 h-3.5 text-teal-700" />
            Featured Projects
          </div>
          <h2 className="text-h2 font-heading font-bold text-[#0F172A] tracking-tight">
            Featured Projects & Architecture Highlights
          </h2>
          <p className="mt-3 text-base text-[#334155] max-w-2xl font-sans">
            Flagship engineering projects showcasing decoupled web systems, relational data modeling, and practical text retrieval.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm hover:border-teal-600/30 transition-all duration-300 space-y-6"
            >
              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full text-tiny font-mono font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                    {project.year}
                  </span>
                  <span className="text-tiny font-sans text-gray-500 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-tiny font-sans text-teal-800 flex items-center gap-1.5 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-teal-600" />
                    {project.architecture}
                  </div>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-tiny font-sans font-medium text-gray-700 hover:text-teal-800 bg-gray-50 hover:bg-teal-50 border border-gray-200 hover:border-teal-200 transition-colors shadow-xs"
                    >
                      <BootstrapGitHubIcon className="w-3.5 h-3.5 text-gray-700" />
                      <span>Source Code</span>
                      <ArrowTopRightOnSquareIcon className="w-3 h-3 text-gray-400" />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Header Info */}
              <div>
                <h3 className="text-h2 font-heading font-bold text-[#0F172A] tracking-tight">
                  {project.title}
                </h3>
                <p className="text-base font-sans font-medium text-teal-700 mt-1">
                  {project.tagline}
                </p>
                <p className="mt-2 text-base text-[#334155] font-sans max-w-3xl leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Dynamic Centerpiece Screenshot Slider */}
              <ProjectScreenshotSlider
                screenshots={project.screenshots}
                onOpenModal={openModal}
              />

              {/* What I Built → How It Works → What I Learned (Divided List - Text Explanations) */}
              <div className="rounded-xl border border-gray-200/80 bg-gray-50/50 divide-y divide-gray-200/70 overflow-hidden">
                <div className="p-4 sm:p-5 space-y-1.5">
                  <h4 className="text-base font-sans text-gray-900 font-semibold flex items-center gap-2">
                    <CommandLineIcon className="w-4 h-4 text-teal-700 shrink-0" />
                    What I Built
                  </h4>
                  <p className="text-base text-[#475569] leading-relaxed pl-6 font-sans">
                    {project.caseStudy.whatIBuilt}
                  </p>
                </div>

                <div className="p-4 sm:p-5 space-y-1.5">
                  <h4 className="text-base font-sans text-gray-900 font-semibold flex items-center gap-2">
                    <CpuChipIcon className="w-4 h-4 text-teal-700 shrink-0" />
                    How It Works
                  </h4>
                  <p className="text-base text-[#475569] leading-relaxed pl-6 font-sans">
                    {project.caseStudy.howItWorks}
                  </p>
                </div>

                <div className="p-4 sm:p-5 space-y-1.5">
                  <h4 className="text-base font-sans text-gray-900 font-semibold flex items-center gap-2">
                    <BookOpenIcon className="w-4 h-4 text-teal-700 shrink-0" />
                    What I Learned
                  </h4>
                  <p className="text-base text-[#475569] leading-relaxed pl-6 font-sans">
                    {project.caseStudy.whatILearned}
                  </p>
                </div>
              </div>

              {/* Built With Tech Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200">
                <span className="text-tiny font-sans text-gray-500 uppercase tracking-wider font-semibold mr-1">
                  Built With:
                </span>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-tiny font-sans rounded-md bg-gray-100 text-[#334155] border border-gray-200 hover:border-teal-300 hover:text-teal-800 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Lightbox */}
      <ImageModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        images={modalState.images}
        currentIndex={modalState.currentIndex}
        setCurrentIndex={(idx) => setModalState((prev) => ({ ...prev, currentIndex: idx }))}
      />
    </section>
  );
}
