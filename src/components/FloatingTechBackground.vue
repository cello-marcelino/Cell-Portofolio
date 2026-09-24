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

// Dynamic Attraction & Repulsion Shockwave state
let isAttracting = false;
let attractionStart = 0;
let attractionPos = { x: 0, y: 0 };
let activePointerId = null;

// Visual energy feedback ring
const shockwaveState = ref({
  active: false,
  x: 0,
  y: 0,
  exploding: false,
});

// Guard: verify if click/pointer target is an interactive component
const isInteractiveElement = (target) => {
  if (!target || !(target instanceof Element)) return false;
  return !!target.closest(
    'button, a, input, textarea, select, option, label, [role="button"], [role="link"], [role="tab"], [tabindex]:not([tabindex="-1"]), nav, header'
  );
};

const handlePointerDown = (e) => {
  // Only primary mouse click or direct touch
  if (e.button !== 0 && e.pointerType === 'mouse') return;
  // If user clicked interactive element, leave it completely alone!
  if (isInteractiveElement(e.target)) return;

  isAttracting = true;
  attractionStart = performance.now();
  attractionPos.x = e.clientX;
  attractionPos.y = e.clientY;
  activePointerId = e.pointerId;

  // Temporarily disable collision between badges so all 26 icons can converge into 1 single focal point!
  bodies.forEach((b) => {
    b.collisionFilter.group = -1;
  });

  shockwaveState.value = {
    active: true,
    x: e.clientX,
    y: e.clientY,
    exploding: false,
  };
};

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

  // If attraction is active, update attraction point to follow cursor smoothly!
  if (isAttracting && (activePointerId === null || e.pointerId === activePointerId)) {
    attractionPos.x = e.clientX;
    attractionPos.y = e.clientY;
    shockwaveState.value.x = e.clientX;
    shockwaveState.value.y = e.clientY;
  }

  if (mouseDecayTimeout) clearTimeout(mouseDecayTimeout);
  mouseDecayTimeout = setTimeout(() => {
    mouseVel.x = 0;
    mouseVel.y = 0;
  }, 100);
};

const handlePointerUp = (e) => {
  if (!isAttracting || (activePointerId !== null && e.pointerId !== activePointerId)) {
    return;
  }

  const now = performance.now();
  const holdDuration = (now - attractionStart) / 1000; // in seconds

  isAttracting = false;
  activePointerId = null;

  // Restore rain gravity and re-enable collisions between badges
  if (engine) engine.gravity.y = 0.16;
  bodies.forEach((b) => {
    b.collisionFilter.group = 0;
  });

  // Release accumulated energy as an explosive 360-degree repulsion shockwave
  if (holdDuration >= 0.05) {
    shockwaveState.value.exploding = true;
    setTimeout(() => {
      shockwaveState.value.active = false;
      shockwaveState.value.exploding = false;
    }, 450);

    // Charge power multiplier: builds up smoothly with hold duration
    const chargePower = Math.min(Math.max((holdDuration - 0.03) * 2.4, 0.7), 3.6);

    const numBodies = bodies.length;
    for (let i = 0; i < numBodies; i++) {
      const body = bodies[i];
      const dx = body.position.x - attractionPos.x;
      const dy = body.position.y - attractionPos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist <= 50) {
        // A. Icons at the cursor singularity: explosive 360-degree starburst
        const baseAngle = (i / numBodies) * Math.PI * 2;
        const angle = baseAngle + (Math.random() - 0.5) * 0.28;

        const baseBlastSpeed = 22;
        const blastSpeed = Math.min(baseBlastSpeed * chargePower * (0.9 + Math.random() * 0.25), 40);

        // Gentle launch offset outward to ensure clean collision resolution without overlap
        const launchOffset = 14 + Math.random() * 8;
        Body.setPosition(body, {
          x: attractionPos.x + Math.cos(angle) * launchOffset,
          y: attractionPos.y + Math.sin(angle) * launchOffset,
        });

        const vx = Math.cos(angle) * blastSpeed;
        const vy = Math.sin(angle) * blastSpeed;
        Body.setVelocity(body, { x: vx, y: vy });

        const spinKick = (Math.random() - 0.5) * (0.35 + chargePower * 0.15);
        Body.setAngularVelocity(body, spinKick);
      } else {
        // B. Icons distant from cursor: ZERO TELEPORTATION! Keep current position intact,
        // and impart an outward shockwave blast impulse radiating from the cursor.
        const nx = dx / dist;
        const ny = dy / dist;

        const baseBlastSpeed = 22;
        const shockSpeed = Math.min(baseBlastSpeed * chargePower * (180 / (dist + 100)), 22);

        Body.setVelocity(body, {
          x: body.velocity.x * 0.4 + nx * shockSpeed + (Math.random() - 0.5) * 2,
          y: body.velocity.y * 0.4 + ny * shockSpeed + (Math.random() - 0.5) * 2,
        });

        const spinKick = (Math.random() - 0.5) * 0.25;
        Body.setAngularVelocity(body, body.angularVelocity + spinKick);
      }
    }
  } else {
    shockwaveState.value.active = false;
  }
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

  // 5. 60 FPS requestAnimationFrame render loop
  const mouseRadius = 85;
  const mouseRadiusSq = mouseRadius * mouseRadius;
  let lastTime = performance.now();

  const updateLoop = (now) => {
    const delta = Math.min(now - lastTime, 33.33);
    lastTime = now;

    // A. Dynamic Gravity Attraction Vortex (when pointer is pressed on empty area)
    if (isAttracting) {
      engine.gravity.y = 0; // Suspend rain gravity so icons don't fall down during attraction!

      const holdDuration = (now - attractionStart) / 1000;
      // Progressive speed acceleration: starts smoothly and builds swiftly
      const speedCap = Math.min(14 + holdDuration * 24, 38);

      for (let i = 0; i < bodies.length; i++) {
        const body = bodies[i];
        const dx = attractionPos.x - body.position.x;
        const dy = attractionPos.y - body.position.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist <= 48) {
          // 1. Single Focal Point Convergence & High-Tension Vibration ("mengumpul di 1 titik bergetar")
          const vibIntensity = Math.min(1.2 + holdDuration * 3.2, 5.5);
          const jitterX = (Math.random() - 0.5) * vibIntensity * 2;
          const jitterY = (Math.random() - 0.5) * vibIntensity * 2;

          // Smoothly lock coordinates into the vibrating singularity point with high responsiveness
          Body.setPosition(body, {
            x: body.position.x + (attractionPos.x + jitterX - body.position.x) * 0.65,
            y: body.position.y + (attractionPos.y + jitterY - body.position.y) * 0.65,
          });

          // Impart mouse drag momentum so cluster moves with cursor when dragged
          Body.setVelocity(body, {
            x: mouseVel.x * 0.35 + (Math.random() - 0.5) * 1.2,
            y: mouseVel.y * 0.35 + (Math.random() - 0.5) * 1.2,
          });

          // High-frequency tremor spin
          Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.16);
        } else {
          // 2. Smooth, Rapid Progressive Pull towards Cursor ("ditarik secara perlahan cepat tapi halus")
          const nx = dx / dist;
          const ny = dy / dist;

          // Adaptive velocity steering: quickly curves icons toward cursor without orbiting
          const desiredSpeed = Math.min(speedCap, Math.max(6.5, dist * 0.32));
          const targetVx = nx * desiredSpeed;
          const targetVy = ny * desiredSpeed;

          // Exponential critically-damped steering (eliminates violent oscillations or abrupt snapping)
          const steerFactor = 0.22;
          Body.setVelocity(body, {
            x: body.velocity.x + (targetVx - body.velocity.x) * steerFactor,
            y: body.velocity.y + (targetVy - body.velocity.y) * steerFactor,
          });

          // Subtle organic vortex spin while traveling
          Body.setAngularVelocity(body, body.angularVelocity * 0.94 + (Math.random() - 0.5) * 0.03);
        }
      }
    } else {
      engine.gravity.y = 0.16; // Restore normal rain gravity

      if (isMouseActive) {
        // B. Passive Mouse Deflection Physics (when cursor merely moves without click)
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
    }

    // Step physics engine
    Engine.update(engine, delta);

    const floorLimit = window.innerHeight + 80;

    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      const token = rainTokens[i];

      // Respawn when falling past bottom floor (only when not attracting)
      if (!isAttracting && body.position.y > floorLimit) {
        respawnToken(body, token);
      }

      // Gentle tilt stabilization spring (gradually restores aesthetic organic angle when undisturbed)
      if (!isAttracting) {
        const angleDiff = token.targetRad - body.angle;
        body.torque += angleDiff * 0.00035;
        body.angularVelocity *= 0.985;
      }

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
  window.addEventListener('pointerdown', handlePointerDown, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerup', handlePointerUp, { passive: true });
  window.addEventListener('pointercancel', handlePointerUp, { passive: true });
  window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
  window.addEventListener('resize', handleResize, { passive: true });
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (mouseDecayTimeout) clearTimeout(mouseDecayTimeout);
  window.removeEventListener('pointerdown', handlePointerDown);
  window.removeEventListener('pointermove', handlePointerMove);
  window.removeEventListener('pointerup', handlePointerUp);
  window.removeEventListener('pointercancel', handlePointerUp);
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
    <!-- Visual Energy Singularity & Shockwave Blast Indicator -->
    <div
      v-if="shockwaveState.active"
      class="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-400/50 bg-teal-400/15 backdrop-blur-[1px] transition-all"
      :class="[
        shockwaveState.exploding
          ? 'w-20 h-20 scale-[5.5] border-teal-300/80 opacity-0 duration-500 ease-out'
          : 'w-16 h-16 animate-ping opacity-70 duration-200',
      ]"
      :style="{
        left: `${shockwaveState.x}px`,
        top: `${shockwaveState.y}px`,
      }"
    />
    <div
      v-if="shockwaveState.active && !shockwaveState.exploding"
      class="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.9)] opacity-90"
      :style="{
        left: `${shockwaveState.x}px`,
        top: `${shockwaveState.y}px`,
      }"
    />

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
