"use client";

import Image from "next/image";
import { business } from "@/data/business";
import { useLang } from "@/lib/i18n";

/** Brand identity: the purple-and-gold star monogram with a wordmark in the active language. */
export default function Logo({ tone = "dark", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  const { lang } = useLang();
  const light = tone === "light";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/assets/logo/logo.png"
        alt=""
        aria-hidden
        width={512}
        height={512}
        priority
        className={`size-12 shrink-0 object-contain lg:size-14 ${light ? "drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]" : ""}`}
      />
      <span className="flex flex-col leading-none">
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
          {business.descriptor[lang]} · {business.city[lang]}
        </span>
      </span>
    </span>
  );
}
