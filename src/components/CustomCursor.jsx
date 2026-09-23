"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let isHoveringInteractive = false;

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);

      // Snappy center precision dot
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power1.out",
      });

      // Smooth lag follower ring
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.28,
        ease: "power2.out",
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const interactiveEl = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], .cursor-pointer, .cursor-grab'
      );

      if (interactiveEl && !isHoveringInteractive) {
        isHoveringInteractive = true;
        gsap.to(ring, {
          scale: 1.6,
          borderColor: "#0D9488",
          backgroundColor: "rgba(13, 148, 136, 0.08)",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 0.6,
          backgroundColor: "#0D9488",
          duration: 0.2,
        });
      } else if (!interactiveEl && isHoveringInteractive) {
        isHoveringInteractive = false;
        gsap.to(ring, {
          scale: 1,
          borderColor: "rgba(13, 148, 136, 0.4)",
          backgroundColor: "transparent",
          duration: 0.25,
          ease: "power2.out",
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#0F766E",
          duration: 0.2,
        });
      }
    };

    const handleMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.12 });
    };

    const handleMouseUp = () => {
      gsap.to(ring, { scale: isHoveringInteractive ? 1.6 : 1, duration: 0.2 });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Outer Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-teal-600/40 pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
      {/* Center Precision Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-teal-700 pointer-events-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />
    </div>
  );
}
