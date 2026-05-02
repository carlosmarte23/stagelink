import { Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";
import { formatCurrency } from "../../../utils/currency";
import styles from "./CheckoutDone.module.css";
export default function CheckoutDone({ confirmedOrder }) {
  const { orderId, items, totals } = confirmedOrder;
  return (
    <section
      className={styles.doneContainer}
      aria-labelledby="checkout-done-title"
    >
      <div className={styles.doneCard}>
        <header className={styles.header}>
          <div className={styles.headerImage}>
            <BadgeCheck />
          </div>
          <h2 id="checkout-done-title" className={styles.title}>
            Order Confirmed!
          </h2>
          <p className={styles.description}>
            Your tickets have been sent to your email and are available in your
            account.
          </p>
        </header>

        <div className={styles.orderConfirmation}>
          <p className={styles.confirmationLabel}>Order Number</p>
          <Link
            to={`/orders/${confirmedOrder.orderId.toLowerCase()}`}
            className={styles.confirmationNumber}
          >{`#${orderId}`}</Link>
        </div>
        <div className={styles.orderSummary}>
          <p className={styles.summaryTitle}>Order Summary</p>
          <ol className={styles.summaryList}>
            {items.map((event) => {
              const { eventId, title, imageUrl, tickets } = event;
              return (
                <li key={eventId} className={styles.summaryItem}>
                  <div className={styles.summaryItemImage}>
                    <img src={imageUrl} alt={title} />
                  </div>
                  <div className={styles.summaryItemDetails}>
                    <p className={styles.summaryItemTitle}>{title}</p>
                    <div className={styles.summaryItemTickets}>
                      {tickets.map((ticket) => {
                        const { tierId, quantity, tierName } = ticket;
                        return (
                          <div
                            key={`${eventId}-${tierId}`}
                            className={styles.summaryItemTicket}
                          >
                            <span
                              className={styles.summaryItemTicketName}
                            >{`${quantity}x ${tierName}`}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <div className={styles.summaryFooter}>
            <p className={styles.summaryFooterLabel}>Total Paid</p>
            <p className={styles.summaryFooterValue}>
              {formatCurrency(totals.total)}
            </p>
          </div>
          <div className={styles.navButtons}>
            <Link to="/" className={`button ${styles.linkButton}`}>
              Return to Home
            </Link>
            <Link
              to="/my-tickets"
              className={`button button--primary ${styles.linkButton}`}
            >
              Go to tickets
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
