<script setup>
import { ref } from 'vue';
import { personalInfo } from '@/data/portfolio';
import {
  EnvelopeIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ArrowDownTrayIcon,
  MapPinIcon,
  ChatBubbleBottomCenterTextIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/vue/24/outline';
import { BootstrapGitHubIcon, BootstrapInstagramIcon } from '@/components/icons/SocialIcons';

const copied = ref(false);

const handleCopyEmail = () => {
  if (typeof navigator !== 'undefined') {
    navigator.clipboard.writeText(personalInfo.email);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  }
};
</script>

<template>
  <section id="contact" class="py-20 md:py-28 relative z-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-xs space-y-8 max-w-4xl mx-auto"
      >
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-800 text-tiny font-mono font-semibold"
        >
          <ChatBubbleBottomCenterTextIcon class="w-3.5 h-3.5 text-violet-700" />
          <span>COMMAND DISPATCH // GET IN TOUCH</span>
        </div>

        <div class="space-y-3 max-w-2xl mx-auto">
          <h2 class="text-h2 font-heading font-bold text-slate-900 tracking-tight">
            Open for Engineering Opportunities & Roles
          </h2>
          <p class="text-base text-slate-600 font-sans leading-relaxed">
            I am seeking junior developer or internship opportunities focused on web systems, backend services, or applied AI. Ready to contribute with high discipline and continuous learning.
          </p>
        </div>

        <!-- Interactive Email Bar & Actions -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2">
          <div
            class="w-full sm:w-auto flex-1 flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono text-tiny text-slate-900 shadow-2xs"
          >
            <span class="truncate mr-2 font-medium">{{ personalInfo.email }}</span>
            <button
              @click="handleCopyEmail"
              aria-label="Copy email address"
              class="p-1.5 rounded-md hover:bg-slate-200/80 text-slate-600 hover:text-teal-700 transition-colors shrink-0 cursor-pointer"
            >
              <CheckIcon v-if="copied" class="w-4 h-4 text-teal-700" />
              <ClipboardDocumentIcon v-else class="w-4 h-4" />
            </button>
          </div>

          <a
            :href="`mailto:${personalInfo.email}?subject=Opportunity%20Inquiry%20-%20Christian%20Marcelino`"
            class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-base font-semibold font-sans text-white bg-teal-700 hover:bg-teal-800 border border-teal-800 shadow-xs hover:shadow transition-all shrink-0 cursor-pointer"
          >
            <EnvelopeIcon class="w-4 h-4" />
            <span>Send Email</span>
          </a>
        </div>

        <!-- Copied Toast Notice -->
        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div
            v-if="copied"
            class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 text-tiny font-mono font-semibold"
          >
            <CheckIcon class="w-4 h-4 text-teal-700" />
            <span>EMAIL COPIED TO CLIPBOARD!</span>
          </div>
        </Transition>

        <!-- Direct Coordinates & Professional Channels -->
        <div
          class="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-slate-100 text-tiny font-sans text-slate-600"
        >
          <div class="flex items-center gap-1.5 font-mono">
            <MapPinIcon class="w-4 h-4 text-teal-700" />
            <span>BATAM, ID</span>
          </div>

          <a
            :href="personalInfo.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-slate-700 hover:text-teal-700 font-medium transition-colors font-mono"
          >
            <BootstrapGitHubIcon class="w-4 h-4 text-slate-700" />
            <span>github.com/cello-marcelino</span>
            <ArrowTopRightOnSquareIcon class="w-3 h-3 text-slate-400" />
          </a>

          <a
            :href="personalInfo.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-slate-700 hover:text-violet-700 font-medium transition-colors font-mono"
          >
            <BootstrapInstagramIcon class="w-4 h-4 text-violet-700" />
            <span>{{ personalInfo.instagramHandle }}</span>
            <ArrowTopRightOnSquareIcon class="w-3 h-3 text-slate-400" />
          </a>

          <a
            :href="personalInfo.cvDownloadUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-1.5 text-teal-800 hover:text-teal-950 font-semibold transition-colors font-sans text-tiny"
          >
            <ArrowDownTrayIcon class="w-4 h-4 text-teal-700" />
            <span>RESUME (PDF)</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
