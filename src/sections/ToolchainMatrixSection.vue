<script setup>
import { toolchainCategories } from '@/data/portfolio';
import {
  CodeBracketIcon,
  ServerStackIcon,
  CpuChipIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/vue/24/outline';

const getCategoryIcon = (catId) => {
  switch (catId) {
    case 'frontend':
      return CodeBracketIcon;
    case 'backend':
      return ServerStackIcon;
    case 'ai':
      return CpuChipIcon;
    default:
      return WrenchScrewdriverIcon;
  }
};
</script>

<template>
  <section
    id="toolchain"
    class="py-16 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10"
    aria-label="Toolchain, Frameworks & Libraries"
  >
    <!-- Section Header HUD -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
      <div>
        <div class="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-tiny font-sans font-semibold text-teal-800 uppercase tracking-wider mb-3">
          <span>Frameworks & Tooling</span>
        </div>
        <h2 class="text-h2 font-heading font-bold text-slate-900 tracking-tight">
          Tools, Frameworks & Libraries
        </h2>
        <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-sans">
          Minimalist index of verified tools, runtimes, and engineering frameworks utilized across projects.
        </p>
      </div>

      <div class="text-tiny font-mono text-slate-400">
        {{ toolchainCategories.reduce((acc, cat) => acc + cat.items.length, 0) }} VERIFIED TECHNOLOGIES
      </div>
    </div>

    <!-- 4 Minimalist Toolchain Categories -->
    <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="cat in toolchainCategories"
        :key="cat.id"
        class="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-sm flex flex-col justify-between"
      >
        <!-- Category Title Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div class="flex items-center gap-2.5">
            <div
              class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              :class="
                cat.theme === 'violet'
                  ? 'bg-violet-100 text-violet-700'
                  : 'bg-teal-100 text-teal-700'
              "
            >
              <component :is="getCategoryIcon(cat.id)" class="w-4 h-4" />
            </div>
            <h3 class="font-heading font-bold text-base text-slate-900 tracking-tight">
              {{ cat.title }}
            </h3>
          </div>

          <span
            class="px-2 py-0.5 rounded-full text-tiny font-mono font-medium border"
            :class="
              cat.theme === 'violet'
                ? 'bg-violet-50 text-violet-800 border-violet-200'
                : 'bg-teal-50 text-teal-800 border-teal-200'
            "
          >
            {{ cat.items.length }} tools
          </span>
        </div>

        <!-- Pure Official PNG Logo + Name Badges Grid -->
        <div class="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          <div
            v-for="item in cat.items"
            :key="item.name"
            class="flex items-center gap-2.5 sm:gap-3 p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-teal-500 hover:shadow-2xs transition-all duration-150 group"
          >
            <!-- Official PNG Logo in Crisp White Tile -->
            <div
              class="w-7 h-7 sm:w-8 sm:h-8 p-1 rounded-lg bg-white border border-slate-200/80 shadow-2xs shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 duration-150"
            >
              <img
                :src="item.logo"
                :alt="item.name + ' logo'"
                class="w-full h-full object-contain select-none pointer-events-none"
                loading="lazy"
              />
            </div>

            <!-- Tech Name -->
            <span class="text-xs sm:text-sm font-sans font-semibold text-slate-800 group-hover:text-slate-950 truncate">
              {{ item.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
