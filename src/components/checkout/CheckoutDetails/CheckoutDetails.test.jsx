import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import CheckoutDetails from "./CheckoutDetails.jsx";
import { formatCurrency } from "../../../utils/currency.js";

const mockTotalAmountDue = 560.5;

const mockInitialBuyerDetails = {
  fullName: "",
  email: "",
  phone: "",
};

function renderCheckoutDetails(props = {}) {
  return render(
    <MemoryRouter>
      <CheckoutDetails
        totalAmountDue={mockTotalAmountDue}
        initialDetails={mockInitialBuyerDetails}
        onBack={() => {}}
        onContinue={() => {}}
        {...props}
      />
    </MemoryRouter>,
  );
}

describe("CheckoutDetails", () => {
  it("renders the Details step section", () => {
    renderCheckoutDetails();

    expect(
      screen.getByRole("region", { name: /guest details/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /guest details/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/primary contact name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByText(/total amount due/i)).toBeInTheDocument();
    expect(
      screen.getByText(formatCurrency(mockTotalAmountDue)),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /next: choose payment method/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /previous: review tickets/i,
      }),
    ).toBeInTheDocument();
  });

  it("calls onBack when pressing previous button", async () => {
    const user = userEvent.setup();
    const onBack = vi.fn();

    renderCheckoutDetails({ onBack });

    await user.click(
      screen.getByRole("button", {
        name: /previous: review tickets/i,
      }),
    );

    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("calls onContinue with valid data when pressing next button", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();

    renderCheckoutDetails({ onContinue });

    await user.type(
      screen.getByLabelText(/primary contact name/i),
      "Carlos Marte",
    );

    await user.type(
      screen.getByLabelText(/email address/i),
      "carlos@example.com",
    );

    await user.type(screen.getByLabelText(/phone number/i), "5551234567");

    await user.click(
      screen.getByRole("button", {
        name: /next: choose payment method/i,
      }),
    );

    expect(onContinue).toHaveBeenCalledWith(
      expect.objectContaining({
        fullName: "Carlos Marte",
        email: "carlos@example.com",
        phone: "5551234567",
      }),
    );
  });

  it("prefills the form with initial buyer details", () => {
    const filledValues = {
      fullName: "Carlos Marte",
      email: "carlos@example.com",
      phone: "5551234567",
    };

    renderCheckoutDetails({ initialDetails: filledValues });

    expect(screen.getByDisplayValue(filledValues.fullName)).toBeInTheDocument();
    expect(screen.getByDisplayValue(filledValues.email)).toBeInTheDocument();
    expect(screen.getByDisplayValue(filledValues.phone)).toBeInTheDocument();
  });

  it("does not continue when required fields are empty", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();

    renderCheckoutDetails({ onContinue });

    await user.click(
      screen.getByRole("button", {
        name: /next: choose payment method/i,
      }),
    );

    expect(onContinue).not.toHaveBeenCalled();

    expect(screen.getByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
  });

  it("does not continue when email format is invalid", async () => {
    const user = userEvent.setup();
    const onContinue = vi.fn();

    const initialDetails = {
      fullName: "Carlos Marte",
      phone: "5551234567",
    };

    renderCheckoutDetails({ initialDetails, onContinue });

    await user.type(screen.getByLabelText(/email address/i), "invalid-email");

    await user.click(
      screen.getByRole("button", {
        name: /next: choose payment method/i,
      }),
    );

    expect(onContinue).not.toHaveBeenCalled();
  });
});
