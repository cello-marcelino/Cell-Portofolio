<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Matter from 'matter-js';

const { Engine, Bodies, Body, Composite } = Matter;

// Safe base URL resolver for assets across dev & production
const baseUrl = import.meta.env.BASE_URL || '/';
const resolveIcon = (path) => {
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

// Curated tech tokens for the rain animation across all 5 screen zones
const rawRainTokens = [
  // --- Left Flank (0% – 20%) ---
  {
    name: 'Vue.js',
    icon: '/icons/tech/vue.png',
    left: '2.5%',
    tilt: -16,
    opacity: 0.85,
  },
  {
    name: 'Python',
    icon: '/icons/tech/python.png',
    left: '6.5%',
    tilt: 18,
    opacity: 0.8,
  },
  {
    name: 'Node.js',
    icon: '/icons/tech/nodejs.png',
    left: '11%',
    tilt: -22,
    opacity: 0.82,
  },
  {
    name: 'Tailwind CSS',
    icon: '/icons/tech/tailwind.png',
    left: '15.5%',
    tilt: 15,
    opacity: 0.75,
  },
  {
    name: 'Sentence-BERT',
    icon: '/icons/tech/sentence-bert.png',
    left: '19.5%',
    tilt: -14,
    opacity: 0.72,
  },

  // --- Left-Center Zone (20% – 40%) ---
  {
    name: 'FastAPI',
    icon: '/icons/tech/fastapi.png',
    left: '24%',
    tilt: 16,
    opacity: 0.68,
  },
  {
    name: 'Flask',
    icon: '/icons/tech/flask.png',
    left: '28.5%',
    tilt: -19,
    opacity: 0.62,
  },
  {
    name: 'SQLite',
    icon: '/icons/tech/sqlite.png',
    left: '33%',
    tilt: 14,
    opacity: 0.65,
  },
  {
    name: 'Scikit-Learn',
    icon: '/icons/tech/scikit-learn.png',
    left: '37.5%',
    tilt: -12,
    opacity: 0.6,
  },

  // --- Dead-Center Zone (40% – 60%) ---
  {
    name: 'Streamlit',
    icon: '/icons/tech/streamlit.png',
    left: '42%',
    tilt: 19,
    opacity: 0.58,
  },
  {
    name: 'TensorFlow',
    icon: '/icons/tech/tensorflow.png',
    left: '46.5%',
    tilt: -16,
    opacity: 0.62,
  },
  {
    name: 'BM25',
    icon: '/icons/tech/bm25.png',
    left: '51%',
    tilt: 21,
    opacity: 0.58,
  },
  {
    name: 'Chart.js',
    icon: '/icons/tech/chartjs.png',
    left: '55.5%',
    tilt: -15,
    opacity: 0.6,
  },

  // --- Right-Center Zone (60% – 80%) ---
  {
    name: 'Livewire',
    icon: '/icons/tech/livewire.png',
    left: '60.5%',
    tilt: 18,
    opacity: 0.65,
  },
  {
    name: 'Laravel',
    icon: '/icons/tech/laravel.png',
    left: '65%',
    tilt: -20,
    opacity: 0.68,
  },
  {
    name: 'Postman',
    icon: '/icons/tech/postman.png',
    left: '69.5%',
    tilt: 14,
    opacity: 0.64,
  },
  {
    name: 'Pytest',
    icon: '/icons/tech/pytest.png',
    left: '74%',
    tilt: -17,
    opacity: 0.66,
  },
  {
    name: 'Python',
    icon: '/icons/tech/python.png',
    left: '78.5%',
    tilt: 16,
    opacity: 0.72,
  },

  // --- Right Flank (80% – 100%) ---
  {
    name: 'React',
    icon: '/icons/tech/react.png',
    left: '83%',
    tilt: 19,
    opacity: 0.84,
  },
  {
    name: 'Next.js',
    icon: '/icons/tech/nextjs.png',
    left: '87%',
    tilt: -18,
    opacity: 0.82,
  },
  {
    name: 'MySQL',
    icon: '/icons/tech/mysql.png',
    left: '91%',
    tilt: 20,
    opacity: 0.78,
  },
  {
    name: 'Git',
    icon: '/icons/tech/git.png',
    left: '94.5%',
    tilt: -15,
    opacity: 0.76,
  },
  {
    name: 'GitHub',
    icon: '/icons/tech/github.png',
    left: '97.5%',
    tilt: 13,
    opacity: 0.74,
  },

  // --- Secondary Ambient Droplets for Full-Canvas Flow ---
  {
    name: 'Vue.js',
    icon: '/icons/tech/vue.png',
    left: '31%',
    tilt: -16,
    opacity: 0.6,
  },
  {
    name: 'Node.js',
    icon: '/icons/tech/nodejs.png',
    left: '49%',
    tilt: 22,
    opacity: 0.55,
  },
  {
    name: 'FastAPI',
    icon: '/icons/tech/fastapi.png',
    left: '67%',
    tilt: -13,
    opacity: 0.65,
  },
];

const rainTokens = rawRainTokens.map((token, idx) => ({
  id: `token-${idx}`,
  ...token,
  icon: resolveIcon(token.icon),
}));

// DOM element references
const tokenEls = ref([]);
const activeBodyIndex = ref(-1);

// Physics Engine variables
let engine = null;
let world = null;
let bodies = [];
let leftWall = null;
let rightWall = null;
let ceiling = null;
let animationFrameId = null;

// Interaction tracking
let activePointerId = null;
let grabbedBody = null;
let dragOffset = { x: 0, y: 0 };
let pointerHistory = [];

const handlePointerDown = (e, idx) => {
  if (activePointerId !== null) return;
  activePointerId = e.pointerId;

  if (e.currentTarget?.setPointerCapture) {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback if capture unsupported
    }
  }

  activeBodyIndex.value = idx;
  grabbedBody = bodies[idx];

  if (grabbedBody) {
    dragOffset = {
      x: e.clientX - grabbedBody.position.x,
      y: e.clientY - grabbedBody.position.y,
    };
    Body.setVelocity(grabbedBody, { x: 0, y: 0 });
    Body.setAngularVelocity(grabbedBody, 0);
  }

  pointerHistory = [{ x: e.clientX, y: e.clientY, time: performance.now() }];
};

const handlePointerMove = (e) => {
  if (!grabbedBody || e.pointerId !== activePointerId) return;

  const targetX = e.clientX - dragOffset.x;
  const targetY = e.clientY - dragOffset.y;

  const now = performance.now();
  pointerHistory.push({ x: e.clientX, y: e.clientY, time: now });
  if (pointerHistory.length > 5) {
    pointerHistory.shift();
  }

  Body.setPosition(grabbedBody, { x: targetX, y: targetY });
  Body.setVelocity(grabbedBody, { x: 0, y: 0 });
};

const handlePointerUp = (e) => {
  if (!grabbedBody || e.pointerId !== activePointerId) return;

  // Compute release velocity vector
  let vx = 0;
  let vy = 0;
  if (pointerHistory.length >= 2) {
    const oldest = pointerHistory[0];
    const newest = pointerHistory[pointerHistory.length - 1];
    const dt = (newest.time - oldest.time) / 1000;
    if (dt > 0.005) {
      vx = (newest.x - oldest.x) / (dt * 60);
      vy = (newest.y - oldest.y) / (dt * 60);
    }
  }

  // Smooth physical limit clamp
  const maxV = 32;
  vx = Math.max(-maxV, Math.min(maxV, vx * 1.15));
  vy = Math.max(-maxV, Math.min(maxV, vy * 1.15));

  Body.setVelocity(grabbedBody, { x: vx, y: vy });

  // Impart realistic spin proportional to horizontal throw velocity + slight organic kick
  const angularSpin = vx * 0.008 + (Math.random() - 0.5) * 0.08;
  Body.setAngularVelocity(grabbedBody, angularSpin);

  grabbedBody = null;
  activeBodyIndex.value = -1;
  activePointerId = null;
};

const respawnToken = (body) => {
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const spawnX = Math.random() * (winW - 80) + 40;
  const spawnY = -60 - Math.random() * 180;
  Body.setPosition(body, { x: spawnX, y: spawnY });
  Body.setVelocity(body, {
    x: (Math.random() - 0.5) * 1.2,
    y: Math.random() * 2 + 1.2,
  });
  Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
};

const initPhysics = () => {
  if (typeof window === 'undefined') return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  // 1. Initialize Matter.js Engine with gentle rain gravity
  engine = Engine.create({
    gravity: {
      x: 0,
      y: 0.35,
      scale: 0.001,
    },
  });
  world = engine.world;

  // 2. Invisible boundary walls (Left, Right, Ceiling)
  const wallThickness = 60;
  leftWall = Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h * 3, {
    isStatic: true,
    restitution: 0.85,
    friction: 0.05,
  });
  rightWall = Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h * 3, {
    isStatic: true,
    restitution: 0.85,
    friction: 0.05,
  });
  ceiling = Bodies.rectangle(w / 2, -260, w * 3, wallThickness, {
    isStatic: true,
    restitution: 0.85,
    friction: 0.05,
  });

  Composite.add(world, [leftWall, rightWall, ceiling]);

  // 3. Create 26 rigid body badges with rounded corners
  bodies = rainTokens.map((token, i) => {
    const pct = parseFloat(token.left) / 100;
    const startX = Math.max(30, Math.min(w - 30, pct * w));
    // Stagger initial Y from -120 to h * 0.95 so rain starts distributed
    const startY = (i / rainTokens.length) * (h * 1.05) - 100 + (Math.random() - 0.5) * 50;

    const body = Bodies.rectangle(startX, startY, 46, 46, {
      chamfer: { radius: 14 },
      restitution: 0.78, // Bouncy elastic collisions
      frictionAir: 0.015,
      friction: 0.08,
      density: 0.002,
      angle: (token.tilt * Math.PI) / 180,
    });

    Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 0.8,
      y: Math.random() * 2 + 1,
    });

    return body;
  });

  Composite.add(world, bodies);

  // 4. In-memory image preloading
  rainTokens.forEach((token) => {
    const img = new Image();
    img.src = token.icon;
  });

  // 5. High performance 60 FPS requestAnimationFrame render loop
  let lastTime = performance.now();
  const updateLoop = (now) => {
    const delta = Math.min(now - lastTime, 33.33);
    lastTime = now;

    Engine.update(engine, delta);

    const floorLimit = window.innerHeight + 80;

    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];

      // Respawn when falling past bottom floor
      if (body !== grabbedBody && body.position.y > floorLimit) {
        respawnToken(body);
      }

      // Sync position directly to DOM element style (60 FPS, bypasses Vue reactive VDOM)
      const el = tokenEls.value[i];
      if (el) {
        const x = body.position.x - 23; // Center offset (46 / 2)
        const y = body.position.y - 23;
        el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
      }
    }

    animationFrameId = requestAnimationFrame(updateLoop);
  };

  animationFrameId = requestAnimationFrame(updateLoop);
};

const handleResize = () => {
  if (!world || typeof window === 'undefined') return;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const wallThickness = 60;

  if (leftWall) Body.setPosition(leftWall, { x: -wallThickness / 2, y: h / 2 });
  if (rightWall) Body.setPosition(rightWall, { x: w + wallThickness / 2, y: h / 2 });
  if (ceiling) Body.setPosition(ceiling, { x: w / 2, y: -260 });
};

onMounted(() => {
  initPhysics();
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerup', handlePointerUp, { passive: true });
  window.addEventListener('pointercancel', handlePointerUp, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerup', handlePointerUp);
  window.removeEventListener('pointercancel', handlePointerUp);
  window.removeEventListener('resize', handleResize);

  if (engine) {
    Composite.clear(world, false);
    Engine.clear(engine);
  }
});
</script>

<template>
  <div
    class="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Physics-driven interactive falling tech badges -->
    <div
      v-for="(item, idx) in rainTokens"
      :key="item.id"
      :ref="(el) => { if (el) tokenEls[idx] = el; }"
      class="absolute top-0 left-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/95 backdrop-blur-[2px] border border-slate-200/90 shadow-sm flex items-center justify-center p-2 select-none cursor-grab active:cursor-grabbing will-change-transform pointer-events-auto touch-none transition-shadow duration-150"
      :class="[
        activeBodyIndex === idx
          ? 'scale-110 shadow-lg ring-2 ring-teal-500/40 z-30 opacity-100'
          : 'hover:scale-105 hover:shadow-md hover:border-teal-400/80 hover:opacity-100',
      ]"
      :style="{
        opacity: activeBodyIndex === idx ? 1 : item.opacity,
      }"
      @pointerdown="handlePointerDown($event, idx)"
    >
      <img
        :src="item.icon"
        :alt="item.name"
        width="28"
        height="28"
        class="w-full h-full object-contain block select-none pointer-events-none"
        loading="eager"
        decoding="async"
        draggable="false"
      />
    </div>
  </div>
</template>
