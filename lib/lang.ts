/**
 * Server-safe language types and helpers. Kept out of lib/i18n.tsx because that
 * file is a "use client" module: functions exported from it cannot be called
 * from server code (data files, route handlers, metadata).
 *
 * The site is Marathi-only. `Lang` and `L` remain so data files can keep an
 * English form of a few values used behind the scenes (search-engine data,
 * Google Maps search), but the page always renders in Marathi.
 */
export type Lang = "mr";
export const DEFAULT_LANG: Lang = "mr";

/** A value with its Marathi form (shown) and English form (used only for metadata). */
export type L<T = string> = { mr: T; en: T };

/** Writes a number with Marathi (Devanagari) digits, e.g. 413701 → ४१३७०१. Phone numbers stay in 0–9 so they dial. */
export const mrDigits = (v: string | number) => String(v).replace(/[0-9]/g, (d) => "०१२३४५६७८९"[Number(d)]);
