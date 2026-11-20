/**
 * Image library rules (no build needed):
 *   - every photo is assigned to exactly one place on the site,
 *   - every referenced photo exists,
 *   - no photo in /public/assets sits unused.
 *
 * Photo slots live in data/*.ts (images, categories, collections, gallery).
 * The logo and the social-share image are site-wide by design and excluded.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const SLOT_FILES = ["data/images.ts", "data/categories.ts", "data/collections.ts", "data/gallery.ts"];
const EXCLUDED_DIRS = new Set(["logo", "social"]);

const refs = SLOT_FILES.flatMap((f) => [...readFileSync(f, "utf8").matchAll(/"(\/assets\/[^"]+\.(?:jpe?g|png|webp))"/g)].map((m) => ({ src: m[1], file: f })));

function photosOnDisk(dir = "public/assets") {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return EXCLUDED_DIRS.has(name) ? [] : photosOnDisk(p);
    return /\.(jpe?g|png|webp)$/i.test(name) ? ["/" + p.replace(/\\/g, "/").replace(/^public\//, "")] : [];
  });
}

test("every photo is used in exactly one place", () => {
  const seen = new Map();
  for (const r of refs) seen.set(r.src, [...(seen.get(r.src) ?? []), r.file]);
  const dupes = [...seen].filter(([, where]) => where.length > 1).map(([src, where]) => `${src} (${where.join(", ")})`);
  assert.deepEqual(dupes, [], `Photos used more than once:\n${dupes.join("\n")}`);
});

test("every referenced photo exists", () => {
  const missing = refs.filter((r) => !existsSync(join("public", r.src))).map((r) => `${r.src} (${r.file})`);
  assert.deepEqual(missing, []);
});

test("no photo in /public/assets is left unused", () => {
  const used = new Set(refs.map((r) => r.src));
  const unused = photosOnDisk().filter((p) => !used.has(p));
  assert.deepEqual(unused, [], `Unused photos:\n${unused.join("\n")}`);
});
