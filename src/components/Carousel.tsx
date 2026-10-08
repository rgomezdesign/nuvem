"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CHAIRS } from "@/lib/collection";
import { color, sizing, motion, elevation, opacity, zIndex, carousel } from "@/app/tokens";

// Mirrors Figma "Carousel/Default". The centre chair links to its product page.
const W = sizing.carousel.chair.width;
const H = sizing.carousel.chair.height;
const STEP = sizing.carousel.step;

const scaleFor = (d: number) => (d === 0 ? carousel.scale.active : d === 1 ? carousel.scale.neighbor : carousel.scale.hidden);
const alphaFor = (d: number) => (d === 0 ? 1 : d === 1 ? opacity.carouselNeighbor : opacity.carouselHidden);

export default function Carousel() {
  const [active, setActive] = useState(1);
  const prev = () => setActive((i) => (i > 0 ? i - 1 : CHAIRS.length - 1));
  const next = () => setActive((i) => (i < CHAIRS.length - 1 ? i + 1 : 0));
  const arrowPos = `calc(50% - ${sizing.carousel.arrowOffset}px)`;
  const arrow = "absolute flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors hover:bg-black/5";

  return (
    <div className="w-full select-none py-10 md:py-14" aria-roledescription="carousel" aria-label="The Nuvem chairs">
      <div className="relative flex items-center justify-center">
        <button onClick={prev} aria-label="Previous chair" className={arrow} style={{ left: arrowPos, zIndex: zIndex.carouselArrow, borderColor: color.border.default, color: color.text.primary }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M7 1.5L3 5L7 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>

        <div className="relative w-full overflow-hidden" style={{ height: H }}>
          {CHAIRS.map((c, i) => {
            const d = Math.abs(i - active);
            const style: React.CSSProperties = {
              left: "50%",
              width: W,
              height: H,
              transform: `translateX(calc(${(i - active) * STEP}px - 50%)) scale(${scaleFor(d)})`,
              transformOrigin: "bottom center",
              transition: motion.transition.carousel,
              opacity: alphaFor(d),
              zIndex: zIndex.carouselBase - d,
              pointerEvents: d >= 2 ? "none" : "auto",
              filter: d === 0 ? elevation.carouselActive : "none",
            };
            const img = <Image src={c.image} alt={`${c.name} chair`} fill className="object-contain object-bottom" sizes={`${W}px`} priority />;
            return d === 0 ? (
              <Link key={c.id} href={`/collection/${c.id}/`} aria-label={`View ${c.name}`} className="absolute bottom-0" style={style} tabIndex={0}>
                {img}
              </Link>
            ) : (
              <button key={c.id} onClick={() => setActive(i)} aria-label={`Show ${c.name}`} className="absolute bottom-0" style={style} tabIndex={d >= 2 ? -1 : 0}>
                {img}
              </button>
            );
          })}
        </div>

        <button onClick={next} aria-label="Next chair" className={arrow} style={{ right: arrowPos, zIndex: zIndex.carouselArrow, borderColor: color.border.default, color: color.text.primary }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M3 1.5L7 5L3 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>

      <p className="mt-5 text-xs font-light" style={{ color: color.text.muted }} aria-live="polite">
        {CHAIRS[active].name} · {CHAIRS[active].tagline}
      </p>
      <div className="mt-3 flex justify-center gap-1.5">
        {CHAIRS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => setActive(i)}
            aria-label={`Show ${c.name}`}
            aria-current={i === active}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === active ? carousel.dot.activeWidth : carousel.dot.inactiveWidth,
              height: carousel.dot.height,
              backgroundColor: i === active ? color.text.primary : color.border.default,
            }}
          />
        ))}
      </div>
    </div>
  );
}
