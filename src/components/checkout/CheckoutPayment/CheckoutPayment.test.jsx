import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import CheckoutPayment from "./CheckoutPayment.jsx";

function renderPayoutStep(props = {}) {
  return render(
    <MemoryRouter>
      <CheckoutPayment
        totalAmountDue={50}
        onBack={() => {}}
        onContinue={() => {}}
        {...props}
      />
    </MemoryRouter>,
  );
}

describe("CheckoutPayment", () => {
  it("renders the Pay step section", () => {
    const payoutStep = renderPayoutStep();
    expect(
      screen.getByRole("region", { name: /payment method/i }),
    ).toBeInTheDocument();

    expect(
      payoutStep.getByRole("heading", {
        name: /payment method/i,
      }),
    ).toBeInTheDocument();

    expect(payoutStep.getByText(/card number/i)).toBeInTheDocument();
    expect(payoutStep.getByText(/expiry \(mm\/yy\)/i)).toBeInTheDocument();
    expect(payoutStep.getByText(/card number/i)).toBeInTheDocument();
    expect(payoutStep.getByText(/cvc/i)).toBeInTheDocument();
    expect(
      payoutStep.getByRole("checkbox", {
        name: /save card information for future purchases/i,
      }),
    ).toBeInTheDocument();
    expect(
      payoutStep.getByRole("checkbox", {
        name: /save card information for future purchases/i,
      }),
    ).not.toBeChecked();

    expect(
      payoutStep.getByRole("button", {
        name: /back to details/i,
      }),
    ).toBeInTheDocument();

    expect(
      payoutStep.getByRole("button", {
        name: /complete purchase/i,
      }),
    ).toBeInTheDocument();

    expect(
      payoutStep.getByText(/encrypted and secure checkout/i),
    ).toBeInTheDocument();
  });

  describe("validation", () => {
    it("blocks submit when payment details are empty", async () => {
      const user = userEvent.setup();
      const onContinue = vi.fn();

      renderPayoutStep({ onContinue });

      await user.click(
        screen.getByRole("button", { name: /complete purchase/i }),
      );

      expect(onContinue).not.toHaveBeenCalled();

      expect(
        screen.getByText("Please enter your card number."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please enter your card expiry date."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please enter your card cvc."),
      ).toBeInTheDocument();
    });

    it("render errors and block submit when payment details are invalid", async () => {
      const user = userEvent.setup();
      const onContinue = vi.fn();

      renderPayoutStep({ onContinue });

      await user.type(
        screen.getByRole("textbox", { name: /card number/i }),
        "123",
      );
      await user.type(screen.getByRole("textbox", { name: /expiry/i }), "abc");
      await user.type(screen.getByRole("textbox", { name: /cvc/i }), "1");

      await user.click(
        screen.getByRole("button", { name: /complete purchase/i }),
      );

      expect(onContinue).not.toHaveBeenCalled();

      expect(
        screen.getByText("Please enter a valid card number."),
      ).toBeInTheDocument();

      expect(
        screen.getByText("Please enter a valid expiry date."),
      ).toBeInTheDocument();

      expect(screen.getByText("Please enter a valid cvc.")).toBeInTheDocument();
    });
  });

  describe("user interaction", () => {
    it("calls onBack when the back button is clicked", async () => {
      const user = userEvent.setup();
      const onBack = vi.fn();
      const onContinue = vi.fn();

      renderPayoutStep({ onBack, onContinue });

      await user.click(
        screen.getByRole("button", { name: /back to details/i }),
      );

      expect(onBack).toHaveBeenCalledTimes(1);
    });

    it("calls onContinue when the submit button is clicked with valid data", async () => {
      const user = userEvent.setup();
      const onBack = vi.fn();
      const onContinue = vi.fn();

      renderPayoutStep({ onBack, onContinue });

      await user.type(
        screen.getByRole("textbox", { name: /card number/i }),
        "4242424242424242",
      );
      await user.type(
        screen.getByRole("textbox", { name: /expiry/i }),
        "01/22",
      );
      await user.type(screen.getByRole("textbox", { name: /cvc/i }), "123");
      await user.click(
        screen.getByRole("checkbox", {
          name: /save card information for future purchases/i,
        }),
      );
      await user.click(
        screen.getByRole("button", { name: /complete purchase/i }),
      );

      expect(onContinue).toHaveBeenCalledTimes(1);

      const paymentPayload = onContinue.mock.calls[0][0];

      expect(paymentPayload).toEqual({
        method: "card",
        cardLast4: "4242",
        saveCard: true,
      });

      expect(paymentPayload).not.toHaveProperty("cardNumber");
      expect(paymentPayload).not.toHaveProperty("expiry");
      expect(paymentPayload).not.toHaveProperty("cvc");
    });
  });
});
