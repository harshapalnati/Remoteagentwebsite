"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "../images/closerlookai.png";
import * as React from "react";

export default function SimpleLogoBar() {

  return (
    <header className="w-full border-b border-white/10 bg-transparent">
      <div className="ra-container flex items-center justify-between py-3 gap-2">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="RemoteAgent" width={36} height={36} sizes="36px" className="object-contain h-8 w-8 md:h-9 md:w-9" />
          <span className="font-mono text-white text-sm md:text-base tracking-tight">RemoteAgent</span>
        </Link>
        <div className="flex items-center gap-2">
          <a href="/contact" className="ra-cta shrink-0 whitespace-nowrap px-2 py-1 text-[10px] sm:text-xs font-medium sm:px-3 sm:py-1.5">
            GET EARLY ACCESS
          </a>
        </div>
      </div>
    </header>
  );
}


