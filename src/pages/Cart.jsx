import { useState } from "react";
import CheckoutReview from "../components/checkout/CheckoutReview/CheckoutReview";
import CheckoutDetails from "../components/checkout/CheckoutDetails/CheckoutDetails.jsx";
import CheckoutTimeline from "../components/checkout/CheckoutTimeline/CheckoutTimeline";

import {
  CHECKOUT_STEP_ITEMS,
  CHECKOUT_STEPS,
} from "../features/checkout/config/checkoutStepsConfig";
import { getCheckoutStepMeta } from "../features/checkout/lib/checkoutSteps";
import { getCheckoutCart } from "../features/checkout/lib/checkoutCart";
import {
  increaseCartTicketQuantity,
  decreaseCartTicketQuantity,
  removeCartTicketTier,
} from "../features/cart/lib/cartStorage.js";
import { calculateCheckoutTotals } from "../features/checkout/lib/checkoutPricing.js";

import styles from "./Cart.module.css";

export default function Cart() {
  const [checkoutCartItems, setCheckoutCartItems] = useState(getCheckoutCart());
  const [activeStep, setActiveStep] = useState(CHECKOUT_STEPS.REVIEW);
  const [buyerDetails, setBuyerDetails] = useState(() => ({
    fullName: "",
    email: "",
    phone: "",
  }));

  const isCartEmpty = checkoutCartItems.length === 0;
  const currentStep = isCartEmpty ? CHECKOUT_STEPS.REVIEW : activeStep;
  const stepMeta = getCheckoutStepMeta(currentStep);
  const checkoutTotals = calculateCheckoutTotals(checkoutCartItems);
  const amountDue = checkoutTotals.total;

  function handleRemoveTicket(eventId, tierId) {
    removeCartTicketTier(eventId, tierId);
    setCheckoutCartItems(() => getCheckoutCart());
  }

  function handleIncreaseTicket(eventId, tierId, effectiveTierLimit) {
    increaseCartTicketQuantity(eventId, tierId, effectiveTierLimit);
    setCheckoutCartItems(() => getCheckoutCart());
  }

  function handleDecreaseTicket(eventId, tierId) {
    decreaseCartTicketQuantity(eventId, tierId);
    setCheckoutCartItems(() => getCheckoutCart());
  }

  const currentStepIndex = CHECKOUT_STEP_ITEMS.findIndex(
    (step) => step.id === currentStep,
  );

  function goToNextStep() {
    if (currentStepIndex < CHECKOUT_STEP_ITEMS.length - 1) {
      setActiveStep(CHECKOUT_STEP_ITEMS[currentStepIndex + 1].id);
    }

    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  function goToPreviousStep() {
    if (currentStepIndex > 0) {
      setActiveStep(CHECKOUT_STEP_ITEMS[currentStepIndex - 1].id);
    }

    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  function handleReviewSubmit() {
    if (currentStep === CHECKOUT_STEPS.REVIEW) {
      goToNextStep();
    }
  }

  function handleDetailsSubmit(validBuyerDetails) {
    if (currentStep === CHECKOUT_STEPS.DETAILS) {
      setBuyerDetails(validBuyerDetails);
      goToNextStep();
    }
  }

  return (
    <section className={styles.page} aria-labelledby="checkout-title">
      <header className={styles.header}>
        <h1 id="checkout-title" className={styles.title}>
          Checkout
        </h1>
        <p className={styles.description}>{stepMeta.description}</p>
      </header>

      {!isCartEmpty && (
        <CheckoutTimeline
          checkoutSteps={CHECKOUT_STEP_ITEMS}
          activeStep={currentStep}
        />
      )}

      {currentStep === CHECKOUT_STEPS.REVIEW && (
        <div className={styles.stepContainer}>
          <CheckoutReview
            cartItems={checkoutCartItems}
            onIncreaseTicket={handleIncreaseTicket}
            onDecreaseTicket={handleDecreaseTicket}
            onRemoveTicket={handleRemoveTicket}
            onContinue={handleReviewSubmit}
          />
        </div>
      )}

      {currentStep === CHECKOUT_STEPS.DETAILS && (
        <div className={styles.stepContainer}>
          <CheckoutDetails
            totalAmountDue={amountDue}
            initialDetails={buyerDetails}
            onBack={goToPreviousStep}
            onContinue={handleDetailsSubmit}
          />
        </div>
      )}

      {currentStep === CHECKOUT_STEPS.PAY && (
        <div className={styles.stepContainer}>
          <h2>WIP: Pay Step</h2>
          <button type="button" onClick={goToPreviousStep}>
            Back
          </button>
        </div>
      )}
    </section>
  );
}
