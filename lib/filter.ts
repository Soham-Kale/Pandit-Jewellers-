"use client";

import { useSyncExternalStore } from "react";

/** Shared state for the header search / category filters and the Collections grid. */
export type FilterState = { category: string; query: string };

let state: FilterState = { category: "all", query: "" };
const listeners = new Set<() => void>();
const SERVER: FilterState = { category: "all", query: "" };

export function setFilter(next: Partial<FilterState>) {
  state = { ...state, ...next };
  listeners.forEach((fn) => fn());
}

export function useFilter(): FilterState {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    () => state,
    () => SERVER,
  );
}

/** Apply a filter and bring the Collections grid into view. */
export function showCollections(next: Partial<FilterState>) {
  setFilter(next);
  requestAnimationFrame(() => {
    const el = document.getElementById("collections");
    if (!el) return;
    // On small screens the header collapses to its first row (64px) once scrolled.
    const header = document.getElementById("site-header");
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    // Below lg, the search + category rows collapse after scrolling, which shifts the page up.
    const collapsing = isDesktop ? 0 : (document.getElementById("header-collapsible")?.offsetHeight ?? 0);
    const offset = (isDesktop ? (header?.offsetHeight ?? 132) : 64) + collapsing;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset + 1, behavior: reduce ? "auto" : "smooth" });
  });
}
