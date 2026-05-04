# SEO Validation Checklist

Use this checklist before merging the SEO foundation PR.

## Install And Build

- [ ] `react-helmet-async` is installed.
- [ ] `HelmetProvider` wraps the app once near the React root.
- [ ] `StrictMode` is still present.
- [ ] `pnpm lint` passes.
- [ ] `pnpm test:run` passes.
- [ ] `pnpm build` passes.

## Route Metadata

- [ ] `/` has a unique title.
- [ ] `/` has a unique description.
- [ ] `/` has a canonical URL.
- [ ] `/events` has a unique title.
- [ ] `/events` has a unique description.
- [ ] `/events` has a canonical URL.
- [ ] `/events/:eventId` uses event data in title and description.
- [ ] Missing event detail pages are `noindex`.
- [ ] `/cart` is `noindex`.
- [ ] `/my-tickets` is `noindex`.
- [ ] Not found pages are `noindex`.

## Head Tag Quality

- [ ] Every page has exactly one intended `<title>`.
- [ ] Titles are descriptive, not generic labels like `Home`.
- [ ] Meta descriptions summarize visible page content.
- [ ] Canonical URLs are absolute.
- [ ] Canonical URLs use the production origin.
- [ ] There are no duplicate canonical tags.
- [ ] `robots` is correct for each route.

## Open Graph

- [ ] `og:site_name` is present.
- [ ] `og:locale` is present.
- [ ] `og:type` is present.
- [ ] `og:title` is present.
- [ ] `og:description` is present.
- [ ] `og:url` matches the canonical URL.
- [ ] `og:image` is absolute.
- [ ] `og:image:alt` is present.

## Twitter/X Cards

- [ ] `twitter:card` is present.
- [ ] `twitter:card` uses `summary_large_image`.
- [ ] `twitter:title` is present.
- [ ] `twitter:description` is present.
- [ ] `twitter:image` is absolute.

## Content And Crawlability

- [ ] Public pages have visible text that matches their metadata.
- [ ] Public pages have one clear `<h1>`.
- [ ] Navigation uses real links with `href` values.
- [ ] Event detail pages can be opened directly by URL.
- [ ] Unknown routes do not look indexable.
- [ ] Private/local-state pages are not presented as search landing pages.

## Browser Inspection Commands

```js
document.title;
document.querySelector('meta[name="description"]')?.content;
document.querySelector('link[rel="canonical"]')?.href;
document.querySelector('meta[name="robots"]')?.content;
document.querySelector('meta[property="og:title"]')?.content;
document.querySelector('meta[property="og:description"]')?.content;
document.querySelector('meta[property="og:url"]')?.content;
document.querySelector('meta[property="og:image"]')?.content;
document.querySelector('meta[name="twitter:card"]')?.content;
```

## External Validation After Deployment

- [ ] Inspect rendered HTML with Google Search Console URL Inspection.
- [ ] Test structured data with Google's Rich Results Test if JSON-LD is added.
- [ ] Test social previews with Facebook Sharing Debugger.
- [ ] Test LinkedIn previews with LinkedIn Post Inspector.
- [ ] Test X/Twitter card output with a card preview tool.
- [ ] Verify production canonical URLs.
