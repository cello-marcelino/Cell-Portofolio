# Christian Marcelino — Engineering Portfolio (v2.0.0)

> **Version 2.0.0** — High-performance, minimalist personal software engineering portfolio built with Vue 3, Vite, Matter.js interactive physics, and standalone Tailwind CSS v4.

---

## 🚀 Overview

Personal portfolio of **Christian Marcelino** (Informatics Engineering Student at Politeknik Negeri Batam & Junior Software Developer). Engineered with a minimalist studio aesthetic, calibrated typography hierarchy, zero artificial clutter, and real-time interactive physics.

- **Production Build**: ~50 KB CSS / ~262 KB JS (gzip: ~83 KB) via Vite 8 SPA
- **Modern Asset Pipeline**: 100% WebP image delivery with `loading="lazy"` & `decoding="async"`, yielding a **76% reduction** in media payload (~3.2 MB down to ~0.77 MB)
- **Zero Dead Code**: Unused packages (`@vueuse/core`), dead CSS, and unreferenced exports eliminated through strict codebase audit
- **Standalone Tailwind v4**: Powered natively by `@tailwindcss/vite` without PostCSS or bloated configuration layers

---

## ⚡ Key Highlights & Systems

### 1. Interactive 2D Physics Rain Simulation (`Matter.js`)
- **Rigid-Body Dynamics**: 26 technology tokens simulated with continuous gravitational flow, rotational inertia, and elastic collisions.
- **Passive Cursor Deflection**: Tokens gently veer away from the cursor during pointer movement without intercepting clicks on buttons, cards, or links.
- **Pointer Attraction Vortex**: Holding pointer down on neutral page canvas anchors tokens into an attraction vortex with velocity steering, cluster damping, and high-tension tremor.
- **Radial Repulsion Shockwave**: Releasing the pointer unleashes an explosive $360^\circ$ kinetic blast with speed clamping.
- **Fail-Safe Boundary & Rescue Guards**: 160px thick collision walls prevent tunneling, while a 4-way universal rescue guard automatically recovers any out-of-bounds bodies.

### 2. High-Performance Runtime & HUD Navigation
- **`requestAnimationFrame` Scroll Throttling**: Throttled `getBoundingClientRect` layout tracking in the HUD navigation eliminates layout thrashing during fast scrolling.
- **Smooth Inertial Scrolling**: Powered by [Lenis](https://lenis.darkroom.engineering/) with hardware-accelerated momentum.
- **Isolated Component Architecture**: Clear separation of presentational sections, modal dialogs, and physics canvas.

---

## 🛠️ Tech Stack & Tooling

- **Core Framework**: [Vue 3](https://vuejs.org/) (`<script setup>`, Composition API)
- **Physics Engine**: [Matter.js](https://brm.io/matter-js/) (2D rigid-body simulation)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/) with `@tailwindcss/vite`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Standardized Design Tokens)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/) (Lossless & high-efficiency WebP conversion)
- **Iconography**: [Heroicons](https://heroicons.com/) & Official Tech Vector Assets

---

## 📦 Project Structure

```text
marcell-portofolio/
├── public/
│   ├── brand/               # Favicon & vector brand marks
│   ├── icons/tech/          # Tech stack PNG icons
│   ├── projects/            # Optimized WebP project screenshots
│   └── profile.webp         # Compressed profile portrait
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── FloatingTechBackground.vue # Matter.js 2D physics background
│   │   ├── ProjectDetailModal.vue     # Interactive project screenshot lightbox
│   │   ├── StudioHeaderHUD.vue        # Floating HUD navigation with rAF scroll tracking
│   │   └── StudioFooterHUD.vue        # Status bar footer
│   ├── composables/         # Modular Vue composables (useSmoothScroll)
│   ├── data/                # Single Source of Truth (portfolio.js)
│   ├── sections/            # Domain-specific page sections
│   │   ├── HeroSection.vue
│   │   ├── ArchitectureCoreSection.vue
│   │   ├── ProjectsGallerySection.vue
│   │   ├── ToolchainSection.vue
│   │   ├── GitTimelineSection.vue
│   │   └── EngineeringContactSection.vue
│   ├── style.css            # Global design tokens and typography hierarchy
│   ├── App.vue              # Root layout container
│   └── main.js              # Application entry point
├── package.json
└── vite.config.js
```

---

## 💻 Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Start development server (HMR on port 5173)
npm run dev

# 3. Build for production (optimized output in dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🏷️ Version History

- **v2.0.0** (`main`):
  - Upgraded background into an interactive 2D Matter.js physics simulation with attraction vortex and kinetic shockwaves.
  - Modernized all media assets to WebP (76% bandwidth reduction).
  - Throttled HUD navigation scroll tracking with `requestAnimationFrame`.
  - Comprehensive dead code audit: removed unneeded dependencies, unused CSS, and obsolete aliases.
  - Complete migration from Next.js to Vue 3 SPA with standalone Tailwind v4.
- **v1.0.0** (`portfolio-v1.0`): Initial Next.js & React portfolio iteration.
