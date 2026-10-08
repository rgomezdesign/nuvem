"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/collection";
import { color, typography, border } from "@/app/tokens";

// Mirrors Figma "Nav/Desktop" + "Nuvem — Mobile · Menu open".
export default function SiteNav() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  const isActive = (match: readonly string[]) =>
    match.some((m) => (m === "/" ? pathname === "/" : pathname.startsWith(m)));

  // Close the menu on navigation and on Escape; lock page scroll while open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16"
        style={{ backgroundColor: color.bg.primary, borderBottom: border.subtle }}
        aria-label="Primary"
      >
        <Link
          href="/"
          className="text-xs font-semibold uppercase transition-opacity hover:opacity-60"
          style={{ letterSpacing: typography.tracking.widest, color: color.text.primary }}
        >
          Nuvem
        </Link>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => {
            const active = isActive(l.match);
            return (
              <li key={l.label}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative text-xs font-normal transition-opacity hover:opacity-60"
                  style={{ color: color.text.primary, letterSpacing: typography.tracking.wide }}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1.5 left-0 h-px w-full origin-left transition-transform duration-500"
                    style={{ backgroundColor: color.text.primary, transform: `scaleX(${active ? 1 : 0})` }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="relative z-[60] text-xs md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          style={{ color: color.text.primary }}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col justify-between px-6 pb-12 pt-32 md:hidden"
          style={{ backgroundColor: color.bg.primary, animation: "menu-in 300ms var(--ease-calm) both" }}
        >
          <ul className="flex flex-col gap-3">
            {NAV.map((l, i) => (
              <li key={l.label} style={{ animation: `link-in 600ms var(--ease-calm) ${80 + i * 70}ms both` }}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-[2.75rem] leading-tight tracking-tight"
                  style={{ color: color.text.primary, fontWeight: isActive(l.match) ? 500 : 300 }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div>
            <p className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest }}>
              Nuvem
            </p>
            <p className="mt-1 text-xs font-light" style={{ color: color.text.muted }}>
              A concept collection by Roman Gomez
            </p>
          </div>
        </div>
      )}
    </>
  );
}
