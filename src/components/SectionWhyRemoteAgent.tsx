"use client";

import React from "react";

export default function SectionWhyRemoteAgent() {
  const data = {
    headline: "Turn blueprints into production agents",
    subhead:
      "RemoteAgent enables engineering teams to deliver deep agents in days—not weeks—by starting from prebuilt agents and customizing fast.",
    pillars: [
      {
        title: "Ship production from day one",
        body:
          "Prebuilt deep-agent patterns, eval harnesses, and safety rails; plug in your tools and press go. Launch with confidence.",
      },
      {
        title: "Throughput without the pain",
        body:
          "Scale sessions across fleets with minimal memory and predictable latency.",
      },
      {
        title: "Private by architecture",
        body:
          "Run in your cloud or a dedicated tenancy; data, logs, and metrics stay inside your boundary with RBAC, approvals, and audits.",
      },
      {
        title: "Observable by default",
        body:
          "Session replays, structured logs, metrics, and eval hooks to inspect and improve behavior.",
      },
    ],
    cta: "GET EARLY ACCESS",
  } as const;

  return (
    <section className="bg-[#0A0A0A] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Header Row */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-14 items-start">
          <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
            {data.headline}
          </h2>
          <p className="text-zinc-400 text-[15px] leading-7">{data.subhead}</p>
        </div>

        {/* Pillars Grid: 4-up on lg, sharp corners */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {data.pillars.map((p, i) => (
            <div
              key={i}
              className="border border-white/10 bg-[#0B0B0C] p-6 rounded-none hover:border-white/25 transition-colors"
            >
              <h3 className="font-mono text-[15px] tracking-tight text-white">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{p.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="#early-access"
            className="inline-flex items-center justify-center rounded-none border border-white/80 px-5 py-2 text-xs sm:text-sm font-medium text-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            {data.cta}
          </a>
        </div>
      </div>
    </section>
  );
}


