"use client";

import React, { RefObject, useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

const ACCENT = '#ff4d3d';

export default function CornerBrackets({
  activeRef,
  containerRef,
  color = ACCENT,
  strokeWidth = 2,
}: {
  activeRef: RefObject<HTMLElement>;
  containerRef: RefObject<HTMLElement>;
  color?: string;
  strokeWidth?: number;
}) {
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const [radius, setRadius] = useState<number>(16);

  const measure = () => {
    const el = activeRef.current;
    const host = containerRef.current;
    if (!el || !host) return;
    const r = el.getBoundingClientRect();
    const c = host.getBoundingClientRect();
    setRect({ x: r.left - c.left, y: r.top - c.top, w: r.width, h: r.height });
    const cs = window.getComputedStyle(el);
    const rr = parseFloat(cs.borderRadius || "16");
    setRadius(Number.isFinite(rr) ? rr : 16);
  };

  useLayoutEffect(() => {
    measure();
    // re-measure on fonts/layout settle
    const id = setTimeout(measure, 50);
    return () => clearTimeout(id);
  }, [activeRef.current]);

  useEffect(() => {
    const onWin = () => measure();
    window.addEventListener("resize", onWin);
    window.addEventListener("scroll", onWin, true);
    return () => {
      window.removeEventListener("resize", onWin);
      window.removeEventListener("scroll", onWin, true);
    };
  }, []);

  if (!rect) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      initial={false}
    >
      <motion.svg
        viewBox={`0 0 ${rect.w} ${rect.h}`}
        className="absolute"
        style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }}
        transition={{ type: "spring", stiffness: 140, damping: 22 }}
      >
        {/* Four L brackets with glow */}
        {(() => {
          const L = 16;
          const paths = [
            `M${radius} ${strokeWidth} H${radius + L} M${strokeWidth} ${radius} V${radius + L}`,
            `M${rect.w - radius - L} ${strokeWidth} H${rect.w - radius} M${rect.w - strokeWidth} ${radius} V${radius + L}`,
            `M${radius} ${rect.h - strokeWidth} H${radius + L} M${strokeWidth} ${rect.h - radius} V${rect.h - radius - L}`,
            `M${rect.w - radius - L} ${rect.h - strokeWidth} H${rect.w - radius} M${rect.w - strokeWidth} ${rect.h - radius} V${rect.h - radius - L}`,
          ];
          return paths.map((d, i) => (
            <g key={i}>
              <motion.path d={d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" initial={false} />
              <motion.path d={d} stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" initial={false} opacity={0.25} filter="url(#blur)" />
            </g>
          ));
        })()}
        <defs>
          <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>
      </motion.svg>
    </motion.div>
  );
}


