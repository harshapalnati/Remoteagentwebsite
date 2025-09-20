"use client";
import { useEffect, useRef } from "react";

type Props = { className?: string };

export default function Particles({ className }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const anim = useRef<number | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };

    const dots = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.22 * devicePixelRatio,
      r: (Math.random() * 1.2 + 1.0) * devicePixelRatio,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,0.12)";
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // soft vignette
      const grd = ctx.createRadialGradient(
        w / 2,
        h / 2,
        0,
        w / 2,
        h / 2,
        Math.max(w, h) / 1.2
      );
      grd.addColorStop(0, "rgba(0,0,0,0)");
      grd.addColorStop(1, "rgba(0,0,0,0.22)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      anim.current = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(onResize);
    ro.observe(canvas);

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      // draw once with static dots
      for (let k = 0; k < 2; k++) draw();
    } else {
      draw();
    }
    return () => {
      if (anim.current) cancelAnimationFrame(anim.current);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={(className ?? "") + " block w-full h-full"} />;
}


