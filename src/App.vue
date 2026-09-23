<script setup>
import { useSmoothScroll } from '@/composables/useSmoothScroll';

import FloatingTechBackground from '@/components/FloatingTechBackground.vue';
import StudioHeaderHUD from '@/components/StudioHeaderHUD.vue';
import StudioFooter from '@/components/StudioFooter.vue';

import HeroConsoleSection from '@/sections/HeroConsoleSection.vue';
import ExpertiseSection from '@/sections/ExpertiseSection.vue';
import ProjectsGallerySection from '@/sections/ProjectsGallerySection.vue';
import ToolchainMatrixSection from '@/sections/ToolchainMatrixSection.vue';
import GitTimelineSection from '@/sections/GitTimelineSection.vue';
import DispatchConsoleSection from '@/sections/DispatchConsoleSection.vue';

// Initialize Lenis smooth scroll
useSmoothScroll();
</script>

<template>
  <div class="min-h-screen bg-[#F8FAFC] text-[#0F172A] relative overflow-x-hidden selection:bg-teal-100 selection:text-teal-900">
    <!-- Ambient Floating Tech Badges Background Animation -->
    <FloatingTechBackground />

    <!-- Floating Command Header HUD -->
    <StudioHeaderHUD />

    <!-- Main Content Workstation -->
    <main class="relative z-10 flex flex-col">
      <!-- 01. Hero & Systems Console -->
      <HeroConsoleSection />

      <!-- 02. Three Pillars of Expertise -->
      <ExpertiseSection />

      <!-- 03. Interactive Visual Projects Gallery (Cinema Slider + Grid Toggle) -->
      <ProjectsGallerySection />

      <!-- 03. Minimalist Toolchain Pipeline Matrix (Pure Logos + Names) -->
      <ToolchainMatrixSection />

      <!-- 04. Linear Experience Timeline (Cardless Graph) -->
      <GitTimelineSection />

      <!-- 05. Command Dispatch Contact Console -->
      <DispatchConsoleSection />
    </main>

    <!-- Studio Telemetry Footer -->
    <StudioFooter />
  </div>
</template>
