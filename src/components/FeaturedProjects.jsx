"use client";

import { useState } from "react";
import Image from "next/image";
import { featuredProjects } from "@/data/portfolioData";
import ImageModal from "./ImageModal";
import {
  SparklesIcon,
  ArrowsPointingOutIcon,
  CheckCircleIcon,
  CommandLineIcon,
  BookOpenIcon,
  CpuChipIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { BootstrapGitHubIcon } from "@/components/icons/BootstrapIcons";

export default function FeaturedProjects() {
  const [activeTabPerProject, setActiveTabPerProject] = useState({
    "siredo-v3": 0,
    "manies-cakery": 0,
  });

  const [modalState, setModalState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const handleTabChange = (projectId, tabIndex) => {
    setActiveTabPerProject((prev) => ({ ...prev, [projectId]: tabIndex }));
  };

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-mono mb-3">
            <SparklesIcon className="w-4 h-4 text-teal-600" />
            Featured Projects
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0F172A] tracking-tight">
            Featured Projects & Project Highlights
          </h2>
          <p className="mt-3 text-base text-[#334155]">
            Selected university projects exploring decoupled web development, relational database workflows, and practical text matching.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-16">
          {featuredProjects.map((project, idx) => {
            const activeTab = activeTabPerProject[project.id] || 0;
            const currentScreenshot = project.screenshots[activeTab] || project.screenshots[0];
            const isReverse = idx % 2 === 1;

            return (
              <div
                key={project.id}
                className="lightswind-card rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Top Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                      {project.year}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      {project.category}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-xs font-mono text-teal-700 flex items-center gap-1.5 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-teal-600" />
                      {project.architecture}
                    </div>
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-gray-700 hover:text-purple-700 bg-gray-100 hover:bg-purple-50 border border-gray-200 hover:border-purple-200 transition-colors shadow-xs"
                      >
                        <BootstrapGitHubIcon className="w-3.5 h-3.5 text-purple-700" />
                        <span>Source Code</span>
                        <ArrowTopRightOnSquareIcon className="w-3 h-3 text-gray-400" />
                      </a>
                    )}
                  </div>
                </div>

                <div className={`flex flex-col lg:flex-row gap-10 items-start ${isReverse ? "lg:flex-row-reverse" : ""}`}>
                  {/* Text & Case Study Details */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#0F172A] mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm font-medium text-teal-700 font-mono">
                        {project.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-[#334155] leading-relaxed font-sans">
                      {project.overview}
                    </p>

                    {/* What I Built → How It Works → What I Learned */}
                    <div className="p-5 rounded-2xl bg-gray-50/90 border border-gray-200/80 space-y-4">
                      <div className="space-y-1.5">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-teal-700 font-semibold flex items-center gap-2">
                          <CommandLineIcon className="w-4 h-4 text-teal-600" />
                          What I Built
                        </h4>
                        <p className="text-xs text-[#475569] leading-relaxed pl-6">
                          {project.caseStudy.whatIBuilt}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-purple-700 font-semibold flex items-center gap-2">
                          <CpuChipIcon className="w-4 h-4 text-purple-600" />
                          How It Works
                        </h4>
                        <p className="text-xs text-[#475569] leading-relaxed pl-6">
                          {project.caseStudy.howItWorks}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="text-xs font-mono uppercase tracking-wider text-gray-800 font-semibold flex items-center gap-2">
                          <BookOpenIcon className="w-4 h-4 text-teal-600" />
                          What I Learned
                        </h4>
                        <p className="text-xs text-[#475569] leading-relaxed pl-6">
                          {project.caseStudy.whatILearned}
                        </p>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="space-y-2.5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-gray-600 font-semibold">
                        Key Highlights
                      </h4>
                      <ul className="space-y-2 text-xs text-[#334155]">
                        {project.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <CheckCircleIcon className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Built With Tech Badges */}
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">
                        Built With:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 text-xs font-mono rounded-lg bg-gray-100 text-[#334155] border border-gray-200 hover:border-teal-300 hover:text-teal-800 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Screenshot Showcase */}
                  <div className="w-full lg:w-[480px] xl:w-[540px] shrink-0 space-y-4">
                    {/* Switchable Tabs */}
                    <div className="flex flex-wrap gap-1.5 p-1.5 rounded-xl bg-gray-100/90 border border-gray-200">
                      {project.screenshots.map((s, sIdx) => (
                        <button
                          key={sIdx}
                          onClick={() => handleTabChange(project.id, sIdx)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                            activeTab === sIdx
                              ? "bg-white text-purple-700 border border-purple-200 font-semibold shadow-xs"
                              : "text-gray-600 hover:text-[#0F172A] hover:bg-gray-200/60"
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>

                    {/* Active Screenshot Display with Lightbox Trigger */}
                    <div
                      onClick={() => openModal(project.screenshots, activeTab)}
                      className="group relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-200 hover:border-teal-500 cursor-pointer transition-all shadow-sm hover:shadow"
                    >
                      <Image
                        src={currentScreenshot.src}
                        alt={currentScreenshot.title}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 540px"
                      />

                      {/* Zoom Indicator */}
                      <div className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 text-gray-600 group-hover:text-teal-600 border border-gray-200 shadow-xs backdrop-blur-md opacity-80 group-hover:opacity-100 transition-all">
                        <ArrowsPointingOutIcon className="w-4 h-4" />
                      </div>

                      {/* Bottom Caption Overlay */}
                      <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 border border-gray-200 backdrop-blur-md shadow-xs">
                        <p className="text-xs font-mono font-semibold text-[#0F172A]">
                          {currentScreenshot.title}
                        </p>
                        <p className="text-[11px] text-[#475569] mt-0.5">
                          {currentScreenshot.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
