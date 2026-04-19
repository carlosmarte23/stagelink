import { describe, expect, it, beforeEach } from "vitest";

import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { getCheckoutStepMeta } from "../features/checkout/lib/checkoutSteps";
import { CHECKOUT_STEPS } from "../features/checkout/config/checkoutStepsConfig.js";

import Cart from "./Cart.jsx";

describe("<Cart />", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>,
    );
  });

  describe("initial render", () => {
    it("renders the heading and description correctly", () => {
      const stepMeta = getCheckoutStepMeta(CHECKOUT_STEPS.REVIEW);
      expect(
        screen.getByRole("heading", { level: 1, name: /checkout/i }),
      ).toBeInTheDocument();

      expect(
        screen.getByText(stepMeta.description, { selector: "p" }),
      ).toBeInTheDocument();
    });

    it("renders the timeline on the correct step", () => {
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
      expect(
        screen.getByRole("heading", { level: 2, name: /your cart/i }),
      ).toBeInTheDocument();
    });
  });
});
