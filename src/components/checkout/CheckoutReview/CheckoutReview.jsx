import { calculateCheckoutTotals } from "../../../features/pricing/lib/ticketPricing.js";

import EmptyCart from "./EmptyCart.jsx";
import CheckoutCart from "./CheckoutCart.jsx";
import CheckoutCartSummary from "./CheckoutCartSummary.jsx";

import styles from "./CheckoutReview.module.css";

export default function CheckoutReview({
  cartItems = [],
  onIncreaseTicket,
  onDecreaseTicket,
  onRemoveTicket,
  onContinue,
}) {
  const isCartEmpty = cartItems.length === 0;
  const cartState = isCartEmpty ? "empty" : "filled";
  const checkoutTotals = calculateCheckoutTotals(cartItems);

  return (
    <section
      className={styles.checkoutContainer}
      aria-labelledby="checkout-review-title"
    >
      <div className={styles.reviewLayout} data-cart-state={cartState}>
        {isCartEmpty ? (
          <div className={styles.reviewCard} data-cart-state={cartState}>
            <EmptyCart />
          </div>
        ) : (
          <>
            <div className={styles.reviewCard} data-cart-state={cartState}>
              <h2 id="checkout-review-title" className={styles.title}>
                Your Cart
              </h2>
              <CheckoutCart
                cartItems={cartItems}
                onIncreaseTicket={onIncreaseTicket}
                onDecreaseTicket={onDecreaseTicket}
                onRemoveTicket={onRemoveTicket}
              />
            </div>

            <CheckoutCartSummary
              checkoutTotals={checkoutTotals}
              onContinue={onContinue}
            />
          </>
        )}
      </div>
    </section>
  );
}
