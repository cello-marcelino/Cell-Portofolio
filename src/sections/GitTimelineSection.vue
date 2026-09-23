<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { gitTimelineNodes } from '@/data/portfolio';
import { BriefcaseIcon } from '@heroicons/vue/24/outline';

const activeBranch = ref('all'); // 'all' | 'polibatam' | 'industry'
const visibleNodeIds = ref(new Set());
let observer = null;

const filteredNodes = computed(() => {
  if (activeBranch.value === 'all') return gitTimelineNodes;
  return gitTimelineNodes.filter((node) => node.branch === activeBranch.value);
});

const setupObserver = () => {
  if (typeof window === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gitTimelineNodes.forEach((n) => visibleNodeIds.value.add(n.id));
    return;
  }

  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-node-id');
          if (id) {
            visibleNodeIds.value.add(id);
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  nextTick(() => {
    const elements = document.querySelectorAll('.timeline-node-row');
    elements.forEach((el) => observer.observe(el));
  });
};

onMounted(() => {
  setupObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

watch(activeBranch, () => {
  nextTick(() => {
    setupObserver();
  });
});
</script>

<template>
  <section
    id="timeline"
    class="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full relative z-10"
    aria-label="Linear Experience Timeline"
  >
    <!-- Hidden anchor for legacy journey hash link -->
    <div id="journey" class="absolute -top-24 left-0 pointer-events-none" />

    <!-- Section Header HUD -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
      <div>
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-tiny font-sans font-semibold text-teal-800 uppercase tracking-wider mb-3">
          <BriefcaseIcon class="w-3.5 h-3.5" />
          <span>Linear Timeline</span>
        </div>
        <h2 class="text-h2 font-heading font-bold text-slate-900 tracking-tight">
          Experience & Academic Timeline
        </h2>
        <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-sans">
          Concurrent linear graph tracking academic software engineering alongside industrial manufacturing discipline.
        </p>
      </div>

      <!-- Branch Filter Selector -->
      <div class="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
        <button
          @click="activeBranch = 'all'"
          class="px-3 py-1.5 text-tiny font-sans font-medium rounded-lg transition-all cursor-pointer"
          :class="
            activeBranch === 'all'
              ? 'bg-white text-slate-900 font-semibold shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          "
        >
          All (5)
        </button>
        <button
          @click="activeBranch = 'polibatam'"
          class="px-3 py-1.5 text-tiny font-sans font-medium rounded-lg transition-all cursor-pointer"
          :class="
            activeBranch === 'polibatam'
              ? 'bg-teal-700 text-white font-semibold shadow-2xs'
              : 'text-teal-800 hover:text-teal-900'
          "
        >
          <span>Academic</span>
        </button>
        <button
          @click="activeBranch = 'industry'"
          class="px-3 py-1.5 text-tiny font-sans font-medium rounded-lg transition-all cursor-pointer"
          :class="
            activeBranch === 'industry'
              ? 'bg-violet-700 text-white font-semibold shadow-2xs'
              : 'text-violet-800 hover:text-violet-900'
          "
        >
          <span>Industry</span>
        </button>
      </div>
    </div>

    <!-- Clean Linear Graph Stream (Zero Cards, Zero CLI Noise) -->
    <div class="mt-12 relative">
      <!-- Dual Continuous Vertical Rails -->
      <div class="absolute top-3 bottom-6 left-0 w-14 sm:w-20 pointer-events-none" aria-hidden="true">
        <!-- Rail 0 (polibatam: Academic) -->
        <div
          class="absolute top-0 bottom-0 left-[14px] sm:left-[18px] w-[2px] transition-colors duration-300"
          :class="activeBranch === 'industry' ? 'bg-slate-200' : 'bg-teal-500/80'"
        />
        <!-- Rail 1 (industry: Industrial / Admin) -->
        <div
          class="absolute top-0 bottom-0 left-[38px] sm:left-[50px] w-[2px] transition-colors duration-300"
          :class="activeBranch === 'polibatam' ? 'bg-slate-200' : 'bg-violet-500/80'"
        />
      </div>

      <!-- Linear Graph Rows -->
      <div class="relative z-10 space-y-1">
        <div
          v-for="node in filteredNodes"
          :key="node.id"
          :data-node-id="node.id"
          class="timeline-node-row relative flex items-start gap-4 sm:gap-6 py-6 sm:py-8 border-b border-slate-200/60 group"
        >
          <!-- Left Column: Graph Rail Node Dot & Horizontal Connector Stroke -->
          <div class="w-14 sm:w-20 shrink-0 relative h-8 flex items-center">
            <!-- Node Circle on Rail 0 (Academic / Polibatam) -->
            <template v-if="node.branch === 'polibatam'">
              <!-- Horizontal Branch Connector to text -->
              <div
                class="absolute top-1/2 -translate-y-1/2 left-[15px] sm:left-[19px] right-0 h-[2px] bg-teal-400/80 transition-all duration-500 origin-left"
                :class="visibleNodeIds.has(node.id) ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'"
              />

              <!-- Commit Node -->
              <div
                class="absolute top-1/2 -translate-y-1/2 left-[15px] sm:left-[19px] -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-teal-700 bg-white ring-2 ring-teal-100 transition-all duration-500 z-10"
                :class="visibleNodeIds.has(node.id) ? 'scale-100 opacity-100' : 'scale-75 opacity-40'"
              />
            </template>

            <!-- Node Circle on Rail 1 (Industry) -->
            <template v-else>
              <!-- Horizontal Branch Connector to text -->
              <div
                class="absolute top-1/2 -translate-y-1/2 left-[39px] sm:left-[51px] right-0 h-[2px] bg-violet-400/80 transition-all duration-500 origin-left"
                :class="visibleNodeIds.has(node.id) ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'"
              />

              <!-- Commit Node -->
              <div
                class="absolute top-1/2 -translate-y-1/2 left-[39px] sm:left-[51px] -translate-x-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-2 border-violet-700 bg-white ring-2 ring-violet-100 transition-all duration-500 z-10"
                :class="visibleNodeIds.has(node.id) ? 'scale-100 opacity-100' : 'scale-75 opacity-40'"
              />
            </template>
          </div>

          <!-- Right Column: Clean Linear Graph Text Stream -->
          <!-- Features Smooth Slide-In Transition on Scroll (Zero Cards) -->
          <div
            class="flex-1 min-w-0 transition-all duration-700 ease-out transform"
            :class="
              visibleNodeIds.has(node.id)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10 sm:translate-x-16 pointer-events-none'
            "
          >
            <!-- Date & Track Indicator -->
            <div class="flex items-center gap-2.5 mb-1.5">
              <span
                class="text-xs font-mono font-semibold tracking-wide"
                :class="node.branch === 'polibatam' ? 'text-teal-700' : 'text-violet-700'"
              >
                {{ node.date }}
              </span>
              <span class="text-slate-300">·</span>
              <span class="text-xs font-sans text-slate-500 font-medium">
                {{ node.branch === 'polibatam' ? 'Academic Focus' : 'Industry & Operations' }}
              </span>
            </div>

            <!-- Role Title & Organization -->
            <div>
              <h3 class="text-lg sm:text-xl font-heading font-bold text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
                {{ node.title }}
              </h3>
              <p class="text-sm font-sans font-semibold text-slate-700 mt-0.5">
                {{ node.organization }}
              </p>
            </div>

            <!-- 1-Sentence Concise Supporting Note -->
            <p class="mt-2 text-sm text-slate-600 font-sans leading-relaxed max-w-3xl">
              {{ node.note }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
