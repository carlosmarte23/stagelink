import { describe, it, expect } from "vitest";

import { validateBuyerDetails } from "./checkoutDetailsValidation.js";

describe("checkoutDetailsValidation", () => {
  it("returns error when fullName is empty", () => {
    expect(
      validateBuyerDetails({ fullName: "", email: "", phone: "" }).errors
        .fullName,
    ).toBe("Please enter your full name.");
  });
  it("returns error when fullName doesn't have last name", () => {
    expect(
      validateBuyerDetails({ fullName: "John", email: "", phone: "" }).errors
        .fullName,
    ).toBe("Please enter your full name.");
  });
  it("returns error when email is empty", () => {
    expect(
      validateBuyerDetails({ fullName: "John Doe", email: "", phone: "" })
        .errors.email,
    ).toBe("Please enter your email address.");
  });
  it("returns error when email haves invalid format", () => {
    expect(
      validateBuyerDetails({ fullName: "John Doe", email: "john", phone: "" })
        .errors.email,
    ).toBe("Please enter a valid email address.");
  });
  it("returns error when phone is empty", () => {
    expect(
      validateBuyerDetails({ fullName: "John Doe", email: "", phone: "" })
        .errors.phone,
    ).toBe("Please enter your phone number.");
  });
  it("returns error when phone haves invalid format", () => {
    expect(
      validateBuyerDetails({ fullName: "John Doe", email: "", phone: "123" })
        .errors.phone,
    ).toBe("Please enter a valid 10-digit phone number.");
  });
  it("returns validatedValues Object when all fields are valid", () => {
    expect(
      validateBuyerDetails({
        fullName: "John Doe",
        email: "G2v0o@example.com",
        phone: "1234567890",
      }).validatedValues,
    ).toEqual({
      fullName: "John Doe",
      email: "g2v0o@example.com",
      phone: "1234567890",
    });
  });
  it("does not returns raw whitespace in valid values", () => {
    expect(
      validateBuyerDetails({
        fullName: "    John Doe    ",
        email: "    G2v0o@example.com    ",
        phone: "    1234567890    ",
      }).validatedValues,
    ).toEqual({
      fullName: "John Doe",
      email: "g2v0o@example.com",
      phone: "1234567890",
    });
  });

  it("returns a lowercase trimmed email in valid values", () => {
    expect(
      validateBuyerDetails({
        fullName: "John Doe",
        email: "  JOHN.DOE@EXAMPLE.COM  ",
        phone: "1234567890",
      }).validatedValues,
    ).toEqual({
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
    });
  });

  it("accepts formatted phone numbers and returns only digits in valid values", () => {
    expect(
      validateBuyerDetails({
        fullName: "John Doe",
        email: "john@example.com",
        phone: "(555) 123-4567",
      }).validatedValues,
    ).toEqual({
      fullName: "John Doe",
      email: "john@example.com",
      phone: "5551234567",
    });
  });

  it("returns a phone error when the phone has fewer than 10 digits after normalization", () => {
    expect(
      validateBuyerDetails({
        fullName: "John Doe",
        email: "john@example.com",
        phone: "(555) 123",
      }).errors.phone,
    ).toBe("Please enter a valid 10-digit phone number.");
  });
});
