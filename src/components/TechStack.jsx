"use client";

import { techPillars } from "@/data/portfolioData";
import {
  ComputerDesktopIcon,
  ServerStackIcon,
  CpuChipIcon,
  CircleStackIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export default function TechStack() {
  const getIcon = (id) => {
    switch (id) {
      case "frontend":
        return <ComputerDesktopIcon className="w-6 h-6 text-teal-600" />;
      case "backend":
        return <ServerStackIcon className="w-6 h-6 text-purple-600" />;
      case "ai":
        return <CpuChipIcon className="w-6 h-6 text-teal-600" />;
      case "database":
        return <CircleStackIcon className="w-6 h-6 text-purple-600" />;
      default:
        return <ComputerDesktopIcon className="w-6 h-6 text-teal-600" />;
    }
  };

  return (
    <section id="engineering" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono mb-3">
            <WrenchScrewdriverIcon className="w-4 h-4 text-purple-600" />
            Engineering Overview
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0F172A] tracking-tight">
            Skills & Technologies
          </h2>
          <p className="mt-3 text-base text-[#334155]">
            Technologies and development practices I have explored through coursework and hands-on projects.
          </p>
        </div>

        {/* Bento Grid 4 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techPillars.map((pillar) => {
            const isTeal = pillar.accent === "teal";
            return (
              <div
                key={pillar.id}
                className={`p-6 sm:p-8 rounded-2xl transition-all duration-300 ${
                  isTeal ? "lightswind-card-teal" : "lightswind-card"
                }`}
              >
                {/* Pillar Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl border ${
                        isTeal
                          ? "bg-teal-50 border-teal-200 text-teal-700"
                          : "bg-purple-50 border-purple-200 text-purple-700"
                      }`}
                    >
                      {getIcon(pillar.id)}
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-[#0F172A]">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-purple-700/80 font-mono mt-0.5">
                        {pillar.roleDescription}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Skills List */}
                <div className="mt-6 space-y-3">
                  {pillar.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-200/80 hover:border-purple-200 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-medium text-[#0F172A] flex items-center gap-2">
                          <CheckCircleIcon
                            className={`w-4 h-4 shrink-0 ${
                              isTeal ? "text-teal-600" : "text-purple-600"
                            }`}
                          />
                          {skill.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${
                            isTeal
                              ? "bg-teal-50 text-teal-700 border-teal-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                          }`}
                        >
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-[#475569] pl-6 leading-relaxed">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
