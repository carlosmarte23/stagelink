import { useState } from "react";
import CheckoutReview from "../components/checkout/CheckoutReview/CheckoutReview";
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

import styles from "./Cart.module.css";

export default function Cart() {
  const activeStep = CHECKOUT_STEPS.REVIEW;
  const stepMeta = getCheckoutStepMeta(activeStep);

  const [checkoutCartItems, setCheckoutCartItems] = useState(getCheckoutCart());

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

  function handleNextStepClick() {
    // TODO: Advance to the details step in the next checkout stage.
  }

  return (
    <section className={styles.page} aria-labelledby="checkout-title">
      <header className={styles.header}>
        <h1 id="checkout-title" className={styles.title}>
          Checkout
        </h1>
        <p className={styles.description}>{stepMeta.description}</p>
      </header>

      <CheckoutTimeline
        checkoutSteps={CHECKOUT_STEP_ITEMS}
        activeStep={activeStep}
      />
      <div className={styles.stepContainer}>
        <CheckoutReview
          cartItems={checkoutCartItems}
          onIncreaseTicket={handleIncreaseTicket}
          onDecreaseTicket={handleDecreaseTicket}
          onRemoveTicket={handleRemoveTicket}
          onNextButtonClick={handleNextStepClick}
        />
      </div>
    </section>
  );
}
