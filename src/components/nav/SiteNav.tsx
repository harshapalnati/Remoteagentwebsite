"use client";

import Link from "next/link";

export function SiteNav() {
  return (
    <div className="sticky top-0 z-50">
      <nav className="mx-auto max-w-6xl md:max-w-7xl px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: logomark */}
        <Link href="/" className="font-mono text-sm" aria-label="Home">
          <span aria-hidden className="text-xl leading-none">★</span>
        </Link>

        {/* Center: no nav options requested */}
        <div />

        {/* Right: primary action */}
        <div className="flex items-center gap-2">
          <Link
            href="#early-access"
            className="inline-flex items-center justify-center rounded-none border border-white/80 px-4 py-2 text-xs font-semibold text-white hover:bg-white hover:text-black transition-colors duration-200"
          >
            GET EARLY ACCESS
          </Link>
        </div>
      </nav>
      {/* Thin line under nav */}
      <div className="h-px w-full bg-white/10" aria-hidden />
    </div>
  );
}

export default SiteNav;


