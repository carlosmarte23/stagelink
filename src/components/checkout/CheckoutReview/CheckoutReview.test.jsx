import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FACILITY_FEE_PER_ORDER } from "../../../features/checkout/config/checkoutConfig";

import CheckoutReview from "./CheckoutReview.jsx";

const mockCartItems = [
  {
    eventId: "evt_013",
    event: {
      id: "evt_013",
      title: "Country Road Live",
      startsAt: "2026-04-24T00:00:00Z",
      timezone: "America/Chicago",
      imageUrl: "https://images.unsplash.com/photo-1466584820433-9ad1cc6798f3",
      genres: ["Country"],
      venue: {
        name: "Skyline Pavilion",
        city: "Nashville, TN",
      },
    },
    selectedTickets: [
      {
        tierId: "general",
        quantity: 2,
        unitPrice: 59,
        lineTotal: 118,
        tier: {
          id: "general",
          name: "General",
          price: 59,
          remaining: 146,
          perOrderLimit: 8,
        },
      },
    ],
  },
  {
    eventId: "evt_016",
    event: {
      id: "evt_016",
      title: "Indie Night: New Sounds",
      startsAt: "2026-05-08T00:30:00Z",
      timezone: "America/Los_Angeles",
      imageUrl: "https://images.unsplash.com/photo-1604177052603-c2b4cff228db",
      genres: ["Indie"],
      venue: {
        name: "The Metro Club",
        city: "San Francisco, CA",
      },
    },
    selectedTickets: [
      {
        tierId: "general",
        quantity: 1,
        unitPrice: 45,
        lineTotal: 45,
        tier: {
          id: "general",
          name: "General",
          price: 45,
          remaining: 102,
          perOrderLimit: 8,
        },
      },
    ],
  },
  {
    eventId: "evt_020",
    event: {
      id: "evt_020",
      title: "Summer Rock Fest",
      startsAt: "2026-06-06T22:00:00Z",
      timezone: "America/New_York",
      imageUrl: "https://images.unsplash.com/photo-1760160741849-0809daa8e4c8",
      genres: ["Rock"],
      venue: {
        name: "Starlight Amphitheater",
        city: "Pittsburgh, PA",
      },
    },
    selectedTickets: [
      {
        tierId: "general",
        quantity: 1,
        unitPrice: 89,
        lineTotal: 89,
        tier: {
          id: "general",
          name: "General",
          price: 89,
          remaining: 276,
          perOrderLimit: 8,
        },
      },
      {
        tierId: "vip",
        quantity: 1,
        unitPrice: 149,
        lineTotal: 149,
        tier: {
          id: "vip",
          name: "VIP",
          price: 149,
          remaining: 44,
          perOrderLimit: 4,
        },
      },
    ],
  },
];

function renderReview() {
  render(<CheckoutReview cartItems={mockCartItems} />);

  return screen.getByRole("region", { name: /your cart/i });
}

function getEventItem(eventName) {
  return screen.getByText(eventName).closest("li");
}

describe("CheckoutReview", () => {
  it("renders the review panel as a named region", () => {
    const reviewPanel = renderReview();

    expect(reviewPanel).toBeInTheDocument();
    expect(
      within(reviewPanel).getByRole("heading", {
        level: 2,
        name: /your cart/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders event details for each cart item", () => {
    render(<CheckoutReview cartItems={mockCartItems} />);

    expect(screen.getByText(/country road live/i)).toBeInTheDocument();
    expect(screen.getByText(/skyline pavilion/i)).toBeInTheDocument();
    expect(screen.getByText(/nashville, tn/i)).toBeInTheDocument();

    expect(screen.getByText(/indie night: new sounds/i)).toBeInTheDocument();
    expect(screen.getByText(/the metro club/i)).toBeInTheDocument();
    expect(screen.getByText(/san francisco, ca/i)).toBeInTheDocument();

    expect(screen.getByText(/summer rock fest/i)).toBeInTheDocument();
    expect(screen.getByText(/starlight amphitheater/i)).toBeInTheDocument();
    expect(screen.getByText(/pittsburgh, pa/i)).toBeInTheDocument();
  });

  it("renders event media and genre metadata from the enriched event shape", () => {
    render(<CheckoutReview cartItems={mockCartItems} />);

    expect(
      screen.getByRole("img", { name: /country road live/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /indie night: new sounds/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /summer rock fest/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/^country$/i)).toBeInTheDocument();
    expect(screen.getByText(/^indie$/i)).toBeInTheDocument();
    expect(screen.getByText(/^rock$/i)).toBeInTheDocument();
  });

  it("renders selected ticket tiers for each event", () => {
    render(<CheckoutReview cartItems={mockCartItems} />);

    expect(screen.getAllByText(/^general$/i)).toHaveLength(3);
    expect(screen.getByText(/^vip$/i)).toBeInTheDocument();

    expect(screen.getByText(/2 tickets/i)).toBeInTheDocument();
    expect(screen.getAllByText(/1 ticket/i)).toHaveLength(3);
  });

  it("renders unit prices and line totals from selected tickets", () => {
    render(<CheckoutReview cartItems={mockCartItems} />);

    const countryRoadItem = getEventItem(/country road live/i);
    const indieNightItem = getEventItem(/indie night: new sounds/i);
    const summerRockItem = getEventItem(/summer rock fest/i);

    expect(
      within(countryRoadItem).getByText(/^\$59\.00 each$/i),
    ).toBeInTheDocument();
    expect(
      within(countryRoadItem).getByText(/^\$118\.00$/i),
    ).toBeInTheDocument();

    expect(
      within(indieNightItem).getByText(/^\$45\.00 each$/i),
    ).toBeInTheDocument();
    expect(within(indieNightItem).getByText(/^\$45\.00$/i)).toBeInTheDocument();

    expect(
      within(summerRockItem).getByText(/^\$89\.00 each$/i),
    ).toBeInTheDocument();
    expect(within(summerRockItem).getByText(/^\$89\.00$/i)).toBeInTheDocument();
    expect(
      within(summerRockItem).getByText(/^\$149\.00 each$/i),
    ).toBeInTheDocument();
    expect(
      within(summerRockItem).getByText(/^\$149\.00$/i),
    ).toBeInTheDocument();
  });

  it("renders the correct ticket quantity for each event", () => {
    render(<CheckoutReview cartItems={mockCartItems} />);

    const countryRoadItem = getEventItem(/country road live/i);
    const indieNightItem = getEventItem(/indie night: new sounds/i);
    const summerRockItem = getEventItem(/summer rock fest/i);

    expect(within(countryRoadItem).getByText(/2 tickets/i)).toBeInTheDocument();
    expect(within(indieNightItem).getByText(/1 ticket/i)).toBeInTheDocument();
    expect(within(summerRockItem).getAllByText(/1 ticket/i)).toHaveLength(2);
  });

  it("renders quantity controls for every selected ticket tier", () => {
    render(<CheckoutReview cartItems={mockCartItems} />);

    expect(
      screen.getByRole("button", {
        name: /decrease general tickets for country road live/i,
      }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", {
        name: /increase general tickets for country road live/i,
      }),
    ).toBeEnabled();

    expect(
      screen.getByRole("button", {
        name: /decrease general tickets for indie night: new sounds/i,
      }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", {
        name: /increase general tickets for indie night: new sounds/i,
      }),
    ).toBeEnabled();

    expect(
      screen.getByRole("button", {
        name: /decrease general tickets for summer rock fest/i,
      }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", {
        name: /increase general tickets for summer rock fest/i,
      }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", {
        name: /decrease vip tickets for summer rock fest/i,
      }),
    ).toBeEnabled();
    expect(
      screen.getByRole("button", {
        name: /increase vip tickets for summer rock fest/i,
      }),
    ).toBeEnabled();
  });

  it("renders checkout totals calculated from the selected tickets", () => {
    render(<CheckoutReview cartItems={mockCartItems} />);

    expect(screen.getByText(/subtotal \(5 tickets\)/i)).toBeInTheDocument();
    expect(screen.getByText(/^\$401\.00$/i)).toBeInTheDocument();

    expect(screen.getByText(/service fees/i)).toBeInTheDocument();
    expect(screen.getByText(/^\$25\.00$/i)).toBeInTheDocument();

    expect(screen.getByText(/facility charge/i)).toBeInTheDocument();
    expect(
      screen.getByText(`$${FACILITY_FEE_PER_ORDER.toFixed(2)}`),
    ).toBeInTheDocument();

    expect(screen.getByText(/^total$/i)).toBeInTheDocument();
    expect(screen.getByText(/^\$441\.00$/i)).toBeInTheDocument();
  });

  it("does not trust persisted cart totals", () => {
    const cartItemsWithStaleTotals = mockCartItems.map((cartItem) => ({
      ...cartItem,
      subtotal: 999,
      serviceFee: 999,
      total: 999,
    }));

    render(<CheckoutReview cartItems={cartItemsWithStaleTotals} />);

    expect(screen.queryByText(/^\$999\.00$/i)).not.toBeInTheDocument();
    expect(screen.getByText(/^\$441\.00$/i)).toBeInTheDocument();
  });

  it("renders an empty cart state when there are no cart items", () => {
    render(<CheckoutReview cartItems={[]} />);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse events/i }),
    ).toHaveAttribute("href", "/events");
  });
});
