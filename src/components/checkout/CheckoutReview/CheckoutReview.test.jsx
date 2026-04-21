import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import CheckoutReview from "./CheckoutReview.jsx";

const mockCartItems = [
  {
    eventId: "evt_013",
    eventData: {
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
        tierData: {
          name: "General",
          price: 59,
          remaining: 146,
          perOrderLimit: 8,
        },
      },
    ],
    addedAt: "2026-04-19T02:32:10.806Z",
  },
  {
    eventId: "evt_016",
    eventData: {
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
        tierData: {
          name: "General",
          price: 45,
          remaining: 102,
          perOrderLimit: 8,
        },
      },
    ],
    addedAt: "2026-04-19T02:32:24.025Z",
  },
  {
    eventId: "evt_020",
    eventData: {
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
        tierData: {
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
        tierData: {
          name: "VIP",
          price: 149,
          remaining: 44,
          perOrderLimit: 4,
        },
      },
    ],
    addedAt: "2026-04-19T02:32:37.766Z",
  },
];

function renderCheckoutReview(cartItems = mockCartItems) {
  render(
    <MemoryRouter>
      <CheckoutReview cartItems={cartItems} />
    </MemoryRouter>,
  );
}

function renderReview() {
  renderCheckoutReview();

  return screen.getByRole("region", { name: /your cart/i });
}

function getEventItem(eventName) {
  return screen.getByText(eventName).closest("li");
}

function getTicketItem(eventItem, tierName) {
  return within(eventItem).getByText(tierName).closest("li");
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
    renderCheckoutReview();

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
    renderCheckoutReview();

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
    renderCheckoutReview();

    expect(screen.getAllByText(/^general$/i)).toHaveLength(3);
    expect(screen.getByText(/^vip$/i)).toBeInTheDocument();
  });

  it("renders unit prices and line totals from selected tickets", () => {
    renderCheckoutReview();

    const countryRoadItem = getEventItem(/country road live/i);
    const indieNightItem = getEventItem(/indie night: new sounds/i);
    const summerRockItem = getEventItem(/summer rock fest/i);
    const countryGeneralTicket = getTicketItem(countryRoadItem, /^general$/i);
    const indieGeneralTicket = getTicketItem(indieNightItem, /^general$/i);
    const summerGeneralTicket = getTicketItem(summerRockItem, /^general$/i);
    const summerVipTicket = getTicketItem(summerRockItem, /^vip$/i);

    expect(
      within(countryGeneralTicket).getByText(/^\$59\.00 each$/i),
    ).toBeInTheDocument();
    expect(
      within(countryGeneralTicket).getByText(/^\$118\.00$/i),
    ).toBeInTheDocument();

    expect(
      within(indieGeneralTicket).getByText(/^\$45\.00 each$/i),
    ).toBeInTheDocument();
    expect(
      within(indieGeneralTicket).getByText(/^\$45\.00$/i),
    ).toBeInTheDocument();

    expect(
      within(summerGeneralTicket).getByText(/^\$89\.00 each$/i),
    ).toBeInTheDocument();
    expect(
      within(summerGeneralTicket).getByText(/^\$89\.00$/i),
    ).toBeInTheDocument();
    expect(
      within(summerVipTicket).getByText(/^\$149\.00 each$/i),
    ).toBeInTheDocument();
    expect(
      within(summerVipTicket).getByText(/^\$149\.00$/i),
    ).toBeInTheDocument();
  });

  it("renders the correct ticket quantity for each event", () => {
    renderCheckoutReview();

    expect(
      screen.getByLabelText(
        /quantity of general tickets for country road live/i,
      ),
    ).toHaveTextContent("2");
    expect(
      screen.getByLabelText(
        /quantity of general tickets for indie night: new sounds/i,
      ),
    ).toHaveTextContent("1");
    expect(
      screen.getByLabelText(
        /quantity of general tickets for summer rock fest/i,
      ),
    ).toHaveTextContent("1");
    expect(
      screen.getByLabelText(/quantity of vip tickets for summer rock fest/i),
    ).toHaveTextContent("1");
  });

  it("renders quantity controls for every selected ticket tier", () => {
    renderCheckoutReview();

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
    renderCheckoutReview();

    const summary = screen
      .getByRole("heading", { name: /order summary/i })
      .closest("div").parentElement;

    expect(
      within(summary).getByText(/subtotal \(5 tickets\):/i),
    ).toBeInTheDocument();
    expect(within(summary).getByText("$401.00")).toBeInTheDocument();

    expect(within(summary).getByText(/service fees:/i)).toBeInTheDocument();
    expect(within(summary).getByText("$25.00")).toBeInTheDocument();

    expect(within(summary).getByText(/facility fees:/i)).toBeInTheDocument();
    expect(within(summary).getByText("$15.00")).toBeInTheDocument();

    expect(within(summary).getByText(/total:/i)).toBeInTheDocument();
    expect(within(summary).getByText("$441.00")).toBeInTheDocument();
  });

  it("does not trust persisted cart totals", () => {
    const cartItemsWithStaleTotals = mockCartItems.map((cartItem) => ({
      ...cartItem,
      subtotal: 999,
      serviceFee: 999,
      total: 999,
    }));

    renderCheckoutReview(cartItemsWithStaleTotals);

    const summary = screen
      .getByRole("heading", { name: /order summary/i })
      .closest("div").parentElement;

    expect(screen.queryByText(/^\$999\.00$/i)).not.toBeInTheDocument();
    expect(within(summary).getByText("$441.00")).toBeInTheDocument();
  });

  it("renders an empty cart state when there are no cart items", () => {
    renderCheckoutReview([]);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse events/i }),
    ).toHaveAttribute("href", "/events");
  });
});
