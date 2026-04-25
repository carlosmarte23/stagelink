import { CHECKOUT_STEP_ITEMS } from "../config/checkoutStepsConfig.js";

function getStepIndex(currentStep) {
  return CHECKOUT_STEP_ITEMS.findIndex((step) => step.id === currentStep);
}

export function getNextCheckoutStep(currentStep) {
  const currentStepIndex = getStepIndex(currentStep);
  const nextStep = CHECKOUT_STEP_ITEMS[currentStepIndex + 1];

  return nextStep ? nextStep.id : currentStep;
}
export function getPreviousCheckoutStep(currentStep) {
  const currentStepIndex = getStepIndex(currentStep);
  const previousStep = CHECKOUT_STEP_ITEMS[currentStepIndex - 1];

  return previousStep ? previousStep.id : currentStep;
}
