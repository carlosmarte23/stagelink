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

      <meta name="twitter:card" content={meta.twitterCard} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.imageUrl} />
    </Helmet>
  );
}
