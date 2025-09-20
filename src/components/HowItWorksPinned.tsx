// Fixed ScrollTrigger freeze: scoped context, functional end, no RO rebuilds.
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  const g: any = (gsap as any).core?.globals?.() || {};
  if (!g["ScrollTrigger"]) gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    title: "1. Spin Up an Agent",
    body:
      "Launch a dedicated, secure container in seconds. Each agent comes preloaded with computer-use capabilities.",
  },
  {
    title: "2. Customize & Connect",
    body:
      "Guide your agent with natural language. Add tools, APIs, or tasks — agents can even extend themselves with their own code.",
  },
  {
    title: "3. Run Autonomous Workflows",
    body:
      "Agents execute end-to-end tasks — coding, browsing, typing, uploading — and scale across thousands of workflows without breaking.",
  },
];

export default function HowItsWorkspinned() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const cometRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const section = rootRef.current!;
      const wrapEl = wrapRef.current!;
      const railEl = railRef.current!;
      const cometEl = cometRef.current!;
      const cards = Array.from(wrapEl.querySelectorAll<HTMLElement>("[data-step-card]"));
      if (!cards.length) return;

      const dimAll = () =>
        gsap.set(cards, {
          opacity: 0.3,
          filter: "blur(1.5px)",
          x: 0,
          willChange: "transform,filter,opacity",
        });
      const setActive = (i: number) => {
        cards.forEach((c, idx) => {
          gsap.to(c, {
            opacity: idx === i ? 1 : 0.3,
            filter: idx === i ? "blur(0px)" : "blur(1.5px)",
            x: idx === i ? 2 : 0,
            duration: 0.25,
            overwrite: true,
          });
        });
      };

      const measure = () => {
        const wrapTop = wrapEl.getBoundingClientRect().top + window.scrollY;
        const rects = cards.map((c) => c.getBoundingClientRect());
        const tops = rects.map((r) => r.top + window.scrollY - wrapTop);
        const lastBottom = rects[rects.length - 1].bottom + window.scrollY - wrapTop;
        gsap.set(railEl, { height: Math.max(1, Math.round(lastBottom - tops[0])) });
        return { tops, firstTop: tops[0] };
      };

      dimAll();
      setActive(0);

      const quickCometY = gsap.quickTo(cometEl, "y", { duration: 0.25, ease: "power1.out" });

      let tops: number[] = [];
      let firstTop = 0;
      const recompute = () => {
        const m = measure();
        tops = m.tops;
        firstTop = m.firstTop;
        gsap.set(cometEl, { y: firstTop });
      };
      recompute();

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () =>
            "+=" +
            Math.max(
              1400,
              (cards.length - 1) * Math.max(600, window.innerHeight * 0.9),
              (wrapEl.scrollHeight - section.clientHeight) + window.innerHeight * 0.75
            ),
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => recompute(),
          onUpdate: (self) => {
            const pSteps = (cards.length - 1) * self.progress;
            const idx = Math.round(pSteps);
            setActive(idx);
            const base = Math.floor(pSteps);
            const frac = pSteps - base;
            const yA = tops[base] ?? firstTop;
            const yB = tops[base + 1] ?? yA;
            quickCometY(yA + (yB - yA) * frac);
          },
        });
        return () => st.kill();
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.from(cards, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 80%", invalidateOnRefresh: true },
        });
        return () => {
          ScrollTrigger.getAll().forEach((t) => t.vars.trigger === section && t.kill());
        };
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      // @ts-ignore
      document?.fonts?.ready && (document.fonts as any).ready.then(() => ScrollTrigger.refresh());

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="w-full border border-white/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-[42%_58%] gap-10 md:gap-16 items-start">
          {/* Left */}
          <div>
            <div className="text-xs tracking-wider uppercase text-zinc-500">[ Deep agents, simplified ]</div>
            <h2 className="mt-2 font-mono text-5xl md:text-6xl font-bold text-white leading-tight">
              How<br className="hidden sm:block" /> RemoteAgent<br className="hidden sm:block" /> Works
            </h2>

            <div className="mt-6">
              <a href="/contact" className="ra-cta inline-flex items-center gap-2">
                Get Early Access
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.172 12 8.222 7.05l1.414-1.414L16 12l-6.364 6.364-1.414-1.414z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right */}
          <div ref={wrapRef} className="relative overflow-visible">
            {/* rail */}
            <div ref={railRef} className="absolute left-0 top-0 ml-3 w-px bg-white/20" />
            {/* comet */}
            <div
              ref={cometRef}
              className="absolute left-0 top-0 -translate-x-[5px] h-2.5 w-2.5 bg-white ring-1 ring-white/30 z-10"
            />
            {/* steps */}
            <div className="pl-8 space-y-16">
              {STEPS.map((s, i) => (
                <div key={i} data-step-card className="will-change-transform">
                  <h3 className="text-white text-xl md:text-2xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-zinc-400 max-w-2xl">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


