import { describe, expect, it } from "vitest";

import {
  CHECKOUT_STEPS,
  CHECKOUT_STEP_STATUS,
} from "../config/checkoutStepsConfig";

import { getCheckoutStepStatus, getCheckoutStepMeta } from "./checkoutSteps";

describe("checkoutSteps", () => {
  describe("getCheckoutStepStatus", () => {
    it("marks the active step as active", () => {
      const currentStep = CHECKOUT_STEPS.REVIEW;
      expect(getCheckoutStepStatus(currentStep, currentStep)).toBe(
        CHECKOUT_STEP_STATUS.ACTIVE,
      );
    });

    it("marks later steps as upcoming", () => {
      const currentStep = CHECKOUT_STEPS.REVIEW;
      expect(getCheckoutStepStatus(CHECKOUT_STEPS.DETAILS, currentStep)).toBe(
        CHECKOUT_STEP_STATUS.UPCOMING,
      );
      expect(getCheckoutStepStatus(CHECKOUT_STEPS.PAY, currentStep)).toBe(
        CHECKOUT_STEP_STATUS.UPCOMING,
      );
      expect(getCheckoutStepStatus(CHECKOUT_STEPS.DONE, currentStep)).toBe(
        CHECKOUT_STEP_STATUS.UPCOMING,
      );
    });

    it("marks earlier steps as complete", () => {
      const currentStep = CHECKOUT_STEPS.PAY;
      expect(getCheckoutStepStatus(CHECKOUT_STEPS.REVIEW, currentStep)).toBe(
        CHECKOUT_STEP_STATUS.COMPLETE,
      );
      expect(getCheckoutStepStatus(CHECKOUT_STEPS.DETAILS, currentStep)).toBe(
        CHECKOUT_STEP_STATUS.COMPLETE,
      );
    });
  });

  describe("getCheckoutStepMeta", () => {
    it("returns the step metadata for the active step", () => {
      const currentStep = CHECKOUT_STEPS.REVIEW;

      expect(getCheckoutStepMeta(currentStep)).toEqual({
        id: CHECKOUT_STEPS.REVIEW,
        label: "Review",
        description: "Review your selections before completing your purchase.",
      });
    });

    it("returns the step metadata for another step", () => {
      const currentStep = CHECKOUT_STEPS.DETAILS;

      expect(getCheckoutStepMeta(currentStep)).toEqual({
        id: CHECKOUT_STEPS.DETAILS,
        label: "Details",
        description: "Enter your details for digital ticket delivery.",
      });
    });
  });
});
