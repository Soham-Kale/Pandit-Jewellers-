"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";

export type Lang = "mr" | "en";
export const DEFAULT_LANG: Lang = "mr";
const STORAGE_KEY = "pj-lang";

/* A tiny external store: the chosen language, persisted in localStorage. */
const listeners = new Set<() => void>();
let current: Lang | null = null;

function read(): Lang {
  if (current) return current;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    current = saved === "en" || saved === "mr" ? saved : DEFAULT_LANG;
  } catch {
    current = DEFAULT_LANG;
  }
  return current;
}

function write(l: Lang) {
  current = l;
  try {
    window.localStorage.setItem(STORAGE_KEY, l);
  } catch {
    /* storage unavailable: choice lasts for this visit only */
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; toggle: () => void };
const LanguageContext = createContext<Ctx>({ lang: DEFAULT_LANG, setLang: () => {}, toggle: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Server render and first paint use Marathi (the default).
  const lang = useSyncExternalStore(subscribe, read, () => DEFAULT_LANG);

  useEffect(() => {
    document.documentElement.lang = lang === "mr" ? "mr" : "en-IN";
  }, [lang]);

  const setLang = useCallback((l: Lang) => write(l), []);
  const toggle = useCallback(() => write(read() === "mr" ? "en" : "mr"), []);

  return <LanguageContext.Provider value={{ lang, setLang, toggle }}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);

/** A string (or value) in both languages. */
export type L<T = string> = { mr: T; en: T };
