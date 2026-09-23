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
import { gsap } from "@/lib/gsap";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const triggerPhysicsBurst = (originX, originY) => {
    if (typeof window === "undefined") return;
    const particleCount = 20;
    const colors = ["#0D9488", "#14B8A6", "#0F766E", "#5EEAD4", "#334155"];

    for (let i = 0; i < particleCount; i++) {
      const dot = document.createElement("div");
      dot.className = "fixed pointer-events-none rounded-full z-[9999]";
      const size = Math.random() * 6 + 3;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      dot.style.left = `${originX}px`;
      dot.style.top = `${originY}px`;
      document.body.appendChild(dot);

      const angle = Math.random() * 360;
      const velocity = Math.random() * 260 + 100;

      gsap.to(dot, {
        physics2D: {
          velocity: velocity,
          angle: angle,
          gravity: 480,
        },
        opacity: 0,
        scale: 0.1,
        duration: 1.1,
        ease: "power2.out",
        onComplete: () => {
          dot.remove();
        },
      });
    }
  };

  const handleCopyEmail = (e) => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (e && e.clientX && e.clientY) {
      triggerPhysicsBurst(e.clientX, e.clientY);
    }
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 text-center relative overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300/70 transition-all">
          {/* Subtle Ambient Background Spot */}
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-50/70 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-tiny font-sans uppercase tracking-wider font-semibold mb-6">
            <ChatBubbleBottomCenterTextIcon className="w-3.5 h-3.5 text-teal-700" />
            Get in Touch
          </div>

          <h2 className="text-h2 font-heading font-bold text-slate-900 tracking-tight mb-6 max-w-2xl mx-auto">
            Open for Opportunities to Learn & Contribute
          </h2>

          <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed mb-10 font-sans">
            I am open to opportunities where I can contribute, learn from experienced developers, and continue improving. I am particularly interested in internships and junior developer roles focused on web development, backend systems, or applied AI.
          </p>

          {/* Interactive Email Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-8 relative z-10">
            <div className="w-full sm:w-auto flex-1 flex items-center justify-between px-4 py-2.5 rounded-full bg-white border border-slate-300 font-sans text-base text-slate-900 shadow-xs">
              <span className="truncate mr-2 font-medium">{personalInfo.email}</span>
              <button
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 hover:text-teal-700 transition-colors shrink-0 cursor-pointer"
              >
                {copied ? (
                  <CheckIcon className="w-4 h-4 text-teal-700" />
                ) : (
                  <ClipboardDocumentIcon className="w-4 h-4" />
                )}
              </button>
            </div>

            <a
              href={`mailto:${personalInfo.email}?subject=Opportunity%20Inquiry%20-%20Christian%20Marcelino`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-base font-medium font-sans text-white bg-teal-700 hover:bg-teal-800 border border-teal-600 shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
            >
              <EnvelopeIcon className="w-4 h-4" />
              Send Email
            </a>
          </div>

          {copied && (
            <p className="text-tiny font-sans text-teal-800 mb-6 animate-in fade-in font-semibold">
              Email address copied to clipboard!
            </p>
          )}

          {/* Professional Social & Contact Details */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-slate-200/80 text-tiny font-sans text-slate-600 relative z-10">
            {/* Location */}
            <div className="flex items-center gap-1.5">
              <MapPinIcon className="w-4 h-4 text-teal-700" />
              <span>{personalInfo.location}</span>
            </div>

            {/* GitHub */}
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 hover:text-teal-700 font-medium transition-colors"
            >
              <BootstrapGitHubIcon className="w-4 h-4 text-slate-700" />
              <span>github.com/cello-marcelino</span>
              <ArrowTopRightOnSquareIcon className="w-3 h-3 text-slate-400" />
            </a>

            {/* Instagram */}
            <a
              href={personalInfo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-slate-700 hover:text-teal-700 font-medium transition-colors"
            >
              <BootstrapInstagramIcon className="w-4 h-4 text-teal-700" />
              <span>chrstn_mrclno</span>
              <ArrowTopRightOnSquareIcon className="w-3 h-3 text-slate-400" />
            </a>

            {/* Download CV */}
            <a
              href={personalInfo.cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-teal-800 hover:text-teal-950 font-medium transition-colors"
            >
              <ArrowDownTrayIcon className="w-4 h-4 text-teal-700" />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
