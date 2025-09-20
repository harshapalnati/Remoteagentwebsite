import React from "react";

// Lightweight renderer that supports either an imported SVG React element
// passed via `component`, or a plain image URL via `src`.
function Logo({ name, src, component, className = "" }) {
  return (
    <div
      className={
        "flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity" +
        (className ? ` ${className}` : "")
      }
      aria-label={name}
      role="img"
    >
      {component ? (
        <span className="flex items-center justify-center text-white/90">
          {component}
          <span className="sr-only">{name}</span>
        </span>
      ) : src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition"
          loading="lazy"
        />
      ) : (
        <PlaceholderWordmark text={name} />
      )}
    </div>
  );
}

function PlaceholderWordmark({ text = "LOGO" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 32"
      className="h-8 w-auto text-white/80"
      aria-hidden="true"
    >
      <rect width="160" height="32" fill="currentColor" opacity="0" />
      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="monospace"
        fontSize="16"
        fill="currentColor"
      >
        {text}
      </text>
    </svg>
  );
}

export default function LogoWall({
  productName = "RemoteAgent",
  row1Logos = [
    { name: "LangChain" },
    { name: "Browser Use" },
    { name: "SambaNova" },
    { name: "Prosus" },
  ],
  row2Cards = [
    { name: "Meta" },
    { name: "MIT" },
    { name: "Amazon" },
    { name: "Microsoft" },
    { name: "Salesforce" },
  ],
  className = "",
}) {
  return (
    <section className={(className ? className + " " : "") + "mx-auto max-w-6xl md:max-w-7xl px-4 sm:px-6 py-16 sm:py-24"}>
      {/* Row 1: Bordered dark box with caption and 4 logos */}
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-6">
        <p className="text-center text-xs font-mono uppercase tracking-wide text-zinc-400">
          Agents at these companies use <span className="text-zinc-200">{productName}</span>
        </p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {row1Logos.map((item, idx) => (
            <Logo key={idx} name={item.name} src={item.src} component={item.component} />
          ))}
        </div>
      </div>

      {/* Row 2: Heading + 5 cards */}
      <div className="mt-14">
        <h3 className="text-center font-mono uppercase tracking-wide text-sm text-zinc-300">
          Built by Engineers from World-Class Teams
        </h3>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {row2Cards.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition-colors p-4 text-center"
            >
              <Logo name={item.name} src={item.src} component={item.component} />
              <div className="mt-2 text-xs font-medium text-zinc-300">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Example usage: copy this into your page/component file.
//
// import LogoWall from "@/components/marketing/LogoWall";
//
// export default function Page() {
//   const partners = [
//     { name: "LangChain", src: "/logos/langchain.svg" },
//     { name: "Browser Use", src: "/logos/browseruse.svg" },
//     { name: "SambaNova", src: "/logos/sambanova.svg" },
//     { name: "Prosus", src: "/logos/prosus.svg" },
//   ];
//
//   const pedigree = [
//     { name: "Meta", src: "/logos/meta.svg" },
//     { name: "MIT", src: "/logos/mit.svg" },
//     { name: "Amazon", src: "/logos/amazon.svg" },
//     { name: "Microsoft", src: "/logos/microsoft.svg" },
//     { name: "Salesforce", src: "/logos/salesforce.svg" },
//   ];
//
//   return (
//     <LogoWall
//       productName="RemoteAgent"
//       row1Logos={partners}
//       row2Cards={pedigree}
//     />
//   );
// }


