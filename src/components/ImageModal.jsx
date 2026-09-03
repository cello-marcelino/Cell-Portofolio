"use client";

import { useEffect } from "react";
import Image from "next/image";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function ImageModal({ isOpen, onClose, images, currentIndex, setCurrentIndex }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) setCurrentIndex(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, currentIndex, images, onClose, setCurrentIndex]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 sm:p-6 md:p-8"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h4 className="text-sm font-semibold text-[#0F172A] font-mono flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-teal-500" />
              {currentImg.title}
            </h4>
            <p className="text-xs text-[#64748B] mt-0.5">{currentImg.caption}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close image preview"
            className="p-2 rounded-lg text-gray-500 hover:text-[#0F172A] hover:bg-gray-200/60 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Image Container */}
        <div className="relative w-full h-[60vh] max-h-[650px] bg-gray-100 flex items-center justify-center p-4">
          <div className="relative w-full h-full">
            <Image
              src={currentImg.src}
              alt={currentImg.title || "Project Screenshot"}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Navigation buttons if multiple images */}
          {images.length > 1 && (
            <>
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(currentIndex - 1)}
                aria-label="Previous screenshot"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 border border-gray-200 text-gray-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                disabled={currentIndex === images.length - 1}
                onClick={() => setCurrentIndex(currentIndex + 1)}
                aria-label="Next screenshot"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/90 border border-gray-200 text-gray-700 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Thumbnail Pagination Bar */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 py-3 px-4 border-t border-gray-200 bg-gray-50 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`View screenshot ${idx + 1}: ${img.title}`}
                className={`relative w-14 h-9 rounded-md overflow-hidden border transition-all shrink-0 ${
                  idx === currentIndex
                    ? "border-teal-500 ring-2 ring-teal-500/30 scale-105"
                    : "border-gray-200 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img.src} alt={img.title} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
