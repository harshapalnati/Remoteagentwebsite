"use client";

import { motion } from "framer-motion";

function Logo({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-center opacity-60 hover:opacity-100 transition relative">
      <div className="absolute inset-0 rounded-lg" />
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}

const stroke = "currentColor";

export default function LogosStrip() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      className="rounded-2xl bg-[var(--ra-card)] shadow-panel border border-[var(--ra-stroke)]/50 p-6 md:p-8"
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
        {["Meta","MIT","Amazon","Microsoft","Salesforce","Meta","MIT","Amazon"].map((n, i) => (
          <Logo key={i} label={n}>
            <svg width="88" height="24" viewBox="0 0 88 24" fill="none" className="text-white">
              <rect x="2" y="6" width="12" height="12" rx="2" stroke={stroke} strokeWidth="1.5" />
              <rect x="20" y="6" width="12" height="12" rx="2" stroke={stroke} strokeWidth="1.5" />
              <rect x="38" y="6" width="12" height="12" rx="2" stroke={stroke} strokeWidth="1.5" />
              <rect x="56" y="6" width="12" height="12" rx="2" stroke={stroke} strokeWidth="1.5" />
            </svg>
          </Logo>
        ))}
      </div>
    </motion.section>
  );
}


