"use client";

import { gsap } from "gsap/dist/gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/dist/Draggable";
import { Flip } from "gsap/dist/Flip";
import { InertiaPlugin } from "gsap/dist/InertiaPlugin";
import { Physics2DPlugin } from "gsap/dist/Physics2DPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

// Register all requested GSAP plugins safely on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(
    useGSAP,
    Draggable,
    Flip,
    InertiaPlugin,
    Physics2DPlugin,
    ScrollTrigger,
    ScrollSmoother,
    ScrollToPlugin
  );
}

export {
  gsap,
  useGSAP,
  Draggable,
  Flip,
  InertiaPlugin,
  Physics2DPlugin,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
};
