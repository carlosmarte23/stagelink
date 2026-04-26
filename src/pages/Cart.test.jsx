import { describe, expect, it, beforeEach } from "vitest";

import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import { getCheckoutStepMeta } from "../features/checkout/lib/checkoutSteps";
import {
  CHECKOUT_STEPS,
  CHECKOUT_STEP_STATUS,
} from "../features/checkout/config/checkoutStepsConfig.js";
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

function getTimeline() {
  return screen.getByRole("navigation", { name: /checkout progress/i });
}

function getTimelineStep(stepLabel) {
  return within(getTimeline()).getByText(stepLabel).closest("li");
}

async function fillBuyerDetails(user) {
  await user.type(
    screen.getByRole("textbox", { name: /primary contact name/i }),
    "John Doe",
  );
  await user.type(
    screen.getByRole("textbox", { name: /email address/i }),
    "john.doe@example.com",
  );
  await user.type(
    screen.getByRole("textbox", { name: /phone number/i }),
    "5555551234",
  );
}

async function goToPaymentStep(user) {
  await user.click(
    screen.getByRole("button", { name: /next: enter your details/i }),
  );
  await fillBuyerDetails(user);
  await user.click(
    screen.getByRole("button", { name: /next: choose payment method/i }),
  );
}

async function fillPaymentDetails(user) {
  await user.type(
    screen.getByRole("textbox", { name: /card number/i }),
    "4242424242424242",
  );
  await user.type(screen.getByRole("textbox", { name: /expiry/i }), "01/29");
  await user.type(screen.getByRole("textbox", { name: /cvc/i }), "123");
}

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

  describe("step navigation", () => {
    it("navigates to the details step", async () => {
      const user = userEvent.setup();
      renderCart();

      await user.click(
        screen.getByRole("button", { name: /next: enter your details/i }),
      );

      expect(
        screen.getByRole("heading", { level: 2, name: /guest details/i }),
      ).toBeInTheDocument();

      expect(getTimelineStep(/review/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.COMPLETE,
      );
      expect(getTimelineStep(/details/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.ACTIVE,
      );
      expect(getTimelineStep(/pay/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.UPCOMING,
      );
    });

    it("returns to the review step when the details back button is clicked", async () => {
      const user = userEvent.setup();
      renderCart();

      await user.click(
        screen.getByRole("button", { name: /next: enter your details/i }),
      );

      expect(
        screen.getByRole("heading", { level: 2, name: /guest details/i }),
      ).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", { name: /previous: review tickets/i }),
      );

      expect(
        screen.getByRole("heading", { level: 2, name: /your cart/i }),
      ).toBeInTheDocument();

      expect(getTimelineStep(/review/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.ACTIVE,
      );
      expect(getTimelineStep(/details/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.UPCOMING,
      );
    });

    it("navigates to the payment step after valid buyer details are submitted", async () => {
      const user = userEvent.setup();
      renderCart();

      await goToPaymentStep(user);

      expect(
        screen.getByRole("heading", { level: 2, name: /payment method/i }),
      ).toBeInTheDocument();

      expect(getTimelineStep(/review/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.COMPLETE,
      );
      expect(getTimelineStep(/details/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.COMPLETE,
      );
      expect(getTimelineStep(/pay/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.ACTIVE,
      );
      expect(getTimelineStep(/done/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.UPCOMING,
      );
    });

    it("returns to the details step when the payment back button is clicked", async () => {
      const user = userEvent.setup();
      renderCart();

      await goToPaymentStep(user);

      await user.click(
        screen.getByRole("button", { name: /back to details/i }),
      );

      expect(
        screen.getByRole("heading", { level: 2, name: /guest details/i }),
      ).toBeInTheDocument();

      expect(getTimelineStep(/details/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.ACTIVE,
      );
      expect(getTimelineStep(/pay/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.UPCOMING,
      );
    });

    it("completes the payment step and renders the done placeholder", async () => {
      const user = userEvent.setup();
      renderCart();

      await goToPaymentStep(user);
      await fillPaymentDetails(user);
      await user.click(
        screen.getByRole("button", { name: /complete purchase/i }),
      );

      expect(
        screen.getByRole("button", { name: /authorizing/i }),
      ).toBeDisabled();

      await waitFor(
        () => {
          expect(
            screen.getByRole("heading", {
              level: 2,
              name: /order confirmed/i,
            }),
          ).toBeInTheDocument();
        },
        { timeout: 3000 },
      );

      expect(getTimelineStep(/review/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.COMPLETE,
      );
      expect(getTimelineStep(/details/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.COMPLETE,
      );
      expect(getTimelineStep(/pay/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.COMPLETE,
      );
      expect(getTimelineStep(/done/i)).toHaveAttribute(
        "data-status",
        CHECKOUT_STEP_STATUS.ACTIVE,
      );
    });
  });
});
