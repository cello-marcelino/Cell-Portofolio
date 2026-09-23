<script setup>
import { coreExpertise } from '@/data/portfolio';
import {
  CodeBracketIcon,
  ServerStackIcon,
  CpuChipIcon,
} from '@heroicons/vue/24/outline';

const getExpertiseIcon = (iconKey) => {
  switch (iconKey) {
    case 'CodeBracketIcon':
      return CodeBracketIcon;
    case 'ServerStackIcon':
      return ServerStackIcon;
    case 'CpuChipIcon':
      return CpuChipIcon;
    default:
      return CodeBracketIcon;
  }
};
</script>

<template>
  <section
    id="expertise"
    class="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10"
    aria-label="Core Engineering Expertise"
  >
    <!-- Hidden anchor for legacy engineering hash link -->
    <div id="engineering" class="absolute -top-24 left-0 pointer-events-none" />

    <div class="space-y-6">
      <!-- Section Header -->
      <div class="pb-6 border-b border-slate-200/90">
        <div class="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-tiny font-sans font-semibold text-teal-800 uppercase tracking-wider mb-3">
          <span>Core Engineering Focus</span>
        </div>
        <h2 class="text-h2 font-heading font-bold text-slate-900 tracking-tight">
          Three Pillars of Expertise
        </h2>
        <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-sans">
          Focused specialization in reactive interfaces, relational fullstack architectures, and applied NLP retrieval systems with RAG & LLM integration.
        </p>
      </div>

      <!-- 3 Focused Expertise Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div
          v-for="pillar in coreExpertise"
          :key="pillar.id"
          class="bg-white rounded-2xl border p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
          :class="
            pillar.theme === 'violet'
              ? 'border-violet-200/90 hover:border-violet-400'
              : 'border-slate-200/90 hover:border-teal-400'
          "
        >
          <div class="space-y-4">
            <!-- Pillar Icon -->
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-200"
              :class="
                pillar.theme === 'violet'
                  ? 'bg-violet-100 text-violet-700'
                  : 'bg-teal-100 text-teal-700'
              "
            >
              <component :is="getExpertiseIcon(pillar.iconKey)" class="w-6 h-6" />
            </div>

            <!-- Title & Role -->
            <div>
              <h3 class="text-lg font-heading font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {{ pillar.title }}
              </h3>
              <p class="text-xs font-mono text-slate-500 mt-1">
                {{ pillar.role }}
              </p>
            </div>

            <!-- 1-Sentence Short Explanation -->
            <p class="text-sm text-slate-600 font-sans leading-relaxed">
              {{ pillar.summary }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
