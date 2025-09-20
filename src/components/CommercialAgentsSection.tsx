"use client";

import React from "react";
import { motion } from "framer-motion";

/* ====================== Animated Background ====================== */
function AnimatedGridBG() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="gridStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(16,185,129,0.12)" />
            <stop offset="100%" stopColor="rgba(16,185,129,0.02)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 40 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 30} y1="0" x2={i * 30} y2="800" stroke="url(#gridStroke)" strokeWidth="1" />
        ))}
        {Array.from({ length: 30 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 26} x2="1200" y2={i * 26} stroke="url(#gridStroke)" strokeWidth="1" />
        ))}
      </svg>

      <div
        className="absolute -inset-1 animate-[pulseMove_10s_ease-in-out_infinite] opacity-60"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 30%, rgba(16,185,129,0.12), transparent 60%), radial-gradient(500px 260px at 80% 70%, rgba(16,185,129,0.10), transparent 60%)",
        }}
      />
      <style>{`
        @keyframes pulseMove {
          0%,100% { transform: translate3d(0,0,0) }
          50% { transform: translate3d(0,-8px,0) }
        }
      `}</style>
    </div>
  );
}

/* ====================== SVG: Animated Globe ====================== */
function AnimatedGlobeSVG() {
  return (
    <svg viewBox="0 0 600 360" className="w-full h-auto">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="300" cy="170" r="120" fill="url(#glow)" />
      <circle cx="300" cy="170" r="120" fill="none" stroke="rgba(255,255,255,0.12)" />
      {Array.from({ length: 5 }).map((_, i) => (
        <ellipse key={i} cx="300" cy="170" rx={120 - i * 18} ry={56 - i * 8} fill="none" stroke="rgba(255,255,255,0.10)" />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={i} cx="300" cy="170" r={40 + i * 18} fill="none" stroke="rgba(255,255,255,0.10)" />
      ))}
      {[
        { x: 255, y: 130 },
        { x: 225, y: 190 },
        { x: 335, y: 210 },
        { x: 365, y: 145 },
        { x: 408, y: 190 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#10B981">
            <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
          </circle>
          <circle cx={p.x} cy={p.y} r="12" fill="none" stroke="#10B981" strokeOpacity="0.35">
            <animate attributeName="r" values="10;18;10" dur="2.2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
            <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur="2.2s" repeatCount="indefinite" begin={`${i * 0.25}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ====================== SVG: Orchestration (nodes) ====================== */
function OrchestrationSVG() {
  const nodes = [
    { x: 40, y: 60 },
    { x: 160, y: 30 },
    { x: 240, y: 70 },
    { x: 90, y: 120 },
    { x: 210, y: 130 },
    { x: 140, y: 80 },
  ];
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto">
      <g stroke="rgba(255,255,255,0.18)" strokeWidth="1.5">
        <path d="M40 60 C 80 20, 120 20, 160 30" />
        <path d="M160 30 C 200 50, 220 60, 240 70" />
        <path d="M40 60 C 70 90, 120 100, 210 130" />
        <path d="M90 120 C 120 90, 180 90, 210 130" />
        <path d="M140 80 C 160 70, 190 60, 240 70" />
      </g>
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="4" fill="#10B981">
            <animate attributeName="r" values="3.5;5;3.5" dur="2s" repeatCount="indefinite" begin={`${i * 0.18}s`} />
          </circle>
          <circle cx={n.x} cy={n.y} r="10" fill="none" stroke="#10B981" strokeOpacity="0.3">
            <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" begin={`${i * 0.18}s`} />
            <animate attributeName="stroke-opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" begin={`${i * 0.18}s`} />
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ====================== SVG: Foundations (stacked layers) ====================== */
function FoundationsSVG() {
  return (
    <svg viewBox="0 0 280 160" className="w-full h-auto">
      <defs>
        <linearGradient id="layerG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g>
        <rect x="60" y="30" width="160" height="28" rx="6" fill="url(#layerG)" />
        <rect x="60" y="68" width="160" height="28" rx="6" fill="url(#layerG)" />
        <rect x="60" y="106" width="160" height="28" rx="6" fill="none" stroke="rgba(255,255,255,0.35)" strokeDasharray="6 6" />
        <animateTransform attributeName="transform" type="translate" dur="3.4s" values="0 0; 0 -2; 0 0" repeatCount="indefinite" />
      </g>
    </svg>
  );
}

/* ====================== Motion Variants ====================== */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } };

/* ====================== Main Section ====================== */
export default function CommercialAgentsSection({ className }: { className?: string }) {
  return (
    <section className={`relative w-full bg-neutral-950 text-white ${className ?? ""}`}>
      <AnimatedGridBG />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.2em] text-neutral-400 uppercase">More Than Infrastructure.</p>
          <h2 className="mt-2 font-mono text-3xl sm:text-4xl font-bold tracking-normal">
            The Platform to Build <span className="text-white">Commercial AI Agents</span>.
          </h2>
          <p className="mt-3 text-neutral-300 max-w-3xl mx-auto">
            From prototype to production — RemoteAgent supplies the runtime, orchestration, and security layer
            to launch agents customers can trust.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <motion.article variants={item} className="relative lg:col-span-2 rounded-none border border-neutral-800 bg-neutral-900/40 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <h3 className="text-2xl font-semibold">From Prototype to Production</h3>
                <p className="mt-3 text-neutral-300">
                  Stop hacking fragile demos. RemoteAgent turns experiments into production-ready applications
                  with persistence, scaling, and enterprise guardrails built-in.
                </p>
                <a href="/product" className="mt-6 inline-flex items-center gap-2 border border-neutral-800 px-3 py-1.5 text-sm font-medium rounded-none hover:border-emerald-400/40 hover:text-emerald-300">
                  Learn more
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
              <div className="relative p-6 md:p-8 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="w-full">
                  <AnimatedGlobeSVG />
                </motion.div>
              </div>
            </div>
          </motion.article>

          <motion.article variants={item} className="relative rounded-none border border-neutral-800 bg-neutral-900/40 overflow-hidden">
            <div className="p-8">
              <div className="mb-5"><OrchestrationSVG /></div>
              <h3 className="text-xl font-semibold">Multi-Agent Orchestration</h3>
              <p className="mt-2 text-neutral-300">
                Coordinate browsing, research, coding, and custom agents into workflows that deliver business outcomes.
              </p>
              <a href="/orchestration" className="mt-5 inline-flex items-center gap-2 border border-neutral-800 px-3 py-1.5 text-sm font-medium rounded-none hover:border-emerald-400/40 hover:text-emerald-300">
                Explore orchestration
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </motion.article>

          <motion.article variants={item} className="relative rounded-none border border-neutral-800 bg-neutral-900/40 overflow-hidden">
            <div className="p-8">
              <div className="mb-5"><FoundationsSVG /></div>
              <h3 className="text-xl font-semibold">Enterprise-Grade Foundations</h3>
              <p className="mt-2 text-neutral-300">
                RBAC, audit logs, isolation, and shared volumes come standard — so your agents are secure and compliant.
              </p>
              <a href="/security" className="mt-5 inline-flex items-center gap-2 border border-neutral-800 px-3 py-1.5 text-sm font-medium rounded-none hover:border-emerald-400/40 hover:text-emerald-300">
                See security features
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none"><path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}


