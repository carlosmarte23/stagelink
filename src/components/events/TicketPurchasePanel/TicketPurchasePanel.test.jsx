import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";

import { TicketPurchasePanel } from "./TicketPurchasePanel.jsx";

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
      description: "Priority entry with premium sightlines and a merch bundle.",
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

function renderTicketPurchasePanel() {
  return render(<TicketPurchasePanel ticketTiers={mockEvent.ticketTiers} />);
}

describe("TicketPurchasePanel", () => {
  it("renders the ticket selection panel heading", () => {
    renderTicketPurchasePanel();

    expect(
      screen.getByRole("heading", { name: /select your tickets/i }),
    ).toBeInTheDocument();
  });

  it("renders all ticket tiers for the event", () => {
    renderTicketPurchasePanel();

    const list = screen.getByRole("list", { name: /ticket tiers/i });
    const items = within(list).getAllByRole("listitem");

    expect(items).toHaveLength(mockEvent.ticketTiers.length);
  });

  it("renders each tier with name, description, and price", () => {
    renderTicketPurchasePanel();

    const list = screen.getByRole("list", { name: /ticket tiers/i });
    const items = within(list).getAllByRole("listitem");

    mockEvent.ticketTiers.forEach((tier, index) => {
      const tierItem = items[index];

      expect(within(tierItem).getByText(tier.name)).toBeInTheDocument();
      expect(within(tierItem).getByText(tier.description)).toBeInTheDocument();
      expect(
        within(tierItem).getByText(`$${tier.price}.00`),
      ).toBeInTheDocument();
    });
  });

  it("renders every tier count with default quantity as 0", () => {
    renderTicketPurchasePanel();

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
    renderTicketPurchasePanel();

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
    renderTicketPurchasePanel();

    const panel = screen.getByRole("complementary", {
      name: /select your tickets/i,
    });
    const ctaButton = within(panel).getByRole("button", {
      name: /buy tickets/i,
    });

    expect(ctaButton).toBeDisabled();
  });
});
