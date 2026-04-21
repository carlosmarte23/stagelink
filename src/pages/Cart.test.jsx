import { describe, expect, it, beforeEach } from "vitest";

import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { getCheckoutStepMeta } from "../features/checkout/lib/checkoutSteps";
import { CHECKOUT_STEPS } from "../features/checkout/config/checkoutStepsConfig.js";
import { CART_STORAGE_KEY } from "../features/cart/config/cartConfig.js";

import Cart from "./Cart.jsx";

const mockCartItem = {
  eventId: "evt_001",
  selectedTickets: [
    {
      tierId: "general",
      quantity: 2,
      unitPrice: 79,
      lineTotal: 158,
    },
  ],
  subtotal: 158,
  serviceFee: 10,
  total: 168,
  addedAt: "2026-04-15T18:30:00.000Z",
};

describe("<Cart />", () => {
  function renderCart(cartItems = [mockCartItem]) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
  }

  beforeEach(() => {
    localStorage.removeItem(CART_STORAGE_KEY);
  });

  describe("initial render", () => {
    it("renders the heading and description correctly", () => {
      renderCart();

      const stepMeta = getCheckoutStepMeta(CHECKOUT_STEPS.REVIEW);
      expect(
        screen.getByRole("heading", { level: 1, name: /checkout/i }),
      ).toBeInTheDocument();

      expect(
        screen.getByText(stepMeta.description, { selector: "p" }),
      ).toBeInTheDocument();
    });

    it("renders the timeline on the correct step", () => {
      renderCart();

      expect(
        screen.getByRole("navigation", { name: /checkout progress/i }),
      ).toBeInTheDocument();

      const timeline = screen.getByRole("navigation", {
        name: /checkout progress/i,
      });

      const reviewStep = within(timeline)
        .getByText(/review/i)
        .closest("li");

      expect(reviewStep).toHaveAttribute("aria-current", "step");

      const detailsStep = within(timeline)
        .getByText(/details/i)
        .closest("li");

      expect(detailsStep).not.toHaveAttribute("aria-current");
    });

    it("renders the review step panel", () => {
      renderCart();

      expect(
        screen.getByRole("heading", { level: 2, name: /your cart/i }),
      ).toBeInTheDocument();
    });

    it("renders the empty cart state without the checkout timeline", () => {
      renderCart([]);

      expect(
        screen.queryByRole("navigation", { name: /checkout progress/i }),
      ).not.toBeInTheDocument();

      expect(
        screen.getByText(/add some tickets to your cart to view them here/i),
      ).toBeInTheDocument();
    });
  });
});
