"use client";

import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Feature = { title: string; body: string };

const FEATURES: Feature[] = [
  {
    title: "Memory",
    body:
      "Gives agents context from past interactions, right when it’s needed. Bring your own database.",
  },
  {
    title: "Knowledge",
    body:
      "Equip agents with dynamic instructions and domain expertise. Built-in agentic search with support for any vector DB.",
  },
  {
    title: "Reasoning",
    body:
      "Agents reason step by step to break down tasks and make decisions reliably.",
  },
  {
    title: "Human in the Loop",
    body:
      "Keep humans involved where judgment, oversight, or approval is required.",
  },
];

function RedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#ff4d3d]">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="#ff4d3d" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="2" fill="#ff4d3d" />
    </svg>
  );
}

export default function HowItWorksAgno() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const cards = Array.from(rootRef.current.querySelectorAll<HTMLElement>(".agno-card"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            gsap.fromTo(
              e.target as HTMLElement,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: i * 0.08 }
            );
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="w-full bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-[100px]" ref={rootRef}>
        {/* Headline row */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <h2 className="text-[36px] font-bold leading-tight" style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", Arial' }}>
            How RemoteAgent Works
          </h2>
          <p className="text-[16px] leading-relaxed text-[#666]">
            RemoteAgent abstracts the hard parts so you can move faster. Build agents, teams, workflows with memory,
            knowledge, reasoning, and human in the loop. Think in behavior, not plumbing.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="agno-card group rounded-lg border border-[#eaeaea] bg-white p-6 shadow-[0_0_0_0_rgba(0,0,0,0)] transition-transform duration-300 hover:-translate-y-[6px] hover:shadow-[0_12px_30px_-16px_rgba(0,0,0,0.18)]"
            >
              <div className="flex items-center gap-2 text-[#ff4d3d]">
                <RedIcon />
              </div>
              <h3
                className="mt-3 text-[18px] font-semibold"
                style={{ fontFamily: '"IBM Plex Mono", monospace' }}
              >
                {f.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.5] text-[#555]">{f.body}</p>
              {/* icon pulse on hover */}
              <div className="mt-0">
                <div className="h-[2px] w-6 bg-[#ff4d3d] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


