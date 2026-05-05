# SEO Foundation Plan

## Goal

Add a practical SEO foundation to StageLink so every public route can describe itself clearly to search engines, social previews, and users sharing links.

This work is about technical clarity and crawlability. It is not a guarantee of ranking.

## Recommendation

Use `react-helmet-async` for this PR.

Why:

- StageLink is a Vite React SPA with React Router routes.
- Each route needs its own title, description, canonical URL, Open Graph tags, Twitter/X tags, and robots behavior.
- A dedicated SEO component gives the app one clear metadata boundary.
- The `HelmetProvider` pattern keeps the implementation familiar and easier to adapt if the app later adds SSR or prerendering.

Important context:

- React 19 can render metadata from components, so a dependency-free route is possible.
- For this app, I still prefer `react-helmet-async` because it makes the SEO layer explicit.
- For maximum crawler coverage, a later SSR or prerender step is still worth considering.

## Scope

- Install `react-helmet-async`.
- Wrap the app in `HelmetProvider` while keeping `StrictMode`.
- Add SEO config and metadata helpers.
- Add a reusable `SEO` component.
- Add route metadata for:
  - `/`
  - `/events`
  - `/events/:eventId`
  - `/cart`
  - `/my-tickets`
  - not-found routes
- Mark local/private routes with `noindex`.
- Add tests for metadata helpers and rendered tags.

## Non-Goals

- No SSR migration.
- No prerender pipeline.
- No analytics or Search Console setup.
- No paid SEO tooling.
- No keyword-stuffing.
- No artificial visible copy just for crawlers.

## Route Metadata Matrix

| Route | Index? | Title Direction | Canonical |
| --- | --- | --- | --- |
| `/` | yes | `StageLink - Discover Live Events` | `/` |
| `/events` | yes | `Upcoming Events - StageLink` | `/events` |
| `/events/:eventId` | yes when event exists | `${event.title} - StageLink` | `/events/:eventId` |
| `/cart` | no | `Checkout - StageLink` | `/cart` |
| `/my-tickets` | no | `My Tickets - StageLink` | `/my-tickets` |
| not found | no | `Page Not Found - StageLink` | `/` or future `/404` |

## Metadata Rules

- Every route should set one intended page title.
- Indexable routes should have unique descriptions.
- Canonical URLs should be absolute in rendered metadata.
- Canonical URLs should use the production origin, not `localhost`.
- Event detail metadata should come from existing event data.
- Cart and My Tickets should be `noindex` because they depend on local browser state.
- Open Graph and Twitter/X metadata should mirror page title, description, URL, and image.

## Suggested File Shape

```text
src/
  components/
    seo/
      SEO.jsx
  features/
    seo/
      config/
        seoConfig.js
      lib/
        seoMeta.js
```

## Stages

1. Add dependency and provider.
2. Add SEO config and helpers.
3. Add the `SEO` component.
4. Add metadata to static routes.
5. Add metadata to event detail routes.
6. Add `noindex` routes.
7. Add tests.
8. Validate in browser and production build.

## References

- react-helmet-async package docs: https://www.npmjs.com/package/react-helmet-async
- Google JavaScript SEO basics: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google title link guidance: https://developers.google.com/search/docs/advanced/appearance/title-link
- Google snippet guidance: https://developers.google.com/search/docs/appearance/snippet
- Open Graph protocol: https://ogp.me/
- X/Twitter Cards markup: https://developer.x.com/cards/markup
