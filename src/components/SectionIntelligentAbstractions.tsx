"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

/** Brand color for corner accents */
const BRAND = "#ff3b2d";

type CardProps = {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  className?: string;
  fancy?: "knowledge" | undefined;
};

function CornerAccents() {
  return (
    <>
      {/* top-left */}
      <motion.span
        aria-hidden
        className="absolute left-3 top-3 h-3 w-3"
        initial={{ x: -8, y: -8, opacity: 0 }}
        whileHover={{ x: 0, y: 0, opacity: 1 }}
        whileFocus={{ x: 0, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        style={{ borderColor: BRAND }}
      >
        <span
          className="absolute left-0 top-0 h-[2px] w-3"
          style={{ background: BRAND }}
        />
        <span
          className="absolute left-0 top-0 h-3 w-[2px]"
          style={{ background: BRAND }}
        />
      </motion.span>

      {/* bottom-right */}
      <motion.span
        aria-hidden
        className="absolute right-3 bottom-3 h-3 w-3"
        initial={{ x: 8, y: 8, opacity: 0 }}
        whileHover={{ x: 0, y: 0, opacity: 1 }}
        whileFocus={{ x: 0, y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        style={{ borderColor: BRAND }}
      >
        <span
          className="absolute right-0 bottom-0 h-[2px] w-3"
          style={{ background: BRAND }}
        />
        <span
          className="absolute right-0 bottom-0 h-3 w-[2px]"
          style={{ background: BRAND }}
        />
      </motion.span>
    </>
  );
}

function FeatureCard({ icon, title, children, className = "", fancy }: CardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const r = useTransform(x, [-10, 10], [-2, 2]);

  return (
    <motion.div
      className={
        "relative rounded-2xl border border-white/10 bg-[#0b0b0c] p-6 " +
        "shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,.6)] " +
        "transition-[box-shadow,border-color] duration-300 " +
        className
      }
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width) * 20 - 10);
        y.set(((e.clientY - rect.top) / rect.height) * 20 - 10);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileHover={{ y: -2, scale: 1.02, borderColor: "rgba(255,255,255,.25)" }}
      style={{ rotate: r }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <CornerAccents />

      <div className="flex items-center gap-3">
        <span className="text-[18px]" style={{ color: BRAND }}>
          {icon}
        </span>
        <h3 className="font-mono text-[15px] tracking-tight text-white">{title}</h3>
      </div>

      <div className="mt-3 text-sm leading-6 text-zinc-400">{children}</div>

      {fancy === "knowledge" && (
        <div className="relative mt-6">
          {/* layered file chips */}
          <motion.div
            className="absolute left-0 right-0 -top-1 mx-auto h-9 max-w-[360px] rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm flex items-center px-3 text-[12px] text-zinc-300"
            style={{ x: x, y: y }}
          >
            <span className="mr-2 opacity-70">📄</span> bank_statements.json
          </motion.div>
          <motion.div
            className="absolute left-3 right-3 top-6 mx-auto h-9 max-w-[340px] rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm flex items-center px-3 text-[12px] text-zinc-300"
            style={{ x: useTransform(x, (v) => v * 0.6), y: useTransform(y, (v) => v * 0.6) }}
          >
            <span className="mr-2 opacity-70">📄</span> Annual_Report.pdf
          </motion.div>
          <motion.div
            className="absolute left-6 right-6 top-12 mx-auto h-9 max-w-[320px] rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm flex items-center px-3 text-[12px] text-zinc-300"
            style={{ x: useTransform(x, (v) => v * 0.3), y: useTransform(y, (v) => v * 0.3) }}
          >
            <span className="mr-2 opacity-70">🔗</span> docs.acme.com
          </motion.div>
          <div className="pt-24" />
        </div>
      )}
    </motion.div>
  );
}

export default function SectionIntelligentAbstractions() {
  return (
    <section className="relative w-full bg-[#0A0A0A] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Intro row */}
        <div className="grid gap-10 md:gap-16 lg:grid-cols-2 items-start">
          <div>
            <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white">
              Ship faster with RemoteAgent’s intelligent abstractions
            </h2>
          </div>
          <p className="text-zinc-400 text-[15px] leading-7">
            RemoteAgent abstracts the plumbing so you can move faster. Build agents, teams, and
            workflows with session history, user memories, knowledge search, reasoning, and human-in-the-loop.
            Think in behavior, not wiring.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          <FeatureCard icon={<span>💾</span>} title="Memory">
            Give agents context from past interactions the moment it’s needed. Bring your own DB or use
            built-in stores with retention controls.
          </FeatureCard>

          <FeatureCard icon={<span>🧭</span>} title="Knowledge" fancy="knowledge">
            Equip agents with dynamic domain expertise. Built-in semantic search; works with any vector DB.
          </FeatureCard>

          <FeatureCard icon={<span>🧠</span>} title="Reasoning">
            Structured tool-use, multi-step plans, and eval hooks so agents stay reliable under load.
          </FeatureCard>

          <FeatureCard icon={<span>🤝</span>} title="Human in the loop">
            Approval gates, escalation, and audit trails — inject operators at the right steps without breaking flow.
          </FeatureCard>
        </div>
      </div>
    </section>
  );
}


