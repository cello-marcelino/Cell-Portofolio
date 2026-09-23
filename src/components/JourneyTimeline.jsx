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
        return <ClockIcon className="w-5 h-5 text-teal-700" />;
      case "Attention to Detail":
        return <CheckBadgeIcon className="w-5 h-5 text-teal-700" />;
      case "Data Organization":
        return <DocumentCheckIcon className="w-5 h-5 text-teal-700" />;
      default:
        return <CheckBadgeIcon className="w-5 h-5 text-teal-700" />;
    }
  };

  return (
    <section id="journey" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-tiny font-sans uppercase tracking-wider font-semibold mb-3">
            <BriefcaseIcon className="w-3.5 h-3.5 text-teal-700" />
            Experience & Growth
          </div>
          <h2 className="text-h2 font-heading font-bold text-slate-900 tracking-tight">
            Experience & Growth
          </h2>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            Work and education that have provided experience with structured processes, documentation, attention to detail, time management, and balancing technical learning with real-world responsibilities.
          </p>
        </div>

        {/* 3 Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {experienceHighlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/95 backdrop-blur-md transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 border border-slate-200/80 hover:border-teal-300/70"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl border bg-teal-50 border-teal-200/80">
                  {getMetricIcon(item.label)}
                </div>
                <div>
                  <span className="text-tiny font-sans text-slate-500 uppercase tracking-wider block font-semibold">
                    {item.label}
                  </span>
                  <h3 className="text-h3 font-heading font-bold text-slate-900">
                    {item.metric}
                  </h3>
                </div>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline Container with Mathematically Centered Axis */}
        <div className="relative space-y-10 sm:space-y-12">
          {/* Continuous Vertical Timeline Line (Exact Center of Nodes: x=16px on mobile, x=20px on sm+) */}
          <div
            className="absolute left-4 sm:left-5 top-5 bottom-5 w-0.5 -translate-x-1/2 bg-slate-200"
            aria-hidden="true"
          />

          {experienceTimeline.map((item, index) => {
            const isEducation = item.type === "Education";

            return (
              <div key={index} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node Icon - Sits exactly centered on the timeline line */}
                <div className="relative z-10 mt-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 bg-white flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-110 border-teal-600 text-teal-700 shadow-teal-700/10">
                  {isEducation ? (
                    <AcademicCapIcon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700" />
                  ) : (
                    <BuildingOfficeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700" />
                  )}
                </div>

                {/* Content Box */}
                <div className="flex-1 bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-slate-200/80 space-y-3 shadow-xs hover:shadow-md hover:border-teal-300/70 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="tabular-nums font-mono text-tiny font-semibold px-2.5 py-0.5 rounded-full border bg-teal-50 text-teal-800 border-teal-200/80">
                        {item.period}
                      </span>
                      <span className="text-tiny font-sans text-slate-500 font-medium">
                        {item.type}
                      </span>
                    </div>
                    <span className="text-tiny font-sans text-slate-500">
                      {item.location}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-h3 font-heading font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-base font-sans text-teal-800 font-semibold mt-0.5">
                      {item.company}
                    </p>
                  </div>

                  <p className="text-base text-slate-600 leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Key Points */}
                  <div className="pt-2 space-y-1.5">
                    {item.keyTakeaways.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-base text-slate-600">
                        <span className="text-teal-700 font-bold">•</span>
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
