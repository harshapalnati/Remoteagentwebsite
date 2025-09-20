"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Feature = {
  title: string;
  desc: string;
  Icon: () => JSX.Element;
};

const Placeholder = ({ seed = 1 }: { seed?: number }) => (
  <svg
    viewBox="0 0 64 64"
    className="h-10 w-10 text-emerald-400"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect x="6" y="6" width="52" height="52" className="opacity-20" />
    <path d={`M12 ${20 + seed} L32 ${10 + seed} L52 ${20 + seed}`} />
    <path d={`M12 ${36 + seed} L32 ${26 + seed} L52 ${36 + seed}`} className="opacity-80" />
    <circle cx="32" cy={44 + seed / 2} r="3" />
  </svg>
);

const FEATURES: Feature[] = [
  {
    title: "Persistent Agents",
    desc:
      "Run long-horizon tasks without breaking. RemoteAgent containers are stateful by design — no more flaky scripts or resets.",
    Icon: () => <Placeholder seed={0} />,
  },
  {
    title: "Global Reach",
    desc:
      "Launch agents near your data and users. Multi-region runtime for low-latency execution worldwide.",
    Icon: () => <Placeholder seed={2} />,
  },
  {
    title: "Environment Snapshots",
    desc:
      "Save, restore, and resume any agent workflow instantly. Perfect for debugging, scaling, or compliance.",
    Icon: () => <Placeholder seed={4} />,
  },
  {
    title: "Shared Volumes",
    desc:
      "Let agents share data securely across sessions without breaking isolation — built for enterprise collaboration.",
    Icon: () => <Placeholder seed={6} />,
  },
];

export default function RuntimeGrid({ className }: { className?: string }) {
  const prefersReduced = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  } as const;
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } } as const;

  return (
    <section className={`w-full bg-neutral-950 text-white ${className ?? ""}`} aria-labelledby="runtime-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.18em] text-neutral-400 uppercase">More Than Infrastructure.</p>
          <h2 id="runtime-heading" className="mt-3 font-mono text-3xl sm:text-4xl font-bold tracking-normal">The Runtime AI Agents Actually Need.</h2>
          <p className="mt-3 text-neutral-300 max-w-3xl mx-auto">Purpose-built for Browser Agents, Deep Research, RL, and Enterprise Workflows.</p>
        </div>

        <motion.ul
          variants={prefersReduced ? undefined : container}
          initial={prefersReduced ? undefined : "hidden"}
          whileInView={prefersReduced ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6"
        >
          {FEATURES.map(({ title, desc, Icon }, idx) => (
            <motion.li key={idx} variants={prefersReduced ? undefined : item}>
              <div className="group relative block min-h-[280px] rounded-none border border-neutral-800 bg-neutral-900/40 p-6 shadow-none transition-all duration-200 hover:-translate-y-[2px] hover:border-emerald-400/40">
                <div className="mb-3 inline-flex h-12 w-12 items-center justify-center border border-neutral-800 rounded-none">
                  <Icon />
                </div>
                <h3 className="text-[17px] font-semibold leading-tight font-mono">{title}</h3>
                <p className="mt-1 text-[13px] leading-6 text-neutral-300">{desc}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}


