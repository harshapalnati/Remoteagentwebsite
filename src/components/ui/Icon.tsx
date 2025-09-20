import * as React from "react";
import * as Lucide from "lucide-react";

type Name = keyof typeof Lucide;

export function Icon(
  { name, size = 18, color = "var(--ra-accent)", ...rest }:
  { name: Name; size?: number; color?: string } & React.SVGProps<SVGSVGElement>,
) {
  const Cmp = Lucide[name] as React.FC<React.SVGProps<SVGSVGElement>>;
  return <Cmp width={size} height={size} color={color} {...rest} />;
}


