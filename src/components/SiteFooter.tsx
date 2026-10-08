import Link from "next/link";
import { NAV, PORTFOLIO_URL } from "@/lib/collection";
import { color, typography, radius } from "@/app/tokens";

// Mirrors Figma "Footer/Desktop".
export default function SiteFooter() {
  return (
    <footer
      className="px-8 py-12 md:px-16 md:py-16"
      style={{ backgroundColor: color.bg.inverse, color: color.text.inverse, borderRadius: radius.footer }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest, marginBottom: "6px" }}>
            Nuvem
          </p>
          <p className="text-xs font-light" style={{ color: color.text.tertiary }}>
            Designed for modern calm
          </p>
        </div>
        <div className="mb-12 flex flex-wrap items-center gap-1.5 text-xs" style={{ color: color.text.tertiary }}>
          {NAV.map((l, i) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <Link href={l.href} className="transition-colors hover:text-white">
                {l.label}
              </Link>
              {i < NAV.length - 1 && <span aria-hidden="true">·</span>}
            </span>
          ))}
        </div>
        <div
          className="flex flex-col gap-3 text-xs md:flex-row md:items-center md:justify-between"
          style={{ color: color.text.subtle }}
        >
          <span>© 2026 Nuvem · A concept collection</span>
          <a href={PORTFOLIO_URL} className="transition-colors hover:text-white">
            Designed by Roman Gomez
          </a>
        </div>
      </div>
    </footer>
  );
}
