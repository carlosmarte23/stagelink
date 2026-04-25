import { Trash2 } from "lucide-react";
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
            <Trash2 />
          </button>
        </div>
      </li>
    </ol>
  );
}
