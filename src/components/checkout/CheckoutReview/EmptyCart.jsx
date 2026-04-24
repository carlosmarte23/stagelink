import { Link } from "react-router-dom";

import styles from "./CheckoutReview.module.css";

export default function EmptyCart() {
  return (
    <div className={styles.emptyCart}>
      <div className={styles.emptyCartIcon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15.733 15.732a2.5 2.5 0 1 0 3.544 3.527" />
          <path d="M6 8v11a1 1 0 0 0 1.806 .591l3.694 -5.091v.055" />
          <path d="M6 8h2m4 0h9l-3 6.01m-3.319 .693l-4.276 -.45a4 4 0 0 1 -3.296 -2.493l-2.853 -7.13a1 1 0 0 0 -.928 -.63h-1.323" />
          <path d="M3 3l18 18" />
        </svg>
      </div>
      <h3 id="checkout-review-title" className={styles.title}>
        Your cart
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
