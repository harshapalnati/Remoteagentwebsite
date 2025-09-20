"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../images/closerlookai.png";
import * as React from "react";

export default function SimpleLogoBar() {
  const [mode, setMode] = React.useState<"color" | "mono">("color");

  React.useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("ra-color-mode")) as
      | "color"
      | "mono"
      | null;
    if (saved === "mono" || saved === "color") setMode(saved);
  }, []);

  React.useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("ra-mono", mode === "mono");
      localStorage.setItem("ra-color-mode", mode);
    }
  }, [mode]);

  return (
    <header className="w-full border-b border-white/10 bg-transparent">
      <div className="ra-container flex items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="RemoteAgent" width={36} height={36} className="object-contain h-8 w-8 md:h-9 md:w-9" />
          <span className="font-mono text-white text-sm md:text-base tracking-tight">RemoteAgent</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1" aria-label="Color mode toggle">
            <button
              type="button"
              aria-pressed={mode === "color"}
              onClick={() => setMode("color")}
              className="ra-cta px-2.5 py-1 text-[11px]"
            >
              Color
            </button>
            <button
              type="button"
              aria-pressed={mode === "mono"}
              onClick={() => setMode("mono")}
              className="ra-cta px-2.5 py-1 text-[11px]"
            >
              Mono
            </button>
          </div>
          <a href="/contact" className="ra-cta px-3 py-1.5 text-xs font-medium">
            GET EARLY ACCESS
          </a>
        </div>
      </div>
    </header>
  );
}


