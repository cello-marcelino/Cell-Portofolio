<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { showcaseProjects } from '@/data/portfolio';
import ProjectDetailModal from '@/components/ProjectDetailModal.vue';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Squares2X2Icon,
  ViewColumnsIcon,
  ArrowTopRightOnSquareIcon,
  EyeIcon,
} from '@heroicons/vue/24/outline';
import { BootstrapGitHubIcon } from '@/components/icons/SocialIcons';

// View Mode: 'slider' | 'grid'
const viewMode = ref('slider');

// Active filter: 'all' | 'web' | 'ai'
const activeFilter = ref('all');

// Carousel index for slider view
const currentSlideIndex = ref(0);

// Modal state
const isModalOpen = ref(false);
const selectedProject = ref(null);

const filterTabs = [
  { id: 'all', label: 'All Projects', count: showcaseProjects.length },
  {
    id: 'web',
    label: 'Web & Fullstack',
    count: showcaseProjects.filter((p) => p.category === 'web' || p.category === 'fullstack').length,
  },
  {
    id: 'ai',
    label: 'Applied AI & ML',
    count: showcaseProjects.filter((p) => p.category === 'ai').length,
  },
];

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return showcaseProjects;
  if (activeFilter.value === 'web') {
    return showcaseProjects.filter((p) => p.category === 'web' || p.category === 'fullstack');
  }
  if (activeFilter.value === 'ai') {
    return showcaseProjects.filter((p) => p.category === 'ai');
  }
  return showcaseProjects;
});

const currentProject = computed(() => {
  if (!filteredProjects.value.length) return null;
  return filteredProjects.value[currentSlideIndex.value] || filteredProjects.value[0];
});

const setFilter = (filterId) => {
  activeFilter.value = filterId;
  currentSlideIndex.value = 0;
};

const nextSlide = () => {
  if (!filteredProjects.value.length) return;
  currentSlideIndex.value = (currentSlideIndex.value + 1) % filteredProjects.value.length;
};

const prevSlide = () => {
  if (!filteredProjects.value.length) return;
  currentSlideIndex.value =
    (currentSlideIndex.value - 1 + filteredProjects.value.length) % filteredProjects.value.length;
};

const goToSlide = (idx) => {
  currentSlideIndex.value = idx;
};

const openProjectModal = (proj) => {
  selectedProject.value = proj;
  isModalOpen.value = true;
};

const closeProjectModal = () => {
  isModalOpen.value = false;
  selectedProject.value = null;
};

// Keyboard Arrow Navigation Support
const handleGalleryKeyDown = (e) => {
  if (isModalOpen.value) return; // Prevent conflicting with modal ESC / navigation
  if (viewMode.value !== 'slider') return;

  if (e.key === 'ArrowLeft') {
    prevSlide();
  } else if (e.key === 'ArrowRight') {
    nextSlide();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleGalleryKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleGalleryKeyDown);
});
</script>

<template>
  <section
    id="projects"
    class="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto w-full relative"
    aria-label="Projects Gallery Showcase"
  >
    <!-- Hidden anchor for legacy dossier & featured hash links -->
    <div id="dossier" class="absolute -top-24 left-0 pointer-events-none" />
    <div id="featured" class="absolute -top-24 left-0 pointer-events-none" />

    <!-- Section Header HUD -->
    <div class="pb-6 border-b border-slate-200/90">
      <div class="inline-flex items-center px-2.5 py-1 rounded-md bg-teal-50 border border-teal-200 text-tiny font-sans font-semibold text-teal-800 uppercase tracking-wider mb-3">
        <span>Interactive Visual Gallery</span>
      </div>
      <h2 class="text-h2 font-heading font-bold text-slate-900 tracking-tight">
        Featured Engineering Projects
      </h2>
      <p class="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl font-sans">
        Decoupled web applications, applied NLP text retrieval, and verified database architectures.
      </p>
    </div>

    <!-- Dedicated Gallery Action Toolbar (Filters + View Switcher) -->
    <div class="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <!-- Category Filter Segmented Control -->
      <div class="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 overflow-x-auto max-w-full">
        <button
          v-for="tab in filterTabs"
          :key="tab.id"
          @click="setFilter(tab.id)"
          class="px-3.5 py-1.5 text-xs font-sans rounded-lg transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap shrink-0"
          :class="
            activeFilter === tab.id
              ? 'bg-white text-slate-900 font-semibold shadow-2xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
          "
        >
          <span>{{ tab.label }}</span>
          <span
            class="px-1.5 py-0.5 rounded-full text-[10px] font-mono leading-none"
            :class="activeFilter === tab.id ? 'bg-slate-100 text-slate-800' : 'bg-slate-200 text-slate-500'"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- View Mode Switcher: Slider vs Grid -->
      <div class="inline-flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0 self-start sm:self-auto">
        <button
          @click="viewMode = 'slider'"
          class="px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-sans"
          :class="
            viewMode === 'slider'
              ? 'bg-white text-teal-800 font-semibold shadow-2xs'
              : 'text-slate-500 hover:text-slate-900'
          "
          title="Horizontal Slider Mode"
          aria-label="Horizontal Slider Mode"
        >
          <ViewColumnsIcon class="w-4 h-4" />
          <span class="font-medium">Slider</span>
        </button>
        <button
          @click="viewMode = 'grid'"
          class="px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-sans"
          :class="
            viewMode === 'grid'
              ? 'bg-white text-teal-800 font-semibold shadow-2xs'
              : 'text-slate-500 hover:text-slate-900'
          "
          title="Grid Gallery Mode"
          aria-label="Grid Gallery Mode"
        >
          <Squares2X2Icon class="w-4 h-4" />
          <span class="font-medium">Grid</span>
        </button>
      </div>
    </div>

    <!-- 1. SLIDER / CAROUSEL VIEW -->
    <div v-if="viewMode === 'slider'" class="mt-5">
      <!-- Carousel Slider Main Card Container (Fixed 460px height on desktop, zero layout shift) -->
      <div
        v-if="currentProject"
        class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-shadow duration-300 hover:shadow-md lg:h-[460px] flex flex-col"
      >
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-full flex-1">
          <!-- Visual Presentation Stage (Left / Top) -->
          <div
            class="lg:col-span-7 bg-slate-950 relative overflow-hidden group cursor-pointer aspect-[16/10] sm:aspect-video lg:aspect-auto lg:h-full w-full flex items-center justify-center select-none"
            @click="openProjectModal(currentProject)"
          >
            <!-- Project Image (Locked to uniform natural 16:10 / 16:9 scale across all projects) -->
            <img
              :src="currentProject.primaryVisual"
              :alt="currentProject.title"
              class="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />

            <!-- Top Overlay Telemetry Badge -->
            <div class="absolute top-3 left-3 flex items-center gap-2 z-10">
              <span
                class="px-2.5 py-1 rounded-md text-tiny font-sans font-semibold uppercase tracking-wider backdrop-blur-md shadow-xs border"
                :class="
                  currentProject.theme === 'violet'
                    ? 'bg-violet-950/80 text-violet-200 border-violet-700/60'
                    : 'bg-teal-950/80 text-teal-200 border-teal-700/60'
                "
              >
                {{ currentProject.categoryLabel }}
              </span>
              <span class="px-2 py-1 rounded-md text-tiny font-mono bg-slate-900/80 text-slate-300 border border-slate-700/60">
                #{{ currentProject.year }}
              </span>
            </div>

            <!-- Floating Prev / Next Arrow Overlays on Image Stage for effortless quick navigation -->
            <button
              @click.stop="prevSlide"
              class="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700/80 shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer z-20"
              aria-label="Previous project"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </button>
            <button
              @click.stop="nextSlide"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700/80 shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-105 cursor-pointer z-20"
              aria-label="Next project"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </button>

            <!-- Inspect Hover Invitation Pill -->
            <div
              class="absolute inset-0 bg-slate-950/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs pointer-events-none"
            >
              <div
                class="px-4 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-sans font-semibold flex items-center gap-2 shadow-lg"
              >
                <EyeIcon class="w-4 h-4 text-teal-700" />
                <span>Click to Inspect Architecture & Screenshots</span>
              </div>
            </div>
          </div>

          <!-- Project Metadata & Controls Panel (Right / Bottom) -->
          <div class="lg:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-slate-100 lg:h-full overflow-hidden">
            <!-- Top Content Area (Clean scrolling if text exceeds, keeping container completely locked) -->
            <div class="space-y-3.5 overflow-y-auto pr-1">
              <!-- Title & One-Liner -->
              <div>
                <h3 class="text-h3 font-heading font-bold text-slate-900 tracking-tight leading-snug">
                  {{ currentProject.title }}
                </h3>
                <p class="mt-2 text-sm text-slate-600 font-sans leading-relaxed">
                  {{ currentProject.oneLiner }}
                </p>
              </div>
            </div>

            <!-- Action Buttons & Navigation Controls (Locked at bottom, 100% stable position) -->
            <div class="pt-4 mt-auto border-t border-slate-100 space-y-3 shrink-0 bg-white">
              <!-- Action CTA Buttons -->
              <div class="flex items-center gap-2.5 flex-wrap">
                <button
                  @click="openProjectModal(currentProject)"
                  class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-tiny font-sans font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <EyeIcon class="w-4 h-4" />
                  <span>Inspect Details</span>
                </button>

                <a
                  v-if="currentProject.repoUrl"
                  :href="currentProject.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 px-3 py-2 text-tiny font-sans font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
                >
                  <BootstrapGitHubIcon class="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>

                <a
                  v-if="currentProject.liveUrl"
                  :href="currentProject.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-tiny font-sans font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-lg shadow-2xs transition-colors"
                >
                  <span>Demo</span>
                  <ArrowTopRightOnSquareIcon class="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>

              <!-- Carousel Slide Stepper HUD (Zero vertical movement) -->
              <div class="flex items-center justify-between pt-1">
                <!-- Navigation Prev/Next Arrow Buttons -->
                <div class="flex items-center gap-2">
                  <button
                    @click="prevSlide"
                    class="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    aria-label="Previous project"
                  >
                    <ChevronLeftIcon class="w-4 h-4" />
                  </button>
                  <button
                    @click="nextSlide"
                    class="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                    aria-label="Next project"
                  >
                    <ChevronRightIcon class="w-4 h-4" />
                  </button>
                </div>

                <!-- Slide Step Counter -->
                <div class="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                  <span>{{ currentSlideIndex + 1 }} / {{ filteredProjects.length }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Thumbnail Quick-Scrubber Strip -->
      <div class="mt-4 flex items-center justify-start md:justify-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        <button
          v-for="(proj, idx) in filteredProjects"
          :key="proj.id"
          @click="goToSlide(idx)"
          class="group flex items-center gap-2.5 p-2 rounded-xl border bg-white text-left transition-all shrink-0 cursor-pointer max-w-[220px]"
          :class="
            currentSlideIndex === idx
              ? 'border-teal-600 ring-2 ring-teal-600/20 shadow-xs'
              : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
          "
        >
          <div class="w-10 h-10 rounded-lg overflow-hidden bg-slate-900 shrink-0">
            <img :src="proj.primaryVisual" :alt="proj.title" class="w-full h-full object-cover object-top" />
          </div>
          <div class="truncate">
            <div class="text-xs font-heading font-bold text-slate-900 truncate">
              {{ proj.shortTitle || proj.title }}
            </div>
            <div class="text-[10px] font-mono text-slate-500 truncate">
              {{ proj.categoryLabel }}
            </div>
          </div>
        </button>
      </div>
    </div>

    <!-- 2. GRID GALLERY VIEW (When View Mode is 'grid') -->
    <div v-else class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in filteredProjects"
        :key="project.id"
        class="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
      >
        <!-- Card Image Stage -->
        <div
          class="aspect-video bg-slate-950 relative overflow-hidden cursor-pointer"
          @click="openProjectModal(project)"
        >
          <img
            :src="project.primaryVisual"
            :alt="project.title"
            class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          <!-- Overlay Badge -->
          <div class="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              class="px-2 py-0.5 rounded text-tiny font-sans font-semibold uppercase tracking-wider backdrop-blur-md border"
              :class="
                project.theme === 'violet'
                  ? 'bg-violet-950/80 text-violet-200 border-violet-700/60'
                  : 'bg-teal-950/80 text-teal-200 border-teal-700/60'
              "
            >
              {{ project.categoryLabel }}
            </span>
          </div>

          <!-- Hover Overlay -->
          <div
            class="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <span class="px-3 py-1.5 rounded-full bg-white text-slate-900 text-tiny font-sans font-semibold flex items-center gap-1.5 shadow-md">
              <EyeIcon class="w-3.5 h-3.5 text-teal-700" />
              <span>Inspect</span>
            </span>
          </div>
        </div>

        <!-- Card Content Body -->
        <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between text-tiny font-mono text-slate-400 mb-1">
              <span>#{{ project.year }}</span>
              <span class="truncate max-w-[150px]">{{ project.architecture }}</span>
            </div>
            <h3 class="text-lg font-heading font-bold text-slate-900 tracking-tight group-hover:text-teal-700 transition-colors">
              {{ project.title }}
            </h3>
            <p class="mt-1.5 text-xs text-slate-600 font-sans line-clamp-2">
              {{ project.oneLiner }}
            </p>
          </div>

          <div>
            <!-- Footer Action Row -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                @click="openProjectModal(project)"
                class="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
              >
                <EyeIcon class="w-3.5 h-3.5" />
                <span>Inspect</span>
              </button>

              <div class="flex items-center gap-2">
                <a
                  v-if="project.repoUrl"
                  :href="project.repoUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
                  title="Source Code"
                  aria-label="Source Code"
                >
                  <BootstrapGitHubIcon class="w-4 h-4" />
                </a>
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="p-1.5 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100 transition-colors"
                  title="Live Demo"
                  aria-label="Live Demo"
                >
                  <ArrowTopRightOnSquareIcon class="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Technical Deep Dive Modal Component -->
    <ProjectDetailModal
      :is-open="isModalOpen"
      :project="selectedProject"
      @close="closeProjectModal"
    />
  </section>
</template>
