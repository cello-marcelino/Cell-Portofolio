<script setup>
import { personalInfo } from '@/data/portfolio';
import { ArrowUpIcon } from '@heroicons/vue/24/outline';
import { BootstrapGitHubIcon, BootstrapInstagramIcon } from '@/components/icons/SocialIcons';

const currentYear = new Date().getFullYear();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>
  <footer class="relative border-t border-slate-200 bg-white py-12 z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <!-- Upper Section: Brand, Telemetry, and Links -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <!-- Brand Info -->
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-base font-heading font-bold text-slate-900">
              {{ personalInfo.name }}
            </h3>
            <span class="text-slate-300">/</span>
            <span class="text-tiny font-sans text-slate-500">Software Systems Studio</span>
          </div>
          <p class="text-tiny font-sans text-slate-500 mt-1 max-w-md">
            Informatics Engineering at Politeknik Negeri Batam
          </p>
        </div>
      </div>

      <!-- Lower Section: Social Links, Copyright & Back to Top -->
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-tiny font-sans">
        <div class="flex items-center gap-4">
          <a
            :href="personalInfo.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors font-medium"
          >
            <BootstrapGitHubIcon class="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <span class="text-slate-300">/</span>
          <a
            :href="personalInfo.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 text-slate-600 hover:text-violet-700 transition-colors font-medium"
          >
            <BootstrapInstagramIcon class="w-3.5 h-3.5" />
            <span>Instagram</span>
          </a>
          <span class="text-slate-300">/</span>
          <a
            :href="`mailto:${personalInfo.email}`"
            class="text-slate-600 hover:text-teal-700 transition-colors"
          >
            {{ personalInfo.email }}
          </a>
        </div>

        <div class="flex items-center gap-4">
          <span class="text-slate-500">
            © {{ currentYear }} Christian Marcelino. Precision Built.
          </span>
          <button
            @click="scrollToTop"
            aria-label="Back to top"
            class="p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-teal-700 hover:border-teal-300 transition-colors cursor-pointer"
          >
            <ArrowUpIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
