"use client";

import { Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";

/** Marathi ⇄ English switch. Shows both options; the active one is filled gold. */
export default function LanguageToggle({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const { lang, setLang } = useLang();
  const light = tone === "light";
  const base = "min-h-9 rounded-full px-3 text-[0.8rem] font-semibold transition-colors duration-300";
  return (
    <div
      role="group"
      aria-label="भाषा / Language"
      className={`inline-flex items-center gap-0.5 rounded-full border p-0.5 ${light ? "border-gold-soft/50" : "border-gold/60"} ${className}`}
    >
      <Languages aria-hidden className={`mx-1.5 size-4 ${light ? "text-gold-soft" : "text-gold-deep"}`} strokeWidth={1.6} />
      <button
        type="button"
        lang="mr"
        aria-pressed={lang === "mr"}
        onClick={() => setLang("mr")}
        className={`${base} ${lang === "mr" ? "bg-shine text-burgundy-ink" : light ? "text-ivory/85 hover:text-ivory" : "text-burgundy hover:text-gold-deep"}`}
      >
        मराठी
      </button>
      <button
        type="button"
        lang="en"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={`${base} ${lang === "en" ? "bg-shine text-burgundy-ink" : light ? "text-ivory/85 hover:text-ivory" : "text-burgundy hover:text-gold-deep"}`}
      >
        EN
      </button>
    </div>
  );
}
