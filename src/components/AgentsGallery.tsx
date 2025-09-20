"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  Search,
  Monitor,
  Plug,
  Braces,
  Route,
  Video,
  Puzzle,
} from "lucide-react";

const AGENTS = [
  { slug: "browser", title: "Browser Agent", desc: "Navigate websites, extract data, and interact with the web like a user.", icon: Globe },
  { slug: "deep-research", title: "Deep Research Agent", desc: "Run long-form, multi-source research across large datasets and knowledge bases.", icon: Search },
  { slug: "computer-use", title: "Computer Use Agent", desc: "Operate a virtual computer—click, type, upload, and automate real apps.", icon: Monitor },
  { slug: "integration", title: "Integration Agent", desc: "Bridge APIs, tools, and internal systems into unified workflows.", icon: Plug },
  { slug: "coding", title: "Coding Agent", desc: "Generate, run, and test code safely in isolated sandboxes.", icon: Braces },
  { slug: "reinforcement-learning", title: "Reinforcement Learning Agent", desc: "Train policies in dynamic environments with long-horizon rewards.", icon: Route },
  { slug: "multimedia", title: "Multimedia Agent", desc: "Process and generate images, audio, and video programmatically.", icon: Video },
  { slug: "custom", title: "Custom Agent", desc: "Compose specialized agents tailored to your domain and tasks.", icon: Puzzle },
] as const;

export default function AgentsGallery({ className }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
  } as const;
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } } as const;

  return (
    <section aria-labelledby="agents-heading" className={`ra-section ${className ? className : ""}`}>
      <div className="ra-container py-16">
        <div className="text-center mb-10">
          <p className="text-[11px] tracking-[0.2em] text-[color:var(--ra-muted)] uppercase">[ Use Cases ]</p>
          <h2 id="agents-heading" className="mt-3 ra-headline text-3xl sm:text-4xl">
            Built for every type of deep agent
          </h2>
          <p className="mt-3 text-[color:var(--ra-muted)] max-w-2xl mx-auto">
            Pick a proven template, wire your stack, and keep governance and metrics consistent across all agents you deploy.
          </p>
        </div>

        <motion.ul
          variants={prefersReducedMotion ? undefined : container}
          initial={prefersReducedMotion ? undefined : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {AGENTS.map((a) => {
            const IconComp = a.icon;
            return (
              <motion.li key={a.slug} variants={prefersReducedMotion ? undefined : item}>
                <a
                  href={`/agents/${a.slug}`}
                  className="group relative overflow-hidden block ra-card min-h-[240px] shadow-none transition-all duration-200 hover:-translate-y-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ra-accent)]/30 motion-reduce:transform-none motion-reduce:transition-none"
                >
                  {/* Card-level radial glow */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 m-auto h-[280px] w-[280px] rounded-full blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:transition-none"
                    style={{ background: "color-mix(in oklab, var(--ra-accent) 12%, transparent)" }}
                  />
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center border rounded-none"
                       style={{ borderColor: "var(--ra-border)" }}>
                    {/* Icon glow behind glyph */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -z-10 m-auto h-[120px] w-[120px] rounded-full blur-2xl opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100 motion-reduce:transition-none"
                      style={{ background: "color-mix(in oklab, var(--ra-accent) 20%, transparent)" }}
                    />
                    <IconComp className="h-5 w-5 transition-transform duration-200 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none" />
                  </div>

                  <h3 className="text-[17px] font-semibold leading-tight font-mono">{a.title}</h3>
                  <p className="mt-1 text-[13px] leading-6 text-[color:var(--ra-muted)] line-clamp-2">{a.desc}</p>

                  <span
                    className="mt-auto inline-flex items-center gap-1 border px-3 py-1.5 text-[12px] font-medium rounded-none"
                    style={{ borderColor: "var(--ra-border)" }}
                    aria-label={`Learn more about ${a.title}`}
                  >
                    Learn more
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden>
                      <path d="M7 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}


