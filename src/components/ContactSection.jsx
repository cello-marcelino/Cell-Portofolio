"use client";

import { useState } from "react";
import { personalInfo } from "@/data/portfolioData";
import {
  EnvelopeIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowDownTrayIcon,
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import {
  BootstrapGitHubIcon,
  BootstrapInstagramIcon,
} from "@/components/icons/BootstrapIcons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lightswind-card rounded-3xl p-8 sm:p-12 lg:p-16 border border-purple-100 text-center relative overflow-hidden shadow-md">
          {/* Ambient Background Spot (Soft Light Mode) */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-100/60 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-100/60 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-mono mb-6">
            <ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-teal-600" />
            Get in Touch
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#0F172A] tracking-tight mb-6 max-w-2xl mx-auto">
            Open for Opportunities to Learn & Contribute
          </h2>

          <p className="text-sm sm:text-base text-[#334155] max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
            I am open to opportunities where I can contribute, learn from experienced developers, and continue improving. I am particularly interested in internships and junior developer roles focused on web development, backend systems, or applied AI.
          </p>

          {/* Interactive Email Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8">
            <div className="w-full sm:w-auto flex-1 flex items-center justify-between px-4 py-3 rounded-full bg-white border border-gray-300 font-mono text-xs text-[#0F172A] shadow-xs">
              <span className="truncate mr-2 font-medium">{personalInfo.email}</span>
              <button
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-teal-700 transition-colors shrink-0"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4 text-teal-600" />
                ) : (
                  <ClipboardDocumentIcon className="w-4 h-4" />
                )}
              </button>
            </div>

            <a
              href={`mailto:${personalInfo.email}?subject=Opportunity%20Inquiry%20-%20Christian%20Marcelino`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold font-mono text-white bg-teal-600 hover:bg-teal-700 border border-teal-500/40 shadow-sm hover:shadow transition-all shrink-0"
            >
              <EnvelopeIcon className="w-4 h-4" />
              Send Email
            </a>
          </div>

          {copied && (
            <p className="text-xs font-mono text-teal-700 mb-6 animate-in fade-in font-semibold">
              ✓ Email address copied to clipboard!
            </p>
          )}

          {/* Professional Social & Contact Details */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-gray-200 text-xs font-mono text-[#64748B]">
            {/* Location */}
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="w-4 h-4 text-purple-600" />
              <span>{personalInfo.location}</span>
            </div>

            {/* GitHub */}
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-700 hover:text-purple-700 font-medium transition-colors"
            >
              <BootstrapGitHubIcon className="w-4 h-4 text-purple-700" />
              <span>github.com/cello-marcelino</span>
              <ArrowTopRightOnSquareIcon className="w-3 h-3 text-gray-400" />
            </a>

            {/* Instagram */}
            <a
              href={personalInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-700 hover:text-teal-700 font-medium transition-colors"
            >
              <BootstrapInstagramIcon className="w-4 h-4 text-teal-700" />
              <span>chrstn_mrclno</span>
              <ArrowTopRightOnSquareIcon className="w-3 h-3 text-gray-400" />
            </a>

            {/* Download CV */}
            <a
              href={personalInfo.cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-teal-700 hover:text-teal-900 font-medium transition-colors"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
