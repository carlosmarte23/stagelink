import { getEffectiveTierLimit } from "../../../features/events/lib/eventSelectors.js";
import { formatCurrency } from "../../../utils/currency.js";

import styles from "./CheckoutReview.module.css";

export default function CheckoutTicketRow({
  eventId,
  title,
  ticket,
  onIncreaseTicket,
  onDecreaseTicket,
  onRemoveTicket,
}) {
  const { quantity } = ticket;
  const { name, price } = ticket.tierData;
  const tierTicketLimit = getEffectiveTierLimit(ticket.tierData);

  const tierSubtotal = formatCurrency(ticket.quantity * ticket.unitPrice);
  return (
    <ol className={styles.ticketList}>
      <li key={ticket.tierId} className={styles.ticketListItem}>
        <div className={styles.ticketInfo}>
          <p className={styles.ticketName}>{name}</p>
          <p className={styles.ticketPrice}>{formatCurrency(price)} each</p>
        </div>
        <div
          className={styles.ticketControls}
          role="group"
          aria-label={`Controls for ${name} tickets for ${title}`}
        >
          <div className={styles.buttonControls}>
            <button
              type="button"
              className={styles.ticketControlButton}
              aria-label={`Decrease ${name} tickets for ${title}`}
              onClick={() => onDecreaseTicket(eventId, ticket.tierId)}
            >
              -
            </button>
            <span
              aria-label={`Quantity of ${name} tickets for ${title}`}
              className={styles.ticketQuantity}
            >
              {quantity}
            </span>
            <button
              type="button"
              className={styles.ticketControlButton}
              aria-label={`Increase ${name} tickets for ${title}`}
              onClick={() =>
                onIncreaseTicket(eventId, ticket.tierId, tierTicketLimit)
              }
            >
              +
            </button>
          </div>

          <p
            className={styles.ticketSubtotal}
            aria-label={`Subtotal for ${name} tickets for ${title}`}
          >
            {tierSubtotal}
          </p>
          <button
            type="button"
            className={styles.removeButton}
            aria-label={`Remove ${name} tickets for ${title}`}
            onClick={() => onRemoveTicket(eventId, ticket.tierId)}
          >
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
              <path d="M4 7l16 0" />
              <path d="M10 11l0 6" />
              <path d="M14 11l0 6" />
              <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
              <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
            </svg>
          </button>
        </div>
      </li>
    </ol>
  );
}
