"use client";

import React from "react";
import { motion } from "framer-motion";

/* ========= motion ========= */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

/* ========= SVGs ========= */
function HeroOrbSVG() {
  return (
    <svg viewBox="0 0 520 360" className="h-full w-full">
      <defs>
        <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="260" cy="180" r="130" fill="url(#orbGlow)" />
      {Array.from({ length: 5 }).map((_, i) => (
        <ellipse key={i} cx="260" cy="180" rx={130 - i * 18} ry={60 - i * 8} fill="none" stroke="rgba(255,255,255,0.10)">
          <animate attributeName="rx" values={`${130 - i * 18};${126 - i * 18};${130 - i * 18}`} dur="6s" repeatCount="indefinite" />
        </ellipse>
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={`ring-${i}`} cx="260" cy="180" r={40 + i * 18} fill="none" stroke="rgba(255,255,255,0.12)">
          <animate attributeName="stroke-opacity" values="0.12;0.25;0.12" dur={`${3 + i * 0.25}s`} repeatCount="indefinite" />
        </circle>
      ))}
      {[{x:205,y:150},{x:315,y:150},{x:280,y:215},{x:235,y:210}].map((p,idx)=>(
        <g key={idx}>
          <circle cx={p.x} cy={p.y} r="5" fill="#10B981">
            <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite" begin={`${idx*0.2}s`} />
          </circle>
          <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="#10B981" strokeOpacity="0.4">
            <animate attributeName="r" values="10;18;10" dur="2.2s" repeatCount="indefinite" begin={`${idx*0.2}s`} />
            <animate attributeName="stroke-opacity" values="0.4;0;0.4" dur="2.2s" repeatCount="indefinite" begin={`${idx*0.2}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function OrchestrationSVG() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-auto">
      <g fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeLinecap="round">
        {["M20 60 C 90 5, 170 10, 250 35",
          "M40 80 C 120 55, 200 65, 300 80",
          "M30 40 C 140 30, 210 50, 300 30"].map((d,i)=>(
            <path key={i} d={d} strokeDasharray="260" strokeDashoffset="260">
              <animate attributeName="stroke-dashoffset" values="260;0" dur={`${1.2 + i*0.25}s`} fill="freeze" begin="0.2s" />
            </path>
        ))}
      </g>
      {[{x:20,y:60},{x:120,y:25},{x:250,y:35},{x:60,y:85},{x:210,y:68},{x:300,y:80},{x:300,y:30}]
        .map((n,i)=>(
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="4" fill="#10B981">
            <animate attributeName="r" values="3.5;5;3.5" dur="1.8s" repeatCount="indefinite" begin={`${i*0.1}s`} />
          </circle>
          <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#10B981" strokeOpacity="0.28">
            <animate attributeName="r" values="8;14;8" dur="1.8s" repeatCount="indefinite" begin={`${i*0.1}s`} />
            <animate attributeName="stroke-opacity" values="0.28;0;0.28" dur="1.8s" repeatCount="indefinite" begin={`${i*0.1}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function FoundationsSVG() {
  return (
    <svg viewBox="0 0 320 120" className="w-full h-auto">
      <defs>
        <linearGradient id="L" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <g>
        <rect x="70" y="18" width="180" height="26" rx="6" fill="url(#L)">
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 -2; 0 0" dur="3.4s" repeatCount="indefinite" />
        </rect>
        <rect x="70" y="54" width="180" height="26" rx="6" fill="url(#L)">
          <animateTransform attributeName="transform" type="translate" values="0 0; 0 2; 0 0" dur="3.4s" repeatCount="indefinite" />
        </rect>
        <rect x="70" y="90" width="180" height="26" rx="6" fill="none" stroke="rgba(255,255,255,0.45)" strokeDasharray="6 6" />
      </g>
    </svg>
  );
}

/* ========= component ========= */
export default function CommercialBoard({ className }: { className?: string }) {
  return (
    <section className={`bg-neutral-950 text-white ${className ?? ""}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase">More Than Infrastructure.</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold">The Platform to Build Commercial AI Agents.</h2>
          <p className="mt-3 text-neutral-300 max-w-3xl mx-auto">
            From prototype to production — RemoteAgent supplies the runtime, orchestration, and security layer
            to launch agents customers can trust.
          </p>
        </div>

        {/* BOARD */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative rounded-none border border-neutral-800 bg-neutral-950/40 overflow-hidden"
        >
          {/* hairline dividers */}
          <div className="hidden lg:block absolute inset-y-0 left-[66.666%] w-px bg-neutral-800" />
          <div className="hidden lg:block absolute top-1/2 right-0 w-[33.334%] h-px bg-neutral-800" />

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] lg:grid-rows-2">
            {/* BIG LEFT (spans 2 rows) */}
            <motion.div
              variants={item}
              className="relative lg:col-[1/2] lg:row-[1/3] border-b border-neutral-800 lg:border-b-0"
              onMouseMove={(e) => {
                const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                (e.currentTarget as HTMLElement).style.setProperty("--mx", `${e.clientX - r.left}px`);
                (e.currentTarget as HTMLElement).style.setProperty("--my", `${e.clientY - r.top}px`);
              }}
            >
              {/* inner layout: content + art; fixed height so no dead area */}
              <div className="grid grid-cols-1 md:grid-cols-[1.25fr_1fr] items-center min-h-[440px] lg:min-h-[560px] p-8 md:p-10">
                <div className="z-10">
                  <h3 className="text-2xl font-semibold">From Prototype to Production</h3>
                  <p className="mt-3 text-neutral-300 max-w-prose">
                    Stop hacking fragile demos. RemoteAgent turns experiments into production-ready applications
                    with persistence, scaling, and enterprise guardrails built-in.
                  </p>
                  <a
                    href="/product"
                    className="mt-6 inline-flex items-center gap-2 border border-neutral-800 px-3 py-1.5 text-sm font-medium
                               hover:border-emerald-400/40 hover:text-emerald-300"
                  >
                    Learn more
                    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>

                {/* art fills the area */}
                <div className="relative h-[280px] md:h-[360px] lg:h-[440px]">
                  {/* pointer-follow glow */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(420px 220px at var(--mx,60%) var(--my,40%), rgba(16,185,129,0.10), transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-0 p-4">
                    <HeroOrbSVG />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT TOP */}
            <motion.div variants={item} className="p-8 md:p-10 min-h-[280px] border-b border-neutral-800">
              <div className="mb-4"><OrchestrationSVG /></div>
              <h3 className="text-xl font-semibold">Multi-Agent Orchestration</h3>
              <p className="mt-2 text-neutral-300">
                Coordinate browsing, research, coding, and custom agents into workflows that deliver business outcomes.
              </p>
              <a href="/orchestration" className="mt-5 inline-flex items-center gap-2 border border-neutral-800 px-3 py-1.5 text-sm font-medium hover:border-emerald-400/40 hover:text-emerald-300">
                Explore orchestration
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </motion.div>

            {/* RIGHT BOTTOM */}
            <motion.div variants={item} className="p-8 md:p-10 min-h-[280px]">
              <div className="mb-4"><FoundationsSVG /></div>
              <h3 className="text-xl font-semibold">Enterprise-Grade Foundations</h3>
              <p className="mt-2 text-neutral-300">
                RBAC, audit logs, isolation, and shared volumes come standard — so your agents are secure and compliant.
              </p>
              <a href="/security" className="mt-5 inline-flex items-center gap-2 border border-neutral-800 px-3 py-1.5 text-sm font-medium hover:border-emerald-400/40 hover:text-emerald-300">
                See security features
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


