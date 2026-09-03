"use client";

import {
  experienceTimeline,
  experienceHighlights,
} from "@/data/portfolioData";
import {
  BriefcaseIcon,
  AcademicCapIcon,
  ClockIcon,
  CheckBadgeIcon,
  DocumentCheckIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

export default function JourneyTimeline() {
  const getMetricIcon = (label) => {
    switch (label) {
      case "Time Management":
        return <ClockIcon className="w-5 h-5 text-purple-600" />;
      case "Attention to Detail":
        return <CheckBadgeIcon className="w-5 h-5 text-teal-600" />;
      case "Data Organization":
        return <DocumentCheckIcon className="w-5 h-5 text-purple-600" />;
      default:
        return <CheckBadgeIcon className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section id="journey" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono mb-3">
            <BriefcaseIcon className="w-4 h-4 text-purple-600" />
            Experience & Growth
          </div>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#0F172A] tracking-tight">
            Experience & Growth
          </h2>
          <p className="mt-3 text-base text-[#334155]">
            Work and education that have provided experience with structured processes, documentation, attention to detail, time management, and balancing technical learning with real-world responsibilities.
          </p>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {experienceHighlights.map((item, idx) => {
            const isTeal = item.accent === "teal";
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all ${
                  isTeal ? "lightswind-card-teal" : "lightswind-card"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`p-2 rounded-xl border ${
                      isTeal
                        ? "bg-teal-50 border-teal-200"
                        : "bg-purple-50 border-purple-200"
                    }`}
                  >
                    {getMetricIcon(item.label)}
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-gray-500 uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <h3 className="text-base font-heading font-bold text-[#0F172A]">
                      {item.metric}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Timeline Container with Mathematically Centered Axis */}
        <div className="relative space-y-10 sm:space-y-12">
          {/* Continuous Vertical Timeline Line (Exact Center of Nodes: x=16px on mobile, x=20px on sm+) */}
          <div
            className="absolute left-4 sm:left-5 top-5 bottom-5 w-0.5 -translate-x-1/2 bg-purple-200/90"
            aria-hidden="true"
          />

          {experienceTimeline.map((item, index) => {
            const isEducation = item.type === "Education";
            const isTeal = item.badgeColor === "teal";

            return (
              <div key={index} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node Icon - Sits exactly centered on the timeline line */}
                <div
                  className={`relative z-10 mt-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 bg-white flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110 ${
                    isTeal
                      ? "border-teal-500 text-teal-600 shadow-teal-500/10"
                      : "border-purple-500 text-purple-600 shadow-purple-500/10"
                  }`}
                >
                  {isEducation ? (
                    <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  ) : (
                    <BuildingOfficeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                  )}
                </div>

                {/* Content Box */}
                <div className="flex-1 lightswind-card rounded-2xl p-6 sm:p-7 border border-gray-200/80 space-y-3 shadow-xs hover:shadow-md transition-shadow">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full border ${
                          isTeal
                            ? "bg-teal-50 text-teal-700 border-teal-200"
                            : "bg-purple-50 text-purple-700 border-purple-200"
                        }`}
                      >
                        {item.period}
                      </span>
                      <span className="text-xs font-mono text-gray-500">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-gray-500">
                      {item.location}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-heading font-bold text-[#0F172A] group-hover:text-teal-700 transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-xs font-mono text-purple-700 font-semibold mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  <p className="text-xs text-[#334155] leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Key Points */}
                  <div className="pt-2 space-y-1.5">
                    {item.keyTakeaways.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-[#475569]">
                        <span className="text-teal-600 font-bold">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
