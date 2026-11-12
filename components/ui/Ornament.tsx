/** Divider: two gold hairlines and a faceted diamond. */
export default function Ornament({ className = "", tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <div aria-hidden className={`flex w-44 items-center gap-3 ${className}`}>
      <span className={`h-px flex-1 bg-gradient-to-r from-transparent ${tone === "light" ? "to-gold-soft" : "to-gold"}`} />
      <svg viewBox="0 0 24 24" className="size-4">
        <defs>
          <linearGradient id="orn" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a8772a" />
            <stop offset="0.5" stopColor="#fff2c4" />
            <stop offset="1" stopColor="#c18f34" />
          </linearGradient>
        </defs>
        <path d="M12 2 L18 12 L12 22 L6 12 Z" fill="url(#orn)" />
      </svg>
      <span className={`h-px flex-1 bg-gradient-to-l from-transparent ${tone === "light" ? "to-gold-soft" : "to-gold"}`} />
    </div>
  );
}
