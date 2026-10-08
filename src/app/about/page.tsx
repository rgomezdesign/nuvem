import type { Metadata } from "next";
import CloudStage from "@/components/CloudStage";
import ButtonLink from "@/components/ButtonLink";
import { getChair, CONTACT_EMAIL, PORTFOLIO_URL } from "@/lib/collection";
import { color, typography } from "@/app/tokens";

// Mirrors Figma "Nuvem — About" / "Nuvem — Mobile · About".
export const metadata: Metadata = {
  title: "About",
  description: "Nuvem means cloud. A concept furniture collection by designer Roman Gomez.",
};

const PRINCIPLES = [
  ["01", "Material warmth", "Oak, wool and bouclé chosen for how they feel to the touch, not just how they photograph."],
  ["02", "Sculptural balance", "Every silhouette is tuned until it looks calm from any angle in the room."],
  ["03", "Quiet craft", "No logos, no loud details. The care shows up in proportion and finish."],
];

export default function AboutPage() {
  const arc = getChair("arc")!;
  return (
    <>
      <section className="px-6 pb-8 pt-20 text-center md:pt-28">
        <h1 className="rise font-semibold leading-none tracking-tight" style={{ fontSize: typography.scale.display }}>
          Nuvem means cloud.
        </h1>
        <p className="rise mt-4 text-sm font-light italic" style={{ color: color.text.muted, ["--i" as string]: 1 }}>
          Designed for modern calm.
        </p>
      </section>

      <section className="grid items-center gap-10 pb-20 pt-8 lg:grid-cols-2 lg:gap-24 lg:pb-28">
        <CloudStage chair={arc} side="left" tone="warm" className="h-[clamp(300px,85vw,400px)] lg:h-[clamp(420px,40vw,560px)]" />
        <div className="space-y-5 px-6 md:px-12 lg:pl-0 lg:pr-16" data-reveal>
          <p className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest, color: color.text.tertiary }}>The idea</p>
          {[
            "Nuvem is a concept furniture collection by designer Roman Gomez. It started with a simple question: what would a chair feel like if it were designed around calm?",
            "The answer became four pieces that share one quiet language. Natural oak, soft fabrics and rounded forms, each with its own personality: Aire is light, Frame is grounded, Shell is organic and Arc is expressive.",
            "The name comes from the Portuguese word for cloud. It’s also the shape you’ll see behind every chair on this site.",
          ].map((p) => (
            <p key={p.slice(0, 12)} className="max-w-xl leading-relaxed" style={{ color: color.text.secondary }}>{p}</p>
          ))}
        </div>
      </section>

      <section className="grid gap-10 px-6 py-16 md:grid-cols-3 md:gap-16 md:px-12 md:py-24 lg:px-16" style={{ backgroundColor: color.bg.secondary }}>
        {PRINCIPLES.map(([n, t, c], i) => (
          <div key={n} data-reveal style={{ ["--i" as string]: i }}>
            <p className="text-xs font-semibold" style={{ letterSpacing: typography.tracking.widest, color: color.text.muted }}>{n}</p>
            <h2 className="mt-3 text-lg font-medium md:text-[1.375rem]">{t}</h2>
            <p className="mt-2 text-sm font-light leading-relaxed" style={{ color: color.text.secondary }}>{c}</p>
          </div>
        ))}
      </section>

      <section id="contact" className="scroll-mt-16 px-6 py-24 text-center md:py-32" data-reveal>
        <p className="text-xs font-semibold uppercase" style={{ letterSpacing: typography.tracking.widest, color: color.text.tertiary }}>Contact</p>
        <h2 className="mt-4 text-[2.5rem] font-semibold leading-none tracking-tight md:text-[3.5rem]">Say hello</h2>
        <p className="mx-auto mt-5 max-w-[560px] text-sm leading-relaxed md:text-base" style={{ color: color.text.secondary }}>
          Nuvem is a design study, so nothing’s for sale yet. If you’d like to talk about the collection or work together, I’d love to hear from you.
        </p>
        <div className="mx-auto mt-8 flex max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center">
          <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=Nuvem`}>Email Roman</ButtonLink>
          <ButtonLink href={PORTFOLIO_URL} variant="ghost" external>See more work</ButtonLink>
        </div>
      </section>
    </>
  );
}
