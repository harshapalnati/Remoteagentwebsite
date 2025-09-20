"use client";

import * as React from "react";
import Image from "next/image";
import { Linkedin, ArrowRight } from "lucide-react";
import logo from "../images/closerlookai.png";

function LogoRA({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src={logo}
        alt="RemoteAgent logo"
        width={40}
        height={40}
        className="h-8 w-8 object-contain"
        priority={false}
      />
      <span className="font-mono text-[18px] md:text-[20px] tracking-tight text-white">RemoteAgent</span>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  // Real links
  const LINKEDIN_URL = "https://www.linkedin.com/company/closerlookai?trk=public_profile_topcard-current-company";
  const X_URL = "https://x.com/closerlookai";

  return (
    <footer className="ra-section border-t border-white/10">
      <div className="ra-container">
        {/* Top row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <LogoRA />
            <address className="not-italic mt-3 text-zinc-400 text-[14px] leading-7">
              1 Elm Sq, Unit 2F, Andover, MA 01810.
            </address>
          </div>

          <div className="flex items-start md:items-center">
            <a href="/contact" className="ra-cta inline-flex items-center gap-2" aria-label="Get Early Access">
              Get Early Access
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10" />

        {/* Bottom row */}
        <div className="mt-6 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-zinc-500 text-sm">©{year} RemoteAgent. All rights reserved.</p>

          <nav aria-label="Social links" className="flex items-center gap-5">
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
            >
              <Linkedin size={18} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition"
            >
              {/* X mark */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <path d="M3 3l18 18M21 3L3 21" />
              </svg>
              <span className="sr-only">X</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}


