"use client";

import { business } from "@/data/business";
import { useLang } from "@/lib/i18n";

/** Brand identity: a gold faceted monogram with a wordmark in the active language. */
export default function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const { lang } = useLang();
  const light = tone === "light";
  const initial = lang === "mr" ? "पं" : "P";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span aria-hidden className="relative grid size-11 shrink-0 place-items-center lg:size-12">
        <svg viewBox="0 0 48 48" className="absolute inset-0 size-full">
          <defs>
            <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a8772a" />
              <stop offset="0.45" stopColor="#fff2c4" />
              <stop offset="0.6" stopColor="#f0cd72" />
              <stop offset="1" stopColor="#8f6420" />
            </linearGradient>
          </defs>
          <path d="M24 1.5 L46.5 24 L24 46.5 L1.5 24 Z" fill="none" stroke="url(#logo-g)" strokeWidth="1.6" />
          <path d="M24 6.5 L41.5 24 L24 41.5 L6.5 24 Z" fill={light ? "rgba(255,248,238,0.08)" : "rgba(122,28,44,0.06)"} stroke="url(#logo-g)" strokeWidth="0.8" />
        </svg>
        <span className={`relative text-lg leading-none font-bold ${light ? "text-gold-soft" : "text-burgundy"}`}>{initial}</span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-[1.45rem] font-bold lg:text-[1.65rem] ${lang === "en" ? "tracking-[0.2em] uppercase" : ""} ${
            light ? "text-ivory" : "text-burgundy"
          }`}
        >
          {business.shortName[lang]}
        </span>
        <span
          className={`mt-1 text-[0.62rem] font-semibold ${lang === "en" ? "tracking-[0.36em] uppercase" : "text-[0.78rem]"} ${
            light ? "text-gold-soft" : "text-gold-deep"
          }`}
        >
          {business.descriptor[lang]} · {business.city[lang]}
        </span>
      </span>
    </span>
  );
}
