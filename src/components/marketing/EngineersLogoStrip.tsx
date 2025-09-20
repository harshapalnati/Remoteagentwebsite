"use client";

import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";

// Whiteify filter applied to: Meta, Microsoft (dark assets). Add others as needed.

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

export default function EngineersLogoStrip({
  title = "Engineered by a world-class team",
  logos = [
    { name: "Meta", src: require("@/components/images/meta.png").default ?? require("@/components/images/meta.png") },
    { name: "MIT", src: require("@/components/images/mit_logo_std_rgb_white.png").default ?? require("@/components/images/mit_logo_std_rgb_white.png") },
    { name: "Amazon", src: require("@/components/images/amazon-logo-white-removebg-preview.png").default ?? require("@/components/images/amazon-logo-white-removebg-preview.png") },
    { name: "Microsoft", src: require("@/components/images/microsoft-logo-black-and-white.png").default ?? require("@/components/images/microsoft-logo-black-and-white.png") },
    { name: "Salesforce", src: require("@/components/images/salesforce.png").default ?? require("@/components/images/salesforce.png") },
  ],
  className = "",
}: Props) {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      setReduced(mq.matches);
    }
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Logos are already white; no filter needed
  const whiteify = "";

  return (
    <section className={(className ? className + " " : "") + "w-full text-white ra-section"}>
      <div className="ra-container">
        <h2 className="text-center font-mono text-2xl md:text-3xl font-semibold">
          {title}
        </h2>

        <div ref={boxRef} className={("relative mt-8") + (inView && !reduced ? " in-view" : "") }>

          {/* Hairline frame via inset shadow; clip overlay to strip only */}
          <div className="relative overflow-hidden shadow-[inset_0_0_0_1.25px_rgba(255,255,255,0.10)] rounded-none bg-transparent">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-0 divide-x-2 divide-white/15 rounded-none">
            {logos.map((item, i) => (
              <div key={item.name + i} className="p-10 flex items-center justify-center h-[120px] md:h-[140px] bg-transparent hover:bg-white/[0.02] transition">
                <Image
                  src={item.src}
                  alt={item.name}
                  width={item.width ?? 200}
                  height={48}
                  className={(/salesforce/i.test(item.name) ? "h-12 md:h-16" : "h-8 md:h-10") + " w-auto object-contain opacity-100"}
                  loading="lazy"
                />
              </div>
            ))}
            </div>

            {/* Removed explicit outer SVG border to avoid thick edge; inset hairline handles frame */}
          </div>

          <style jsx>{``}</style>
        </div>
      </div>
    </section>
  );
}


