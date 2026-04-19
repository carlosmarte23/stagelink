import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  CHECKOUT_STEP_ITEMS,
  CHECKOUT_STEP_STATUS,
  CHECKOUT_STEPS,
} from "../../../features/checkout/config/checkoutStepsConfig";

import CheckoutTimeline from "./CheckoutTimeline.jsx";

function renderTimeline(activeStep = CHECKOUT_STEPS.REVIEW) {
  render(
    <CheckoutTimeline
      checkoutSteps={CHECKOUT_STEP_ITEMS}
      activeStep={activeStep}
    />,
  );

  return screen.getByRole("navigation", { name: /checkout progress/i });
}

function getStepItem(timeline, stepLabel) {
  return within(timeline).getByText(stepLabel).closest("li");
}

describe("CheckoutTimeline", () => {
  it("renders the checkout progress navigation with every step", () => {
    const timeline = renderTimeline();

    expect(timeline).toBeInTheDocument();
    expect(within(timeline).getAllByRole("listitem")).toHaveLength(
      CHECKOUT_STEP_ITEMS.length,
    );

    for (const step of CHECKOUT_STEP_ITEMS) {
      expect(within(timeline).getByText(step.label)).toBeInTheDocument();
    }
  });

  it("marks the active step as the current checkout step", () => {
    const timeline = renderTimeline(CHECKOUT_STEPS.DETAILS);

    const detailsStep = getStepItem(timeline, /details/i);
    const reviewStep = getStepItem(timeline, /review/i);

    expect(detailsStep).toHaveAttribute("aria-current", "step");
    expect(detailsStep).toHaveAttribute(
      "data-status",
      CHECKOUT_STEP_STATUS.ACTIVE,
    );
    expect(reviewStep).not.toHaveAttribute("aria-current");
  });

  it("marks previous steps as complete and later steps as upcoming", () => {
    const timeline = renderTimeline(CHECKOUT_STEPS.PAY);

    expect(getStepItem(timeline, /review/i)).toHaveAttribute(
      "data-status",
      CHECKOUT_STEP_STATUS.COMPLETE,
    );
    expect(getStepItem(timeline, /details/i)).toHaveAttribute(
      "data-status",
      CHECKOUT_STEP_STATUS.COMPLETE,
    );
    expect(getStepItem(timeline, /pay/i)).toHaveAttribute(
      "data-status",
      CHECKOUT_STEP_STATUS.ACTIVE,
    );
    expect(getStepItem(timeline, /done/i)).toHaveAttribute(
      "data-status",
      CHECKOUT_STEP_STATUS.UPCOMING,
    );
  });
});
