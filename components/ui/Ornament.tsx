import { useId } from "react";

/** Divider: two gold hairlines and a faceted diamond. */
export default function Ornament({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  // Unique per instance: a shared id breaks every diamond when the first one is hidden.
  const id = useId();
  return (
    <div aria-hidden className={`flex w-44 items-center gap-3 ${className}`}>
      <span className={`h-px flex-1 bg-gradient-to-r from-transparent ${tone === "light" ? "to-gold-soft" : "to-gold"}`} />
      <svg viewBox="0 0 24 24" className="size-4">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b97a22" />
            <stop offset="0.5" stopColor="#fff4c0" />
            <stop offset="1" stopColor="#c99a3a" />
          </linearGradient>
        </defs>
        <path d="M12 2 L18 12 L12 22 L6 12 Z" fill={`url(#${id})`} />
      </svg>
      <span className={`h-px flex-1 bg-gradient-to-l from-transparent ${tone === "light" ? "to-gold-soft" : "to-gold"}`} />
    </div>
  );
}
