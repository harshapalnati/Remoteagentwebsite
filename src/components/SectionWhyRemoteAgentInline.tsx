"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Rocket, Gauge, ShieldCheck, BarChart2 } from "lucide-react";

const BRAND = "var(--ra-accent)";

type Key = "ship" | "throughput" | "private" | "observable";
type Item = { title: string; blurb: string; Icon: React.ElementType };

const CONTENT: Record<Key, Item> = {
  ship: {
    title: "Ship production from day one",
    blurb:
      "Prebuilt deep-agent patterns, eval harnesses, and safety rails; plug in your tools and press go. Launch with confidence.",
    Icon: Rocket,
  },
  throughput: {
    title: "Throughput without the pain",
    blurb:
      "Scale sessions across fleets with minimal memory and predictable latency.",
    Icon: Gauge,
  },
  private: {
    title: "Private by architecture",
    blurb:
      "Run in your cloud or a dedicated tenancy; data, logs, and metrics stay inside your boundary with RBAC, approvals, and audits.",
    Icon: ShieldCheck,
  },
  observable: {
    title: "Observable by default",
    blurb:
      "Session replays, structured logs, metrics, and eval hooks to inspect and improve behavior.",
    Icon: BarChart2,
  },
};

function Corners({ show }: { show: boolean }) {
  const t = { type: "spring", stiffness: 420, damping: 30 } as const;
  return (
    <>
      <motion.span
        className="pointer-events-none absolute left-3 top-3 h-3 w-3"
        initial={false}
        animate={{ x: show ? 0 : -8, y: show ? 0 : -8, opacity: show ? 1 : 0 }}
        transition={t}
      >
        <span className="absolute left-0 top-0 h-[2px] w-3" style={{ background: BRAND }} />
        <span className="absolute left-0 top-0 h-3 w-[2px]" style={{ background: BRAND }} />
      </motion.span>
      <motion.span
        className="pointer-events-none absolute right-3 bottom-3 h-3 w-3"
        initial={false}
        animate={{ x: show ? 0 : 8, y: show ? 0 : 8, opacity: show ? 1 : 0 }}
        transition={t}
      >
        <span className="absolute right-0 bottom-0 h-[2px] w-3" style={{ background: BRAND }} />
        <span className="absolute right-0 bottom-0 h-3 w-[2px]" style={{ background: BRAND }} />
      </motion.span>
    </>
  );
}

export default function SectionWhyRemoteAgentInline() {
  const headline = "Turn blueprints into production agents";
  const subhead =
    "RemoteAgent enables engineering teams to deliver deep agents in days—not weeks—by starting from prebuilt agents and customizing fast.";

  const [active, setActive] = React.useState<Key>("ship");
  const keys: Key[] = ["ship", "throughput", "private", "observable"];

  return (
    <section className="ra-section">
      <div className="ra-container">
        {/* stacked hero */}
        <div className="max-w-3xl text-center md:text-left">
          <h2 className="ra-headline text-3xl sm:text-5xl md:text-6xl">
            {headline}
          </h2>
          <p className="mt-4 md:mt-5 ra-subhead max-w-[40ch] md:max-w-none mx-auto md:mx-0">{subhead}</p>
        </div>

        {/* FLEX row that never wraps on md+ */}
        <div className="mt-10 md:mt-12 flex gap-4 md:gap-6 flex-wrap md:flex-nowrap justify-center md:justify-start">
          {keys.map((k) => {
            const { title, blurb, Icon } = CONTENT[k];
            const isActive = active === k;
            return (
              <motion.button
                key={k}
                onClick={() => setActive(k)}
                aria-pressed={isActive}
                className="relative ra-card text-left p-6 outline-none min-w-[220px] md:min-w-0 shrink-0 md:shrink md:basis-0"
                animate={{ flex: isActive ? 2 : 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 36 }}
                whileHover={{ y: -2 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="inlineOutline"
                    className="absolute inset-0 border rounded-none"
                    style={{ borderColor: "var(--ra-border)" }}
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                )}
                <Corners show={isActive} />

                <div className="flex items-center gap-3">
                  <Icon size={18} style={{ color: BRAND }} />
                  <motion.h3 layout className="ra-card-title">
                    {title}
                  </motion.h3>
                </div>

                <motion.p
                  initial={false}
                  animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className={"overflow-hidden ra-card-blurb " + (isActive ? "mt-3" : "mt-0")}
                >
                  {blurb}
                </motion.p>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10">
          <a href="/contact" className="ra-cta">
            Get Early Access
          </a>
        </div>
      </div>
    </section>
  );
}


