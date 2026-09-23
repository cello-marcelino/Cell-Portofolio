<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CommandLineIcon,
  AcademicCapIcon,
  LightBulbIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
} from '@heroicons/vue/24/outline';
import { BootstrapGitHubIcon } from '@/components/icons/SocialIcons';
import { stopSmoothScroll, startSmoothScroll } from '@/composables/useSmoothScroll';

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close']);

const activeImageIndex = ref(0);
const activeTab = ref('architecture'); // 'architecture' | 'flow' | 'learnings'
const fitMode = ref('cover'); // 'cover' | 'contain'

const toggleFitMode = () => {
  fitMode.value = fitMode.value === 'cover' ? 'contain' : 'cover';
};

// Reset active states when a new project is loaded
watch(
  () => props.project,
  () => {
    activeImageIndex.value = 0;
    activeTab.value = 'architecture';
    fitMode.value = 'cover';
  }
);

// Lock body & html scroll when modal is open and pause Lenis smooth scroll
watch(
  () => props.isOpen,
  (open) => {
    if (typeof document !== 'undefined') {
      if (open) {
        document.documentElement.classList.add('overflow-hidden');
        document.body.classList.add('overflow-hidden');
        stopSmoothScroll();
      } else {
        document.documentElement.classList.remove('overflow-hidden');
        document.body.classList.remove('overflow-hidden');
        startSmoothScroll();
      }
    }
  }
);

const handleKeyDown = (e) => {
  if (!props.isOpen) return;
  if (e.key === 'Escape') {
    emit('close');
  } else if (e.key === 'ArrowLeft') {
    prevImage();
  } else if (e.key === 'ArrowRight') {
    nextImage();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  if (typeof document !== 'undefined') {
    document.documentElement.classList.remove('overflow-hidden');
    document.body.classList.remove('overflow-hidden');
    startSmoothScroll();
  }
});

const imagesList = computed(() => {
  if (!props.project) return [];
  const list = [];
  if (props.project.primaryVisual) {
    list.push({
      src: props.project.primaryVisual,
      title: 'Main System Interface',
      caption: props.project.tagline || props.project.oneLiner,
    });
  }
  if (props.project.screenshots && props.project.screenshots.length > 0) {
    props.project.screenshots.forEach((s) => {
      // Avoid duplicate of primaryVisual
      if (s.src !== props.project.primaryVisual) {
        list.push(s);
      }
    });
  }
  return list;
});

const currentImage = computed(() => {
  if (!imagesList.value.length) return null;
  return imagesList.value[activeImageIndex.value] || imagesList.value[0];
});

const nextImage = () => {
  if (!imagesList.value.length) return;
  activeImageIndex.value = (activeImageIndex.value + 1) % imagesList.value.length;
};

const prevImage = () => {
  if (!imagesList.value.length) return;
  activeImageIndex.value =
    (activeImageIndex.value - 1 + imagesList.value.length) % imagesList.value.length;
};
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && project"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overscroll-contain"
        data-lenis-prevent
        @click.self="emit('close')"
      >
        <div
          class="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh] sm:max-h-[88vh] animate-in fade-in zoom-in-95 duration-150"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="'modal-title-' + project.id"
          data-lenis-prevent
        >
          <!-- Modal Top Header HUD -->
          <div
            class="px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/80 flex items-center justify-between gap-4 shrink-0"
          >
            <div class="flex items-center gap-2.5 flex-wrap">
              <span
                class="px-2.5 py-0.5 rounded-full text-tiny font-sans font-semibold uppercase tracking-wider border"
                :class="
                  project.theme === 'violet'
                    ? 'bg-violet-50 text-violet-800 border-violet-200'
                    : 'bg-teal-50 text-teal-800 border-teal-200'
                "
              >
                {{ project.categoryLabel || project.category }}
              </span>
              <span class="text-tiny font-mono text-slate-400">#{{ project.year }}</span>
              <span class="text-xs text-slate-300">|</span>
              <span class="text-tiny font-mono text-slate-500 hidden sm:inline">
                {{ project.architecture }}
              </span>
            </div>

            <!-- Close Action Button -->
            <button
              @click="emit('close')"
              class="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Scrollable Modal Body -->
          <div
            class="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-6 focus:outline-none"
            data-lenis-prevent
            tabindex="0"
          >
            <!-- Project Header Titles -->
            <div>
              <h2
                :id="'modal-title-' + project.id"
                class="text-h2 font-heading font-bold text-slate-900 tracking-tight"
              >
                {{ project.title }}
              </h2>
              <p class="mt-1 text-sm text-slate-600 font-sans leading-relaxed">
                {{ project.oneLiner }}
              </p>
            </div>

            <!-- Interactive Image Gallery Viewer -->
            <div
              v-if="imagesList.length > 0"
              class="rounded-xl border border-slate-200 bg-slate-900 overflow-hidden relative group"
            >
              <!-- Primary View Area -->
              <div
                class="relative w-full aspect-[16/10] sm:aspect-[2.05/1] max-h-[460px] bg-slate-950 flex items-center justify-center overflow-hidden"
              >
                <!-- Ambient color blur backdrop for contain mode to eliminate harsh black gaps -->
                <div
                  v-if="currentImage && fitMode === 'contain'"
                  class="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-30 scale-110 pointer-events-none select-none transition-opacity duration-300"
                  :style="{ backgroundImage: `url(${currentImage.src})` }"
                  aria-hidden="true"
                ></div>

                <!-- Main Screenshot Image -->
                <img
                  v-if="currentImage"
                  :key="currentImage.src"
                  :src="currentImage.src"
                  :alt="currentImage.title"
                  :class="
                    fitMode === 'cover'
                      ? 'w-full h-full object-cover object-top'
                      : 'relative z-10 max-w-full max-h-full object-contain object-center drop-shadow-xl'
                  "
                  class="transition-all duration-200 select-none"
                  draggable="false"
                  loading="lazy"
                />

                <!-- Top Controls Overlay: Fit / Fill Toggle -->
                <button
                  @click.stop="toggleFitMode"
                  class="absolute top-3 right-3 z-20 px-2.5 py-1.5 rounded-lg bg-slate-900/85 hover:bg-slate-900 text-slate-200 hover:text-white border border-slate-700/80 shadow-md transition-all cursor-pointer backdrop-blur-sm flex items-center gap-1.5 text-xs font-mono"
                  :title="fitMode === 'cover' ? 'Tampilkan gambar penuh (Fit)' : 'Penuhi wadah (Fill)'"
                  :aria-label="fitMode === 'cover' ? 'Fit entire screenshot' : 'Fill viewer container'"
                >
                  <ArrowsPointingOutIcon v-if="fitMode === 'cover'" class="w-3.5 h-3.5 text-slate-300" />
                  <ArrowsPointingInIcon v-else class="w-3.5 h-3.5 text-teal-400" />
                  <span class="text-tiny uppercase tracking-wider font-semibold">
                    {{ fitMode === 'cover' ? 'Fit' : 'Fill' }}
                  </span>
                </button>

                <!-- Prev / Next Navigation Arrows (if multiple images) -->
                <template v-if="imagesList.length > 1">
                  <button
                    @click.stop="prevImage"
                    class="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white border border-slate-700/80 shadow-md transition-all opacity-80 hover:opacity-100 cursor-pointer backdrop-blur-sm"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeftIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click.stop="nextImage"
                    class="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-slate-900/85 hover:bg-slate-900 text-white border border-slate-700/80 shadow-md transition-all opacity-80 hover:opacity-100 cursor-pointer backdrop-blur-sm"
                    aria-label="Next screenshot"
                  >
                    <ChevronRightIcon class="w-4 h-4" />
                  </button>
                </template>
              </div>

              <!-- Thumbnails Selector Strip -->
              <div
                v-if="imagesList.length > 1"
                class="p-2.5 bg-slate-950/60 border-t border-slate-800/80 overflow-x-auto"
              >
                <div class="flex items-center justify-center min-w-max mx-auto gap-2">
                  <button
                    v-for="(img, idx) in imagesList"
                    :key="idx"
                    @click="activeImageIndex = idx"
                    class="relative h-12 w-20 rounded-md overflow-hidden border-2 shrink-0 transition-all cursor-pointer"
                    :class="
                      activeImageIndex === idx
                        ? (project.theme === 'violet' ? 'border-violet-500 ring-1 ring-violet-500 opacity-100' : 'border-teal-500 ring-1 ring-teal-500 opacity-100')
                        : 'border-slate-800 opacity-50 hover:opacity-80'
                    "
                  >
                    <img :src="img.src" :alt="img.title" class="w-full h-full object-cover" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Deep Dive Technical Breakdown (Hairline Divided Structure) -->
            <div class="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <!-- Tab Header HUD -->
              <div class="flex border-b border-slate-200 bg-slate-50 text-xs font-sans font-medium">
                <button
                  @click="activeTab = 'architecture'"
                  class="px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer"
                  :class="
                    activeTab === 'architecture'
                      ? (project.theme === 'violet' ? 'border-violet-700 text-violet-800 font-semibold bg-white' : 'border-teal-700 text-teal-800 font-semibold bg-white')
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  "
                >
                  <CommandLineIcon class="w-4 h-4" />
                  <span>What I Built</span>
                </button>
                <button
                  @click="activeTab = 'flow'"
                  class="px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer"
                  :class="
                    activeTab === 'flow'
                      ? (project.theme === 'violet' ? 'border-violet-700 text-violet-800 font-semibold bg-white' : 'border-teal-700 text-teal-800 font-semibold bg-white')
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  "
                >
                  <AcademicCapIcon class="w-4 h-4" />
                  <span>How It Works</span>
                </button>
                <button
                  @click="activeTab = 'learnings'"
                  class="px-4 py-2.5 flex items-center gap-2 border-b-2 transition-colors cursor-pointer"
                  :class="
                    activeTab === 'learnings'
                      ? (project.theme === 'violet' ? 'border-violet-700 text-violet-800 font-semibold bg-white' : 'border-teal-700 text-teal-800 font-semibold bg-white')
                      : 'border-transparent text-slate-600 hover:text-slate-900'
                  "
                >
                  <LightBulbIcon class="w-4 h-4" />
                  <span>Key Lessons</span>
                </button>
              </div>

              <!-- Tab Content Area -->
              <div class="p-4 sm:p-5 text-sm text-slate-700 leading-relaxed font-sans min-h-[90px]">
                <div v-if="activeTab === 'architecture'">
                  <p>{{ project.caseStudy?.whatIBuilt || project.tagline }}</p>
                </div>
                <div v-else-if="activeTab === 'flow'">
                  <p>{{ project.caseStudy?.howItWorks || 'Direct client-server implementation with decoupled architecture.' }}</p>
                </div>
                <div v-else-if="activeTab === 'learnings'">
                  <p>{{ project.caseStudy?.whatILearned || 'Hands-on practice in code modularization, error boundaries, and predictable state transitions.' }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Bottom Footer Actions -->
          <div
            class="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0"
          >
            <div class="text-tiny text-slate-500 font-sans hidden sm:block">
              Press <kbd class="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">ESC</kbd> or <kbd class="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">← / →</kbd> to navigate
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <a
                v-if="project.repoUrl"
                :href="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
              >
                <BootstrapGitHubIcon class="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>

              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-2 text-xs font-sans font-semibold text-white rounded-lg shadow-2xs transition-colors"
                :class="project.theme === 'violet' ? 'bg-violet-700 hover:bg-violet-800' : 'bg-teal-700 hover:bg-teal-800'"
              >
                <span>Live Preview</span>
                <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5" />
              </a>

              <button
                @click="emit('close')"
                class="px-4 py-2 text-xs font-sans font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
