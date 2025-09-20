import Image from "next/image";

const logos = [
  { src: "/logos/perplexity.svg", alt: "Perplexity", aria: "Perplexity" },
  { src: "/logos/hf.svg", alt: "Hugging Face", aria: "Hugging Face" },
  { src: "/logos/manus.svg", alt: "Manus", aria: "Manus" },
  { src: "/logos/groq.svg", alt: "Groq", aria: "Groq" },
  { src: "/logos/lindy.svg", alt: "Lindy", aria: "Lindy" },
];

export function TrustBar({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10 opacity-70 hover:opacity-100 transition-opacity">
        {logos.map((l) => (
          <Image
            key={l.src}
            src={l.src}
            alt={l.alt}
            aria-label={l.aria}
            width={96}
            height={32}
            className="h-6 w-auto grayscale"
          />
        ))}
      </div>
    </div>
  );
}

export default TrustBar;


