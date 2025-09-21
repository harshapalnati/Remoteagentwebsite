"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "BROWSER AGENTS",
  "COMPUTER USE AGENTS",
  "DEEP RESEARCH AGENTS",
  "INTEGRATION AGENTS",
  "CODING AGENTS",
];

export default function AnimatedHeadline() {
  const [i, setI] = useState(0);
  const current = useMemo(() => WORDS[i % WORDS.length] ?? "", [i]);

  useEffect(() => {
    const t = setInterval(() => setI((x) => x + 1), 2500);
    return () => clearInterval(t);
  }, []);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="relative z-30 w-full text-center"> {/* ↑ sits above stray overlays */}
      <h1 className="font-mono uppercase tracking-tight text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
        BUILD &amp; DEPLOY
      </h1>

      <div className="relative mx-auto mt-3 flex items-center justify-center" aria-live="polite">
        <div
          className="relative mb-3 sm:mb-4 overflow-hidden"
          style={{ height: "1.35em" }}  /* lock line height; no clipping */
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current}
              initial={reduceMotion ? false : { y: 22, opacity: 0 }}
              animate={reduceMotion ? {} : { y: 0, opacity: 1 }}
              exit={reduceMotion ? {} : { y: -22, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative z-40 inline-block"
            >
              <span className="px-2.5 py-0.5 sm:py-1 bg-white text-black text-2xl sm:text-4xl md:text-5xl font-extrabold font-mono uppercase tracking-tight leading-none whitespace-pre">
                {(current || "").replace(/\s+/g, " ")}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
        <span className="hidden" />
      </div>

      <div className="mt-4 sm:mt-5 font-mono uppercase tracking-tight text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
        IN&nbsp;HOURS,&nbsp;NOT&nbsp;WEEKS
      </div>
    </div>
  );
}
