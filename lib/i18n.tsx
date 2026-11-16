"use client";

import { createContext, useContext } from "react";

/**
 * The site is Marathi-only. `Lang` and `L` remain so data files can keep an
 * English form of a few values used behind the scenes (search-engine data,
 * Google Maps search), but the page always renders in Marathi.
 */
export type Lang = "mr";
export const DEFAULT_LANG: Lang = "mr";

type Ctx = { lang: Lang };
const LanguageContext = createContext<Ctx>({ lang: DEFAULT_LANG });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <LanguageContext.Provider value={{ lang: DEFAULT_LANG }}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);

/** A value with its Marathi form (shown) and English form (used only for metadata). */
export type L<T = string> = { mr: T; en: T };
