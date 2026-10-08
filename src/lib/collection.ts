import type { StaticImageData } from "next/image";
import aire from "@/assets/chairs/aire.webp";
import frame from "@/assets/chairs/frame.webp";
import shell from "@/assets/chairs/shell.webp";
import arc from "@/assets/chairs/arc.webp";
import oak from "@/assets/materials/oak.webp";
import boucle from "@/assets/materials/cloud-white.webp";
import slate from "@/assets/materials/slate.webp";
import sage from "@/assets/materials/sage.webp";
import clay from "@/assets/materials/clay.webp";
import { color } from "@/app/tokens";

/* ─── Materials ─────────────────────────────────────────────────────────────
   Swatches are crops of the real material renders. They describe what a chair
   is made of; they never recolor the chair. */

export type MaterialId = "oak" | "boucle" | "slate" | "sage" | "clay";

export interface Material {
  id: MaterialId;
  name: string;
  /** One line on how it looks and feels */
  feel: string;
  image: StaticImageData;
}

export const MATERIALS: Record<MaterialId, Material> = {
  oak: {
    id: "oak",
    name: "Natural oak",
    feel: "The thread through the whole collection. Solid oak, shaped by hand and finished with a natural oil that deepens a little more every year.",
    image: oak,
  },
  boucle: {
    id: "boucle",
    name: "Cloud bouclé",
    feel: "Looped yarn with a soft, cloud-like texture. Light in color and in feel.",
    image: boucle,
  },
  slate: {
    id: "slate",
    name: "Slate wool",
    feel: "A tightly woven wool in deep slate blue. Calm, grounded and made for every day.",
    image: slate,
  },
  sage: {
    id: "sage",
    name: "Sage felt",
    feel: "A dense, smooth felt in muted green that follows Shell’s rounded form without a wrinkle.",
    image: sage,
  },
  clay: {
    id: "clay",
    name: "Clay weave",
    feel: "A warm, textured weave in soft clay that brings out the curve of Arc’s oak arches.",
    image: clay,
  },
};

/* ─── Chairs ────────────────────────────────────────────────────────────── */

export interface Chair {
  id: "aire" | "frame" | "shell" | "arc";
  name: string;
  tagline: string;
  description: string;
  image: StaticImageData;
  /** Home feature section background (alternates) */
  sectionBg: string;
  /** Home feature section: image on the left? */
  imageLeft: boolean;
  /** Upholstery first, oak second */
  materials: MaterialId[];
  details: { form: string; material: string; comfort: string };
  specs: { label: string; value: string }[];
}

export const CHAIRS: Chair[] = [
  {
    id: "aire",
    name: "Aire",
    tagline: "light by design",
    description:
      "The lightest expression in the Nuvem Collection, Aire distills comfort into a sculpted easy form. Designed for stillness, it reflects simplicity and lightness through every curve.",
    image: aire,
    sectionBg: color.bg.secondary,
    imageLeft: true,
    materials: ["boucle", "oak"],
    details: {
      form: "A single sculpted shell with softened edges, so the chair reads as one calm gesture from every side.",
      material: "Cloud bouclé over a natural oak base. Soft to the hand, warm to the eye, honest about what it is.",
      comfort: "A generous seat and a gently reclined back, tuned for reading, resting and long conversations.",
    },
    specs: [
      { label: "Upholstery", value: "Cloud bouclé" },
      { label: "Frame", value: "Solid oak, natural oil" },
      { label: "Dimensions", value: "W 68 × D 72 × H 78 cm" },
      { label: "Seat height", value: "44 cm" },
    ],
  },
  {
    id: "frame",
    name: "Frame",
    tagline: "structure and stillness",
    description:
      "A study in proportion and restraint, Nuvem Frame blends oak craftsmanship with slate blue fabric. Designed for creative focus, it anchors the collection with quiet strength.",
    image: frame,
    sectionBg: color.bg.primary,
    imageLeft: false,
    materials: ["slate", "oak"],
    details: {
      form: "An open oak frame with floating cushions, so the structure is part of the design instead of hiding under it.",
      material: "Slate wool cushions on solid oak. Durable, calm and easy to live with.",
      comfort: "An upright, supportive posture for working, sketching or reading at a desk-side corner.",
    },
    specs: [
      { label: "Upholstery", value: "Slate wool" },
      { label: "Frame", value: "Solid oak, natural oil" },
      { label: "Dimensions", value: "W 70 × D 76 × H 80 cm" },
      { label: "Seat height", value: "42 cm" },
    ],
  },
  {
    id: "shell",
    name: "Shell",
    tagline: "natural form",
    description:
      "Inspired by the geometry of nature, Nuvem Shell wraps the sitter in a smooth, inviting form. Its sage mist fabric and gentle lines evoke balance and ease.",
    image: shell,
    sectionBg: color.bg.secondary,
    imageLeft: true,
    materials: ["sage", "oak"],
    details: {
      form: "A high, wrapping back that curves around you like a shell, held up on slim oak legs.",
      material: "Sage felt pulled smooth over the shell, on a natural oak base.",
      comfort: "Built for curling up. The wings give you a quiet corner, even in an open room.",
    },
    specs: [
      { label: "Upholstery", value: "Sage felt" },
      { label: "Frame", value: "Solid oak, natural oil" },
      { label: "Dimensions", value: "W 74 × D 78 × H 92 cm" },
      { label: "Seat height", value: "43 cm" },
    ],
  },
  {
    id: "arc",
    name: "Arc",
    tagline: "design in motion",
    description:
      "With its bold oak arches and warm clay tone, Nuvem Arc celebrates form and flow. Designed for expressive interiors, it bridges art and function through quiet confidence.",
    image: arc,
    sectionBg: color.bg.primary,
    imageLeft: false,
    materials: ["clay", "oak"],
    details: {
      form: "Two continuous oak arches carry the whole chair. The curve you see is the structure you sit in.",
      material: "Clay weave on bent solid oak. The texture softens the bold shape.",
      comfort: "A deep, low seat with arms at just the right height to rest a book or a cup.",
    },
    specs: [
      { label: "Upholstery", value: "Clay weave" },
      { label: "Frame", value: "Bent solid oak" },
      { label: "Dimensions", value: "W 78 × D 84 × H 76 cm" },
      { label: "Seat height", value: "41 cm" },
    ],
  },
];

export const getChair = (id: string) => CHAIRS.find((c) => c.id === id);

/** Chairs that use a given material (oak is on all of them) */
export const chairsUsing = (m: MaterialId) => CHAIRS.filter((c) => c.materials.includes(m));

export const NAV = [
  { href: "/#collection", label: "Collection", match: ["/", "/collection"] },
  { href: "/materials/", label: "Materials", match: ["/materials"] },
  { href: "/about/", label: "About", match: ["/about"] },
  { href: "/about/#contact", label: "Contact", match: [] },
] as const;

export const CONTACT_EMAIL = "gomez7695@gmail.com";
export const PORTFOLIO_URL = "https://rgomezdesign.com";
