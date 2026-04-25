import { Receipt } from "lucide-react";
import { formatCurrency } from "../../../utils/currency.js";

import styles from "./CheckoutReview.module.css";
import { ArrowRight } from "lucide-react";

export default function CheckoutCartSummary({ checkoutTotals, onContinue }) {
  const { ticketsQuantity, subtotal, serviceFees, facilityCharge, total } =
    checkoutTotals;
  return (
    <div className={styles.reviewFooter}>
      <div className={styles.footerHeader}>
        <Receipt aria-hidden="true" className={styles.footerIcon} />
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
        <ArrowRight aria-hidden="true" />
      </button>
    </div>
  );
}
