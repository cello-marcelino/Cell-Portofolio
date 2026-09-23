import { onMounted, onUnmounted, ref } from 'vue';
import Lenis from 'lenis';

const lenisInstance = ref(null);

export function stopSmoothScroll() {
  if (lenisInstance.value) {
    lenisInstance.value.stop();
  }
}

export function startSmoothScroll() {
  if (lenisInstance.value) {
    lenisInstance.value.start();
  }
}

export function useSmoothScroll() {
  onMounted(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion: do not enable smooth scroll hijacking
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    if (lenisInstance.value) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisInstance.value = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Clean up
    onUnmounted(() => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance.value = null;
    });
  });

  const scrollTo = (target, options = {}) => {
    if (lenisInstance.value) {
      lenisInstance.value.scrollTo(target, options);
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return {
    lenis: lenisInstance,
    scrollTo,
    stop: stopSmoothScroll,
    start: startSmoothScroll,
  };
}
