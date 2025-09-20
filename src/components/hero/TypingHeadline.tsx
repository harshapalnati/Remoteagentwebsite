"use client";
import { useEffect, useMemo, useState } from "react";

const PHRASES = [
  "Browser Agent",
  "Computer Use Agent",
  "Deep Research Agent",
  "Integration Agent",
  "Coding Agent",
];

const TYPE_DELAY_MS = 100; // typing speed per char
const ERASE_DELAY_MS = 50; // backspace speed per char
const HOLD_MS = 900; // pause at full phrase before deleting

export default function TypingHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrase = useMemo(() => PHRASES[phraseIndex % PHRASES.length], [phraseIndex]);
  const displayed = phrase.slice(0, charIndex);

  useEffect(() => {
    let timeoutId: number | undefined;

    if (!isDeleting && charIndex < phrase.length) {
      timeoutId = window.setTimeout(() => setCharIndex((c) => c + 1), TYPE_DELAY_MS);
    } else if (!isDeleting && charIndex === phrase.length) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), HOLD_MS);
    } else if (isDeleting && charIndex > 0) {
      timeoutId = window.setTimeout(() => setCharIndex((c) => c - 1), ERASE_DELAY_MS);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [charIndex, isDeleting, phrase]);

  return (
    <div className="w-full text-center">
      {/* Line 1 */}
      <div className="font-mono text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-normal uppercase">
        BUILD &amp; DEPLOY
      </div>

      {/* Line 2: typing effect with cursor */}
      <div className="mt-2 flex items-center justify-center">
        <span className="font-mono text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-normal">
          {displayed}
        </span>
        <span className="ml-2 h-[1.2em] w-[2px] bg-white/90 animate-pulse" />
      </div>

      {/* Line 3 */}
      <div className="mt-2 font-mono text-center text-4xl sm:text-5xl md:text-6xl font-bold tracking-normal uppercase">
        IN&nbsp;HOURS,&nbsp;NOT&nbsp;WEEKS
      </div>
    </div>
  );
}


