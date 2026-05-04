import { useEffect, useRef } from "react";

/**
 * InkField — кастомный canvas-фон.
 * Поле тонких чернильных линий, которые "дышат" по шумовому полю
 * и расходятся от курсора. Никаких библиотек.
 */
export function InkField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, vx: 0, vy: 0, active: false });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Particle field — каждая частица оставляет короткий след
    type P = { x: number; y: number; px: number; py: number; a: number; life: number };
    const particles: P[] = [];
    const COUNT = Math.min(140, Math.floor((W * H) / 9000));
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        px: 0, py: 0,
        a: Math.random() * Math.PI * 2,
        life: Math.random() * 200,
      });
    }

    // Pseudo-noise (cheap value noise via sin combos)
    const noise = (x: number, y: number, t: number) => {
      return (
        Math.sin(x * 0.0035 + t * 0.0006) +
        Math.sin(y * 0.0042 - t * 0.0008) +
        Math.sin((x + y) * 0.0021 + t * 0.001)
      ) / 3;
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      pointerRef.current.vx = nx - pointerRef.current.x;
      pointerRef.current.vy = ny - pointerRef.current.y;
      pointerRef.current.x = nx;
      pointerRef.current.y = ny;
      pointerRef.current.active = true;
    };
    const onLeave = () => { pointerRef.current.active = false; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);

    let t = 0;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;
      t += dt;

      // Полупрозрачная заливка — создаёт длинные следы (motion trail)
      ctx.fillStyle = "rgba(244, 239, 228, 0.08)";
      ctx.fillRect(0, 0, W, H);

      const px = pointerRef.current.x * W;
      const py = pointerRef.current.y * H;
      const active = pointerRef.current.active;

      ctx.lineCap = "round";

      for (const p of particles) {
        // векторное поле
        const n = noise(p.x, p.y, t);
        let ang = p.a + n * 0.6;

        // влияние курсора — закручивание
        if (active) {
          const dx = p.x - px;
          const dy = p.y - py;
          const d2 = dx * dx + dy * dy;
          const r = 220;
          if (d2 < r * r) {
            const f = 1 - Math.sqrt(d2) / r;
            // тангенциальный вихрь
            const tang = Math.atan2(dy, dx) + Math.PI / 2;
            ang = ang * (1 - f * 0.85) + tang * f * 0.85;
          }
        }

        p.a = ang * 0.92 + (p.a) * 0.08;
        const speed = 0.55 + Math.abs(n) * 0.6;
        p.px = p.x;
        p.py = p.y;
        p.x += Math.cos(p.a) * speed;
        p.y += Math.sin(p.a) * speed;
        p.life -= 1;

        // wrap
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        if (p.life <= 0) {
          p.x = Math.random() * W;
          p.y = Math.random() * H;
          p.px = p.x; p.py = p.y;
          p.a = Math.random() * Math.PI * 2;
          p.life = 180 + Math.random() * 220;
        }

        // линия — графит / охра
        const useOchre = (p.life | 0) % 11 === 0;
        ctx.strokeStyle = useOchre
          ? "rgba(184, 134, 56, 0.55)"
          : "rgba(40, 44, 56, 0.42)";
        ctx.lineWidth = useOchre ? 0.9 : 0.55;
        ctx.beginPath();
        ctx.moveTo(p.px, p.py);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
