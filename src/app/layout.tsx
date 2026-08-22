import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yesudei Erdenesukh — Frontend Developer",
  description:
    "Frontend developer and Informatics teacher in Ulaanbaatar, Mongolia. Building digital experiences with React, TypeScript, and creative code.",
  keywords: ["frontend developer", "React", "TypeScript", "creative coding", "Ulaanbaatar", "Mongolia"],
  openGraph: {
    title: "Yesudei Erdenesukh — Frontend Developer",
    description: "Frontend developer and Informatics teacher. Building digital experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
