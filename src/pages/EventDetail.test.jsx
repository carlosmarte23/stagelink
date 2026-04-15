import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import * as eventRepository from "../features/events/data/eventsRepository";
import EventDetail from "./EventDetail.jsx";

function renderEventDetailPage(eventId = "evt_001") {
  const fullPath = `/events/${eventId}`;

  return (
    <MemoryRouter initialEntries={[fullPath]}>
      <Routes>
        <Route path="/events/:eventId" element={<EventDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("EventDetail", () => {
  const validId = "evt_001";

  it("renders the event correctly from route params", () => {
    render(renderEventDetailPage(validId));

    const event = eventRepository.getEventById("evt_001");
    expect(screen.getByText(event.title)).toBeInTheDocument();
    expect(screen.getByText(event.description)).toBeInTheDocument();
    expect(screen.getByText(event.venue.name)).toBeInTheDocument();
    expect(screen.getByText(event.venue.address)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /select your tickets/i }),
    ).toBeInTheDocument();
  });

  it("renders a fallback when the event does not exist", () => {
    render(renderEventDetailPage("bad-id"));

    expect(screen.getByText(/event not found/i)).toBeInTheDocument();
    expect(screen.getByText(/we couldn.t find/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse all events/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go home/i })).toBeInTheDocument();
  });

  describe("ticket tiers", () => {
    const mockEvent = {
      id: "evt_test",
      title: "Test Event",
      description: "Test description",
      startsAt: "2026-02-14T20:00:00Z",
      doorsAt: "2026-02-14T19:00:00Z",
      timezone: "America/New_York",
      imageUrl: "https://example.com/image.jpg",
      venue: {
        name: "Test Venue",
        city: "Philadelphia, PA",
        address: "123 Test St",
      },
      ticketTiers: [
        {
          id: "general",
          name: "General",
          description: "Access to the main floor and lower bowl seating.",
          price: 79,
          remaining: 10,
          perOrderLimit: 8,
        },
        {
          id: "vip",
          name: "VIP",
          description:
            "Priority entry with premium sightlines and a merch bundle.",
          price: 139,
          remaining: 0,
          perOrderLimit: 4,
        },

        {
          id: "meet-greet",
          name: "Meet & Greet",
          description:
            "Includes photo opportunity, early access, and exclusive laminate.",
          price: 229,
          remaining: 5,
          perOrderLimit: 2,
        },
      ],
    };

    beforeEach(() => {
      vi.spyOn(eventRepository, "getEventById").mockReturnValue(mockEvent);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("renders the ticket selection panel heading", () => {
      render(renderEventDetailPage("evt_test"));

      expect(
        screen.getByRole("heading", { name: /select your tickets/i }),
      ).toBeInTheDocument();
    });

    it("renders all ticket tiers for the event", () => {
      render(renderEventDetailPage("evt_test"));

      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const items = within(list).getAllByRole("listitem");

      expect(items).toHaveLength(mockEvent.ticketTiers.length);
    });

    it("renders each tier with name, description, and price", () => {
      render(renderEventDetailPage("evt_test"));

      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const items = within(list).getAllByRole("listitem");

      mockEvent.ticketTiers.forEach((tier, index) => {
        const tierItem = items[index];

        expect(within(tierItem).getByText(tier.name)).toBeInTheDocument();
        expect(
          within(tierItem).getByText(tier.description),
        ).toBeInTheDocument();
        expect(
          within(tierItem).getByText(`$${tier.price}`),
        ).toBeInTheDocument();
      });
    });

    it("renders every tier count with default quantity as 0", () => {
      render(renderEventDetailPage("evt_test"));

      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const items = within(list).getAllByRole("listitem");

      mockEvent.ticketTiers.forEach((tier, index) => {
        const tierItem = items[index];

        expect(
          within(tierItem).getByLabelText(`${tier.name} quantity`),
        ).toHaveTextContent("0");
      });
    });

    it("renders every tier with no available tickets as soldOut and disabled", () => {
      render(renderEventDetailPage("evt_test"));

      const list = screen.getByRole("list", { name: /ticket tiers/i });
      const items = within(list).getAllByRole("listitem");

      const soldOutTiers = mockEvent.ticketTiers.filter(
        (tier) => tier.remaining === 0,
      );

      soldOutTiers.forEach((tier) => {
        const tierItem = items.find((item) =>
          within(item).queryByText(tier.name),
        );

        expect(tierItem).toBeTruthy();
        expect(tierItem).toHaveAttribute("aria-disabled", "true");
        expect(within(tierItem).getByText(/sold out/i)).toBeInTheDocument();
      });
    });

    it("renders the cta buy button initially disabled when no tickets are selected", () => {
      render(renderEventDetailPage("evt_test"));

      const panel = screen.getByRole("complementary", {
        name: /select your tickets/i,
      });
      const ctaButton = within(panel).getByRole("button", {
        name: /buy tickets/i,
      });

      expect(ctaButton).toBeDisabled();
    });
  });
});
