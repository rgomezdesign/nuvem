import Link from "next/link";
import { color, typography, spacing } from "@/app/tokens";

// Mirrors Figma "Button/Primary" and "Button/Ghost".
interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
}

export default function ButtonLink({ href, children, variant = "primary", external = false, className = "" }: Props) {
  const style: React.CSSProperties = {
    padding: `${spacing.cta.y} ${spacing.cta.x}`,
    fontSize: typography.scale.label,
    fontWeight: typography.weight.medium,
    letterSpacing: typography.tracking.wider,
    textTransform: "uppercase",
    ...(variant === "primary"
      ? { backgroundColor: color.action.primary, color: color.action.onPrimary }
      : { border: `1px solid ${color.action.primary}`, color: color.text.primary }),
  };
  const cls = `inline-flex items-center justify-center rounded-full transition-[opacity,transform] duration-300 hover:-translate-y-0.5 hover:opacity-80 ${className}`;
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} style={style} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} style={style}>
      {children}
    </Link>
  );
}
