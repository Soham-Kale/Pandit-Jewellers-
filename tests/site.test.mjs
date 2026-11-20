/**
 * Production smoke + SEO tests. No dependencies: uses node:test and fetch.
 *
 *   npm run build && npm test
 *
 * Boots `next start` on a spare port, then checks every public route for
 * status codes, metadata, structured data, crawler files and security headers.
 */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const PORT = Number(process.env.TEST_PORT ?? 3217);
const BASE = `http://localhost:${PORT}`;
const CATEGORIES = ["necklaces", "earrings", "bangles", "rings", "mangalsutra", "chains", "daily", "wedding", "traditional"];
const PAGES = ["/", "/collections", ...CATEGORIES.map((c) => `/collections/${c}`)];

let server;

before(async () => {
  assert.ok(existsSync(".next/BUILD_ID"), "Run `npm run build` before `npm test`.");
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(PORT)], { stdio: "ignore" });
  for (let i = 0; i < 100; i++) {
    try {
      if ((await fetch(`${BASE}/robots.txt`)).ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  throw new Error("next start did not come up");
});

after(() => server?.kill());

const html = new Map();
async function page(path) {
  if (!html.has(path)) {
    const res = await fetch(BASE + path);
    html.set(path, { status: res.status, headers: res.headers, body: await res.text() });
  }
  return html.get(path);
}

const meta = (body, attr, key) =>
  body.match(new RegExp(`<meta[^>]*${attr}="${key}"[^>]*content="([^"]*)"`))?.[1] ??
  body.match(new RegExp(`<meta[^>]*content="([^"]*)"[^>]*${attr}="${key}"`))?.[1];

function jsonLdTypes(body) {
  const blocks = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const types = [];
  for (const [, raw] of blocks) {
    const data = JSON.parse(raw); // throws on invalid JSON-LD
    for (const n of data["@graph"] ?? [data]) types.push(...[n["@type"]].flat());
  }
  return types;
}

for (const path of PAGES) {
  test(`${path} renders with complete SEO metadata`, async () => {
    const { status, body } = await page(path);
    assert.equal(status, 200);
    assert.match(body, /<html lang="mr"/);
    assert.match(body, /<title>[^<]{10,}<\/title>/, "title");
    const desc = meta(body, "name", "description");
    assert.ok(desc && desc.length >= 50, "meta description");
    assert.match(body, /<link rel="canonical" href="https?:\/\/[^"]+"/, "canonical");
    assert.ok(meta(body, "property", "og:title"), "og:title");
    assert.ok(meta(body, "property", "og:image"), "og:image");
    assert.equal((body.match(/<h1[\s>]/g) ?? []).length, 1, "exactly one <h1>");
  });

  test(`${path} images all have alt text`, async () => {
    const { body } = await page(path);
    const missing = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]).filter((t) => !/\balt="/.test(t));
    assert.deepEqual(missing, []);
  });
}

test("homepage has store, website and FAQ structured data", async () => {
  const types = jsonLdTypes((await page("/")).body);
  for (const t of ["JewelryStore", "WebSite", "FAQPage"]) assert.ok(types.includes(t), `missing ${t}`);
});

test("homepage shows the FAQ that the structured data describes", async () => {
  const { body } = await page("/");
  assert.match(body, /id="faq"/);
  assert.match(body, /दुकानाची वेळ काय आहे\?/);
});

test("category pages have breadcrumbs and collection data", async () => {
  for (const path of PAGES.slice(1)) {
    const types = jsonLdTypes((await page(path)).body);
    assert.ok(types.includes("BreadcrumbList"), `${path} BreadcrumbList`);
    assert.ok(types.includes("CollectionPage"), `${path} CollectionPage`);
  }
});

test("unknown URLs return a real 404 with the branded, noindex page", async () => {
  for (const path of ["/collections/does-not-exist", "/no-such-page"]) {
    const res = await fetch(BASE + path);
    assert.equal(res.status, 404, path);
    const body = await res.text();
    assert.match(body, /पान सापडले नाही/, `${path} branded 404`);
    assert.match(body, /<meta name="robots" content="noindex/, `${path} noindex`);
  }
});

test("robots.txt allows crawling and points to the sitemap", async () => {
  const txt = await (await fetch(`${BASE}/robots.txt`)).text();
  assert.match(txt, /User-Agent: \*\nAllow: \//);
  assert.match(txt, /GPTBot/);
  assert.match(txt, /Sitemap: https?:\/\/.+\/sitemap\.xml/);
});

test("sitemap lists every page", async () => {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  for (const path of PAGES.slice(1)) assert.ok(xml.includes(`${path}</loc>`), path);
  assert.match(xml, /<lastmod>/);
});

test("llms.txt summarises the business for AI assistants", async () => {
  const res = await fetch(`${BASE}/llms.txt`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /text\/plain/);
  const txt = await res.text();
  assert.match(txt, /^# Pandit Jewellers/);
  assert.match(txt, /Shrigonda/);
  assert.match(txt, /## Frequently asked questions/);
});

test("web app manifest is served", async () => {
  const res = await fetch(`${BASE}/manifest.webmanifest`);
  assert.equal(res.status, 200);
  assert.ok((await res.json()).name);
});

test("security headers are set and X-Powered-By is hidden", async () => {
  const { headers } = await page("/");
  assert.equal(headers.get("x-content-type-options"), "nosniff");
  assert.ok(headers.get("strict-transport-security"));
  assert.ok(headers.get("referrer-policy"));
  assert.equal(headers.get("x-powered-by"), null);
});
