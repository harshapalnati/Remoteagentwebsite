import Link from "next/link";
import TypingHeadline from "@/components/hero/TypingHeadline";
import Particles from "@/components/particles/Particles";

export function Hero() {
  return (
    <section className="relative pt-10 pb-8 sm:pt-20 sm:pb-14 ra-section">
      {/* background particles */}
      <Particles className="pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-3xl px-4 text-center ra-container">
        <TypingHeadline />

        <p className="mt-3 sm:mt-5 ra-paragraph max-w-[36ch] sm:max-w-xl mx-auto text-center">
          Enterprise-grade deep agents that research, code, browse, and integrate — secure, customizable, and ready to deliver results in production.
        </p>

        <div className="mt-4 sm:mt-6 flex justify-center">
          <a href="/contact" className="ra-cta text-xs sm:text-sm font-medium px-3 py-2">
            GET EARLY ACCESS
          </a>
        </div>

        {/* Trust bar removed per request */}
      </div>
    </section>
  );
}

export default Hero;


