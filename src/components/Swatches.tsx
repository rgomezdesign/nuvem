"use client";

import Image from "next/image";
import { useState } from "react";
import type { Material } from "@/lib/collection";
import { color } from "@/app/tokens";

// Mirrors Figma "Swatch" (State=Default / Selected). Selecting a swatch shows what that
// material is like; it doesn't recolor the chair.
export default function Swatches({ materials }: { materials: Material[] }) {
  const [active, setActive] = useState(0);
  const m = materials[active];
  return (
    <div>
      <div className="flex gap-6" role="radiogroup" aria-label="Materials">
        {materials.map((mat, i) => {
          const on = i === active;
          return (
            <button
              key={mat.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setActive(i)}
              className="group flex flex-col items-center gap-2 focus-visible:outline-none"
            >
              <span
                className="relative grid h-14 w-14 place-items-center rounded-full transition-[box-shadow,transform] duration-500 group-hover:scale-105 group-focus-visible:ring-2 group-focus-visible:ring-black/40"
                style={{ boxShadow: `inset 0 0 0 ${on ? 1.5 : 1}px ${on ? color.text.primary : color.border.subtle}` }}
              >
                <Image src={mat.image} alt="" className="h-11 w-11 rounded-full" sizes="44px" />
              </span>
              <span className="text-xs font-light" style={{ color: on ? color.text.primary : color.text.tertiary }}>
                {mat.name}
              </span>
            </button>
          );
        })}
      </div>
      <p key={m.id} className="mt-4 max-w-md text-xs leading-relaxed" style={{ color: color.text.tertiary, animation: "rise 500ms var(--ease-calm) both" }}>
        {m.feel}
      </p>
    </div>
  );
}
