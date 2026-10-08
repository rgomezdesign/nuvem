import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import { MATERIALS, CHAIRS, chairsUsing, type MaterialId } from "@/lib/collection";
import { color, typography } from "@/app/tokens";

// Mirrors Figma "Nuvem — Materials" / "Nuvem — Mobile · Materials".
export const metadata: Metadata = {
  title: "Materials",
  description: "Natural oak and four fabrics, one for each chair. How Nuvem is made and how to care for it.",
};

const FABRICS: MaterialId[] = ["boucle", "slate", "sage", "clay"];
const CARE = [
  ["Oak", "Dust with a dry, soft cloth. Re-oil once a year to keep the grain rich."],
  ["Fabric", "Vacuum gently with a soft brush. Blot spills right away, never rub."],
  ["Light", "Keep out of strong direct sun so colors stay true over time."],
];
const disc = "rounded-full shadow-[0_14px_32px_-10px_rgba(46,46,46,0.28)]";

export default function MaterialsPage() {
  const oak = MATERIALS.oak;
  return (
    <>
      <section className="px-6 pb-16 pt-20 text-center md:pb-24 md:pt-28">
        <h1 className="rise font-semibold leading-none tracking-tight" style={{ fontSize: typography.scale.display }}>
          Made from a few honest things.
        </h1>
        <p className="rise mt-4 text-sm font-light italic" style={{ color: color.text.muted, ["--i" as string]: 1 }}>
          Five materials, four chairs.
        </p>
      </section>

      <section className="grid items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-20 md:px-12 md:py-28 lg:px-16" style={{ backgroundColor: color.bg.secondary }}>
        <div className="flex justify-center" data-reveal>
          <div className="float w-[min(60vw,300px)]">
            <Image src={oak.image} alt="Natural oak swatch" className={`h-auto w-full ${disc}`} sizes="300px" />
          </div>
        </div>
        <div data-reveal style={{ ["--i" as string]: 1 }}>
          <p className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest, color: color.text.tertiary }}>
            Used on every piece
          </p>
          <h2 className="mt-3 text-[2rem] font-semibold leading-none tracking-tight md:text-5xl">{oak.name}</h2>
          <p className="mt-5 max-w-lg leading-relaxed" style={{ color: color.text.secondary }}>{oak.feel}</p>
          <div className="mt-6 flex gap-2">
            {CHAIRS.map((c) => (
              <Link key={c.id} href={`/collection/${c.id}/`} aria-label={c.name} className="transition-transform duration-500 hover:-translate-y-1">
                <Image src={c.image} alt="" className="h-20 w-auto md:h-24" sizes="80px" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12 md:py-28 lg:px-16">
        <div data-reveal>
          <p className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest, color: color.text.tertiary }}>The fabrics</p>
          <h2 className="mt-2 text-2xl md:text-[2rem]">One for each chair</h2>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-8">
          {FABRICS.map((id, n) => {
            const m = MATERIALS[id];
            const chair = chairsUsing(id)[0];
            return (
              <Link
                key={id}
                href={`/collection/${chair.id}/`}
                data-reveal
                style={{ backgroundColor: color.bg.secondary, ["--i" as string]: n % 2 }}
                className="group flex items-center gap-5 rounded-2xl p-5 md:gap-8 md:p-10"
              >
                <Image src={m.image} alt="" className={`h-[84px] w-[84px] shrink-0 transition-transform duration-700 group-hover:rotate-[20deg] group-hover:scale-105 md:h-[140px] md:w-[140px] ${disc}`} sizes="140px" />
                <div>
                  <h3 className="text-lg font-medium md:text-2xl">{m.name}</h3>
                  <p className="mt-1.5 text-xs font-light leading-relaxed md:text-sm" style={{ color: color.text.secondary }}>{m.feel}</p>
                  <p className="mt-3 text-xs" style={{ color: color.text.primary }}>
                    Used on {chair.name} <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="grid gap-10 px-6 py-16 md:grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] md:gap-16 md:px-12 md:py-24 lg:px-16" style={{ backgroundColor: color.bg.secondary }}>
        <div data-reveal>
          <p className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest, color: color.text.tertiary }}>Care</p>
          <h2 className="mt-2 text-2xl md:text-[2rem] md:leading-tight">Made to be lived with</h2>
        </div>
        {CARE.map(([t, c], n) => (
          <div key={t} data-reveal style={{ ["--i" as string]: n + 1 }}>
            <h3 className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest }}>{t}</h3>
            <p className="mt-3 text-sm font-light leading-relaxed" style={{ color: color.text.secondary }}>{c}</p>
          </div>
        ))}
      </section>

      <section className="px-6 py-24 text-center md:py-32" data-reveal>
        <p className="text-[1.375rem] font-light md:text-[1.75rem]">See them together.</p>
        <div className="mt-6">
          <ButtonLink href="/#collection">Explore the collection</ButtonLink>
        </div>
      </section>
    </>
  );
}
