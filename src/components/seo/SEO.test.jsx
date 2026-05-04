import { render } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";

import SEO from "./SEO.jsx";

function getMetaByName(name) {
  return document.head.querySelector(`meta[name="${name}"]`);
}

function getMetaByProperty(property) {
  return document.head.querySelector(`meta[property="${property}"]`);
}

function renderSEO(props) {
  render(
    <HelmetProvider>
      <SEO {...props} />
    </HelmetProvider>,
  );
}

describe("SEO", () => {
  it("renders title, description, canonical, OG, Twitter/X, and robots tags", () => {
    renderSEO({
      title: "Upcoming Events",
      description: "Discover upcoming live events on StageLink.",
      canonicalPath: "/events",
    });

    expect(document.title).toBe("Upcoming Events - StageLink");
    expect(getMetaByName("description")).toHaveAttribute(
      "content",
      "Discover upcoming live events on StageLink.",
    );
    expect(getMetaByName("robots")).toHaveAttribute("content", "index, follow");
    expect(
      document.head.querySelector('link[rel="canonical"]'),
    ).toHaveAttribute("href", "https://stagelink-one.vercel.app/events");

    expect(getMetaByProperty("og:site_name")).toHaveAttribute(
      "content",
      "StageLink",
    );
    expect(getMetaByProperty("og:title")).toHaveAttribute(
      "content",
      "Upcoming Events - StageLink",
    );
    expect(getMetaByProperty("og:description")).toHaveAttribute(
      "content",
      "Discover upcoming live events on StageLink.",
    );
    expect(getMetaByProperty("og:url")).toHaveAttribute(
      "content",
      "https://stagelink-one.vercel.app/events",
    );
    expect(getMetaByProperty("og:image")).toHaveAttribute(
      "content",
      "https://stagelink-one.vercel.app/og/stagelink-default.jpg",
    );

    expect(getMetaByName("twitter:card")).toHaveAttribute(
      "content",
      "summary_large_image",
    );
    expect(getMetaByName("twitter:title")).toHaveAttribute(
      "content",
      "Upcoming Events - StageLink",
    );
    expect(getMetaByName("twitter:description")).toHaveAttribute(
      "content",
      "Discover upcoming live events on StageLink.",
    );
    expect(getMetaByName("twitter:image")).toHaveAttribute(
      "content",
      "https://stagelink-one.vercel.app/og/stagelink-default.jpg",
    );

    expect(getMetaByProperty("og:image:width")).toHaveAttribute(
      "content",
      "1200",
    );
    expect(getMetaByProperty("og:image:height")).toHaveAttribute(
      "content",
      "630",
    );
    expect(getMetaByName("twitter:image:alt")).toHaveAttribute(
      "content",
      "StageLink live events preview",
    );
  });

  it("renders JSON-LD structured data scripts when provided", () => {
    const organizationJsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "StageLink",
      url: "https://stagelink-one.vercel.app/",
    };

    renderSEO({
      title: "Discover Live Events",
      canonicalPath: "/",
      jsonLd: organizationJsonLd,
    });

    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );

    expect(scripts).toHaveLength(1);
    expect(JSON.parse(scripts[0].textContent)).toEqual(organizationJsonLd);
  });
});
