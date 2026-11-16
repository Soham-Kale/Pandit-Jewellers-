import { ArrowRight } from "lucide-react";
import { extProps } from "@/data/business";

type Variant = "gold" | "burgundy" | "outline-light" | "outline-dark";

const styles: Record<Variant, string> = {
  gold: "border border-white bg-white text-burgundy-ink hover:bg-ivory-deep",
  burgundy:
    "bg-burgundy text-ivory shadow-[0_12px_30px_-14px_rgba(74,36,117,0.8)] hover:bg-burgundy-deep hover:shadow-[0_16px_34px_-14px_rgba(74,36,117,0.9)]",
  "outline-light": "border border-gold-soft/70 text-ivory backdrop-blur-sm hover:bg-ivory hover:text-burgundy",
  "outline-dark": "border border-burgundy/40 text-burgundy hover:bg-burgundy hover:border-burgundy hover:text-ivory",
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
      className={`group relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-7 py-3 text-[0.95rem] font-medium transition-all duration-500 ease-luxe hover:-translate-y-0.5 ${styles[variant]} ${className}`}
    >
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowRight aria-hidden className="size-4 transition-transform duration-500 ease-luxe group-hover:translate-x-1" strokeWidth={1.75} />
      )}
    </a>
  );
}
