# SEO Implementation Guide

This guide explains how to implement the StageLink SEO foundation with `react-helmet-async`.

## What SEO Means Here

For this app, SEO means:

- Search engines can understand what each public route is about.
- Shared links show useful previews in social and messaging apps.
- Private or local-state pages do not get indexed.
- Page metadata matches the visible page content.

`react-helmet-async` helps manage metadata in the document `<head>`. It does not guarantee ranking. Ranking also depends on crawlability, useful visible content, performance, links, domain trust, and whether crawlers can render the app.

## Install

```bash
pnpm add react-helmet-async
```

Expected package entry:

```json
"dependencies": {
  "react-helmet-async": "^3.0.0"
}
```

Use the version resolved by `pnpm add react-helmet-async`. Do not use the older `react-helmet` package.

## Add HelmetProvider

Update `src/main.jsx`.

Recommended shape:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
```

Keep `StrictMode`. Helmet should be added around the router/app, not used as a replacement for `StrictMode`.

## Add SEO Config

Create `src/features/seo/config/seoConfig.js`.

```js
export const SEO_SITE = {
  name: "StageLink",
  titleTemplate: "%s - StageLink",
  defaultTitle: "StageLink - Discover Live Events",
  defaultDescription:
    "Discover curated concerts and live events, choose tickets, and manage your digital passes with StageLink.",
  productionOrigin: "https://stagelink.example.com",
  defaultImagePath: "/og/stagelink-default.jpg",
  locale: "en_US",
};
```

Before launch, replace `productionOrigin` with the real deployed domain. Never ship canonical URLs with `localhost`.

## Add Metadata Helpers

Create `src/features/seo/lib/seoMeta.js`.

```js
import { SEO_SITE } from "../config/seoConfig";

export function buildAbsoluteUrl(path = "/") {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalizedPath, SEO_SITE.productionOrigin).toString();
}

export function buildPageTitle(title) {
  if (!title) return SEO_SITE.defaultTitle;
  return SEO_SITE.titleTemplate.replace("%s", title);
}

export function buildSeoMeta({
  title,
  description = SEO_SITE.defaultDescription,
  canonicalPath = "/",
  imagePath = SEO_SITE.defaultImagePath,
  type = "website",
  noindex = false,
} = {}) {
  return {
    title: buildPageTitle(title),
    description,
    canonicalUrl: buildAbsoluteUrl(canonicalPath),
    imageUrl: buildAbsoluteUrl(imagePath),
    type,
    robots: noindex ? "noindex, nofollow" : "index, follow",
  };
}
```

Helpers keep the metadata consistent and easy to test.

## Add SEO Component

Create `src/components/seo/SEO.jsx`.

```jsx
import { Helmet } from "react-helmet-async";

import { SEO_SITE } from "../../features/seo/config/seoConfig";
import { buildSeoMeta } from "../../features/seo/lib/seoMeta";

export default function SEO(props) {
  const meta = buildSeoMeta(props);

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.robots} />
      <link rel="canonical" href={meta.canonicalUrl} />

      <meta property="og:site_name" content={SEO_SITE.name} />
      <meta property="og:locale" content={SEO_SITE.locale} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.canonicalUrl} />
      <meta property="og:image" content={meta.imageUrl} />
      <meta property="og:image:alt" content={meta.title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.imageUrl} />
    </Helmet>
  );
}
```

What each group does:

- Title and description help search snippets and browser UI.
- Canonical tells crawlers which URL is the preferred version.
- Robots controls indexing.
- Open Graph controls rich previews for many platforms.
- Twitter/X cards control X card format and image behavior.

## Add SEO To Routes

### Home

```jsx
<SEO
  title="Discover Live Events"
  description="Find curated concerts and live experiences, choose tickets, and keep your passes together with StageLink."
  canonicalPath="/"
/>
```

### Events

```jsx
<SEO
  title="Upcoming Events"
  description="Browse curated concerts and live experiences by genre, city, date, and price."
  canonicalPath="/events"
/>
```

Do not create canonical URLs for temporary filter state unless those filters become crawlable URLs.

### Event Detail

```jsx
<SEO
  title={event.title}
  description={`${event.description} See tickets for ${event.title} at ${venueName}.`}
  canonicalPath={`/events/${event.id}`}
/>
```

Event detail pages are the most valuable SEO pages because they have specific content: title, date, venue, description, and ticket tiers.
Social previews use the global StageLink image in the initial HTML; event images remain available in the page UI and Event JSON-LD.

### Cart

```jsx
<SEO
  title="Checkout"
  description="Review selected tickets and complete a local demo checkout on StageLink."
  canonicalPath="/cart"
  noindex
/>
```

Cart should be `noindex` because it depends on local user state.

### My Tickets

```jsx
<SEO
  title="My Tickets"
  description="Manage local demo event passes in your StageLink ticket wallet."
  canonicalPath="/my-tickets"
  noindex
/>
```

My Tickets should be `noindex` because it depends on local user state.

### Not Found

```jsx
<SEO
  title="Page Not Found"
  description="The requested page could not be found on StageLink."
  canonicalPath="/"
  noindex
/>
```

Not-found routes should not enter search results.

## Tests To Add

Good first tests:

- `buildAbsoluteUrl("/events")` returns an absolute production URL.
- `buildPageTitle("Upcoming Events")` returns `Upcoming Events - StageLink`.
- `buildSeoMeta({ noindex: true })` returns `robots: "noindex, nofollow"`.
- `SEO` renders expected title, description, canonical, robots, Open Graph, and Twitter/X tags inside `HelmetProvider`.

Example wrapper:

```jsx
import { HelmetProvider } from "react-helmet-async";

render(
  <HelmetProvider>
    <SEO title="Upcoming Events" canonicalPath="/events" />
  </HelmetProvider>,
);
```

## Manual Validation

Run:

```bash
pnpm lint
pnpm test:run
pnpm build
```

Then inspect these routes:

- `/`
- `/events`
- `/events/evt_001`
- `/cart`
- `/my-tickets`
- an unknown route

Useful browser checks:

```js
document.title;
document.querySelector('meta[name="description"]')?.content;
document.querySelector('link[rel="canonical"]')?.href;
document.querySelector('meta[name="robots"]')?.content;
document.querySelector('meta[property="og:title"]')?.content;
document.querySelector('meta[property="og:image"]')?.content;
document.querySelector('meta[name="twitter:card"]')?.content;
```

## Common Mistakes

- Removing `StrictMode` when adding `HelmetProvider`.
- Shipping canonical URLs with `localhost`.
- Reusing the same title on every route.
- Indexing `/cart` or `/my-tickets`.
- Creating multiple conflicting canonical tags.
- Using relative `og:image` URLs.
- Writing metadata that does not match the visible page.
- Assuming JavaScript metadata works for every crawler.

## Follow-Up PRs

- `robots.txt`
- `sitemap.xml`
- JSON-LD structured data for events
- dedicated Open Graph image assets
- prerender or SSR exploration
- Search Console setup notes

## References

- react-helmet-async package docs: https://www.npmjs.com/package/react-helmet-async
- Google JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google title link guidance: https://developers.google.com/search/docs/advanced/appearance/title-link
- Google snippet guidance: https://developers.google.com/search/docs/appearance/snippet
- Open Graph protocol: https://ogp.me/
- X/Twitter Cards markup: https://developer.x.com/cards/markup
