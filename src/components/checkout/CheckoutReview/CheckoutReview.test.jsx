import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CheckoutReview from "./CheckoutReview.jsx";

function renderReview() {
  render(<CheckoutReview />);

  return screen.getByRole("region", { name: /your cart/i });
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

  it("renders the current placeholder ticket list", () => {
    const reviewPanel = renderReview();

    expect(within(reviewPanel).getAllByRole("listitem")).toHaveLength(3);
    expect(within(reviewPanel).getAllByText(/ticket placeholder/i)).toHaveLength(
      3,
    );
  });

  it("renders the payment summary, total, and next-step action", () => {
    const reviewPanel = renderReview();

    expect(within(reviewPanel).getByText(/payment summary/i)).toBeInTheDocument();
    expect(within(reviewPanel).getByText(/total:\s*\$0\.00/i)).toBeInTheDocument();

    expect(
      within(reviewPanel).getByRole("button", {
        name: /next:\s*enter your details/i,
      }),
    ).toHaveAttribute("type", "button");
  });
});
