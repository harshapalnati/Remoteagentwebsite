"use client";

import * as React from "react";
import { motion, LayoutGroup, useMotionValue, useTransform } from "framer-motion";

const BRAND = "var(--ra-accent)";

type Key = "memory" | "knowledge" | "reasoning" | "hitl";

const CARDS: { key: Key; title: string; icon: string; body: string }[] = [
  { key: "memory", title: "Memory", icon: "💾", body: "Give agents context from past interactions when it’s needed. BYO DB or use built-in stores with retention controls." },
  { key: "knowledge", title: "Knowledge", icon: "🧭", body: "Equip agents with domain expertise. Built-in semantic search; works with any vector DB." },
  { key: "reasoning", title: "Reasoning", icon: "🧠", body: "Structured tool-use and plans with eval hooks so agents stay reliable under load." },
  { key: "hitl", title: "Human in the loop", icon: "🤝", body: "Approvals, escalation, and audit trails — inject operators at the right steps." },
];

function Corners({ show }: { show: boolean }) {
  return (
    <>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 h-3 w-3"
        animate={{ x: show ? 0 : -8, y: show ? 0 : -8, opacity: show ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <span className="absolute left-0 top-0 h-[2px] w-3" style={{ background: BRAND }} />
        <span className="absolute left-0 top-0 h-3 w-[2px]" style={{ background: BRAND }} />
      </motion.span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute right-3 bottom-3 h-3 w-3"
        animate={{ x: show ? 0 : 8, y: show ? 0 : 8, opacity: show ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        <span className="absolute right-0 bottom-0 h-[2px] w-3" style={{ background: BRAND }} />
        <span className="absolute right-0 bottom-0 h-3 w-[2px]" style={{ background: BRAND }} />
      </motion.span>
    </>
  );
}

function KnowledgeExtras() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x2 = useTransform(mx, (v) => v * 0.6);
  const y2 = useTransform(my, (v) => v * 0.6);
  const x3 = useTransform(mx, (v) => v * 0.3);
  const y3 = useTransform(my, (v) => v * 0.3);
  return (
    <div
      className="relative mt-5"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 20 - 10);
        my.set(((e.clientY - r.top) / r.height) * 20 - 10);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div
        className="absolute left-0 right-0 -top-1 mx-auto h-9 max-w-[360px] rounded-none border border-white/10 bg-white/5 backdrop-blur-sm flex items-center px-3 text-[12px] text-zinc-300"
        style={{ x: mx, y: my }}
      >
        <span className="mr-2">📄</span> bank_statements.json
      </motion.div>
      <motion.div
        className="absolute left-3 right-3 top-6 mx-auto h-9 max-w-[340px] rounded-none border border-white/10 bg-white/5 backdrop-blur-sm flex items-center px-3 text-[12px] text-zinc-300"
        style={{ x: x2, y: y2 }}
      >
        <span className="mr-2">📄</span> Annual_Report.pdf
      </motion.div>
      <motion.div
        className="absolute left-6 right-6 top-12 mx-auto h-9 max-w-[320px] rounded-none border border-white/10 bg-white/5 backdrop-blur-sm flex items-center px-3 text-[12px] text-zinc-300"
        style={{ x: x3, y: y3 }}
      >
        <span className="mr-2">🔗</span> docs.acme.com
      </motion.div>
      <div className="pt-24" />
    </div>
  );
}

export default function SectionAbstractionsInteractive() {
  const [active, setActive] = React.useState<Key>("knowledge");
  const onKey = (k: Key) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(k);
    }
  };

  return (
    <section className="relative w-full ra-section">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-14 items-start">
          <h2 className="ra-headline">
            Ship faster with RemoteAgent’s intelligent abstractions
          </h2>
          <p className="ra-subhead">
            Build agents, teams, and workflows with memories, knowledge search, reasoning,
            and human-in-the-loop. Think in behavior, not plumbing.
          </p>
        </div>

        <LayoutGroup id="abstractions-fixed">
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {CARDS.map(({ key, title, icon, body }) => {
              const isActive = key === active;
              return (
                <motion.button
                  key={key}
                  aria-pressed={isActive}
                  onClick={() => setActive(key)}
                  onKeyDown={onKey(key)}
                  className="relative text-left ra-card outline-none transition-transform"
                  whileHover={{ y: -2 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeEdge"
                      className="pointer-events-none absolute inset-0 rounded-none border"
                      style={{ borderColor: "rgba(255,255,255,.18)" }}
                    />
                  )}
                  <Corners show={isActive} />

                  <div className="flex items-center gap-3">
                    <span className="text-lg" style={{ color: BRAND }}>{icon}</span>
                    <h3 className="ra-card-title">{title}</h3>
                  </div>
                  <p className="mt-3 ra-card-blurb">{body}</p>

                  {isActive && key === "knowledge" && <KnowledgeExtras />}
                  {isActive && key === "reasoning" && (
                    <ul className="mt-5 space-y-1 text-[13px] text-zinc-300">
                      <li>→ Plan multi-step tasks</li>
                      <li>→ Tool use with guardrails</li>
                      <li>→ Deterministic eval hooks</li>
                    </ul>
                  )}
                  {isActive && key === "hitl" && (
                    <p className="mt-5 text-[13px] text-zinc-300">
                      Add approvals and escalations without breaking flow. Full audit trail included.
                    </p>
                  )}
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}


