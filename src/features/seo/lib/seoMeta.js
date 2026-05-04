import { SEO_SITE } from "../config/seoConfig.js";

export function buildAbsoluteUrl(path = "/") {
  try {
    return new URL(path).toString();
  } catch {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return new URL(normalizedPath, SEO_SITE.productionOrigin).toString();
  }
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
  twitterCard = "summary_large_image",
  noindex = false,
} = {}) {
  return {
    title: buildPageTitle(title),
    description,
    canonicalUrl: buildAbsoluteUrl(canonicalPath),
    imageUrl: buildAbsoluteUrl(imagePath),
    type,
    twitterCard,
    robots: noindex ? "noindex, nofollow" : "index, follow",
  };
}
