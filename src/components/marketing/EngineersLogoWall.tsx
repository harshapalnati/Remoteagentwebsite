"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type LogoItem = {
  name: string;
  src: string | StaticImageData;
  width?: number;
  height?: number;
};

type Props = {
  logos?: LogoItem[];
  title?: string;
  className?: string;
};

// A single logo card with an animated "drawn" border.
function LogoCard({ item, index }: { item: LogoItem; index: number }) {
  const prefersReducedMotion = useReducedMotion();
  const delay = index * 0.12; // 120ms stagger per card

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { scale: 1 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="relative rounded-xl p-8 md:p-10 bg-white/[0.02] hover:bg-white/[0.04] shadow-[0_0_40px_rgba(255,255,255,0.06)] transition-colors"
    >
      {/* Logo wrapper */}
      <div className="mx-auto flex h-10 md:h-12 max-w-[180px] items-center justify-center">
        <Image
          src={item.src}
          alt={item.name}
          width={item.width ?? 180}
          height={item.height ?? 48}
          className="h-full w-auto object-contain invert brightness-200 opacity-90"
          loading="lazy"
        />
      </div>

      {/* Drawn border overlay */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {prefersReducedMotion ? (
          <rect
            x="0.5"
            y="0.5"
            width="99"
            height="99"
            rx="5"
            ry="5"
            fill="none"
            className="stroke-white/20"
            strokeWidth="1"
          />
        ) : (
          <motion.rect
            x="0.5"
            y="0.5"
            width="99"
            height="99"
            rx="5"
            ry="5"
            fill="none"
            className="stroke-white/20 hover:stroke-white/30"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0.8 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut", delay }}
          />
        )}
      </svg>
    </motion.div>
  );
}

export default function EngineersLogoWall({
  title = "Built by Engineers from World-Class Teams",
  logos = [
    { name: "Meta", src: require("@/components/images/meta.png").default ?? require("@/components/images/meta.png") },
    { name: "MIT", src: require("@/components/images/mit_logo_std_rgb_white.png").default ?? require("@/components/images/mit_logo_std_rgb_white.png") },
    { name: "Amazon", src: require("@/components/images/amazon-logo-white-removebg-preview.png").default ?? require("@/components/images/amazon-logo-white-removebg-preview.png") },
    { name: "Microsoft", src: require("@/components/images/microsoft-logo-black-and-white.png").default ?? require("@/components/images/microsoft-logo-black-and-white.png") },
    { name: "Salesforce", src: require("@/components/images/salesforce.png").default ?? require("@/components/images/salesforce.png") },
  ],
  className = "",
}: Props) {
  return (
    <section
      className={
        (className ? className + " " : "") +
        "relative mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24 text-white bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_60%)]"
      }
    >
      <h2 className="text-center text-2xl md:text-3xl font-semibold tracking-tight">
        {title}
      </h2>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
        {logos.map((item, idx) => (
          <LogoCard key={item.name + idx} item={item} index={idx} />
        ))}
      </div>
    </section>
  );
}

/*
Example usage (add into app/page.tsx or any page):

import EngineersLogoWall from "@/components/marketing/EngineersLogoWall";
import meta from "@/components/images/meta.png";
import mit from "@/components/images/mit_logo_std_rgb_white.png";
import amazon from "@/components/images/amazon-logo-white-removebg-preview.png";
import microsoft from "@/components/images/microsoft-logo-black-and-white.png";
import salesforce from "@/components/images/salesforce.png";

export default function Page() {
  const logos = [
    { name: "Meta", src: meta },
    { name: "MIT", src: mit },
    { name: "Amazon", src: amazon },
    { name: "Microsoft", src: microsoft },
    { name: "Salesforce", src: salesforce },
  ];

  return (
    <main>
      ...your hero...
      <EngineersLogoWall logos={logos} />
    </main>
  );
}
*/


