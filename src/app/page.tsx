import Link from "next/link";
import Carousel from "@/components/Carousel";
import CloudStage from "@/components/CloudStage";
import ButtonLink from "@/components/ButtonLink";
import { CHAIRS, type Chair } from "@/lib/collection";
import { color, typography, spacing, sizing } from "./tokens";

// Mirrors Figma "Nuvem — Collection Page" (desktop) / "Nuvem — Mobile".
function Feature({ c, index }: { c: Chair; index: number }) {
  const text = (
    <div data-reveal>
      <h2 className="mb-2 font-semibold leading-none tracking-tight" style={{ fontSize: typography.scale.section, color: color.text.primary }}>
        {c.name}
      </h2>
      <p className="mb-6 font-light" style={{ fontSize: typography.scale.lg, color: color.text.muted }}>
        {c.tagline}
      </p>
      <p className="mb-8 leading-relaxed" style={{ fontSize: typography.scale.base, color: color.text.secondary, maxWidth: sizing.content.description }}>
        {c.description}
      </p>
      <Link
        href={`/collection/${c.id}/`}
        className="group inline-flex items-center gap-2 text-xs uppercase"
        style={{ letterSpacing: typography.tracking.wider, color: color.text.primary, fontWeight: 500 }}
      >
        Discover {c.name}
        <span aria-hidden="true" className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
      </Link>
    </div>
  );
  const stage = (
    <Link href={`/collection/${c.id}/`} aria-label={`Discover ${c.name}`} className="block">
      <CloudStage
        chair={c}
        side={c.imageLeft ? "left" : "right"}
        tone={c.sectionBg === color.bg.secondary ? "light" : "warm"}
        floatDelay={(index % 4) as 0 | 1 | 2 | 3}
        className="h-[clamp(300px,80vw,420px)] lg:h-[clamp(420px,42vw,560px)]"
      />
    </Link>
  );
  return (
    <section id={c.id} style={{ backgroundColor: c.sectionBg }} className="overflow-hidden py-20 md:py-28 lg:py-32">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-x-20">
        <div className={`${c.imageLeft ? "lg:order-1" : "lg:order-2"} order-2`}>{stage}</div>
        <div className={`${c.imageLeft ? "lg:order-2 lg:pr-16" : "lg:order-1 lg:pl-16"} relative z-10 order-1 px-6 md:px-12 lg:px-0`}>{text}</div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <section className="px-6 pb-10 pt-20 text-center md:pb-14 md:pt-28">
        <h1 className="rise font-semibold leading-none tracking-tight" style={{ fontSize: typography.scale.display, marginBottom: spacing.hero.afterHeading }}>
          The Nuvem Collection
        </h1>
        <p className="rise text-sm font-light italic" style={{ color: color.text.muted, marginBottom: spacing.hero.afterTagline, ["--i" as string]: 1 }}>
          Designed for modern calm.
        </p>
        <p className="rise mx-auto text-sm leading-relaxed" style={{ color: color.text.tertiary, maxWidth: sizing.content.heroBody, ["--i" as string]: 2 }}>
          A study in material warmth and sculptural balance. Each piece in the Nuvem Collection expresses a different side of contrast, from
          expressive form to serene minimalism, unified by craftsmanship and natural tone.
        </p>
        <div className="rise" style={{ ["--i" as string]: 3 }}>
          <Carousel />
        </div>
        <div className="rise" style={{ ["--i" as string]: 4 }}>
          <ButtonLink href="#collection">Explore the collection</ButtonLink>
        </div>
      </section>

      <div id="collection" className="scroll-mt-16">
        {CHAIRS.map((c, i) => (
          <Feature key={c.id} c={c} index={i} />
        ))}
      </div>

      <section className="px-6 py-24 text-center md:py-32">
        <p data-reveal className="mx-auto text-sm leading-relaxed" style={{ color: color.text.tertiary, maxWidth: sizing.content.closing }}>
          Nuvem explores how tone, form and texture shape emotion. Designed as an exercise in balance, it reflects a belief that simplicity is
          the most powerful form of expression.
        </p>
      </section>
    </>
  );
}
