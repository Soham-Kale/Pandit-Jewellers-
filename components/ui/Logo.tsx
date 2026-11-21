"use client";

import Image from "next/image";
import { business } from "@/data/business";
import { useLang } from "@/lib/i18n";

/** Brand identity: the purple-and-gold star monogram with a wordmark in the active language. */
/** `eager` only for the header logo, which is above the fold on every page. */
export default function Logo({ tone = "dark", className = "", eager = false }: { tone?: "dark" | "light"; className?: string; eager?: boolean }) {
  const { lang } = useLang();
  const light = tone === "light";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/assets/logo/logo.png"
        alt=""
        aria-hidden
        // Displayed at 48–56px: declaring the real display size makes the browser
        // fetch a 64/128px file instead of a 640/1080px one.
        width={56}
        height={56}
        loading={eager ? "eager" : "lazy"}
        className={`size-12 shrink-0 object-contain lg:size-14 ${light ? "drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]" : ""}`}
      />
      {/* Devanagari matras rise above the line box, so nudge the wordmark down to centre its ink on the emblem. */}
      <span className="flex translate-y-[5px] flex-col leading-none lg:translate-y-[6px]">
        <span
          className={`text-[1.45rem] font-bold lg:text-[1.65rem] ${
            light ? "text-ivory" : "text-burgundy"
          }`}
        >
          {business.shortName[lang]}
        </span>
        <span
          className={`mt-1 text-[0.78rem] font-semibold ${
            light ? "text-gold-soft" : "text-gold-deep"
          }`}
        >
          {business.descriptor[lang]} {business.city[lang]}
        </span>
      </span>
    </span>
  );
}
