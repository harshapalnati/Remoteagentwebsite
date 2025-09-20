"use client";

import { motion } from "framer-motion";

type Case = { title: string; body: string };

const CASES: Case[] = [
  { title: "Browser Agent", body: "Navigate websites, extract data, and interact with the web like a user." },
  { title: "Deep Research Agent", body: "Run long-form, multi-source research across large datasets and knowledge bases." },
  { title: "Computer Use Agent", body: "Operate a virtual computer — click, type, upload, and automate real apps." },
  { title: "Integration Agent", body: "Bridge APIs, tools, and internal systems into unified workflows." },
  { title: "Coding Agent", body: "Generate, run, and test code safely in isolated sandboxes." },
  { title: "Reinforcement Learning Agent", body: "Train policies in dynamic environments with long-horizon tasks." },
  { title: "Multimedia Agent", body: "Process and generate images, audio, and video programmatically." },
  { title: "Custom Agent", body: "Compose specialized agents tailored to your domain and tasks." },
];

function ArrowIcon(){
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-[var(--ra-text)]/70">
      <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LineIcon(){
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[var(--ra-text)]">
      <rect x="3" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 9h8M6 12h6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export default function UseCasesGrid(){
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className="rounded-2xl bg-[var(--ra-card)] shadow-panel border border-[var(--ra-stroke)]/50 p-6 md:p-10"
    >
      <div className="text-[var(--ra-ink)] text-[11px] tracking-[0.2em] uppercase">[ Use Cases ]</div>
      <h3 className="mt-2 text-[var(--ra-text)] text-2xl md:text-3xl font-semibold">Built for Every Type of Agent</h3>
      <p className="mt-2 text-[var(--ra-muted)]">From browsing to RL — our runtime powers agents end-to-end.</p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {CASES.map((c) => (
          <motion.article
            key={c.title}
            whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(0,0,0,0.45)" }}
            className="rounded-2xl bg-[var(--ra-card)] shadow-panel border border-[var(--ra-stroke)]/50 p-6 min-h-[160px] md:min-h-[180px] group relative overflow-hidden"
          >
            <div className="flex items-center gap-2">
              <LineIcon />
              <h4 className="text-[var(--ra-text)] font-semibold text-base md:text-lg">{c.title}</h4>
            </div>
            <p className="mt-2 text-[var(--ra-muted)] text-sm leading-relaxed">{c.body}</p>
            <a href="#" aria-label={`Learn more about ${c.title}`} className="mt-3 inline-flex items-center text-[var(--ra-text)]/70">
              Learn more <span className="ml-2"><ArrowIcon /></span>
            </a>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] opacity-0 group-hover:opacity-100" style={{ background: "linear-gradient(120deg, var(--ra-accent-1), var(--ra-accent-2))" }} />
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}


