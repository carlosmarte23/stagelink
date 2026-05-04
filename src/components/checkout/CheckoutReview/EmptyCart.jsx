import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

import styles from "./CheckoutReview.module.css";

export default function EmptyCart() {
  return (
    <div className={styles.emptyCart}>
      <div className={styles.emptyCartIcon} aria-hidden="true">
        <ShoppingBag />
      </div>
      <h3 id="checkout-review-title" className={styles.title}>
        Your cart is empty
      </h3>
      <p className={styles.description}>
        Add some tickets to your cart to view them here.
      </p>
      <Link
        to="/events"
        className={`button button--primary ${styles.emptyCta}`}
      >
        Browse events
      </Link>
    </div>
  );
}
