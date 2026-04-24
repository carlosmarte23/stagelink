import { formatCurrency } from "../../../utils/currency.js";

import styles from "./CheckoutReview.module.css";

export default function CheckoutCartSummary({ checkoutTotals, onContinue }) {
  const { ticketsQuantity, subtotal, serviceFees, facilityCharge, total } =
    checkoutTotals;
  return (
    <div className={styles.reviewFooter}>
      <div className={styles.footerHeader}>
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
          aria-hidden="true"
          className={styles.footerIcon}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2" />
          <path d="M14 8h-2.5a1.5 1.5 0 0 0 0 3h1a1.5 1.5 0 0 1 0 3h-2.5m2 0v1.5m0 -9v1.5" />
        </svg>
        <h3 className={styles.footerTitle}>Order Summary</h3>
      </div>
      <p className={`${styles.entry}`}>
        <span
          className={styles.entryLabel}
        >{`Subtotal (${ticketsQuantity} tickets): `}</span>
        <span
          className={styles.entryValue}
        >{`${formatCurrency(subtotal)}`}</span>
      </p>
      <p className={`${styles.entry}`}>
        <span className={styles.entryLabel}>Service Fees: </span>
        <span
          className={styles.entryValue}
        >{`${formatCurrency(serviceFees)}`}</span>
      </p>
      <p className={`${styles.entry}`}>
        <span className={styles.entryLabel}>Facility Fees: </span>
        <span
          className={styles.entryValue}
        >{`${formatCurrency(facilityCharge)}`}</span>
      </p>

      <p className={`${styles.entry} ${styles.total}`}>
        <span className={styles.entryLabel}>Total: </span>
        <span className={styles.entryValue}>{`${formatCurrency(total)}`}</span>
      </p>

      <button
        type="button"
        className={`button button--primary ${styles.nextButton}`}
        onClick={onContinue}
      >
        Next: Enter Your Details
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 12l14 0" />
          <path d="M15 16l4 -4" />
          <path d="M15 8l4 4" />
        </svg>
      </button>
    </div>
  );
}
