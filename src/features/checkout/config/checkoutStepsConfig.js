export const CHECKOUT_STEPS = Object.freeze({
  REVIEW: "review",
  DETAILS: "details",
  PAY: "pay",
  DONE: "done",
});

export const CHECKOUT_STEP_STATUS = Object.freeze({
  COMPLETE: "complete",
  ACTIVE: "active",
  UPCOMING: "upcoming",
});

export const CHECKOUT_STEP_ITEMS = Object.freeze([
  {
    id: CHECKOUT_STEPS.REVIEW,
    label: "Review",
    description: "Review your selections before completing your purchase.",
  },
  {
    id: CHECKOUT_STEPS.DETAILS,
    label: "Details",
    description: "Enter your details for digital ticket delivery.",
  },
  {
    id: CHECKOUT_STEPS.PAY,
    label: "Pay",
    description: "Securely complete your ticket purchase.",
  },
  {
    id: CHECKOUT_STEPS.DONE,
    label: "Done",
    description: "All done! Your order is confirmed.",
  },
]);
