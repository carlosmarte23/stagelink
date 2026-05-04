import { describe, expect, it } from "vitest";

import { buildAbsoluteUrl, buildPageTitle, buildSeoMeta } from "./seoMeta.js";

describe("seoMeta", () => {
  it("builds the production origin root URL", () => {
    expect(buildAbsoluteUrl("/")).toBe("https://stagelink-one.vercel.app/");
  });

  it("builds an absolute events URL", () => {
    expect(buildAbsoluteUrl("/events")).toBe(
      "https://stagelink-one.vercel.app/events",
    );
  });

  it("builds a page title with the StageLink suffix", () => {
    expect(buildPageTitle("Upcoming Events")).toBe(
      "Upcoming Events - StageLink",
    );
  });

  it("sets noindex robots metadata when requested", () => {
    expect(buildSeoMeta({ noindex: true })).toMatchObject({
      robots: "noindex, nofollow",
    });
  });

  it("falls back to the default social image when imagePath is empty", () => {
    expect(buildSeoMeta({ imagePath: "" })).toMatchObject({
      imageUrl: "https://stagelink-one.vercel.app/og/stagelink-default.jpg",
    });
  });

  it("preserves external event image URLs", () => {
    expect(
      buildSeoMeta({
        imagePath: "https://images.unsplash.com/photo-123",
      }),
    ).toMatchObject({
      imageUrl: "https://images.unsplash.com/photo-123",
    });
  });
});
