"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { personalInfo } from "@/data/portfolioData";
import {
  ArrowDownTrayIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Engineering", href: "#engineering" },
    { label: "Featured", href: "#featured" },
    { label: "Projects", href: "#projects" },
    { label: "Journey", href: "#journey" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((l) => l.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FBFBFA]/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs py-3"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram & Personal Logo */}
        <Link
          href="#overview"
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
        >
          <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-purple-200 group-hover:border-teal-500 transition-all shadow-sm">
            <Image
              src={personalInfo.brandLogo}
              alt="Christian Marcelino Logo"
              fill
              className="object-cover"
              sizes="36px"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base tracking-tight text-[#0F172A] flex items-center gap-1.5 group-hover:text-teal-700 transition-colors">
              Christian Marcelino <span className="text-gray-400 font-normal">·</span> <span className="text-gray-500 font-mono text-xs sm:text-sm font-normal">Portfolio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-white/90 border border-gray-200 px-3 py-1.5 rounded-full shadow-xs">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? "bg-purple-50 text-purple-700 border border-purple-200 font-semibold shadow-xs"
                    : "text-gray-600 hover:text-[#0F172A] hover:bg-gray-100"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={personalInfo.cvDownloadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium font-mono text-white bg-teal-600 hover:bg-teal-700 border border-teal-500/30 rounded-full shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
            Download CV
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-[#0F172A] hover:border-teal-500 transition-colors shadow-xs"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-5 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-gray-700 hover:text-teal-700 border-b border-gray-100"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            <a
              href={personalInfo.cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium font-mono text-white bg-teal-600 hover:bg-teal-700 rounded-lg shadow-sm"
            >
              <ArrowDownTrayIcon className="w-4 h-4" />
              Download CV (PDF)
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
