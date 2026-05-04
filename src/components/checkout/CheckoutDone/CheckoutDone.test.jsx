import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import CheckoutDone from "./CheckoutDone.jsx";

const confirmedOrder = {
  orderId: "SL-ABC12345",
  items: [
    {
      eventId: "evt_001",
      title: "Neon Nights Tour",
      imageUrl: "https://example.com/neon-nights.jpg",
      tickets: [
        {
          tierId: "general",
          tierName: "General",
          quantity: 2,
        },
      ],
    },
  ],
  totals: {
    total: 178,
  },
};

function renderCheckoutDone() {
  return render(
    <MemoryRouter>
      <CheckoutDone confirmedOrder={confirmedOrder} />
    </MemoryRouter>,
  );
}

describe("CheckoutDone", () => {
  it("shows the confirmed order number as text and links to My Tickets", () => {
    renderCheckoutDone();

    expect(
      screen.getByRole("heading", { name: /order confirmed/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("#SL-ABC12345")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /go to tickets/i }),
    ).toHaveAttribute("href", "/my-tickets");
  });

  it("does not render a stale order route or backend account copy", () => {
    renderCheckoutDone();

    expect(
      screen.getByText(/tickets are ready in my tickets/i),
    ).toBeInTheDocument();
    expect(screen.queryByText(/sent to your email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/available in your account/i)).not.toBeInTheDocument();

    const links = screen.getAllByRole("link");
    expect(
      links.some((link) => link.getAttribute("href")?.startsWith("/orders")),
    ).toBe(false);
  });
});
