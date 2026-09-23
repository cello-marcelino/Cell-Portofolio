<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const floatingTokens = [
  // Left Flank
  {
    name: 'Vue.js',
    icon: '/icons/tech/vue.png',
    top: '10%',
    left: '3%',
    duration: '8s',
    delay: '0s',
    animType: 'float-1',
    scale: 0.95,
    opacity: 0.65,
    parallaxFactor: 1.2,
  },
  {
    name: 'Python',
    icon: '/icons/tech/python.png',
    top: '26%',
    left: '7%',
    duration: '10s',
    delay: '1.5s',
    animType: 'float-2',
    scale: 0.85,
    opacity: 0.55,
    parallaxFactor: 0.8,
  },
  {
    name: 'Node.js',
    icon: '/icons/tech/nodejs.png',
    top: '44%',
    left: '2%',
    duration: '9s',
    delay: '3s',
    animType: 'float-3',
    scale: 1.0,
    opacity: 0.7,
    parallaxFactor: 1.4,
  },
  {
    name: 'FastAPI',
    icon: '/icons/tech/fastapi.png',
    top: '62%',
    left: '6%',
    duration: '11s',
    delay: '0.8s',
    animType: 'float-4',
    scale: 0.85,
    opacity: 0.55,
    parallaxFactor: 0.9,
  },
  {
    name: 'Sentence-BERT',
    icon: '/icons/tech/sentence-bert.png',
    top: '80%',
    left: '3%',
    duration: '12s',
    delay: '2.2s',
    animType: 'float-1',
    scale: 0.9,
    opacity: 0.6,
    parallaxFactor: 1.1,
  },

  // Right Flank
  {
    name: 'React',
    icon: '/icons/tech/react.png',
    top: '12%',
    left: '93%',
    duration: '9.5s',
    delay: '0.5s',
    animType: 'float-2',
    scale: 0.95,
    opacity: 0.65,
    parallaxFactor: 1.3,
  },
  {
    name: 'Tailwind CSS',
    icon: '/icons/tech/tailwind.png',
    top: '28%',
    left: '89%',
    duration: '8.5s',
    delay: '2s',
    animType: 'float-3',
    scale: 0.9,
    opacity: 0.6,
    parallaxFactor: 1.0,
  },
  {
    name: 'Laravel',
    icon: '/icons/tech/laravel.png',
    top: '46%',
    left: '94%',
    duration: '10.5s',
    delay: '1s',
    animType: 'float-4',
    scale: 1.0,
    opacity: 0.7,
    parallaxFactor: 1.5,
  },
  {
    name: 'Git',
    icon: '/icons/tech/git.png',
    top: '65%',
    left: '90%',
    duration: '9s',
    delay: '3.5s',
    animType: 'float-1',
    scale: 0.85,
    opacity: 0.55,
    parallaxFactor: 0.8,
  },
  {
    name: 'Next.js',
    icon: '/icons/tech/nextjs.png',
    top: '82%',
    left: '93%',
    duration: '11.5s',
    delay: '1.8s',
    animType: 'float-2',
    scale: 0.9,
    opacity: 0.65,
    parallaxFactor: 1.2,
  },

  // Inward Subtle Ambient Badges
  {
    name: 'TensorFlow',
    icon: '/icons/tech/tensorflow.png',
    top: '18%',
    left: '12%',
    duration: '13s',
    delay: '4s',
    animType: 'float-3',
    scale: 0.8,
    opacity: 0.45,
    parallaxFactor: 0.6,
  },
  {
    name: 'MySQL',
    icon: '/icons/tech/mysql.png',
    top: '74%',
    left: '85%',
    duration: '12.5s',
    delay: '2.5s',
    animType: 'float-4',
    scale: 0.8,
    opacity: 0.45,
    parallaxFactor: 0.7,
  },
];

// Interactive Parallax Offset
const mouseOffset = ref({ x: 0, y: 0 });
let targetX = 0;
let targetY = 0;
let animationFrameId = null;

const handleMouseMove = (e) => {
  const normX = e.clientX / window.innerWidth - 0.5;
  const normY = e.clientY / window.innerHeight - 0.5;
  targetX = normX * 18;
  targetY = normY * 18;
};

const updateParallax = () => {
  mouseOffset.value.x += (targetX - mouseOffset.value.x) * 0.08;
  mouseOffset.value.y += (targetY - mouseOffset.value.y) * 0.08;
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
    <div
      v-for="(item, idx) in floatingTokens"
      :key="idx"
      class="absolute will-change-transform transition-opacity duration-300"
      :style="{
        top: item.top,
        left: item.left,
        opacity: item.opacity,
        transform: `translate3d(${mouseOffset.x * item.parallaxFactor}px, ${mouseOffset.y * item.parallaxFactor}px, 0)`,
      }"
    >
      <!-- Floating Badge Wrapper with Organic Bobbing Animation -->
      <div
        class="floating-token p-2 sm:p-2.5 rounded-2xl bg-white/75 backdrop-blur-[2px] border border-slate-200/70 shadow-xs flex items-center justify-center hover:scale-110 transition-transform"
        :style="{
          animation: `${item.animType} ${item.duration} ease-in-out infinite ${item.delay}`,
          transform: `scale(${item.scale})`,
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
</template>

<style scoped>
@keyframes float-1 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-16px) rotate(4deg);
  }
}

@keyframes float-2 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-22px) rotate(-5deg);
  }
}

@keyframes float-3 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-13px) rotate(3deg);
  }
}

@keyframes float-4 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-19px) rotate(-3deg);
  }
}
</style>
