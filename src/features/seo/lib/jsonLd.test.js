import { describe, expect, it } from "vitest";

import {
  buildEventBreadcrumbJsonLd,
  buildEventJsonLd,
  buildEventsItemListJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "./jsonLd.js";

const mockEvent = {
  id: "evt_001",
  title: "Neon Nights Tour",
  description:
    "A high-energy pop and electronic showcase with immersive lights.",
  startsAt: "2026-04-14T20:00:00Z",
  imageUrl: "https://images.unsplash.com/photo-1622136352909-642073a6be1f",
  venue: {
    name: "The Grand Arena",
    city: "Philadelphia, PA",
    address: "101 Arena Plaza, Philadelphia, PA 19107",
  },
  ticketTiers: [
    {
      id: "general",
      name: "General",
      price: 79,
      remaining: 180,
    },
    {
      id: "vip",
      name: "VIP",
      price: 139,
      remaining: 0,
    },
  ],
};

describe("jsonLd", () => {
  it("builds Organization structured data for the Home page", () => {
    expect(buildOrganizationJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "StageLink",
      url: "https://stagelink-one.vercel.app/",
      logo: "https://stagelink-one.vercel.app/stagelink-logo.png",
    });
  });

  it("builds WebSite structured data for the Home page", () => {
    expect(buildWebsiteJsonLd()).toEqual({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "StageLink",
      url: "https://stagelink-one.vercel.app/",
    });
  });

  it("builds an ItemList with visible events for the Events page", () => {
    const jsonLd = buildEventsItemListJsonLd([
      mockEvent,
      { ...mockEvent, id: "evt_002", title: "Midnight Bass Rave" },
    ]);

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Upcoming Events",
      numberOfItems: 2,
    });
    expect(jsonLd.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        url: "https://stagelink-one.vercel.app/events/evt_001",
        name: "Neon Nights Tour",
      },
      {
        "@type": "ListItem",
        position: 2,
        url: "https://stagelink-one.vercel.app/events/evt_002",
        name: "Midnight Bass Rave",
      },
    ]);
  });

  it("builds Event structured data from an event detail record", () => {
    const jsonLd = buildEventJsonLd(mockEvent);

    expect(jsonLd).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Neon Nights Tour",
      description:
        "A high-energy pop and electronic showcase with immersive lights.",
      startDate: "2026-04-14T20:00:00Z",
      image: "https://images.unsplash.com/photo-1622136352909-642073a6be1f",
      url: "https://stagelink-one.vercel.app/events/evt_001",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: "The Grand Arena",
        address: "101 Arena Plaza, Philadelphia, PA 19107",
      },
    });
    expect(jsonLd.offers).toEqual([
      {
        "@type": "Offer",
        name: "General",
        price: 79,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: "https://stagelink-one.vercel.app/events/evt_001",
      },
      {
        "@type": "Offer",
        name: "VIP",
        price: 139,
        priceCurrency: "USD",
        availability: "https://schema.org/SoldOut",
        url: "https://stagelink-one.vercel.app/events/evt_001",
      },
    ]);
  });

  it("builds BreadcrumbList structured data for event detail pages", () => {
    expect(buildEventBreadcrumbJsonLd(mockEvent)).toEqual({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://stagelink-one.vercel.app/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Events",
          item: "https://stagelink-one.vercel.app/events",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Neon Nights Tour",
          item: "https://stagelink-one.vercel.app/events/evt_001",
        },
      ],
    });
  });
});
