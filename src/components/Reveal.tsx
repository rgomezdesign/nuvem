"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Reveals [data-reveal] elements as they scroll in, and drives .parallax layers.
// Content is visible without JS; only elements below the fold get hidden first.
export default function MotionDirector() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    // Reveal
    const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in])")];
    let io: IntersectionObserver | undefined;
    if (!reduce && "IntersectionObserver" in window) {
      const fold = window.innerHeight * 0.92;
      for (const el of targets) if (el.getBoundingClientRect().top < fold) el.dataset.in = "";
      root.classList.add("js-reveal");
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              (e.target as HTMLElement).dataset.in = "";
              io?.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px" },
      );
      for (const el of targets) if (!("in" in el.dataset)) io.observe(el);
    } else {
      for (const el of targets) el.dataset.in = "";
    }

    // Parallax: each layer moves by (distance from viewport center) × its speed
    const layers = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    const MAX = window.innerWidth < 768 ? 16 : 32;
    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      for (const el of layers) {
        const r = el.parentElement?.getBoundingClientRect();
        if (!r) continue;
        const speed = Number(el.dataset.parallax) || 0;
        // Capped so layers drift gently and never leave their section
        const px = Math.max(-MAX, Math.min(MAX, (r.top + r.height / 2 - mid) * speed));
        el.style.setProperty("--parallax", `${px.toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    if (!reduce && layers.length) {
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
