import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://yesudei.dev"),
  title: {
    default: "Yesudei Erdenesukh — Frontend Developer",
    template: "%s | Yesudei Erdenesukh",
  },
  description:
    "Frontend developer and Informatics teacher in Ulaanbaatar, Mongolia. Building digital experiences with React, TypeScript, and creative code.",
  keywords: ["frontend developer", "React", "TypeScript", "creative coding", "Ulaanbaatar", "Mongolia"],
  authors: [{ name: "Yesudei Erdenesukh" }],
  creator: "Yesudei Erdenesukh",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Yesudei Erdenesukh — Frontend Developer",
    description: "Frontend developer and Informatics teacher. Building digital experiences.",
    type: "website",
    url: "https://yesudei.dev",
    siteName: "Yesudei Erdenesukh",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yesudei Erdenesukh — Frontend Developer",
    description: "Frontend developer and Informatics teacher. Building digital experiences.",
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
