"use client";

import Image from "next/image";
import { personalInfo } from "@/data/portfolioData";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import {
  BootstrapGitHubIcon,
  BootstrapInstagramIcon,
} from "@/components/icons/BootstrapIcons";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-gray-200 bg-[#F8FAFC] py-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-200">
              <Image
                src={personalInfo.brandLogo}
                alt="Brand Logo"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div>
              <p className="text-sm font-heading font-bold text-[#0F172A]">
                Christian Marcelino
              </p>
              <p className="text-[11px] font-mono text-gray-500">
                Informatics Engineering • Politeknik Negeri Batam
              </p>
            </div>
          </div>

          {/* Center Links & Copyright */}
          <div className="flex flex-col items-center sm:items-start md:items-center gap-1.5">
            <div className="flex items-center gap-4 text-xs font-mono">
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-purple-700 transition-colors font-medium"
              >
                <BootstrapGitHubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-gray-300">•</span>
              <a
                href={personalInfo.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-gray-600 hover:text-teal-700 transition-colors font-medium"
              >
                <BootstrapInstagramIcon className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
              <span className="text-gray-300">•</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-600 hover:text-[#0F172A] transition-colors"
              >
                {personalInfo.email}
              </a>
            </div>
            <div className="text-center text-xs font-mono text-gray-500">
              © {new Date().getFullYear()} Christian Marcelino · Portfolio
            </div>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="flex items-center gap-2 text-xs font-mono text-gray-600 hover:text-teal-700 transition-colors p-2 rounded-lg hover:bg-gray-200/60"
          >
            <span>Back to top</span>
            <ArrowUpIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
