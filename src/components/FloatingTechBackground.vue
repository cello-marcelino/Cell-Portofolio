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
  seed: idx * 1.37,
  targetRad: (token.tilt * Math.PI) / 180,
  icon: resolveIcon(token.icon),
}));

// DOM element references
const tokenEls = ref([]);

// Physics Engine variables
let engine = null;
let world = null;
let bodies = [];
let leftWall = null;
let rightWall = null;
let ceiling = null;
let animationFrameId = null;

// Passive mouse deflection tracking
let mousePos = { x: -9999, y: -9999 };
let mouseVel = { x: 0, y: 0 };
let lastMousePos = { x: -9999, y: -9999 };
let lastMouseTime = performance.now();
let isMouseActive = false;
let mouseDecayTimeout = null;

const handlePointerMove = (e) => {
  const now = performance.now();
  const dt = Math.max((now - lastMouseTime) / 1000, 0.008);

  if (isMouseActive && lastMousePos.x > -1000) {
    const rawVx = (e.clientX - lastMousePos.x) / dt;
    const rawVy = (e.clientY - lastMousePos.y) / dt;
    // Exponential smoothing for steady momentum transfer
    mouseVel.x = mouseVel.x * 0.25 + rawVx * 0.75;
    mouseVel.y = mouseVel.y * 0.25 + rawVy * 0.75;
  } else {
    mouseVel.x = 0;
    mouseVel.y = 0;
  }

  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
  lastMousePos.x = e.clientX;
  lastMousePos.y = e.clientY;
  lastMouseTime = now;
  isMouseActive = true;

  if (mouseDecayTimeout) clearTimeout(mouseDecayTimeout);
  mouseDecayTimeout = setTimeout(() => {
    mouseVel.x = 0;
    mouseVel.y = 0;
  }, 100);
};

const handlePointerLeave = () => {
  isMouseActive = false;
  mousePos.x = -9999;
  mousePos.y = -9999;
  mouseVel.x = 0;
  mouseVel.y = 0;
};

const respawnToken = (body, token) => {
  const winW = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const spawnX = Math.random() * (winW - 80) + 40;
  const spawnY = -60 - Math.random() * 160;
  Body.setPosition(body, { x: spawnX, y: spawnY });
  // Brisk downward floating velocity
  Body.setVelocity(body, {
    x: (Math.random() - 0.5) * 0.5,
    y: Math.random() * 1.2 + 0.9,
  });
  Body.setAngle(body, token.targetRad);
  Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.015);
};

const initPhysics = () => {
  if (typeof window === 'undefined') return;

  const w = window.innerWidth;
  const h = window.innerHeight;

  // 1. Initialize Matter.js Engine with accelerated rain gravity
  engine = Engine.create({
    gravity: {
      x: 0,
      y: 0.16, // Accelerated gravity for a crisper, more dynamic rain flow
      scale: 0.0008,
    },
  });
  world = engine.world;

  // 2. Invisible boundary walls (Left, Right, Ceiling)
  const wallThickness = 80;
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

  // 3. Create 26 rigid body badges evenly and randomly distributed across the viewport
  // Uses shuffled stratified sampling so startX and startY are 100% independent of index `i`,
  // eliminating any diagonal line artifact while preventing clumps/overlaps on initial frame.
  const cols = 6;
  const rows = 5; // 30 cells total for 26 tokens
  const cellW = (w - 80) / cols;
  const cellH = (h + 120) / rows;

  const candidateSlots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      candidateSlots.push({
        x: 40 + c * cellW + Math.random() * Math.max(10, cellW - 48),
        y: -60 + r * cellH + Math.random() * Math.max(10, cellH - 48),
      });
    }
  }

  // Fisher-Yates shuffle to randomize slot-to-token assignments on every reload
  for (let j = candidateSlots.length - 1; j > 0; j--) {
    const k = Math.floor(Math.random() * (j + 1));
    [candidateSlots[j], candidateSlots[k]] = [candidateSlots[k], candidateSlots[j]];
  }

  bodies = rainTokens.map((token, i) => {
    const slot = candidateSlots[i] || {
      x: Math.random() * (w - 80) + 40,
      y: Math.random() * (h + 100) - 60,
    };

    const startX = Math.max(25, Math.min(w - 25, slot.x));
    const startY = slot.y;

    const body = Bodies.rectangle(startX, startY, 46, 46, {
      chamfer: { radius: 14 },
      restitution: 0.82, // Elastic bounciness on mouse / badge impacts
      frictionAir: 0.0405, // Lowered by 10% (from 0.045 down to 0.0405)
      friction: 0.05,
      density: 0.001,
      angle: token.targetRad,
    });

    Body.setVelocity(body, {
      x: (Math.random() - 0.5) * 0.5,
      y: Math.random() * 1.2 + 0.9,
    });

    return body;
  });

  Composite.add(world, bodies);

  // 4. In-memory image preloading
  rainTokens.forEach((token) => {
    const img = new Image();
    img.src = token.icon;
  });

  // 5. 60 FPS requestAnimationFrame render loop with passive mouse deflection
  const mouseRadius = 85;
  const mouseRadiusSq = mouseRadius * mouseRadius;
  let lastTime = performance.now();

  const updateLoop = (now) => {
    const delta = Math.min(now - lastTime, 33.33);
    lastTime = now;

    // Passive Mouse Deflection Physics (No click/hold required)
    if (isMouseActive) {
      const speedSq = mouseVel.x * mouseVel.x + mouseVel.y * mouseVel.y;
      const swipeSpeed = Math.min(Math.sqrt(speedSq), 2200);

      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const dx = body.position.x - mousePos.x;
        const dy = body.position.y - mousePos.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mouseRadiusSq && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const nx = dx / dist;
          const ny = dy / dist;

          // Proximity factor (1.0 at cursor tip, 0.0 at radius edge)
          const proximity = 1 - dist / mouseRadius;

          // Radial push force
          const pushMagnitude = proximity * 0.0042;

          // Swipe momentum impulse
          const swipeMagnitude = (swipeSpeed / 1000) * proximity * 0.0075;
          const swipeDirX = swipeSpeed > 15 ? mouseVel.x / swipeSpeed : nx;
          const swipeDirY = swipeSpeed > 15 ? mouseVel.y / swipeSpeed : ny;

          const fx = nx * pushMagnitude + swipeDirX * swipeMagnitude;
          const fy = ny * pushMagnitude + swipeDirY * swipeMagnitude;

          Body.applyForce(body, body.position, { x: fx, y: fy });

          // Impart subtle organic spin on impact
          const torque = (dx * swipeDirY - dy * swipeDirX) * 0.00018;
          Body.setAngularVelocity(body, body.angularVelocity + torque);
        }
      }
    }

    // Step physics engine
    Engine.update(engine, delta);

    const floorLimit = window.innerHeight + 80;

    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      const token = rainTokens[i];

      // Respawn when falling past bottom floor
      if (body.position.y > floorLimit) {
        respawnToken(body, token);
      }

      // Gentle tilt stabilization spring (gradually restores aesthetic organic angle)
      const angleDiff = token.targetRad - body.angle;
      body.torque += angleDiff * 0.00035;
      body.angularVelocity *= 0.985;

      // Subtle ambient micro-sway for floating feel
      body.force.x += Math.sin(now * 0.001 + token.seed) * 0.000035;

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
  const wallThickness = 80;

  if (leftWall) Body.setPosition(leftWall, { x: -wallThickness / 2, y: h / 2 });
  if (rightWall) Body.setPosition(rightWall, { x: w + wallThickness / 2, y: h / 2 });
  if (ceiling) Body.setPosition(ceiling, { x: w / 2, y: -260 });
};

onMounted(() => {
  initPhysics();
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (mouseDecayTimeout) clearTimeout(mouseDecayTimeout);
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerleave', handlePointerLeave);
  window.removeEventListener('resize', handleResize);

  if (engine) {
    Composite.clear(world, false);
    Engine.clear(engine);
  }
});
</script>

<template>
  <div
    class="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    aria-hidden="true"
  >
    <!-- Physics-driven passive floating rain tech badges -->
    <div
      v-for="(item, idx) in rainTokens"
      :key="item.id"
      :ref="(el) => { if (el) tokenEls[idx] = el; }"
      class="absolute top-0 left-0 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white/95 backdrop-blur-[2px] border border-slate-200/90 shadow-sm flex items-center justify-center p-2 select-none will-change-transform pointer-events-none transition-shadow duration-200"
      :style="{
        opacity: item.opacity,
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
        draggable="false"
      />
    </div>
  </div>
</template>
