import { Helmet } from "react-helmet-async";
import { SEO_SITE } from "../../features/seo/config/seoConfig";
import { buildSeoMeta } from "../../features/seo/lib/seoMeta";

export default function SEO({ jsonLd, ...props }) {
  const meta = buildSeoMeta(props);
  const jsonLdItems = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet
      script={jsonLdItems.map((schema) => ({
        type: "application/ld+json",
        innerHTML: JSON.stringify(schema),
      }))}
    >
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
      <meta property="og:image:width" content={String(meta.imageWidth)} />
      <meta property="og:image:height" content={String(meta.imageHeight)} />
      <meta property="og:image" content={meta.imageUrl} />
      <meta property="og:image:alt" content={meta.imageAlt} />

      <meta name="twitter:card" content={meta.twitterCard} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.imageUrl} />
      <meta name="twitter:image:alt" content={meta.imageAlt} />
    </Helmet>
  );
}
