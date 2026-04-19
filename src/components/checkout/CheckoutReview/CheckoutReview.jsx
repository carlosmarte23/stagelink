import styles from "./CheckoutReview.module.css";
export default function CheckoutReview() {
  return (
    <section
      className={styles.container}
      aria-labelledby="checkout-review-title"
    >
      <h2 id="checkout-review-title" className={styles.title}>
        Your Cart
      </h2>

      <ol className={styles.ticketList}>
        <li className={styles.ticketListItem}>Ticket Placeholder</li>
        <li className={styles.ticketListItem}>Ticket Placeholder</li>
        <li className={styles.ticketListItem}>Ticket Placeholder</li>
      </ol>
      <div className={styles.paymentSummary}>Payment Summary</div>
      <footer className={styles.footer}>
        <p className={styles.total}>Total: $0.00</p>
        <button
          type="button"
          className={`button button--primary ${styles.nextButton}`}
        >
          Next: Enter Your Details
        </button>
      </footer>
    </section>
  );
}
