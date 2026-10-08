import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CloudStage from "@/components/CloudStage";
import Swatches from "@/components/Swatches";
import ButtonLink from "@/components/ButtonLink";
import ProductCard from "@/components/ProductCard";
import { CHAIRS, MATERIALS, getChair } from "@/lib/collection";
import { color, typography } from "@/app/tokens";

// Mirrors Figma "Nuvem — Product (Aire)" / "Nuvem — Mobile · Product (Aire)".
export const dynamicParams = false;
export function generateStaticParams() {
  return CHAIRS.map((c) => ({ slug: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getChair((await params).slug);
  return c ? { title: c.name, description: c.description } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const chair = getChair((await params).slug);
  if (!chair) notFound();
  const i = CHAIRS.indexOf(chair);
  const others = CHAIRS.filter((c) => c.id !== chair.id);
  const next = CHAIRS[(i + 1) % CHAIRS.length];

  return (
    <>
      <nav aria-label="Breadcrumb" className="rise px-6 pt-6 text-xs md:px-12 lg:px-16" style={{ color: color.text.tertiary }}>
        <Link href="/#collection" className="hover:opacity-60">Collection</Link>
        <span className="mx-2" style={{ color: color.text.muted }}>/</span>
        <span style={{ color: color.text.primary }} aria-current="page">{chair.name}</span>
      </nav>

      <section className="grid items-center gap-8 pb-20 pt-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-20 lg:pb-24 lg:pt-10">
        <CloudStage chair={chair} side="left" tone="warm" priority className="h-[clamp(320px,90vw,440px)] lg:h-[clamp(480px,46vw,640px)]" />

        <div className="px-6 md:px-12 lg:pl-0 lg:pr-16">
          <h1 className="rise font-semibold leading-none tracking-tight" style={{ fontSize: typography.scale.section }}>
            {chair.name}
          </h1>
          <p className="rise mt-2 font-light" style={{ fontSize: typography.scale.lg, color: color.text.muted, ["--i" as string]: 1 }}>
            {chair.tagline}
          </p>
          <p className="rise mt-6 max-w-xl leading-relaxed" style={{ color: color.text.secondary, ["--i" as string]: 2 }}>
            {chair.description}
          </p>

          <div className="rise mt-8" style={{ ["--i" as string]: 3 }}>
            <p className="mb-3 text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest, color: color.text.tertiary }}>
              Materials
            </p>
            <Swatches materials={chair.materials.map((m) => MATERIALS[m])} />
          </div>

          <dl className="rise mt-8 max-w-xl" style={{ ["--i" as string]: 4 }}>
            {chair.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 py-3 text-sm" style={{ borderTop: `1px solid ${color.border.subtle}` }}>
                <dt className="font-light" style={{ color: color.text.tertiary }}>{s.label}</dt>
                <dd style={{ color: color.text.primary }}>{s.value}</dd>
              </div>
            ))}
            <p className="pt-2 text-xs font-light" style={{ color: color.text.muted }}>
              Concept collection. Dimensions are design targets.
            </p>
          </dl>

          <div className="rise mt-8 flex flex-wrap gap-3" style={{ ["--i" as string]: 5 }}>
            <ButtonLink href={`/about/#contact`}>Enquire</ButtonLink>
            <ButtonLink href="/#collection" variant="ghost">View collection</ButtonLink>
          </div>
        </div>
      </section>

      <section className="grid gap-10 px-6 py-16 md:grid-cols-3 md:gap-16 md:px-12 md:py-24 lg:px-16" style={{ backgroundColor: color.bg.secondary }}>
        {(["form", "material", "comfort"] as const).map((k, n) => (
          <div key={k} data-reveal style={{ ["--i" as string]: n }}>
            <h2 className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest }}>{k}</h2>
            <p className="mt-3 text-sm font-light leading-relaxed" style={{ color: color.text.secondary }}>{chair.details[k]}</p>
          </div>
        ))}
      </section>

      <section className="px-6 pb-28 pt-16 md:px-12 md:pt-24 lg:px-16">
        <div className="mb-10 flex items-end justify-between gap-6" data-reveal>
          <h2 className="text-[1.375rem] md:text-[1.75rem]">More from the collection</h2>
          <Link href={`/collection/${next.id}/`} className="group shrink-0 text-xs" style={{ color: color.text.tertiary, letterSpacing: typography.tracking.wide }}>
            Next: {next.name} <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div data-reveal className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:px-0">
          {others.map((c) => (
            <div key={c.id} className="w-[62vw] shrink-0 snap-start md:w-auto">
              <ProductCard chair={c} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
