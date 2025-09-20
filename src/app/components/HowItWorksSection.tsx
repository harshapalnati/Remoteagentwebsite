"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const cards = [
    {
      title: "Spin Up an Agent",
      body:
        "Launch a dedicated, secure container in seconds. Each agent comes preloaded with computer-use capabilities.",
    },
    {
      title: "Customize & Connect",
      body:
        "Guide your agent with natural language. Add tools, APIs, or tasks — agents can even extend themselves with their own code.",
    },
    {
      title: "Run Autonomous Workflows",
      body:
        "Agents execute end-to-end tasks — coding, browsing, typing, uploading — and scale across thousands of workflows without breaking.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className="rounded-2xl bg-[var(--ra-card)] shadow-panel border border-[var(--ra-stroke)]/50 mx-auto max-w-[1200px] px-6 md:px-10 py-12 md:py-16"
    >
      <div className="grid lg:grid-cols-[40%_60%] gap-8 md:gap-12 items-start">
        {/* Left */}
        <div>
          <h2 className="text-[var(--ra-text)] text-3xl md:text-5xl font-semibold tracking-tight">How RemoteAgent Works</h2>
          <button
            type="button"
            className="mt-6 inline-flex items-center rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[var(--ra-ring)]"
            style={{ background: "linear-gradient(120deg, var(--ra-accent-1), var(--ra-accent-2))" }}
          >
            Get Early Access
            <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Right cards */}
        <div className="relative">
          <div className="hidden lg:block absolute left-1 top-0 bottom-0 w-px bg-white/5 rounded-full" />
          <div className="space-y-6">
            {cards.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
                viewport={{ once: true }}
                className={`rounded-2xl bg-[var(--ra-card)] shadow-panel border border-[var(--ra-stroke)]/50 p-6 md:p-7 text-[var(--ra-muted)] hover:shadow-[0_10px_30px_rgba(46,107,255,0.12)] hover:-translate-y-1 transition will-change-transform ${i===1?"lg:translate-y-12":""} ${i===2?"lg:translate-y-24":""}`}
              >
                <h3 className="text-[var(--ra-text)] font-semibold text-lg md:text-xl">{i + 1}. {c.title}</h3>
                <p className="mt-2 text-[var(--ra-muted)]">{c.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}


