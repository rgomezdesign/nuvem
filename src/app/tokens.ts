/**
 * Nuvem Collection — Design Tokens
 *
 * Two-tier architecture matching a production Figma variable library:
 *
 *   Tier 1 · Primitives  — raw scale values; never imported directly by components.
 *                           Corresponds to a "Primitives" Figma variable collection.
 *
 *   Tier 2 · Semantics   — intent-driven aliases that reference primitives.
 *                           Corresponds to "Semantics" and "Component" collections.
 *
 * Naming convention: category.group.variant
 *   color.text.primary     typography.scale.display    spacing.section.y.lg
 *   color.bg.secondary     typography.tracking.widest  sizing.featureImage.width
 *
 * Usage in components:
 *   import { color, typography, spacing, sizing, ... } from "./tokens";
 *   style={{ color: color.text.primary, fontSize: typography.scale.section }}
 *
 * Tailwind-class ↔ token mapping is documented inline wherever a Tailwind utility
 * encodes a token value (e.g. py-20 → spacing.section.y.sm).
 */

/* ─────────────────────────────────────────────────────────────────────────────
   TIER 1 · PRIMITIVES
   Pure scale values — no semantics attached.
   Not exported; consumed only by the semantic layer below.
───────────────────────────────────────────────────────────────────────────── */

const p = {

  /* Colour palette — warm neutral axis + utility alphas */
  color: {
    white: "#FFFFFF",
    neutral: {
      /** 96 % lightness — warm off-white, main background  */ 100: "#F5F4F2",
      /** 90 % lightness — warm light grey, alternate fills */ 200: "#EAE6E3",
      /** 67 % lightness — mid grey, taglines               */ 400: "#AAAAAA",
      /** 47 % lightness — medium grey, body copy           */ 500: "#777777",
      /** 40 % lightness — slightly darker grey, prose      */ 600: "#666666",
      /** 33 % lightness — dark grey, least-emphasis text   */ 700: "#555555",
      /** 18 % lightness — near-black charcoal, primary     */ 900: "#2E2E2E",
    },
    /** Semi-transparent charcoal/black used for borders and shadows */
    blackAlpha: {
       8: "rgba(46,46,46,0.08)",
      13: "rgba(0,0,0,0.13)",
      22: "rgba(46,46,46,0.22)",
    },
  },

  /* Spatial scale — 4-px base unit, mirrors Tailwind default */
  space: {
     0: "0px",
     1: "4px",
     2: "8px",
     3: "12px",
     4: "16px",
     5: "20px",
     6: "24px",
     8: "32px",
    10: "40px",
    12: "48px",
    14: "56px",
    16: "64px",
    20: "80px",
    24: "96px",
    28: "112px",
    32: "128px",
  },

  /* Typographic scale */
  fontSize: {
    "2xs":   "0.6875rem",                    // 11 px — CTA label
    xs:      "0.75rem",                       // 12 px — nav, footer  (Tailwind: text-xs)
    sm:      "0.875rem",                      // 14 px — hero body    (Tailwind: text-sm)
    base:    "1rem",                          // 16 px — feature description
    lg:      "1.13rem",                       // 18 px — feature tagline
    section: "3.63rem",                       // 58 px — section heading
    display: "clamp(2.4rem, 5.5vw, 4.5rem)", // fluid — hero h1
  },

  fontWeight: { light: 300, regular: 400, medium: 500, semibold: 600 },

  letterSpacing: {
    tight:  "-0.02em",  // headings (Tailwind: tracking-tight ≈ −0.025em)
    wide:   "0.03em",   // nav links
    wider:  "0.14em",   // CTA label
    widest: "0.2em",    // brand wordmark (NUVEM)
  },

  lineHeight: {
    none:    1,      // Tailwind: leading-none
    relaxed: 1.625,  // Tailwind: leading-relaxed
  },

  radius: {
    none:  "0px",
    full:  "9999px",  // Tailwind: rounded-full
    "4xl": "2rem",    // used for footer top-corner rounding
  },

  opacity: {
     0: 0,
     8: 0.08,
    13: 0.13,
    22: 0.22,
    40: 0.40,
    50: 0.50,
    75: 0.75,
   100: 1,
  },

  duration: {
    fast:  "300ms",  // dot transitions
    base:  "450ms",  // carousel opacity
    slow:  "550ms",  // carousel position / scale
    image: "500ms",  // feature image hover (Tailwind: duration-500)
  },

  easing: {
    ease:     "ease",                          // carousel opacity
    standard: "cubic-bezier(0.4, 0, 0.2, 1)", // carousel position (material decelerate)
  },

  zIndex: { card: 3, ui: 20, nav: 50 },

} as const;


/* ─────────────────────────────────────────────────────────────────────────────
   TIER 2 · SEMANTICS
   Intent-driven tokens for use in components.
   Each token maps to exactly one primitive.
───────────────────────────────────────────────────────────────────────────── */

/* ── Color ──────────────────────────────────────────────────────────────────── */

export const color = {

  /** Surface fills */
  bg: {
    primary:   p.color.neutral[100],  // page, hero, closing section
    secondary: p.color.neutral[200],  // alternating feature sections (Aire, Shell)
    inverse:   p.color.neutral[900],  // footer
  },

  /** Text & icon colours — ordered by visual prominence */
  text: {
    primary:   p.color.neutral[900],  // headings, brand, nav          — #2E2E2E
    secondary: p.color.neutral[600],  // feature section descriptions   — #666666
    tertiary:  p.color.neutral[500],  // hero body, closing, footer nav — #777777
    muted:     p.color.neutral[400],  // taglines, de-emphasised        — #AAAAAA
    subtle:    p.color.neutral[700],  // footer copyright, least weight  — #555555
    inverse:   p.color.white,         // on dark (footer) surfaces
  },

  /** Stroke / separator colours */
  border: {
    subtle:  p.color.blackAlpha[8],   // nav bottom divider
    default: p.color.blackAlpha[22],  // arrow buttons, inactive dots
  },

  /** Interactive element fills */
  action: {
    primary:   p.color.neutral[900],  // CTA background
    onPrimary: p.color.white,         // CTA label
  },

} as const;

/* ── Typography ─────────────────────────────────────────────────────────────── */

export const typography = {

  scale: {
    label:   p.fontSize["2xs"],    // 11 px — CTA button text
    xs:      p.fontSize.xs,        // 12 px — nav links, footer copy
    sm:      p.fontSize.sm,        // 14 px — hero body, closing paragraph
    base:    p.fontSize.base,      // 16 px — feature section description
    lg:      p.fontSize.lg,        // 1.13 rem — feature section tagline
    section: p.fontSize.section,   // 3.63 rem — section heading (Aire / Frame …)
    display: p.fontSize.display,   // clamp — hero h1
  },

  weight: {
    light:    p.fontWeight.light,
    regular:  p.fontWeight.regular,
    medium:   p.fontWeight.medium,
    semibold: p.fontWeight.semibold,
  },

  tracking: {
    tight:  p.letterSpacing.tight,   // section / display headings
    wide:   p.letterSpacing.wide,    // nav link labels
    wider:  p.letterSpacing.wider,   // CTA label
    widest: p.letterSpacing.widest,  // brand wordmark (NUVEM)
  },

  leading: {
    none:    p.lineHeight.none,     // section headings — Tailwind: leading-none
    relaxed: p.lineHeight.relaxed,  // body paragraphs — Tailwind: leading-relaxed
  },

} as const;

/* ── Spacing ────────────────────────────────────────────────────────────────── */

export const spacing = {

  /**
   * Responsive section vertical padding.
   * Applied as Tailwind classes: py-{sm} md:py-{md} lg:py-{lg}
   *   sm → py-20   md → py-28   lg → py-32
   */
  section: {
    y: { sm: p.space[20], md: p.space[28], lg: p.space[32] },
  },

  /**
   * Responsive horizontal page padding.
   * Applied as Tailwind classes: px-{sm} md:px-{md} lg:px-{lg}
   *   sm → px-6   md → px-12   lg → px-16
   */
  page: {
    x: { sm: p.space[6], md: p.space[12], lg: p.space[16] },
  },

  /** Hero heading block — vertical gaps between text elements */
  hero: {
    afterHeading: p.space[4],  // 16 px — marginBottom on h1
    afterTagline: p.space[5],  // 20 px — marginBottom on tagline
  },

  /** Feature section desktop layout */
  feature: {
    columnGap: p.space[20],  // 80 px — lg:gap-x-20 between image spacer + text
  },

  /** CTA pill internal padding */
  cta: {
    x: p.space[8],  // 32 px — horizontal
    y: p.space[3],  // 12 px — vertical
  },

} as const;

/* ── Sizing ─────────────────────────────────────────────────────────────────── */

export const sizing = {

  /** Desktop feature section — absolute-positioned cloud+chair composite */
  featureImage: {
    width:       "clamp(380px, 50vw, 680px)",  // image container
    spacerHeight: "clamp(380px, 46vw, 520px)", // grid column placeholder (imageSpacer)
    aspect:       "2284 / 2040",               // native PNG ratio — preserves edge bleed
  },

  /** Mobile feature section — full-width image strip */
  featureImageMobile: {
    height: "clamp(240px, 70vw, 360px)",
  },

  /** Prose column max-widths */
  content: {
    description: "520px",  // feature section prose
    heroBody:    "620px",  // hero paragraph
    closing:     "440px",  // closing statement
    footer:      "72rem",  // max-w-6xl — footer inner container
  },

  /** Carousel — all measurements in px (used in JS arithmetic) */
  carousel: {
    chair:    { width: 210, height: 284 },  // active / centre chair
    neighbor: { width: 147, height: 199 },  // adjacent chairs (dist 1)
    step:        265,  // centre-to-centre offset per slot
    arrowOffset: 130,  // arrow distance from 50% centre: calc(50% − 130px)
  },

} as const;

/* ── Radius ─────────────────────────────────────────────────────────────────── */

export const radius = {
  full:    p.radius.full,      // pills, circular buttons (Tailwind: rounded-full)
  footer:  "2rem 2rem 0 0",    // footer — top-left + top-right corners only
} as const;

/* ── Elevation ──────────────────────────────────────────────────────────────── */

export const elevation = {
  /** Applied as CSS `filter` — traces silhouette on transparent PNGs */
  carouselActive: `drop-shadow(0 12px 28px ${p.color.blackAlpha[13]})`,
} as const;

/* ── Motion ─────────────────────────────────────────────────────────────────── */

export const motion = {

  duration: {
    fast:  p.duration.fast,   // 300 ms — dot width transition
    base:  p.duration.base,   // 450 ms — carousel opacity
    slow:  p.duration.slow,   // 550 ms — carousel position + scale
    image: p.duration.image,  // 500 ms — feature image hover (Tailwind: duration-500)
  },

  easing: {
    ease:     p.easing.ease,
    standard: p.easing.standard,
  },

  /** Pre-composed shorthand transition strings */
  transition: {
    /** Carousel chair — position and opacity run on separate curves */
    carousel: `transform ${p.duration.slow} ${p.easing.standard}, opacity ${p.duration.base} ${p.easing.ease}`,
  },

} as const;

/* ── Border ─────────────────────────────────────────────────────────────────── */

export const border = {
  subtle:  `1px solid ${p.color.blackAlpha[8]}`,   // nav bottom divider
  default: `1px solid ${p.color.blackAlpha[22]}`,  // interactive element strokes
} as const;

/* ── Opacity ────────────────────────────────────────────────────────────────── */

export const opacity = {
  iconResting:      p.opacity[40],  // social icons at rest (Tailwind: opacity-40)
  carouselNeighbor: p.opacity[50],  // adjacent chairs
  carouselHidden:   p.opacity[0],   // out-of-view chairs
} as const;

/* ── Z-Index ────────────────────────────────────────────────────────────────── */

export const zIndex = {
  nav:           p.zIndex.nav,   // 50 — sticky nav (Tailwind: z-50)
  carouselArrow: p.zIndex.ui,    // 20 — prev/next buttons (Tailwind: z-20)
  carouselBase:  p.zIndex.card,  // 3  — active chair; neighbours at base − dist
} as const;

/* ── Breakpoints (reference only — always applied via Tailwind classes) ──────── */

export const breakpoint = {
  md: "768px",   // Tailwind `md:`
  lg: "1024px",  // Tailwind `lg:`
} as const;

/* ── Component tokens — Carousel ────────────────────────────────────────────── */

export const carousel = {

  /** Scale applied per distance from the active slot */
  scale: {
    active:   1,     // dist === 0
    neighbor: 0.70,  // dist === 1
    hidden:   0.50,  // dist >= 2
  },

  /** Breadcrumb dot dimensions */
  dot: {
    activeWidth:   "20px",
    inactiveWidth: "6px",
    height:        "4px",  // Tailwind: h-1 (4 px)
  },

} as const;
