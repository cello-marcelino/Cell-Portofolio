<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Safe base URL resolver for assets across dev & production
const baseUrl = import.meta.env.BASE_URL || '/';
const resolveIcon = (path) => {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// Curated tech tokens for the rain animation
// Logos are intentionally tilted at varied angles (not strictly upright) with organic drift
const rawRainTokens = [
  // --- Left Flank (0% – 20%) ---
  {
    name: 'Vue.js',
    icon: '/icons/tech/vue.png',
    left: '2.5%',
    duration: '14s',
    delay: '-2s',
    animClass: 'rain-drift-left',
    tilt: -16,
    scale: 0.95,
    opacity: 0.85,
    parallaxFactor: 1.1,
  },
  {
    name: 'Python',
    icon: '/icons/tech/python.png',
    left: '6.5%',
    duration: '18s',
    delay: '-9s',
    animClass: 'rain-drift-right',
    tilt: 18,
    scale: 0.9,
    opacity: 0.8,
    parallaxFactor: 0.8,
  },
  {
    name: 'Node.js',
    icon: '/icons/tech/nodejs.png',
    left: '11%',
    duration: '16s',
    delay: '-5s',
    animClass: 'rain-drift-left',
    tilt: -22,
    scale: 0.95,
    opacity: 0.82,
    parallaxFactor: 1.3,
  },
  {
    name: 'Tailwind CSS',
    icon: '/icons/tech/tailwind.png',
    left: '15.5%',
    duration: '21s',
    delay: '-12s',
    animClass: 'rain-drift-straight',
    tilt: 15,
    scale: 0.85,
    opacity: 0.75,
    parallaxFactor: 0.85,
  },
  {
    name: 'Sentence-BERT',
    icon: '/icons/tech/sentence-bert.png',
    left: '19.5%',
    duration: '17s',
    delay: '-7s',
    animClass: 'rain-drift-right',
    tilt: -14,
    scale: 0.9,
    opacity: 0.72,
    parallaxFactor: 1.15,
  },

  // --- Left-Center Zone (20% – 40%) ---
  {
    name: 'FastAPI',
    icon: '/icons/tech/fastapi.png',
    left: '24%',
    duration: '20s',
    delay: '-14s',
    animClass: 'rain-drift-left',
    tilt: 16,
    scale: 0.86,
    opacity: 0.68,
    parallaxFactor: 0.9,
  },
  {
    name: 'Flask',
    icon: '/icons/tech/flask.png',
    left: '28.5%',
    duration: '23s',
    delay: '-3s',
    animClass: 'rain-drift-straight',
    tilt: -19,
    scale: 0.82,
    opacity: 0.62,
    parallaxFactor: 0.75,
  },
  {
    name: 'SQLite',
    icon: '/icons/tech/sqlite.png',
    left: '33%',
    duration: '19s',
    delay: '-16s',
    animClass: 'rain-drift-right',
    tilt: 14,
    scale: 0.85,
    opacity: 0.65,
    parallaxFactor: 0.8,
  },
  {
    name: 'Scikit-Learn',
    icon: '/icons/tech/scikit-learn.png',
    left: '37.5%',
    duration: '22s',
    delay: '-8s',
    animClass: 'rain-drift-left',
    tilt: -12,
    scale: 0.82,
    opacity: 0.6,
    parallaxFactor: 0.95,
  },

  // --- Dead-Center Zone (40% – 60%) ---
  {
    name: 'Streamlit',
    icon: '/icons/tech/streamlit.png',
    left: '42%',
    duration: '24s',
    delay: '-11s',
    animClass: 'rain-drift-straight',
    tilt: 19,
    scale: 0.8,
    opacity: 0.58,
    parallaxFactor: 0.7,
  },
  {
    name: 'TensorFlow',
    icon: '/icons/tech/tensorflow.png',
    left: '46.5%',
    duration: '18.5s',
    delay: '-4s',
    animClass: 'rain-drift-right',
    tilt: -16,
    scale: 0.84,
    opacity: 0.62,
    parallaxFactor: 1.0,
  },
  {
    name: 'BM25',
    icon: '/icons/tech/bm25.png',
    left: '51%',
    duration: '21.5s',
    delay: '-17s',
    animClass: 'rain-drift-left',
    tilt: 21,
    scale: 0.8,
    opacity: 0.58,
    parallaxFactor: 0.75,
  },
  {
    name: 'Chart.js',
    icon: '/icons/tech/chartjs.png',
    left: '55.5%',
    duration: '23.5s',
    delay: '-6s',
    animClass: 'rain-drift-straight',
    tilt: -15,
    scale: 0.82,
    opacity: 0.6,
    parallaxFactor: 0.85,
  },

  // --- Right-Center Zone (60% – 80%) ---
  {
    name: 'Livewire',
    icon: '/icons/tech/livewire.png',
    left: '60.5%',
    duration: '19.5s',
    delay: '-13s',
    animClass: 'rain-drift-right',
    tilt: 18,
    scale: 0.85,
    opacity: 0.65,
    parallaxFactor: 0.9,
  },
  {
    name: 'Laravel',
    icon: '/icons/tech/laravel.png',
    left: '65%',
    duration: '16.5s',
    delay: '-7s',
    animClass: 'rain-drift-left',
    tilt: -20,
    scale: 0.88,
    opacity: 0.68,
    parallaxFactor: 1.1,
  },
  {
    name: 'Postman',
    icon: '/icons/tech/postman.png',
    left: '69.5%',
    duration: '22s',
    delay: '-15s',
    animClass: 'rain-drift-straight',
    tilt: 14,
    scale: 0.82,
    opacity: 0.64,
    parallaxFactor: 0.8,
  },
  {
    name: 'Pytest',
    icon: '/icons/tech/pytest.png',
    left: '74%',
    duration: '20.5s',
    delay: '-9s',
    animClass: 'rain-drift-right',
    tilt: -17,
    scale: 0.84,
    opacity: 0.66,
    parallaxFactor: 0.85,
  },
  {
    name: 'Python',
    icon: '/icons/tech/python.png',
    left: '78.5%',
    duration: '17.5s',
    delay: '-2s',
    animClass: 'rain-drift-left',
    tilt: 16,
    scale: 0.9,
    opacity: 0.72,
    parallaxFactor: 1.0,
  },

  // --- Right Flank (80% – 100%) ---
  {
    name: 'React',
    icon: '/icons/tech/react.png',
    left: '83%',
    duration: '15s',
    delay: '-5s',
    animClass: 'rain-drift-right',
    tilt: 19,
    scale: 0.95,
    opacity: 0.84,
    parallaxFactor: 1.2,
  },
  {
    name: 'Next.js',
    icon: '/icons/tech/nextjs.png',
    left: '87%',
    duration: '18s',
    delay: '-10s',
    animClass: 'rain-drift-left',
    tilt: -18,
    scale: 0.9,
    opacity: 0.82,
    parallaxFactor: 1.0,
  },
  {
    name: 'MySQL',
    icon: '/icons/tech/mysql.png',
    left: '91%',
    duration: '19s',
    delay: '-16s',
    animClass: 'rain-drift-straight',
    tilt: 20,
    scale: 0.88,
    opacity: 0.78,
    parallaxFactor: 0.95,
  },
  {
    name: 'Git',
    icon: '/icons/tech/git.png',
    left: '94.5%',
    duration: '21s',
    delay: '-12s',
    animClass: 'rain-drift-left',
    tilt: -15,
    scale: 0.88,
    opacity: 0.76,
    parallaxFactor: 0.85,
  },
  {
    name: 'GitHub',
    icon: '/icons/tech/github.png',
    left: '97.5%',
    duration: '20s',
    delay: '-8s',
    animClass: 'rain-drift-right',
    tilt: 13,
    scale: 0.86,
    opacity: 0.74,
    parallaxFactor: 0.8,
  },

  // --- Secondary Ambient Droplets for Rich Screen Harmony ---
  {
    name: 'Vue.js',
    icon: '/icons/tech/vue.png',
    left: '31%',
    duration: '16s',
    delay: '-8s',
    animClass: 'rain-drift-straight',
    tilt: -16,
    scale: 0.82,
    opacity: 0.6,
    parallaxFactor: 0.9,
  },
  {
    name: 'Node.js',
    icon: '/icons/tech/nodejs.png',
    left: '49%',
    duration: '22.5s',
    delay: '-15s',
    animClass: 'rain-drift-right',
    tilt: 22,
    scale: 0.78,
    opacity: 0.55,
    parallaxFactor: 0.7,
  },
  {
    name: 'FastAPI',
    icon: '/icons/tech/fastapi.png',
    left: '67%',
    duration: '18s',
    delay: '-1s',
    animClass: 'rain-drift-left',
    tilt: -13,
    scale: 0.84,
    opacity: 0.65,
    parallaxFactor: 1.05,
  },
];

// Resolve clean asset paths for all tokens
const rainTokens = rawRainTokens.map((token) => ({
  ...token,
  icon: resolveIcon(token.icon),
}));

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
  // Preload all rain token images immediately into browser cache
  rainTokens.forEach((token) => {
    const img = new Image();
    img.src = token.icon;
  });

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
    class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none block"
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
        :class="item.animClass"
        :style="{
          '--rain-duration': item.duration,
          '--rain-delay': item.delay,
        }"
      >
        <!-- Tilted Badge: Intentionally not upright with organic tilt & soft shadow -->
        <div
          class="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/95 backdrop-blur-[2px] border border-slate-200/90 shadow-sm flex items-center justify-center p-2 transition-transform hover:scale-110"
          :style="{
            opacity: item.opacity,
            transform: `rotate(${item.tilt}deg) scale(${item.scale})`,
          }"
        >
          <img
            :src="item.icon"
            :alt="item.name"
            width="28"
            height="28"
            class="w-full h-full object-contain block select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Global CSS rules for rain animation runners to ensure flawless keyframe matching */
.rain-droplet {
  position: absolute;
  top: 0;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: var(--rain-duration, 18s);
  animation-delay: var(--rain-delay, 0s);
}

.rain-drift-left {
  animation-name: rain-drift-left;
}

.rain-drift-right {
  animation-name: rain-drift-right;
}

.rain-drift-straight {
  animation-name: rain-drift-straight;
}

/* Drift to Left */
@keyframes rain-drift-left {
  0% {
    transform: translate3d(0, -90px, 0);
    opacity: 0;
  }
  4% {
    opacity: 1;
  }
  50% {
    transform: translate3d(-18px, 50vh, 0);
  }
  96% {
    opacity: 1;
  }
  100% {
    transform: translate3d(-6px, 108vh, 0);
    opacity: 0;
  }
}

/* Drift to Right */
@keyframes rain-drift-right {
  0% {
    transform: translate3d(0, -90px, 0);
    opacity: 0;
  }
  4% {
    opacity: 1;
  }
  50% {
    transform: translate3d(20px, 50vh, 0);
  }
  96% {
    opacity: 1;
  }
  100% {
    transform: translate3d(8px, 108vh, 0);
    opacity: 0;
  }
}

/* Gentle Straight Rain with Micro-Oscillation */
@keyframes rain-drift-straight {
  0% {
    transform: translate3d(0, -90px, 0);
    opacity: 0;
  }
  4% {
    opacity: 1;
  }
  45% {
    transform: translate3d(8px, 48vh, 0);
  }
  80% {
    transform: translate3d(-8px, 82vh, 0);
  }
  96% {
    opacity: 1;
  }
  100% {
    transform: translate3d(0, 108vh, 0);
    opacity: 0;
  }
}
</style>
