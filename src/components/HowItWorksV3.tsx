"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/howItWorks.css";

type Step = { title: string; body: string };

const STEPS: Step[] = [
  {
    title: "Step 1 — Spin Up an Agent",
    body:
      "Launch a dedicated, secure container in seconds. Each agent comes preloaded with computer-use capabilities.",
  },
  {
    title: "Step 2 — Customize & Connect",
    body:
      "Guide your agent with natural language. Add tools, APIs, or tasks — agents can even extend themselves with code.",
  },
  {
    title: "Step 3 — Run Autonomous Workflows",
    body:
      "Your agent executes end-to-end tasks — coding, browsing, typing, uploading — and scales across thousands of workflows without breaking.",
  },
];

/* ------------------------- Background field ------------------------- */
function BackgroundField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(800px 600px at 10% 0%, rgba(255,77,61,.20), transparent 60%), radial-gradient(900px 700px at 90% 100%, rgba(255,77,61,.12), transparent 65%), radial-gradient(60% 80% at 50% 0%, rgba(255,77,61,.08), transparent 60%), linear-gradient(#180b0c,#0b0b0c)",
      }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[.12]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%224%22 height=%224%22><rect width=%221%22 height=%221%22 fill=%22rgba(255,255,255,.20)%22/></svg>')",
        }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2P8z8DwnwAIGwMFBQqX3wAAAABJRU5ErkJggg==')",
        }}
      />
    </div>
  );
}

/* ----------------------------- Iso Stack ---------------------------- */
function IsoStack({ className }: { className?: string }) {
  return (
    <div className={"relative " + (className ?? "")}> 
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-[32px] bg-[radial-gradient(60%_80%_at_50%_0%,rgba(255,77,61,.25)_0%,rgba(255,77,61,0)_60%)] blur-2xl" />
      <div className="relative">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.06 }}
            className="mx-auto w-full max-w-[560px]"
          >
            <div
              className="mx-auto h-8 md:h-9 w-[88%] -skew-x-[18deg] rounded-md border border-white/10 bg-white/10 backdrop-blur-sm shadow-[inset_0_0_0_1px_rgba(255,255,255,.06)]"
              style={{ transform: `translateY(${-i * 10}px)` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- Ember Corners -------------------------- */
function EmberCorners({ targetRef }: { targetRef: React.RefObject<HTMLElement> }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [rect, setRect] = useState<{ x: number; y: number; w: number; h: number; r: number } | null>(null);

  const measure = useCallback(() => {
    const el = targetRef.current;
    const svgEl = svgRef.current?.parentElement;
    if (!el || !svgEl) return;
    const r = el.getBoundingClientRect();
    const c = svgEl.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    const br = parseFloat(cs.borderRadius || "16");
    setRect({ x: r.left - c.left, y: r.top - c.top, w: r.width, h: r.height, r: Number.isFinite(br) ? br : 16 });
  }, [targetRef]);

  useLayoutEffect(() => {
    measure();
    const on = () => measure();
    window.addEventListener("resize", on);
    window.addEventListener("scroll", on, true);
    return () => {
      window.removeEventListener("resize", on);
      window.removeEventListener("scroll", on, true);
    };
  }, [measure]);

  if (!rect) return null;
  const L = 14;
  return (
    <svg ref={svgRef} className="pointer-events-none absolute inset-0" aria-hidden>
      <g transform={`translate(${rect.x},${rect.y})`}>
        {/* halo */}
        <rect x={-2} y={-2} width={rect.w + 4} height={rect.h + 4} rx={rect.r + 2} fill="url(#halo)" opacity={0.28} />
        {/* ticks */}
        <g stroke="#ff4d3d" strokeWidth={2}>
          <path d={`M${rect.r} 0 L${rect.r + L} 0`} />
          <path d={`M0 ${rect.r} L0 ${rect.r + L}`} />
          <path d={`M${rect.w - rect.r - L} 0 L${rect.w - rect.r} 0`} />
          <path d={`M${rect.w} ${rect.r} L${rect.w} ${rect.r + L}`} />
          <path d={`M${rect.r} ${rect.h} L${rect.r + L} ${rect.h}`} />
          <path d={`M0 ${rect.h - rect.r} L0 ${rect.h - rect.r - L}`} />
          <path d={`M${rect.w - rect.r - L} ${rect.h} L${rect.w - rect.r} ${rect.h}`} />
          <path d={`M${rect.w} ${rect.h - rect.r} L${rect.w} ${rect.h - rect.r - L}`} />
        </g>
      </g>
      <defs>
        <radialGradient id="halo" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#ff4d3d" stopOpacity={0.22} />
          <stop offset="60%" stopColor="#ff4d3d" stopOpacity={0} />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ---------------------------- Main Section -------------------------- */
export default function HowItWorksV3() {
  // Active index for steps (3 only)
  const [active, setActive] = useState(0);
  const cardRefs = [useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null), useRef<HTMLButtonElement>(null)];
  const pauseRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (pauseRef.current) return;
      setActive((p) => (p + 1) % 3);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#1a0e10]">
      <BackgroundField />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-40">
        {/* Heading row */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">How RemoteAgent Works</h2>
          </div>
          <p className="text-white/80 leading-relaxed">
            RemoteAgent abstracts the hard parts so you can move faster. Build agents, teams, and workflows with
            memory, knowledge, reasoning, and human in the loop. Think in behavior, not plumbing.
          </p>
        </div>

        {/* Content row: left illustration + right feature grid */}
        <div className="mt-12 grid md:grid-cols-[minmax(0,48%)_minmax(0,52%)] gap-12 md:gap-20">
          {/* Left */}
          <div>
            <a href="#early-access" className="inline-flex rounded-full px-4 py-2 bg-white/10 text-white hover:bg-white/15">
              Get Early Access
            </a>
            <div className="mt-10">
              <IsoStack />
            </div>
          </div>

          {/* Right: three step cards */}
          <div className="relative">
            <div className="hiw-spine" />
            <EmberCorners targetRef={cardRefs[active]} />
            <ul className="space-y-6">
              {STEPS.map((s, i) => {
                const isActive = i === active;
                return (
                  <li key={s.title}>
                    <motion.button
                      ref={cardRefs[i]}
                      onMouseEnter={() => (pauseRef.current = true, setActive(i))}
                      onMouseLeave={() => (pauseRef.current = false)}
                      onFocus={() => (pauseRef.current = true, setActive(i))}
                      onBlur={() => (pauseRef.current = false)}
                      className={`hiw-card relative w-full text-left rounded-2xl p-6 md:p-7 ${isActive ? "shadow-[0_12px_40px_-18px_rgba(0,0,0,.6)]" : ""}`}
                      style={{ transformOrigin: "center" }}
                      initial={false}
                      aria-current={isActive}
                    >
                      {isActive && <div className="hiw-halo" />}
                      <span className={`hiw-node ${isActive ? "is-active" : ""}`} style={{ top: "calc(50% - 3px)" }} />
                      <motion.div animate={{ y: isActive ? 0 : 2, scale: isActive ? 1 : 0.998 }} transition={{ duration: 0.35, ease: "easeOut" }}>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] md:text-xs bg-white/10 border border-white/10 rounded px-1.5 py-0.5 text-white/80">
                            {i + 1}.
                          </span>
                          <h3 className="text-base md:text-lg font-semibold text-white">{s.title}</h3>
                        </div>
                        <p className="mt-2 text-sm md:text-base text-white/80 leading-relaxed max-w-prose">{s.body}</p>
                      </motion.div>
                    </motion.button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}


