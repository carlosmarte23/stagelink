import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import NewsletterForm from "./NewsletterForm.jsx";

function renderNewsletterForm() {
  render(<NewsletterForm />);

  return {
    emailInput: screen.getByLabelText(/email address/i),
    submitButton: screen.getByRole("button", { name: /subscribe/i }),
  };
}

afterEach(() => {
  vi.useRealTimers();
});

describe("NewsletterForm", () => {
  it("shows an error when the email is empty", async () => {
    const user = userEvent.setup();
    const { submitButton } = renderNewsletterForm();

    await user.click(submitButton);

    expect(
      screen.getByText("Please enter your email address."),
    ).toBeInTheDocument();
  });

  it("shows an error when the email is invalid", async () => {
    const user = userEvent.setup();
    const { emailInput, submitButton } = renderNewsletterForm();

    await user.type(emailInput, "user");
    await user.click(submitButton);

    expect(
      screen.getByText("Please enter a valid email address."),
    ).toBeInTheDocument();
  });

  it("submits successfully and clears the input after the timer finishes", async () => {
    const user = userEvent.setup();
    const { emailInput, submitButton } = renderNewsletterForm();

    await user.type(emailInput, "user@example.com");

    vi.useFakeTimers();
    fireEvent.click(submitButton);

    expect(
      screen.getByRole("button", { name: /subscribing/i }),
    ).toBeInTheDocument();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(
      screen.getByRole("button", { name: /subscribed!/i }),
    ).toBeInTheDocument();

    expect(submitButton).toBeDisabled();
    expect(emailInput).toBeDisabled();

    expect(emailInput).toHaveValue("");

    expect(
      await screen.getByText(/thanks for subscribing!/i, { selector: "p" }),
    ).toBeInTheDocument();
  });
});
