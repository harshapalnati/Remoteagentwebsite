"use client";

import * as React from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { Rocket, Gauge, ShieldCheck, BarChart2 } from "lucide-react";
// lightweight class combiner to avoid external dependency
function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

const BRAND = "var(--ra-accent)";

type Key = "ship" | "throughput" | "private" | "observable";

const CONTENT: Record<Key, { title: string; blurb: string; bullets: string[]; Icon: any }> = {
  ship: {
    title: "Ship production from day one",
    blurb:
      "Prebuilt deep-agent patterns, eval harnesses, and safety rails; plug in your tools and press go. Launch with confidence.",
    bullets: [
      "Blueprint & eval packs included",
      "Guarded tool-use and safe defaults",
      "Customize workflows, ship fast",
    ],
    Icon: Rocket,
  },
  throughput: {
    title: "Throughput without the pain",
    blurb: "Scale sessions across fleets with minimal memory and predictable latency.",
    bullets: [
      "Warm sessions & smart caching",
      "Lightweight workers, tiny cold starts",
      "Handles thousands of tasks reliably",
    ],
    Icon: Gauge,
  },
  private: {
    title: "Private by architecture",
    blurb:
      "Run in your cloud or a dedicated tenancy; data, logs, and metrics stay inside your boundary with RBAC, approvals, and audits.",
    bullets: [
      "RBAC & policy checks",
      "HITL approvals & audit trails",
      "Keep data, logs, metrics in-boundary",
    ],
    Icon: ShieldCheck,
  },
  observable: {
    title: "Observable by default",
    blurb:
      "Session replays, structured logs, metrics, and eval hooks to inspect and improve behavior.",
    bullets: [
      "Replay sessions step-by-step",
      "Structured logs & metrics out-of-the-box",
      "Eval hooks to iterate with confidence",
    ],
    Icon: BarChart2,
  },
};

function CornerAccents({ active }: { active: boolean }) {
  const t = { type: "spring", stiffness: 420, damping: 30 } as const;
  return (
    <>
      <motion.span
        className="pointer-events-none absolute left-3 top-3 h-3 w-3"
        initial={false}
        animate={{ x: active ? 0 : -8, y: active ? 0 : -8, opacity: active ? 1 : 0 }}
        transition={t}
      >
        <span className="absolute left-0 top-0 h-[2px] w-3" style={{ background: BRAND }} />
        <span className="absolute left-0 top-0 h-3 w-[2px]" style={{ background: BRAND }} />
      </motion.span>
      <motion.span
        className="pointer-events-none absolute right-3 bottom-3 h-3 w-3"
        initial={false}
        animate={{ x: active ? 0 : 8, y: active ? 0 : 8, opacity: active ? 1 : 0 }}
        transition={t}
      >
        <span className="absolute right-0 bottom-0 h-[2px] w-3" style={{ background: BRAND }} />
        <span className="absolute right-0 bottom-0 h-3 w-[2px]" style={{ background: BRAND }} />
      </motion.span>
    </>
  );
}

export default function SectionWhyRemoteAgentInteractive() {
  const reduce = useReducedMotion();
  const headline = "Turn blueprints into production agents";
  const subhead =
    "RemoteAgent enables engineering teams to deliver deep agents in days—not weeks—by starting from prebuilt agents and customizing fast.";

  const [active, setActive] = React.useState<Key>("ship");
  const keys: Key[] = ["ship", "throughput", "private", "observable"];

  const layoutSpring = reduce ? { duration: 0.01 } : { type: "spring", stiffness: 420, damping: 36 };
  const hoverLift = reduce ? {} : { y: -2 };

  const onKey = (k: Key) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(k);
    }
  };

  const spanCls = (k: Key, idx: number) =>
    cx(
      "col-span-1",
      active === k ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1 lg:col-span-1",
      active === k && (idx === 1 || idx === 2) && "lg:col-start-2"
    );

  return (
    <section className="ra-section">
      <div className="ra-container">
        <div className="max-w-3xl">
          <h2 className="ra-headline">{headline}</h2>
          <p className="mt-5 ra-subhead">{subhead}</p>
        </div>

        <LayoutGroup id="whyRA">
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
            {keys.map((k, idx) => {
              const { title, blurb, bullets, Icon } = CONTENT[k];
              const isActive = active === k;
              return (
                <motion.button
                  key={k}
                  layout
                  onClick={() => setActive(k)}
                  onKeyDown={onKey(k)}
                  aria-pressed={isActive}
                  tabIndex={isActive ? 0 : -1}
                  className={cx("relative text-left ra-card outline-none", spanCls(k, idx))}
                  transition={{ layout: layoutSpring }}
                  whileHover={hoverLift}
                >
                  {isActive && (
                    <motion.div
                      layoutId="why-outline"
                      className="absolute inset-0 border border-white/15 rounded-none"
                      transition={layoutSpring}
                    />
                  )}
                  <CornerAccents active={isActive} />

                  <div className="flex items-center gap-3">
                    <Icon size={18} style={{ color: BRAND }} />
                    <motion.h3 layout className="ra-card-title">
                      {title}
                    </motion.h3>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={cx("overflow-hidden", isActive ? "mt-3" : "mt-0")}
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                      transition={{ duration: 0.25 }}
                      className="ra-card-blurb"
                    >
                      {blurb}
                    </motion.p>
                    <ul className="mt-4 grid gap-1.5 text-[13px] text-zinc-300">
                      {bullets.map((b, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                          transition={{ duration: 0.18, delay: isActive ? 0.06 * i : 0 }}
                          className="flex gap-2"
                        >
                          <span className="select-none" style={{ color: BRAND }}>→</span>
                          <span>{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>

        <div className="mt-10">
          <a href="/contact" className="ra-cta text-xs sm:text-sm font-medium px-5 py-2">
            Get Early Access
          </a>
        </div>
      </div>
    </section>
  );
}


