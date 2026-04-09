import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import EventCard from "./EventCard.jsx";

const event = {
  id: "evt_001",
  title: "Neon Nights Tour",
  description:
    "A high-energy pop and electronic showcase with immersive lights, synth-driven hooks, and a late-night arena atmosphere.",
  startsAt: "2026-02-14T20:00:00Z",
  doorsAt: "2026-02-14T19:00:00Z",
  timezone: "America/New_York",
  imageUrl: "https://images.unsplash.com/photo-1622136352909-642073a6be1f",
  genres: ["Pop", "Electronic"],
  isFeatured: false,
  venue: {
    name: "The Grand Arena",
    city: "Philadelphia, PA",
    address: "101 Arena Plaza, Philadelphia, PA 19107",
  },
  ticketTiers: [
    {
      id: "general",
      name: "General",
      description: "Access to the main floor and lower bowl seating.",
      price: 79,
      remaining: 0,
      perOrderLimit: 8,
    },
    {
      id: "vip",
      name: "VIP",
      description: "Priority entry with premium sightlines and a merch bundle.",
      price: 139,
      remaining: 42,
      perOrderLimit: 6,
    },
    {
      id: "meet-greet",
      name: "Meet & Greet",
      description:
        "Includes photo opportunity, early access, and exclusive laminate.",
      price: 229,
      remaining: 16,
      perOrderLimit: 2,
    },
  ],
};

function renderCard(event, variant = "default") {
  return render(
    <MemoryRouter>
      <EventCard event={event} variant={variant} />
    </MemoryRouter>,
  );
}

describe("EventCard", () => {
  describe("default variant", () => {
    it("renders title, formatted date, venue name, and city from the canonical event shape", () => {
      renderCard(event);

      expect(screen.getByText(/neon nights tour/i)).toBeInTheDocument();
      expect(screen.getByText(/feb 14, 2026/i)).toBeInTheDocument();
      expect(screen.getByText(/the grand arena/i)).toBeInTheDocument();
      expect(screen.getByText(/philadelphia, pa/i)).toBeInTheDocument();
    });

    it("renders the derived lowest available ticket price", () => {
      renderCard(event);

      expect(screen.getByText(/\$139/i)).toBeInTheDocument();
    });

    it("renders the event detail link using the event id", () => {
      renderCard(event);

      expect(
        screen.getByRole("link", { name: /neon nights tour/i }),
      ).toHaveAttribute("href", "/events/evt_001");
    });

    it("renders sold out text instead of an undefined price when no ticket tiers are available", () => {
      const soldOutEvent = {
        ...event,
        ticketTiers: event.ticketTiers.map((tier) => ({
          ...tier,
          remaining: 0,
        })),
      };

      renderCard(soldOutEvent);
      expect(screen.getByText(/sold out/i)).toBeInTheDocument();
      expect(screen.getByText(/no tickets left/i)).toBeInTheDocument();
    });
  });

  describe("featured variant", () => {
    const featuredEvent = { ...event, isFeatured: true };

    it("renders the featured badge when the event is featured", () => {
      renderCard(featuredEvent);

      expect(screen.getByText(/featured/i)).toBeInTheDocument();
    });

    it("hides the city in the location line for the featured variant", () => {
      renderCard(featuredEvent, "featured");

      expect(screen.queryByText(/philadelphia, pa/i)).not.toBeInTheDocument();
    });
  });
});
