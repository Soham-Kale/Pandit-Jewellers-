"use client";

import { createContext, useContext } from "react";
import { DEFAULT_LANG, type Lang } from "./lang";

// Re-exported so existing client components can keep importing from here.
// Server code must import these from "@/lib/lang" instead.
export { DEFAULT_LANG, mrDigits, type Lang, type L } from "./lang";

type Ctx = { lang: Lang };
const LanguageContext = createContext<Ctx>({ lang: DEFAULT_LANG });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <LanguageContext.Provider value={{ lang: DEFAULT_LANG }}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
