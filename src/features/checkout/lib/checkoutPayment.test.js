import { describe, it, expect } from "vitest";

import {
  validatePaymentDetails,
  getCardLast4,
  normalizeCardNumber,
  authorizePayment,
} from "./checkoutPayment.js";

const mockPaymentDetails = {
  cardNumber: "1234 5678 9012 3456",
  expirationDate: "01/23",
  securityCode: "123",
  saveCard: true,
};

describe("checkoutPayment", () => {
  describe("authorizePayment", () => {
    it("authorizes valid simulated card payment details", async () => {
      const result = await authorizePayment(mockPaymentDetails);
      expect(result.ok).toBe(true);
    });

    it("returns only safe payment details after authorization", async () => {
      const { validatedValues } = validatePaymentDetails(mockPaymentDetails);

      const result = await authorizePayment(validatedValues);

      expect(result.paymentDetails).toEqual({
        method: "card",
        cardLast4: "3456",
        saveCard: true,
      });
    });

    it("does not return raw card number, expiry, or cvc", async () => {
      const result = await authorizePayment(mockPaymentDetails);

      expect(result.paymentDetails).not.toHaveProperty("cardNumber");
      expect(result.paymentDetails).not.toHaveProperty("expirationDate");
      expect(result.paymentDetails).not.toHaveProperty("securityCode");
    });
  });

  describe("getCardLast4", () => {
    it("returns the last four digits from a card number", () => {
      expect(getCardLast4("1234 5678 9012 3456")).toBe("3456");
    });

    it("ignores spaces when reading the last four digits", () => {
      expect(getCardLast4("1234 5678 9012  3456")).toBe("3456");
    });
  });

  describe("normalizeCardNumber", () => {
    it("removes spaces and non-digit characters from the card number", () => {
      expect(normalizeCardNumber("1234 5678 9012 3456")).toBe(
        "1234567890123456",
      );
    });
  });

  describe("validatePaymentDetails", () => {
    it("returns required field errors for empty card details", () => {
      const { errors } = validatePaymentDetails({});

      expect(errors.cardNumber).toBe("Please enter your card number.");
      expect(errors.expirationDate).toBe("Please enter your card expiry date.");
      expect(errors.securityCode).toBe("Please enter your card CVC.");
    });

    it("returns a card number error when the card number is invalid", () => {
      const { errors } = validatePaymentDetails({
        cardNumber: "1234",
        expirationDate: "01/23",
        securityCode: "123",
      });

      expect(errors.cardNumber).toBe("Please enter a valid card number.");
    });

    it("returns an expiry error when expiry is invalid", () => {
      const { errors } = validatePaymentDetails({
        cardNumber: "1234 5678 9012 3456",
        expirationDate: "21/22",
        securityCode: "123",
      });

      expect(errors.expirationDate).toBe("Please enter a valid expiry date.");
    });

    it("returns a cvc error when cvc is invalid", () => {
      const { errors } = validatePaymentDetails({
        cardNumber: "1234 5678 9012 3456",
        expirationDate: "01/23",
        securityCode: "12",
      });

      expect(errors.securityCode).toBe("Please enter a valid CVC.");
    });

    it("returns returns normalized valid payment details when the card details are valid", () => {
      const { validatedValues } = validatePaymentDetails(mockPaymentDetails);
      expect(validatedValues).toEqual({
        cardNumber: "1234567890123456",
        expirationDate: "01/23",
        securityCode: "123",
        saveCard: true,
      });
    });
  });
});
