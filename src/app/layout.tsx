import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import SimpleLogoBar from "@/components/nav/SimpleLogoBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Sandboxes",
  description: "Open-source, secure environment with real-world tools for enterprise-grade agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[--bg] text-[--fg]`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <SimpleLogoBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
