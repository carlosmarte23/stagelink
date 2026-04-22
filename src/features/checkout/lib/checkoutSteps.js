import {
  CHECKOUT_STEP_ITEMS,
  CHECKOUT_STEP_STATUS,
} from "../config/checkoutStepsConfig.js";

export function getCheckoutStepStatus(stepId, activeStep) {
  const activeIndex = CHECKOUT_STEP_ITEMS.findIndex(
    (step) => step.id === activeStep,
  );

  const stepIndex = CHECKOUT_STEP_ITEMS.findIndex((step) => step.id === stepId);

  if (activeIndex > stepIndex) return CHECKOUT_STEP_STATUS.COMPLETE;
  if (activeIndex === stepIndex) return CHECKOUT_STEP_STATUS.ACTIVE;

  return CHECKOUT_STEP_STATUS.UPCOMING;
}

export function getCheckoutStepMeta(activeStep) {
  return CHECKOUT_STEP_ITEMS.find((step) => step.id === activeStep);
}
