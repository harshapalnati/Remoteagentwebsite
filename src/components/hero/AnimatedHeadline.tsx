"use client";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "BROWSER AGENT",
  "COMPUTER USE AGENT",
  "DEEP RESEARCH AGENT",
  "INTEGRATION AGENT",
  "CODING AGENT",
];

export default function AnimatedHeadline() {
  const [i, setI] = useState(0);
  const current = useMemo(() => WORDS[i % WORDS.length] ?? "", [i]);

  useEffect(() => {
    const t = setInterval(() => setI((x) => x + 1), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full text-center">
      {/* Line 1 */}
      <div className="font-mono uppercase tracking-tight text-4xl sm:text-5xl md:text-6xl font-extrabold">
        BUILD &amp; DEPLOY
      </div>

      {/* Line 2 (flipping boxes with typing cursor) */}
      <div
        className="relative mx-auto mt-3 flex items-center justify-center"
        aria-live="polite"
      >
        <div className="relative h-[1.4em] overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={current}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="inline-flex gap-2"
            >
              {(current || "").split(" ").map((token, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-[3px] border border-zinc-600/60 bg-white/5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,.06)]"
                >
                  {token}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* typing cursor */}
        <span className="ml-2 h-[1.2em] w-[2px] bg-white/80 animate-pulse" />
      </div>

      {/* Line 3 */}
      <div className="mt-3 font-mono uppercase tracking-tight text-3xl sm:text-4xl md:text-5xl font-extrabold">
        IN&nbsp;HOURS,&nbsp;NOT&nbsp;WEEKS
      </div>
    </div>
  );
}

