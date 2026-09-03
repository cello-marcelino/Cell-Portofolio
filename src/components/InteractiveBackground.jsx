"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse state with smooth lerping
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
      radius: 180,
    };

    // Grid configuration
    const gridSize = 40;
    const trailCells = new Map(); // key: "col_row", val: intensity (0 to 1)

    // Ambient floating particles
    const particleCount = Math.min(Math.floor((width * height) / 32000), 40);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "rgba(109, 40, 217, " : "rgba(13, 148, 136, ",
      alpha: Math.random() * 0.35 + 0.15,
    }));

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;

      // Add to interactive trail cells
      const col = Math.floor(e.clientX / gridSize);
      const row = Math.floor(e.clientY / gridSize);
      for (let dc = -2; dc <= 2; dc++) {
        for (let dr = -2; dr <= 2; dr++) {
          const c = col + dc;
          const r = row + dr;
          const dist = Math.hypot(dc, dr);
          if (dist <= 2.2) {
            const key = `${c}_${r}`;
            const current = trailCells.get(key) || 0;
            const boost = Math.max(0, 1 - dist / 2.2);
            trailCells.set(key, Math.min(1, current + boost * 0.6));
          }
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.isHovered = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Clear with crisp off-white canvas
      ctx.fillStyle = "#FBFBFA";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Large Ambient Glows (Light Mode)
      const bgGrad1 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.2,
        60,
        width * 0.8,
        height * 0.2,
        width * 0.6
      );
      bgGrad1.addColorStop(0, "rgba(109, 40, 217, 0.04)");
      bgGrad1.addColorStop(1, "rgba(251, 251, 250, 0)");
      ctx.fillStyle = bgGrad1;
      ctx.fillRect(0, 0, width, height);

      const bgGrad2 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.8,
        60,
        width * 0.2,
        height * 0.8,
        width * 0.5
      );
      bgGrad2.addColorStop(0, "rgba(13, 148, 136, 0.04)");
      bgGrad2.addColorStop(1, "rgba(251, 251, 250, 0)");
      ctx.fillStyle = bgGrad2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Interactive Mouse Spotlight (Light Mode)
      const mouseSpotlight = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.radius
      );
      mouseSpotlight.addColorStop(0, "rgba(13, 148, 136, 0.07)");
      mouseSpotlight.addColorStop(0.4, "rgba(109, 40, 217, 0.05)");
      mouseSpotlight.addColorStop(1, "rgba(251, 251, 250, 0)");
      ctx.fillStyle = mouseSpotlight;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Grid Matrix & Glowing Interactive Cells
      ctx.lineWidth = 1;
      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      // Fade out trail cells
      trailCells.forEach((intensity, key) => {
        const nextVal = intensity * 0.94 - 0.005;
        if (nextVal <= 0.01) {
          trailCells.delete(key);
        } else {
          trailCells.set(key, nextVal);
          const [c, r] = key.split("_").map(Number);
          const cellX = c * gridSize;
          const cellY = r * gridSize;

          // Glowing fill for active cell in light mode
          ctx.fillStyle = `rgba(109, 40, 217, ${nextVal * 0.05})`;
          ctx.fillRect(cellX, cellY, gridSize, gridSize);

          // Highlight border
          ctx.strokeStyle = `rgba(13, 148, 136, ${nextVal * 0.22})`;
          ctx.strokeRect(cellX, cellY, gridSize, gridSize);
        }
      });

      // Render subtle grid points
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const px = i * gridSize;
          const py = j * gridSize;
          const distToMouse = Math.hypot(px - mouse.x, py - mouse.y);

          let pointAlpha = 0.22;
          let pointColor = "148, 163, 184"; // slate-400

          if (distToMouse < mouse.radius) {
            const factor = 1 - distToMouse / mouse.radius;
            pointAlpha = 0.3 + factor * 0.5;
            pointColor = factor > 0.5 ? "13, 148, 136" : "109, 40, 217"; // teal / purple
          }

          ctx.fillStyle = `rgba(${pointColor}, ${pointAlpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 4. Draw Floating Energy Particles & Interactive Repulsion
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse gentle repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 110 && dist > 0) {
          const force = (110 - dist) / 110;
          p.x += (dx / dist) * force * 1.3;
          p.y += (dy / dist) * force * 1.3;
        }

        // Draw particle
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Light mode soft vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(109,40,217,0.03)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(251,251,250,0.5)_80%,#FBFBFA_100%)]" />
    </div>
  );
}
