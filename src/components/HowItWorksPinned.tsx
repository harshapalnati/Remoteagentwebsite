// Fixed ScrollTrigger freeze: scoped context, functional end, no RO rebuilds.
"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  const g = (gsap as unknown as { core?: { globals?: () => Record<string, unknown> } }).core?.globals?.() || {};
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
        const lastRect = rects[rects.length - 1]!;
        const lastBottom = (lastRect?.bottom ?? 0) + window.scrollY - wrapTop;
        const firstTop = tops[0] ?? 0;
        gsap.set(railEl, { height: Math.max(1, Math.round(lastBottom - firstTop)) });
        return { tops, firstTop };
      };

      // Desktop starts with Step 1 highlighted; on mobile, show all steps plainly
      if (window.matchMedia("(min-width: 1024px)").matches) {
        dimAll();
        setActive(0);
      } else {
        gsap.set(cards, { opacity: 1, filter: "blur(0px)", x: 0 });
      }

      const quickCometY = gsap.quickTo(cometEl, "y", { duration: 0.12, ease: "power1.out" });

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
        // find the next section (sibling) to release pin when it reaches 70% viewport
        const nextSection =
          (section.closest("section")?.nextElementSibling as HTMLElement | null) ??
          ((section.parentElement?.nextElementSibling as HTMLElement | null) as HTMLElement | null);

        // helper: update highlight/comet by progress (0..1)
        const updateByProgress = (p: number) => {
          const pSteps = (cards.length - 1) * p;
          const idx = Math.round(pSteps);
          setActive(idx);

          const base = Math.floor(pSteps);
          const frac = pSteps - base;
          const yA = tops[base] ?? firstTop;
          const yB = tops[base + 1] ?? yA;
          quickCometY(yA + (yB - yA) * frac);
        };

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          ...(nextSection
            ? { endTrigger: nextSection, end: "top 40%" }
            : { end: "+=" + Math.max(700, (cards.length - 1) * Math.max(320, window.innerHeight * 0.42)) }),
          pin: true,
          pinSpacing: true,
          scrub: 0.12,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => recompute(),
          onUpdate: (self) => updateByProgress(self.progress),
          snap: (value) => {
            const n = cards.length - 1;
            return Math.round(value * n) / n;
          },
        });

        const onKey = (e: KeyboardEvent) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
          const n = cards.length - 1;
          const cur = Math.round(st.progress * n);
          const next = Math.max(0, Math.min(n, cur + (e.key === "ArrowRight" ? 1 : -1)));
          gsap.to(st, { progress: next / n, duration: 0.35, ease: "power2.out" });
        };
        window.addEventListener("keydown", onKey);

        return () => {
          window.removeEventListener("keydown", onKey);
          st.kill();
        };
      });

      mm.add("(max-width: 1023px)", () => {
        // No scroll effects on mobile; render statically and remove any blur/dim
        gsap.set(cards, { opacity: 1, y: 0, filter: "blur(0px)", clearProps: "willChange" });
        return () => {
          ScrollTrigger.getAll().forEach((t) => t.vars.trigger === section && t.kill());
        };
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
      // Wait for fonts to be ready before refreshing measurements
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error - document.fonts may not be typed across environments
      if (document?.fonts?.ready) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (document.fonts as any).ready.then(() => ScrollTrigger.refresh());
      }

      return () => mm.revert();
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="w-full border border-white/10 bg-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-10 py-12 md:py-24">
        <div className="grid lg:grid-cols-[42%_58%] gap-8 md:gap-16 items-start">
          {/* Left */}
          <div>
            <div className="text-xs tracking-wider uppercase text-zinc-500 text-center lg:text-left">[ Deep agents, simplified ]</div>
            <h2 className="mt-2 font-mono text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight text-center lg:text-left">
              How<br className="hidden sm:block" /> RemoteAgent<br className="hidden sm:block" /> Works
            </h2>

            <div className="mt-4 sm:mt-6 text-center lg:text-left">
              <a href="/contact" className="ra-cta inline-flex items-center gap-2 text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2">
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
            <div ref={railRef} className="hidden lg:block absolute left-0 top-0 ml-3 w-px bg-white/20" />
            {/* comet */}
            <div ref={cometRef} className="hidden lg:block absolute left-0 top-0 -translate-x-[5px] h-2.5 w-2.5 bg-white ring-1 ring-white/30 z-10" />
            {/* steps */}
            <div className="pl-0 lg:pl-8 space-y-10 sm:space-y-14 lg:space-y-16">
              {STEPS.map((s, i) => (
                <div key={i} data-step-card className="will-change-transform">
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-semibold">{s.title}</h3>
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


