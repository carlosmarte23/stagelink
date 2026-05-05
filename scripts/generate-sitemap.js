import process from "node:process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const siteUrl = process.env.VITE_SITE_URL || "https://stagelink-one.vercel.app";

const eventsPath = path.join(__dirname, "../src/data/events.json");
const sitemapPath = path.join(__dirname, "../public/sitemap.xml");

function normalizeSiteUrl(url) {
  return url.replace(/\/$/, "");
}

function buildUrl(pathname) {
  return `${normalizeSiteUrl(siteUrl)}${pathname}`;
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function buildSitemapXml(urls) {
  const urlEntries = urls
    .map((url) => {
      return ["  <url>", `    <loc>${escapeXml(url)}</loc>`, "  </url>"].join(
        "\n",
      );
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    "</urlset>",
    "",
  ].join("\n");
}

const eventsFile = await readFile(eventsPath, "utf-8");
const events = JSON.parse(eventsFile);

const urls = [
  buildUrl("/"),
  buildUrl("/events"),
  ...events.map((event) => buildUrl(`/events/${event.id}`)),
];

const sitemapXml = buildSitemapXml(urls);

await writeFile(sitemapPath, sitemapXml, "utf-8");

process.stdout.write(`Sitemap written to ${sitemapPath}\n`);
