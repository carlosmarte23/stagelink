import { SEO_SITE } from "../config/seoConfig";
import { buildAbsoluteUrl } from "./seoMeta";

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SEO_SITE.name,
    url: buildAbsoluteUrl("/"),
    logo: buildAbsoluteUrl("/stagelink-logo.png"),
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SEO_SITE.name,
    url: buildAbsoluteUrl("/"),
  };
}

export function buildEventsItemListJsonLd(events) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Upcoming Events",
    numberOfItems: events.length,
    itemListElement: events.map((event, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: buildAbsoluteUrl(`/events/${event.id}`),
      name: event.title,
    })),
  };
}

export function buildEventJsonLd(event) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startsAt,
    image: buildAbsoluteUrl(event.imageUrl),
    url: buildAbsoluteUrl(`/events/${event.id}`),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: event.venue.address,
    },
    offers: event.ticketTiers?.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price,
      priceCurrency: "USD",
      availability:
        tier.remaining > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/SoldOut",
      url: buildAbsoluteUrl(`/events/${event.id}`),
    })),
  };
}

export function buildEventBreadcrumbJsonLd(event) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildAbsoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Events",
        item: buildAbsoluteUrl("/events"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: event.title,
        item: buildAbsoluteUrl(`/events/${event.id}`),
      },
    ],
  };
}
