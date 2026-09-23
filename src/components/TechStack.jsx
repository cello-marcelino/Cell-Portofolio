import { techEcosystem } from "@/data/portfolioData";
import {
  WrenchScrewdriverIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import {
  ReactIcon,
  NextjsIcon,
  VueIcon,
  LaravelIcon,
  FlaskIcon,
  LivewireIcon,
  TailwindIcon,
  PythonIcon,
  NodejsIcon,
  MySQLIcon,
  SQLiteIcon,
  GitIcon,
  TensorFlowIcon,
  ScikitlearnIcon,
  StreamlitIcon,
  ChartjsIcon,
  PytestIcon,
  PostmanIcon,
} from "@/components/icons/TechIcons";
import { BootstrapGitHubIcon } from "@/components/icons/BootstrapIcons";

export default function TechStack() {
  const getTechIcon = (key) => {
    switch (key) {
      case "NextjsIcon":
        return <NextjsIcon className="w-6 h-6 text-slate-900" />;
      case "ReactIcon":
        return <ReactIcon className="w-6 h-6 text-teal-600" />;
      case "VueIcon":
        return <VueIcon className="w-6 h-6 text-emerald-600" />;
      case "LaravelIcon":
        return <LaravelIcon className="w-6 h-6 text-red-600" />;
      case "FlaskIcon":
        return <FlaskIcon className="w-6 h-6 text-slate-800" />;
      case "LivewireIcon":
        return <LivewireIcon className="w-6 h-6 text-pink-600" />;
      case "TailwindIcon":
        return <TailwindIcon className="w-6 h-6 text-teal-600" />;
      case "PythonIcon":
        return <PythonIcon className="w-6 h-6 text-blue-600" />;
      case "NodejsIcon":
        return <NodejsIcon className="w-6 h-6 text-emerald-700" />;
      case "MySQLIcon":
        return <MySQLIcon className="w-6 h-6 text-teal-700" />;
      case "SQLiteIcon":
        return <SQLiteIcon className="w-6 h-6 text-sky-700" />;
      case "GitIcon":
        return <GitIcon className="w-6 h-6 text-orange-600" />;
      case "GitHubIcon":
        return <BootstrapGitHubIcon className="w-6 h-6 text-slate-900" />;
      case "TensorFlowIcon":
        return <TensorFlowIcon className="w-6 h-6 text-amber-600" />;
      case "ScikitlearnIcon":
        return <ScikitlearnIcon className="w-6 h-6 text-blue-500" />;
      case "StreamlitIcon":
        return <StreamlitIcon className="w-6 h-6 text-red-500" />;
      case "ChartjsIcon":
        return <ChartjsIcon className="w-6 h-6 text-pink-500" />;
      case "PytestIcon":
        return <PytestIcon className="w-6 h-6 text-teal-700" />;
      case "PostmanIcon":
        return <PostmanIcon className="w-6 h-6 text-orange-500" />;
      default:
        return <CommandLineIcon className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <section id="engineering" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-tiny font-sans uppercase tracking-wider font-semibold mb-3">
            <WrenchScrewdriverIcon className="w-3.5 h-3.5 text-teal-700" />
            Engineering Toolchain
          </div>
          <h2 className="text-h2 font-heading font-bold text-slate-900 tracking-tight">
            Frameworks, Libraries & Tools
          </h2>
          <p className="mt-2 text-base text-slate-600 max-w-2xl leading-relaxed font-sans">
            Core technologies, web frameworks, database engines, and developer platforms used to build full-stack web applications and machine learning experiments.
          </p>
        </div>

        {/* Visual Tech Grid (Judul Besar & Ikon Saja — Tanpa Micro-Features & Tanpa Filter Bar) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {techEcosystem.map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400/80 shadow-xs hover:shadow-md transition-all duration-200 group flex items-center gap-3.5"
            >
              {/* Brand SVG Icon */}
              <div className="w-11 h-11 p-2 rounded-xl bg-slate-50 border border-slate-200/60 group-hover:bg-teal-50 group-hover:border-teal-200/80 transition-colors shrink-0 flex items-center justify-center">
                {getTechIcon(tech.iconKey)}
              </div>

              {/* Title & Domain Tag */}
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-heading font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                  {tech.name}
                </h3>
                <p className="text-tiny font-sans text-slate-500 font-medium truncate mt-0.5">
                  {tech.domain}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
