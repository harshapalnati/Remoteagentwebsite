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
  title: {
    default: "RemoteAgent — Build & Deploy Deep Agents",
    template: "%s — RemoteAgent",
  },
  description: "Build and deploy production-ready deep agents fast — research, browse, code, and integrate with enterprise-grade guardrails.",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/apple-touch-icon.png", type: "image/png" },
    ],
    shortcut: "/apple-touch-icon.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://remoteagent.com"),
  openGraph: {
    title: "RemoteAgent — Build & Deploy Deep Agents",
    description: "Production-ready deep agents. Research, code, browse, and integrate with enterprise-grade guardrails.",
    url: "https://remoteagent.com",
    siteName: "RemoteAgent",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RemoteAgent — Build & Deploy Deep Agents",
    description: "Production-ready deep agents. Research, code, browse, and integrate with enterprise-grade guardrails.",
  },
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
