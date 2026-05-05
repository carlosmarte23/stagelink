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
  imageAlt = SEO_SITE.defaultImageAlt,
  type = "website",
  twitterCard = "summary_large_image",
  noindex = false,
} = {}) {
  const resolvedImagePath = imagePath || SEO_SITE.defaultImagePath;
  const resolvedImageAlt = imageAlt || SEO_SITE.defaultImageAlt;

  return {
    title: buildPageTitle(title),
    description,
    canonicalUrl: buildAbsoluteUrl(canonicalPath),
    imageUrl: buildAbsoluteUrl(resolvedImagePath),
    imageAlt: resolvedImageAlt,
    imageWidth: SEO_SITE.defaultImageWidth,
    imageHeight: SEO_SITE.defaultImageHeight,
    type,
    twitterCard,
    robots: noindex ? "noindex, nofollow" : "index, follow",
  };
}
