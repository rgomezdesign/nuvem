import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import type { Chair } from "@/lib/collection";
import { color } from "@/app/tokens";

// Mirrors Figma "Product Card". Shares the chair's view-transition name so it glides into the product hero.
export default function ProductCard({ chair, className = "" }: { chair: Chair; className?: string }) {
  return (
    <Link href={`/collection/${chair.id}/`} className={`group block ${className}`}>
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl" style={{ backgroundColor: color.bg.secondary }}>
        <div className="w-[42%] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-[1.04]" style={{ transitionTimingFunction: "var(--ease-calm)" }}>
          <ViewTransition name={`chair-${chair.id}`} share="chair">
            <Image src={chair.image} alt={`${chair.name} chair`} className="h-auto w-full" sizes="(max-width: 767px) 40vw, 200px" />
          </ViewTransition>
        </div>
      </div>
      <p className="mt-4 text-base font-medium">{chair.name}</p>
      <p className="text-sm font-light" style={{ color: color.text.muted }}>
        {chair.tagline}
      </p>
    </Link>
  );
}
