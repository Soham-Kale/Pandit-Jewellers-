import { ArrowRight } from "lucide-react";
import { extProps } from "@/data/business";

type Variant = "gold" | "burgundy" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  gold: "bg-shine text-burgundy-ink",
  burgundy:
    "bg-burgundy text-ivory shadow-[0_12px_30px_-14px_rgba(122,28,44,0.8)] hover:bg-burgundy-deep hover:shadow-[0_16px_34px_-14px_rgba(122,28,44,0.9)]",
  "outline-light": "border border-gold-soft/70 text-ivory backdrop-blur-sm hover:bg-ivory hover:text-burgundy",
  "outline-dark": "border border-gold text-burgundy hover:bg-burgundy hover:border-burgundy hover:text-ivory",
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
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-[0.8rem] font-semibold tracking-[0.14em] uppercase transition-all duration-500 ease-luxe hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" strokeWidth={1.75} />
      )}
    </a>
  );
}
