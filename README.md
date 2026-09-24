# Christian Marcelino — Engineering Portfolio (v2.0.0)

> **Version 2.0.0** — High-performance, minimalist personal software engineering portfolio built with Vue 3, Vite, and standalone Tailwind CSS v4.

---

## 🚀 Overview

Personal portfolio of **Christian Marcelino** (Informatics Engineering Student at Politeknik Negeri Batam & Junior Developer). Designed with an engineering studio aesthetic, calibrated typography hierarchy, and zero artificial clutter.

- **Production Build**: ~50 KB CSS / ~170 KB JS (Vite SPA)
- **Zero Dead Code**: Cleaned through comprehensive codebase audit
- **Standalone Tailwind v4**: Powered directly by `@tailwindcss/vite` without PostCSS overhead

---

## 🛠️ Tech Stack & Architecture

- **Core Framework**: [Vue 3](https://vuejs.org/) (`<script setup>`, Composition API)
- **Bundler & Tooling**: [Vite 8](https://vite.dev/) with `@tailwindcss/vite`
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Standardized Design Tokens)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)
- **Iconography**: Official Tech PNGs & [Heroicons](https://heroicons.com/)

---

## 📦 Project Structure

```text
src/
├── components/          # Reusable UI components (HUD Header, Footer, Modals, Background)
│   ├── icons/           # Social SVG icons
├── composables/         # Modular Vue composables (useSmoothScroll)
├── data/                # Single Source of Truth (portfolio.js)
├── sections/            # Domain-specific page sections (Hero, Expertise, Projects, Toolchain, Timeline, Contact)
├── style.css            # Global design tokens and typography hierarchy
├── App.vue              # Root layout container
└── main.js              # Application entry point
```

---

## 💻 Development & Build Commands

```bash
# Install dependencies
npm install

# Start development server (HMR on port 5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🏷️ Version History

- **v2.0.0** (`marcell-portofolio`): Complete migration to Vue 3 SPA, interactive project slider, 70:20 balanced AI Integration pillar, standalone Tailwind v4, and full dead-code audit.
- **v1.0.0** (`main`): Initial Next.js & React portfolio iteration.

