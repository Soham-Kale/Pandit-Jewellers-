import { ArrowRight } from "lucide-react";
import { extProps } from "@/data/business";

/**
 * burgundy → primary purple · gold → metallic gold (for dark bands)
 * light → white (on photos) · outline-dark / outline-light → secondary actions
 */
type Variant = "gold" | "burgundy" | "light" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  gold: "bg-shine text-burgundy-ink",
  burgundy:
    "bg-burgundy text-white shadow-[0_10px_24px_-14px_rgba(74,36,117,0.8)] hover:bg-burgundy-deep hover:shadow-[0_14px_28px_-14px_rgba(74,36,117,0.9)]",
  light: "bg-white text-burgundy-ink hover:bg-mist",
  "outline-light": "border border-white/60 text-white hover:border-white hover:bg-white hover:text-burgundy-ink",
  "outline-dark": "border border-burgundy/35 text-burgundy hover:border-burgundy hover:bg-burgundy hover:text-white",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  icon?: React.ReactNode;
  arrow?: boolean;
  className?: string;
  ariaLabel?: string;
};

export default function Button({ href, children, variant = "burgundy", icon, arrow = false, className = "", ariaLabel }: ButtonProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...extProps(href)}
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-base font-semibold transition-all duration-500 ease-luxe hover:-translate-y-0.5 active:translate-y-0 ${styles[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" strokeWidth={1.75} />
      )}
    </a>
  );
}
