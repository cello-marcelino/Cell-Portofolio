<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Curated tech tokens for the rain animation
// Logos are intentionally tilted at varied angles (not strictly upright) with organic drift
const rainTokens = [
  // --- Left Flank Columns ---
  {
    name: 'Vue.js',
    icon: '/icons/tech/vue.png',
    left: '2.5%',
    duration: '16s',
    delay: '-2.5s',
    animType: 'rain-drift-left',
    tilt: -16, // Organic angle (not upright)
    scale: 0.92,
    opacity: 0.65,
    parallaxFactor: 1.1,
  },
  {
    name: 'Python',
    icon: '/icons/tech/python.png',
    left: '6.5%',
    duration: '21s',
    delay: '-12s',
    animType: 'rain-drift-right',
    tilt: 18,
    scale: 0.88,
    opacity: 0.55,
    parallaxFactor: 0.8,
  },
  {
    name: 'Node.js',
    icon: '/icons/tech/nodejs.png',
    left: '11.5%',
    duration: '18s',
    delay: '-7s',
    animType: 'rain-drift-left',
    tilt: -22,
    scale: 0.95,
    opacity: 0.6,
    parallaxFactor: 1.3,
  },
  {
    name: 'FastAPI',
    icon: '/icons/tech/fastapi.png',
    left: '4%',
    duration: '23s',
    delay: '-17s',
    animType: 'rain-drift-straight',
    tilt: 14,
    scale: 0.85,
    opacity: 0.5,
    parallaxFactor: 0.9,
  },
  {
    name: 'Sentence-BERT',
    icon: '/icons/tech/sentence-bert.png',
    left: '9%',
    duration: '19s',
    delay: '-4.5s',
    animType: 'rain-drift-right',
    tilt: -15,
    scale: 0.9,
    opacity: 0.6,
    parallaxFactor: 1.2,
  },
  {
    name: 'Tailwind CSS',
    icon: '/icons/tech/tailwind.png',
    left: '14%',
    duration: '25s',
    delay: '-15s',
    animType: 'rain-drift-left',
    tilt: 20,
    scale: 0.82,
    opacity: 0.45,
    parallaxFactor: 0.7,
  },
  {
    name: 'Scikit-Learn',
    icon: '/icons/tech/scikit-learn.png',
    left: '7.5%',
    duration: '20s',
    delay: '-9.5s',
    animType: 'rain-drift-straight',
    tilt: -12,
    scale: 0.88,
    opacity: 0.55,
    parallaxFactor: 1.0,
  },
  {
    name: 'SQLite',
    icon: '/icons/tech/sqlite.png',
    left: '1.8%',
    duration: '22s',
    delay: '-19s',
    animType: 'rain-drift-right',
    tilt: 16,
    scale: 0.84,
    opacity: 0.5,
    parallaxFactor: 0.85,
  },

  // --- Right Flank Columns ---
  {
    name: 'React',
    icon: '/icons/tech/react.png',
    left: '84.5%',
    duration: '17s',
    delay: '-3.5s',
    animType: 'rain-drift-right',
    tilt: 19,
    scale: 0.92,
    opacity: 0.6,
    parallaxFactor: 1.2,
  },
  {
    name: 'Next.js',
    icon: '/icons/tech/nextjs.png',
    left: '89.5%',
    duration: '22s',
    delay: '-11s',
    animType: 'rain-drift-left',
    tilt: -18,
    scale: 0.88,
    opacity: 0.65,
    parallaxFactor: 1.0,
  },
  {
    name: 'Laravel',
    icon: '/icons/tech/laravel.png',
    left: '94.5%',
    duration: '16.5s',
    delay: '-8s',
    animType: 'rain-drift-straight',
    tilt: 24,
    scale: 0.95,
    opacity: 0.65,
    parallaxFactor: 1.4,
  },
  {
    name: 'Git',
    icon: '/icons/tech/git.png',
    left: '87%',
    duration: '24s',
    delay: '-16s',
    animType: 'rain-drift-left',
    tilt: -14,
    scale: 0.84,
    opacity: 0.5,
    parallaxFactor: 0.8,
  },
  {
    name: 'TensorFlow',
    icon: '/icons/tech/tensorflow.png',
    left: '92%',
    duration: '19.5s',
    delay: '-6s',
    animType: 'rain-drift-right',
    tilt: 15,
    scale: 0.9,
    opacity: 0.55,
    parallaxFactor: 1.1,
  },
  {
    name: 'MySQL',
    icon: '/icons/tech/mysql.png',
    left: '86%',
    duration: '21.5s',
    delay: '-18.5s',
    animType: 'rain-drift-straight',
    tilt: -20,
    scale: 0.86,
    opacity: 0.5,
    parallaxFactor: 0.95,
  },
  {
    name: 'GitHub',
    icon: '/icons/tech/github.png',
    left: '95.5%',
    duration: '23s',
    delay: '-13s',
    animType: 'rain-drift-left',
    tilt: 12,
    scale: 0.85,
    opacity: 0.5,
    parallaxFactor: 0.85,
  },
  {
    name: 'BM25',
    icon: '/icons/tech/bm25.png',
    left: '83%',
    duration: '26s',
    delay: '-21s',
    animType: 'rain-drift-right',
    tilt: -25,
    scale: 0.8,
    opacity: 0.45,
    parallaxFactor: 0.7,
  },

  // --- Subtle Deep-Ambient Droplets (Gentle low opacity) ---
  {
    name: 'Postman',
    icon: '/icons/tech/postman.png',
    left: '18%',
    duration: '27s',
    delay: '-14s',
    animType: 'rain-drift-straight',
    tilt: -15,
    scale: 0.75,
    opacity: 0.35,
    parallaxFactor: 0.6,
  },
  {
    name: 'Pytest',
    icon: '/icons/tech/pytest.png',
    left: '79%',
    duration: '25s',
    delay: '-10s',
    animType: 'rain-drift-left',
    tilt: 18,
    scale: 0.75,
    opacity: 0.35,
    parallaxFactor: 0.6,
  },
];

// Interactive Parallax Offset with subtle damping
const mouseOffset = ref({ x: 0, y: 0 });
let targetX = 0;
let animationFrameId = null;

const handleMouseMove = (e) => {
  const normX = e.clientX / window.innerWidth - 0.5;
  targetX = normX * 24; // subtle horizontal wind effect
};

const updateParallax = () => {
  mouseOffset.value.x += (targetX - mouseOffset.value.x) * 0.06;
  animationFrameId = requestAnimationFrame(updateParallax);
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateParallax);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('mousemove', handleMouseMove);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  }
});
</script>

<template>
  <div
    class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none hidden sm:block"
    aria-hidden="true"
  >
    <!-- Rain Column Wrapper (Interactive Mouse Shift) -->
    <div
      v-for="(item, idx) in rainTokens"
      :key="idx"
      class="absolute top-0 bottom-0 will-change-transform"
      :style="{
        left: item.left,
        transform: `translate3d(${mouseOffset.x * item.parallaxFactor}px, 0, 0)`,
      }"
    >
      <!-- Continuous Falling Rain Animation Runner -->
      <div
        class="rain-droplet will-change-transform"
        :style="{
          animationName: item.animType,
          animationDuration: item.duration,
          animationDelay: item.delay,
        }"
      >
        <!-- Tilted Badge: Intentionally not upright with organic wobble -->
        <div
          class="p-2 sm:p-2.5 rounded-2xl bg-white/75 backdrop-blur-[2px] border border-slate-200/70 shadow-xs flex items-center justify-center transition-transform hover:scale-110"
          :style="{
            opacity: item.opacity,
            transform: `rotate(${item.tilt}deg) scale(${item.scale})`,
          }"
        >
          <img
            :src="item.icon"
            :alt="item.name"
            class="w-6 h-6 sm:w-7 sm:h-7 object-contain select-none pointer-events-none"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Continuous linear downward rain runners with gentle wind drift */
.rain-droplet {
  position: absolute;
  top: 0;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

/* Drift to Left */
@keyframes rain-drift-left {
  0% {
    transform: translate3d(0, -110px, 0);
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  50% {
    transform: translate3d(-18px, 52vh, 0);
  }
  94% {
    opacity: 1;
  }
  100% {
    transform: translate3d(-6px, 110vh, 0);
    opacity: 0;
  }
}

/* Drift to Right */
@keyframes rain-drift-right {
  0% {
    transform: translate3d(0, -110px, 0);
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  50% {
    transform: translate3d(20px, 52vh, 0);
  }
  94% {
    opacity: 1;
  }
  100% {
    transform: translate3d(8px, 110vh, 0);
    opacity: 0;
  }
}

/* Gentle Straight Rain with Micro-Oscillation */
@keyframes rain-drift-straight {
  0% {
    transform: translate3d(0, -110px, 0);
    opacity: 0;
  }
  6% {
    opacity: 1;
  }
  45% {
    transform: translate3d(8px, 48vh, 0);
  }
  80% {
    transform: translate3d(-8px, 85vh, 0);
  }
  94% {
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 110vh, 0);
    opacity: 0;
  }
}
</style>
