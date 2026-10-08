import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import MotionDirector from "@/components/Reveal";
import { color } from "./tokens";
import "./globals.css";

// Poppins — typography.weight: light(300) regular(400) medium(500) semibold(600)
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Nuvem — Designed for modern calm", template: "%s — Nuvem" },
  description: "Nuvem is a concept furniture collection by Roman Gomez: four chairs in natural oak and soft fabrics, designed for modern calm.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.className} style={{ backgroundColor: color.bg.primary, color: color.text.primary }}>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-black focus:px-4 focus:py-2 focus:text-xs focus:text-white">
          Skip to content
        </a>
        <SiteNav />
        <main id="main">{children}</main>
        <SiteFooter />
        <MotionDirector />
      </body>
    </html>
  );
}
