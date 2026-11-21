/**
 * Hand-drawn decorative art for the banners: a gold vine for the corners and a
 * small lit diya for the festival banner. Pure SVG, no images.
 */

import { useId } from "react";

function GoldDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#b97a22" />
        <stop offset="0.45" stopColor="#f6e38a" />
        <stop offset="1" stopColor="#9a6c1c" />
      </linearGradient>
    </defs>
  );
}

const leaf = (gold: string, x: number, y: number, r: number, s = 1) => (
  <path
    key={`${x}-${y}`}
    d="M0 0 C 6 -8, 18 -8, 26 0 C 18 8, 6 8, 0 0 Z"
    transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}
    fill={gold}
  />
);

/** Curling vine with leaves and buds, drawn for a top-left corner; flip it with CSS for other corners. */
export function Vine({ className = "" }: { className?: string }) {
  const id = "g" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const GOLD = `url(#${id})`;
  return (
    <svg aria-hidden viewBox="0 0 220 160" className={className} fill="none">
      <GoldDefs id={id} />
      <path
        d="M-4 150 C 40 120, 60 70, 110 52 S 190 40, 214 8"
        stroke={GOLD}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M58 98 C 52 76, 60 56, 80 46"
        stroke={GOLD}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M150 44 C 150 26, 162 14, 180 10"
        stroke={GOLD}
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      {leaf(GOLD, 30, 128, -40)}
      {leaf(GOLD, 46, 112, 200, 0.9)}
      {leaf(GOLD, 78, 72, -60, 0.9)}
      {leaf(GOLD, 96, 60, 160, 0.85)}
      {leaf(GOLD, 128, 50, -20, 0.85)}
      {leaf(GOLD, 166, 36, 190, 0.8)}
      {leaf(GOLD, 192, 22, -35, 0.75)}
      <circle cx="80" cy="46" r="3.2" fill={GOLD} />
      <circle cx="180" cy="10" r="2.6" fill={GOLD} />
      <circle cx="58" cy="98" r="2.4" fill={GOLD} />
    </svg>
  );
}

/** A small lit diya (oil lamp) for the festival banner. */
export function Diya({ className = "" }: { className?: string }) {
  const id = "g" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const GOLD = `url(#${id}g)`;
  return (
    <svg aria-hidden viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id={`${id}w`} cx="0.5" cy="0.4" r="0.5">
          <stop offset="0" stopColor="#fff4c0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#f6e38a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}f`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffbe8" />
          <stop offset="0.6" stopColor="#f6c64a" />
          <stop offset="1" stopColor="#d9822b" />
        </linearGradient>
      </defs>
      <GoldDefs id={`${id}g`} />
      <circle cx="32" cy="22" r="18" fill={`url(#${id}w)`} />
      <path
        d="M32 8 C 37 16, 38 22, 32 30 C 26 22, 27 16, 32 8 Z"
        fill={`url(#${id}f)`}
      />
      <path
        d="M8 36 C 14 52, 50 52, 56 36 C 46 40, 18 40, 8 36 Z"
        fill={GOLD}
      />
      <path
        d="M8 36 C 18 40, 46 40, 56 36"
        stroke="#8e621a"
        strokeWidth="1"
        fill="none"
      />
      <path d="M24 50 L 40 50 L 37 56 L 27 56 Z" fill={GOLD} />
    </svg>
  );
}

/**
 * Small lotus for dividers: gold by default, or a solid `color` (e.g. deep purple on
 * cream). `outline` draws it as gold line-art instead of filled petals.
 */
export function Lotus({ className = "", color, outline = false }: { className?: string; color?: string; outline?: boolean }) {
  const id = useId();
  const gold = color ?? `url(#${id})`;
  const paint = outline
    ? { fill: "none", stroke: gold, strokeWidth: 1.1, strokeLinejoin: "round" as const }
    : { fill: gold };
  return (
    <svg viewBox="0 0 32 22" aria-hidden className={className}>
      <GoldDefs id={id} />
      <path d="M16 2 C19 7 19 13 16 19 C13 13 13 7 16 2 Z" {...paint} />
      <path d="M16 19 C11 17 8 12 8 7 C12 9 15 13 16 19 Z" {...paint} />
      <path d="M16 19 C21 17 24 12 24 7 C20 9 17 13 16 19 Z" {...paint} />
      <path d="M16 19 C11 19 5 17 1 12 C6 12 12 14 16 19 Z" {...paint} opacity={outline ? 1 : 0.85} />
      <path d="M16 19 C21 19 27 17 31 12 C26 12 20 14 16 19 Z" {...paint} opacity={outline ? 1 : 0.85} />
      <path d="M7 20.5 H25" stroke={gold} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/** Line-art lotus mandala in gold hairlines, for the corner of a velvet panel. */
export function FloralMandala({ className = "" }: { className?: string }) {
  const id = useId();
  const gold = `url(#${id})`;
  const petal = "M0 0 C7 -12 7 -26 0 -36 C-7 -26 -7 -12 0 0 Z";
  const outer = "M0 -8 C10 -22 10 -42 0 -56 C-10 -42 -10 -22 0 -8 Z";
  return (
    <svg viewBox="-64 -64 128 128" aria-hidden className={className} fill="none" stroke={gold} strokeWidth="1">
      <GoldDefs id={id} />
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} transform={`rotate(${i * 45})`}>
          <path d={outer} />
          <path d={petal} transform="rotate(22.5)" />
          <circle cx="0" cy="-60" r="1.6" fill={gold} stroke="none" />
        </g>
      ))}
      <circle r="9" />
      <circle r="4" fill={gold} stroke="none" />
    </svg>
  );
}
