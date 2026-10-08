import ButtonLink from "@/components/ButtonLink";
import { color } from "./tokens";

export default function NotFound() {
  return (
    <section className="px-6 py-32 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Lost in the clouds.</h1>
      <p className="mt-4 text-sm" style={{ color: color.text.tertiary }}>This page doesn’t exist.</p>
      <div className="mt-8"><ButtonLink href="/">Back home</ButtonLink></div>
    </section>
  );
}
