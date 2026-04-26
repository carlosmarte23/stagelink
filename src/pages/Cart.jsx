import { useState } from "react";
import { Link } from "react-router-dom";

import CheckoutTimeline from "../components/checkout/CheckoutTimeline/CheckoutTimeline";
import CheckoutReview from "../components/checkout/CheckoutReview/CheckoutReview";
import CheckoutDetails from "../components/checkout/CheckoutDetails/CheckoutDetails.jsx";
import CheckoutPayment from "../components/checkout/CheckoutPayment/CheckoutPayment.jsx";

import {
  CHECKOUT_STEPS,
  CHECKOUT_STEP_ITEMS,
} from "../features/checkout/config/checkoutStepsConfig";
import { getCheckoutStepMeta } from "../features/checkout/lib/checkoutSteps";
import { getCheckoutCart } from "../features/checkout/lib/checkoutCart";
import {
  getNextCheckoutStep,
  getPreviousCheckoutStep,
} from "../features/checkout/lib/checkoutFlow.js";
import {
  increaseCartTicketQuantity,
  decreaseCartTicketQuantity,
  removeCartTicketTier,
} from "../features/cart/lib/cartStorage.js";
import { calculateCheckoutTotals } from "../features/pricing/lib/ticketPricing.js";

import styles from "./Cart.module.css";

export default function Cart() {
  const [checkoutCartItems, setCheckoutCartItems] = useState(getCheckoutCart());
  const [activeStep, setActiveStep] = useState(CHECKOUT_STEPS.REVIEW);
  const [buyerDetails, setBuyerDetails] = useState(() => ({
    fullName: "",
    email: "",
    phone: "",
  }));
  const [_paymentDetails, setPaymentDetails] = useState(() => ({
    method: "",
    cardLast4: "",
    saveCard: false,
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

  function goToNextStep() {
    setActiveStep((currentStep) => getNextCheckoutStep(currentStep));
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  }

  function goToPreviousStep() {
    setActiveStep((currentStep) => getPreviousCheckoutStep(currentStep));
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

  function handlePaymentSubmit(authorizedPaymentDetails) {
    if (currentStep === CHECKOUT_STEPS.PAY) {
      setPaymentDetails(authorizedPaymentDetails);
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
      <div className={styles.stepContainer}>
        {!isCartEmpty && (
          <CheckoutTimeline
            checkoutSteps={CHECKOUT_STEP_ITEMS}
            activeStep={currentStep}
          />
        )}

        {currentStep === CHECKOUT_STEPS.REVIEW && (
          <CheckoutReview
            cartItems={checkoutCartItems}
            onIncreaseTicket={handleIncreaseTicket}
            onDecreaseTicket={handleDecreaseTicket}
            onRemoveTicket={handleRemoveTicket}
            onContinue={handleReviewSubmit}
          />
        )}

        {currentStep === CHECKOUT_STEPS.DETAILS && (
          <CheckoutDetails
            totalAmountDue={amountDue}
            initialDetails={buyerDetails}
            onBack={goToPreviousStep}
            onContinue={handleDetailsSubmit}
          />
        )}

        {currentStep === CHECKOUT_STEPS.PAY && (
          <CheckoutPayment
            totalAmountDue={amountDue}
            onBack={goToPreviousStep}
            onContinue={handlePaymentSubmit}
          />
        )}

        {currentStep === CHECKOUT_STEPS.DONE && (
          <>
            <h2>Order Confirmed!</h2>
            <Link to="/">Return to Home</Link>
          </>
        )}
      </div>
    </section>
  );
}
