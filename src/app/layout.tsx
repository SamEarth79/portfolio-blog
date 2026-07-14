import type { Metadata } from "next";
import { Work_Sans, Space_Grotesk, Fraunces } from "next/font/google";
import "@fontsource/mona-sans/latin-700.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Samarth M M",
  description: "Full-stack developer building things on the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${spaceGrotesk.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-charcoal">
        <Nav />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
