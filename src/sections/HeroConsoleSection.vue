<script setup>
import { personalInfo } from '@/data/portfolio';
import {
  ArrowDownTrayIcon,
  CodeBracketIcon,
  MapPinIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline';
</script>

<template>
  <section
    id="overview"
    class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        <!-- Left Narrative Column -->
        <div class="flex-1 max-w-3xl text-left">
          <!-- Status Pill -->
          <div class="inline-block mb-6">
            <div
              class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-tiny font-sans uppercase tracking-wider font-semibold shadow-xs select-none hover:shadow-md hover:border-teal-400 transition-shadow"
            >
              <span class="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>{{ personalInfo.statusBadge }}</span>
            </div>
          </div>

          <!-- Main Headline -->
          <h1 class="text-h1 font-heading font-bold text-[#0F172A] tracking-tight leading-snug mb-6">
            Learn from problems. Build solutions. <span class="text-teal-700 font-bold">Improve continuously.</span>
          </h1>

          <!-- Calibrated Bio & Narrative -->
          <p class="text-base sm:text-lg text-[#334155] leading-relaxed mb-8 max-w-2xl font-sans">
            Hi, I’m <strong class="text-[#0F172A] font-semibold">{{ personalInfo.name }}</strong>, an Informatics Engineering student at Politeknik Negeri Batam and an aspiring software developer. I build web applications and backend services, explore practical applied AI, and enjoy understanding how software systems work under the hood through hands-on project work.
          </p>

          <!-- CTAs -->
          <div class="flex flex-wrap items-center gap-4 mb-10">
            <a
              :href="personalInfo.cvDownloadUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-base font-sans font-semibold text-white bg-teal-700 hover:bg-teal-800 border border-teal-600/30 shadow-sm hover:shadow transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ArrowDownTrayIcon class="w-4 h-4" />
              <span>Download CV (PDF)</span>
            </a>

            <a
              href="#projects"
              class="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-base font-sans font-medium text-[#0F172A] bg-white hover:bg-gray-50 border border-gray-300 shadow-xs hover:border-teal-600/40 transition-all transform hover:-translate-y-0.5"
            >
              <CodeBracketIcon class="w-4 h-4 text-teal-700" />
              <span>View Projects</span>
            </a>

            <a
              href="#contact"
              class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-base font-sans text-gray-700 hover:text-teal-800 transition-colors"
            >
              <EnvelopeIcon class="w-4 h-4 text-teal-700" />
              <span>Get in Touch</span>
            </a>
          </div>

          <!-- Context Details -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-200">
            <div class="flex items-center gap-2.5 text-tiny font-sans text-[#475569]">
              <MapPinIcon class="w-4 h-4 text-teal-700 shrink-0" />
              <span>{{ personalInfo.location }}</span>
            </div>
            <div class="flex items-center gap-2.5 text-tiny font-sans text-[#475569]">
              <AcademicCapIcon class="w-4 h-4 text-teal-700 shrink-0" />
              <span>Politeknik Negeri Batam</span>
            </div>
            <div class="flex items-center gap-2.5 text-tiny font-sans text-[#475569]">
              <BriefcaseIcon class="w-4 h-4 text-teal-700 shrink-0" />
              <span>PT Volex (EV Assembly)</span>
            </div>
          </div>
        </div>

        <!-- Right Profile Photo Card (3x4 Aspect Ratio) -->
        <div class="w-full lg:w-auto flex justify-center">
          <div class="w-72 sm:w-[21.5rem] rounded-2xl bg-white border border-gray-200/90 p-5 sm:p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
            <!-- 3x4 Photo Container Frame -->
            <!-- Ganti personalInfo.photo3x4 di src/data/portfolio.js dengan path file foto 3x4 Anda (contoh: '/foto-profil.jpg') -->
            <div class="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-slate-100 border-2 border-teal-200/80 shadow-xs mb-4 group">
              <img
                :src="personalInfo.photo3x4 || personalInfo.brandLogo"
                alt="Christian Marcelino"
                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>

            <!-- Identity Badge & Name Caption -->
            <div class="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-50 border border-teal-200/80 text-tiny font-sans font-semibold text-teal-800 mb-2">
              <SparklesIcon class="w-3.5 h-3.5 text-teal-700" />
              <span>Junior Developer</span>
            </div>

            <h3 class="font-heading font-bold text-lg text-[#0F172A] mb-1">
              {{ personalInfo.name }}
            </h3>
            <p class="text-tiny text-teal-800/90 font-sans font-medium">
              Informatics Engineering Student
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
