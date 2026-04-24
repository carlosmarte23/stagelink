import { describe, expect, it } from "vitest";

import { CHECKOUT_STEPS } from "../config/checkoutStepsConfig.js";

import {
  getNextCheckoutStep,
  getPreviousCheckoutStep,
} from "./checkoutFlow.js";

describe("checkoutFlow", () => {
  describe("getNextCheckoutStep", () => {
    it("returns the next checkout step", () => {
      expect(getNextCheckoutStep(CHECKOUT_STEPS.REVIEW)).toBe(
        CHECKOUT_STEPS.DETAILS,
      );

      expect(getNextCheckoutStep(CHECKOUT_STEPS.DETAILS)).toBe(
        CHECKOUT_STEPS.PAY,
      );

      expect(getNextCheckoutStep(CHECKOUT_STEPS.PAY)).toBe(CHECKOUT_STEPS.DONE);
    });

    it("keeps done as the last checkout step", () => {
      expect(getNextCheckoutStep(CHECKOUT_STEPS.DONE)).toBe(
        CHECKOUT_STEPS.DONE,
      );
    });
  });

  describe("getPreviousCheckoutStep", () => {
    it("returns the previous checkout step", () => {
      expect(getPreviousCheckoutStep(CHECKOUT_STEPS.DONE)).toBe(
        CHECKOUT_STEPS.PAY,
      );

      expect(getPreviousCheckoutStep(CHECKOUT_STEPS.PAY)).toBe(
        CHECKOUT_STEPS.DETAILS,
      );

      expect(getPreviousCheckoutStep(CHECKOUT_STEPS.DETAILS)).toBe(
        CHECKOUT_STEPS.REVIEW,
      );
    });

    it("keeps review as the first checkout step", () => {
      expect(getPreviousCheckoutStep(CHECKOUT_STEPS.REVIEW)).toBe(
        CHECKOUT_STEPS.REVIEW,
      );
    });
  });
});
