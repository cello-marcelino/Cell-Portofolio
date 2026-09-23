"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({ children }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const smootherRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    // Initialize ScrollSmoother
    const ctx = gsap.context(() => {
      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 1.15,
        effects: true,
        smoothTouch: 0.1,
      });

      smootherRef.current = smoother;

      // Global smooth anchor navigation
      const handleAnchorClick = (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;
        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          smoother.scrollTo(targetEl, true, "top top");
        }
      };

      document.addEventListener("click", handleAnchorClick);

      return () => {
        document.removeEventListener("click", handleAnchorClick);
      };
    });

    return () => {
      ctx.revert();
      if (smootherRef.current) {
        smootherRef.current.kill();
        smootherRef.current = null;
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      id="smooth-wrapper"
      ref={wrapperRef}
      className="w-full min-h-screen overflow-hidden"
    >
      <div
        id="smooth-content"
        ref={contentRef}
        className="w-full min-h-screen will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}
