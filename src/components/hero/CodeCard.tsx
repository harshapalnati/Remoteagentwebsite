"use client";

import { motion } from "framer-motion";

export function CodeCard() {
  return (
    <div className="relative">
      {/* Glow */}
      <div className="pointer-events-none absolute -inset-8 -z-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),rgba(255,255,255,0)_60%)] blur-3xl opacity-20 dark:opacity-20" />

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-lg border border-[--border] bg-white dark:bg-zinc-900 overflow-hidden shadow-sm"
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[--border] text-xs text-subtle">
          <div className="flex items-center gap-1 text-[10px]">
            <span>•</span>
            <span>•</span>
            <span>•</span>
          </div>
          <span className="font-mono">/agent session</span>
        </div>

        {/* Body */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white/8 to-transparent dark:from-white/10" />
          <pre className="px-4 py-4 text-sm leading-6 font-mono text-[--fg]/90">
{`$ launch agent --profile enterprise
> connecting to tools: browser, files, integrations
> session started: 0xA17C...9DE

$ open https://intranet.company.local
> navigating...
> authenticated via SSO

$ extract quarterly KPIs
> parsing DOM and tables (3 sources)
> summarizing metrics

$ export report --format pdf --share team
> saved to /reports/Q3-enterprise.pdf
> shared with @ops, @finance

done ✓`}
          </pre>
        </div>
      </motion.div>
    </div>
  );
}

export default CodeCard;


