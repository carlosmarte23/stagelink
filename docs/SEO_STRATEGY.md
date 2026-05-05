# SEO Strategy

StageLink includes a practical SEO foundation for a React SPA portfolio project. The goal is to make public pages understandable to search engines and social previews without implying that the mocked checkout is a real ticketing backend.

## Implemented Scope

- Route metadata is handled with `react-helmet-async`.
- Public routes get titles, descriptions, canonical URLs, Open Graph tags, and Twitter/X tags.
- `/cart` and `/my-tickets` use `noindex, nofollow`.
- Home uses `Organization` and `WebSite` JSON-LD.
- Events uses an `ItemList` JSON-LD built from visible events.
- Event Detail uses `Event` and `BreadcrumbList` JSON-LD.
- `robots.txt` allows public pages, blocks private/demo flows, and points to the sitemap.
- `sitemap.xml` includes `/`, `/events`, and each valid `/events/:eventId`.

## Commands

Run the main validation commands before opening or updating the PR:

```bash
pnpm test:run
pnpm lint
pnpm build
```

The build runs the sitemap generator before Vite:

```bash
pnpm generate:sitemap
```

The generator reads `src/data/events.json` and writes `public/sitemap.xml`. It uses `VITE_SITE_URL` when present, otherwise it falls back to `https://stagelink-one.vercel.app`.

## Route Checks

Use the browser DevTools console on each route:

```js
document.title
document.querySelector('link[rel="canonical"]')?.href
document.querySelector('meta[name="robots"]')?.content
document.querySelectorAll('script[type="application/ld+json"]').length
```

Expected route behavior:

| Route | Indexing | Structured data |
| --- | --- | --- |
| `/` | `index, follow` | `Organization`, `WebSite` |
| `/events` | `index, follow` | `ItemList` |
| `/events/:eventId` | `index, follow` | `Event`, `BreadcrumbList` |
| `/cart` | `noindex, nofollow` | none required |
| `/my-tickets` | `noindex, nofollow` | none required |

For social previews, check:

```js
document.querySelector('meta[property="og:image"]')?.content
document.querySelector('meta[property="og:image:alt"]')?.content
document.querySelector('meta[name="twitter:image"]')?.content
document.querySelector('meta[name="twitter:image:alt"]')?.content
```

Home and Events should use the stable StageLink preview image. Event Detail should use the event image when available and fall back to the global preview image when not.

## Robots And Sitemap

After build or preview, verify:

```txt
/robots.txt
/sitemap.xml
```

The sitemap should include:

- `/`
- `/events`
- every public `/events/:eventId`

The sitemap should not include:

- `/cart`
- `/my-tickets`

## Rich Results And Lighthouse

Use Google's Rich Results Test against the deployed URL, not `view-source:` or localhost HTML copied before React renders. For this SPA, JSON-LD may be inserted by React after the initial HTML shell loads.

Lighthouse SEO should be high for the implemented scope: title, description, crawlable links, valid robots, and indexable public routes. Treat Lighthouse as a validation signal, not a promise of ranking.

## SPA Limits

StageLink is currently a client-rendered SPA. Modern crawlers can execute JavaScript, but this is still not equivalent to SSR, SSG, or prerendered HTML. A future production-grade improvement would be to move public marketing/catalog routes to SSR/SSG so metadata and JSON-LD are present in the initial response.

The structured data must stay honest: StageLink uses mocked event data, local storage, and simulated payment. JSON-LD should describe event discovery and available demo ticket tiers, not claim real payment processing or official ticket inventory.
