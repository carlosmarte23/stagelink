import SEO from "../components/seo/SEO.jsx";
export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you requested could not be found on StageLink."
        canonicalPath="/"
        noindex
      />

      <h1>404</h1>
      <p>Page not found</p>
    </>
  );
}
