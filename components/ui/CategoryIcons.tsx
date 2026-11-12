import { Sparkles, Sun, Crown, Flower2, LayoutGrid } from "lucide-react";
import type { CategoryIcon } from "@/data/categories";

/** Original line icons for jewellery categories (lucide where it fits, custom SVG otherwise). */
export default function CategoryIconGlyph({ icon, className = "size-5" }: { icon: CategoryIcon; className?: string }) {
  const p = { className, fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (icon) {
    case "all":
      return <Sparkles className={className} strokeWidth={1.5} aria-hidden />;
    case "daily":
      return <Sun className={className} strokeWidth={1.5} aria-hidden />;
    case "wedding":
      return <Crown className={className} strokeWidth={1.5} aria-hidden />;
    case "more":
      return <LayoutGrid className={className} strokeWidth={1.5} aria-hidden />;
    case "traditional":
      return <Flower2 className={className} strokeWidth={1.5} aria-hidden />;
    case "necklace":
      return (
        <svg {...p}>
          <path d="M4 3c0 6 3.6 10 8 10s8-4 8-10" />
          <path d="M12 13v2" />
          <path d="M12 15l-2.2 2.6L12 21l2.2-3.4z" />
        </svg>
      );
    case "earring":
      return (
        <svg {...p}>
          <circle cx="12" cy="4" r="1.6" />
          <path d="M12 5.6v2" />
          <path d="M7 15c0-4 2.2-7.4 5-7.4s5 3.4 5 7.4z" />
          <path d="M7.5 17.5v1M10 18v1.5M12 18v2M14 18v1.5M16.5 17.5v1" />
        </svg>
      );
    case "bangle":
      return (
        <svg {...p}>
          <ellipse cx="9" cy="12" rx="6" ry="6.5" />
          <ellipse cx="15" cy="12" rx="6" ry="6.5" />
        </svg>
      );
    case "ring":
      return (
        <svg {...p}>
          <circle cx="12" cy="15" r="6" />
          <path d="M9.5 6.5L12 9l2.5-2.5L13 4h-2z" />
        </svg>
      );
    case "mangalsutra":
      return (
        <svg {...p}>
          <path d="M4 3l8 11 8-11" />
          <circle cx="6.5" cy="6.4" r="0.9" fill="currentColor" />
          <circle cx="9" cy="10" r="0.9" fill="currentColor" />
          <circle cx="15" cy="10" r="0.9" fill="currentColor" />
          <circle cx="17.5" cy="6.4" r="0.9" fill="currentColor" />
          <circle cx="9.8" cy="17.5" r="2.2" />
          <circle cx="14.2" cy="17.5" r="2.2" />
        </svg>
      );
    case "chain":
      return (
        <svg {...p}>
          <rect x="2.5" y="9" width="7" height="6" rx="3" />
          <rect x="8.5" y="9" width="7" height="6" rx="3" transform="rotate(0)" />
          <rect x="14.5" y="9" width="7" height="6" rx="3" />
        </svg>
      );
  }
}
