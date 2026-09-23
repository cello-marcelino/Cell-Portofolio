"use client";

import { useState } from "react";
import Image from "next/image";
import { projectsAndExperiments } from "@/data/portfolioData";
import ImageModal from "./ImageModal";
import {
  ArrowsPointingOutIcon,
  FunnelIcon,
  CheckCircleIcon,
  BeakerIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import { BootstrapGitHubIcon } from "@/components/icons/BootstrapIcons";

export default function CuratedProjects() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [modalState, setModalState] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const filterOptions = [
    { label: "All Projects", value: "all" },
    { label: "Experiments & AI", value: "ai" },
    { label: "Backend Fundamentals", value: "native" },
  ];

  const filteredProjects = projectsAndExperiments.filter((p) => {
    if (selectedFilter === "all") return true;
    return p.filterCategory === selectedFilter;
  });

  const openModal = (images, index) => {
    setModalState({
      isOpen: true,
      images,
      currentIndex: index,
    });
  };

  return (
    <section id="projects" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-tiny font-sans uppercase tracking-wider font-semibold mb-3">
              <BeakerIcon className="w-3.5 h-3.5 text-teal-700" />
              Projects & Experiments
            </div>
            <h2 className="text-h2 font-heading font-bold text-slate-900 tracking-tight">
              Projects & Experiments
            </h2>
            <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed">
              Explorations, prototypes, and coursework projects focusing on backend fundamentals, machine learning experiments, and local model inference.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100 border border-slate-200/90 self-start md:self-auto">
            <FunnelIcon className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1 hidden sm:block" />
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedFilter(opt.value)}
                className={`px-3.5 py-1.5 rounded-full text-tiny font-sans transition-all cursor-pointer ${
                  selectedFilter === opt.value
                    ? "bg-teal-700 text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 flex flex-col overflow-hidden group shadow-xs hover:shadow-md hover:border-teal-300/70 hover:-translate-y-0.5 transition-all duration-300"
            >
              {/* Primary Screenshot Preview */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div
                  onClick={() => openModal(project.screenshots, 0)}
                  className="relative h-52 w-full bg-slate-50 overflow-hidden cursor-pointer border-b border-slate-200/80"
                >
                  <Image
                    src={project.screenshots[0].src}
                    alt={project.screenshots[0].title}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />

                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-white/95 border border-teal-200/80 text-tiny font-sans font-medium text-teal-800 shadow-xs backdrop-blur-sm">
                    {project.badge}
                  </div>

                  <div className="absolute top-3 right-3 p-1.5 rounded-md bg-white/95 border border-slate-200/80 text-slate-600 group-hover:text-teal-700 shadow-xs backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity">
                    <ArrowsPointingOutIcon className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-h3 font-heading font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed mb-4">
                    {project.summary}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-4">
                    {project.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-base text-slate-700">
                        <CheckCircleIcon className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Built With Tech Badges & GitHub Link */}
                <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-tiny font-sans rounded bg-slate-100 text-slate-700 border border-slate-200/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-tiny font-sans text-teal-800 hover:text-teal-900 bg-teal-50 hover:bg-teal-100/70 border border-teal-200/80 font-medium transition-colors shrink-0"
                    >
                      <BootstrapGitHubIcon className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                      <ArrowTopRightOnSquareIcon className="w-3 h-3 text-slate-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
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
