import Image from "next/image";
import { ViewTransition } from "react";
import cloudWarm from "@/assets/shapes/cloud-warm.webp";
import cloudLight from "@/assets/shapes/cloud-light.webp";
import type { Chair } from "@/lib/collection";

/*
 * The Nuvem motif: a chair resting on a cloud shape.
 * - Cloud and chair are separate layers, so the cloud drifts slower than the chair on scroll.
 * - The chair floats gently (CSS) and carries a shared view-transition name, so it glides
 *   between the home section and its product page.
 * As in the original composites, the cloud's flat edge sits flush on the screen edge and its round
 * side faces the content. The two cloud files face opposite ways (warm: flat edge on the right,
 * light: flat edge on the left), so each is mirrored only when its flat edge is on the wrong side.
 */
interface Props {
  chair: Chair;
  /** Which side of the screen the cloud bleeds off */
  side?: "left" | "right";
  /** Cloud tone: warm on light sections, light on warm sections */
  tone?: "warm" | "light";
  priority?: boolean;
  floatDelay?: 0 | 1 | 2 | 3;
  className?: string;
}

export default function CloudStage({ chair, side = "left", tone = "warm", priority = false, floatDelay = 0, className = "" }: Props) {
  const cloud = tone === "warm" ? cloudWarm : cloudLight;
  const artFlatSide = tone === "warm" ? "right" : "left";
  const mirror = artFlatSide !== side;
  // Sized from the stage height (container query units) so the chair always sits inside its cloud:
  // cloud = 92% of the stage height, flat edge flush with the screen edge; the chair is centred ~53%
  // of the cloud's width in from that edge (≈ 50cqh) and stands 84% tall.
  const edge = side === "left" ? "left" : "right";
  return (
    <div className={`relative overflow-hidden [container-type:size] ${className}`}>
      <div className="parallax absolute inset-0" data-parallax="-0.06" aria-hidden="true">
        <Image
          src={cloud}
          alt=""
          className="absolute bottom-0 h-[92cqh] w-auto max-w-none"
          style={{ [edge]: 0, transform: mirror ? "scaleX(-1)" : undefined }}
          sizes="(max-width: 1023px) 100vw, 640px"
          priority={priority}
        />
      </div>
      <div
        className="parallax absolute bottom-[5cqh] h-[84cqh]"
        data-parallax="0.04"
        style={{ [edge]: "50cqh", transform: `translateX(${side === "left" ? "-50%" : "50%"}) translate3d(0, var(--parallax, 0px), 0)` }}
      >
        <div className={`float float-delay-${floatDelay} h-full`}>
          <ViewTransition name={`chair-${chair.id}`} share="chair">
            <Image
              src={chair.image}
              alt={`${chair.name} chair`}
              className="h-full w-auto max-w-none"
              style={{ filter: "drop-shadow(0 24px 30px rgba(46,46,46,0.14))" }}
              sizes="(max-width: 1023px) 60vw, 480px"
              priority={priority}
            />
          </ViewTransition>
        </div>
      </div>
    </div>
  );
}
