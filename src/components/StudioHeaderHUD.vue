<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { personalInfo } from '@/data/portfolio';
import {
  ArrowDownTrayIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

const scrolled = ref(false);
const mobileMenuOpen = ref(false);
const activeSection = ref('overview');

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Toolchain', href: '#toolchain' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact', href: '#contact' },
];

let scrollRafId = null;

const updateScrollState = () => {
  scrolled.value = window.scrollY > 20;

  for (let i = navLinks.length - 1; i >= 0; i--) {
    const id = navLinks[i].href.substring(1);
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 140) {
        activeSection.value = id;
        break;
      }
    }
  }
};

const handleScroll = () => {
  if (scrollRafId !== null) return;
  scrollRafId = requestAnimationFrame(() => {
    updateScrollState();
    scrollRafId = null;
  });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  updateScrollState();
});

onUnmounted(() => {
  if (scrollRafId !== null) cancelAnimationFrame(scrollRafId);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
    :class="
      scrolled
        ? 'bg-[#FBFBFA]/90 backdrop-blur-md border-b border-gray-200/80 shadow-xs py-3'
        : 'bg-transparent border-b border-transparent py-5'
    "
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      <!-- Brand Monogram & Personal Logo -->
      <a
        href="#overview"
        class="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-teal-500 rounded-lg p-1"
      >
        <div class="relative w-9 h-9 rounded-full overflow-hidden border-2 border-teal-200 group-hover:border-teal-600 transition-all shadow-sm shrink-0">
          <img
            :src="personalInfo.brandLogo"
            alt="Christian Marcelino Logo"
            class="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div class="flex flex-col">
          <span class="font-heading font-bold text-base tracking-tight text-[#0F172A] flex items-center gap-1.5 group-hover:text-teal-700 transition-colors">
            Christian Marcelino <span class="text-gray-400 font-normal">·</span> <span class="text-gray-500 font-sans text-tiny font-normal">Portfolio</span>
          </span>
        </div>
      </a>

      <!-- Desktop Nav Items -->
      <nav class="hidden md:flex items-center gap-1 bg-white/90 border border-gray-200 px-3 py-1.5 rounded-full shadow-xs">
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          class="px-3.5 py-1 text-tiny font-sans font-medium rounded-full transition-all duration-200"
          :class="
            activeSection === link.href.substring(1)
              ? 'bg-teal-50 text-teal-800 border border-teal-200/80 font-semibold shadow-xs'
              : 'text-gray-600 hover:text-[#0F172A] hover:bg-gray-100'
          "
        >
          {{ link.label }}
        </a>
      </nav>

      <!-- Desktop Actions -->
      <div class="hidden md:flex items-center gap-3">
        <a
          :href="personalInfo.cvDownloadUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 py-2 text-tiny font-sans font-semibold text-white bg-teal-700 hover:bg-teal-800 border border-teal-600/30 rounded-full shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          <ArrowDownTrayIcon class="w-4 h-4" />
          <span>Download CV</span>
        </a>
      </div>

      <!-- Mobile Hamburger Toggle -->
      <div class="flex md:hidden">
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-label="mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'"
          class="p-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-[#0F172A] hover:border-teal-500 transition-colors shadow-xs cursor-pointer"
        >
          <XMarkIcon v-if="mobileMenuOpen" class="w-6 h-6" />
          <Bars3Icon v-else class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Drawer Menu -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="md:hidden bg-white border-b border-gray-200 px-6 py-5 mt-3 space-y-3 shadow-xl"
      >
        <a
          v-for="link in navLinks"
          :key="link.label"
          :href="link.href"
          @click="mobileMenuOpen = false"
          class="block py-2 text-base font-sans font-medium text-gray-700 hover:text-teal-700 border-b border-gray-100"
        >
          {{ link.label }}
        </a>
        <div class="pt-3">
          <a
            :href="personalInfo.cvDownloadUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="mobileMenuOpen = false"
            class="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-tiny font-sans font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm"
          >
            <ArrowDownTrayIcon class="w-4 h-4" />
            <span>Download CV (PDF)</span>
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
