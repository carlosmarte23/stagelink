import { Link } from "react-router-dom";
import {
  calculateCheckoutTotals,
  calculateEventSubtotal,
} from "../../../features/checkout/lib/checkoutPricing.js";
import { getEffectiveTierLimit } from "../../../features/events/lib/eventSelectors.js";

import { formatCurrency } from "../../../utils/currency.js";
import { formatDateTimeParts } from "../../../utils/dates.js";
import { buildUnspashImageUrl } from "../../../utils/images.js";

import styles from "./CheckoutReview.module.css";
const EmptyCart = () => {
  return (
    <div>
      <p className={styles.description}>Your cart is empty.</p>
      <Link to="/events" className={styles.cta}>
        Browse events
      </Link>
    </div>
  );
};

const CheckoutEventCard = ({
  cartItem,
  onIncreaseTicket,
  onDecreaseTicket,
  onRemoveTicket,
}) => {
  const { eventId } = cartItem;
  const { eventData, selectedTickets } = cartItem;
  const imageUrl = buildUnspashImageUrl(eventData.imageUrl, {
    width: 400,
    quality: 50,
  });

  const eventSubtotal = formatCurrency(calculateEventSubtotal(cartItem));
  const { title, startsAt, timezone, genres, venue } = eventData;
  const { shortDate, timeWithZone } = formatDateTimeParts(startsAt, timezone);
  return (
    <li className={styles.checkoutEvent}>
      <article
        className={styles.checkoutEvent}
        aria-labelledby={`checkout-event-${eventId}`}
      >
        <header className={styles.checkoutEventHeader}>
          <Link to={`/events/${eventId}`}>
            <img src={imageUrl} alt={title} className={styles.eventImage} />
            {genres.map((genre) => {
              return (
                <p
                  key={`${eventId}-${genre}`}
                  className={styles.eventGenreBadge}
                >
                  {genre}
                </p>
              );
            })}
            <h3 className={styles.eventTitle}>{title}</h3>
            <p
              className={styles.eventDate}
            >{`${shortDate}, ${timeWithZone}`}</p>
            <p
              className={styles.eventVenue}
            >{`${venue.name}, ${venue.city}`}</p>
          </Link>
        </header>

        <ol className={styles.ticketList}>
          {selectedTickets.map((ticket) => {
            const { quantity } = ticket;
            const { name, price } = ticket.tierData;
            const tierTicketLimit = getEffectiveTierLimit(ticket.tierData);

            const tierSubtotal = formatCurrency(
              ticket.quantity * ticket.unitPrice,
            );
            return (
              <li key={ticket.tierId} className={styles.ticketListItem}>
                <div className={styles.ticketInfo}>
                  <p className={styles.ticketName}>{name}</p>
                  <p className={styles.ticketPrice}>
                    {formatCurrency(price)} each
                  </p>
                  <div>
                    <div
                      className={styles.ticketControls}
                      role="group"
                      aria-label={`Controls for ${name} tickets for ${title}`}
                    >
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
                          onIncreaseTicket(
                            eventId,
                            ticket.tierId,
                            tierTicketLimit,
                          )
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
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <footer className={styles.checkoutEventFooter}>
          <p>Event Subtotal</p>
          <p>{eventSubtotal}</p>
        </footer>
      </article>
    </li>
  );
};

const CheckoutCartSummary = ({ checkoutTotals }) => {
  const { ticketsQuantity, subtotal, serviceFees, facilityCharge, total } =
    checkoutTotals;
  return (
    <footer className={styles.footer}>
      <h3 className={styles.footerHeader}>Order Summary</h3>
      <p
        className={styles.subtotal}
      >{`Subtotal (${ticketsQuantity} tickets): ${formatCurrency(subtotal)}`}</p>
      <p
        className={styles.total}
      >{`Service Fees: ${formatCurrency(serviceFees)}`}</p>
      <p
        className={styles.total}
      >{`Facility Fees: ${formatCurrency(facilityCharge)}`}</p>
      <p className={styles.total}>{`Total: ${formatCurrency(total)}`}</p>
      <button
        type="button"
        className={`button button--primary ${styles.nextButton}`}
      >
        Next: Enter Your Details
      </button>
    </footer>
  );
};

const CheckoutCart = ({
  cartItems,
  onIncreaseTicket,
  onDecreaseTicket,
  onRemoveTicket,
}) => {
  const checkoutTotals = calculateCheckoutTotals(cartItems);

  return (
    <div>
      <ol className={styles.checkoutEventList}>
        {cartItems.map((cartItem) => (
          <CheckoutEventCard
            cartItem={cartItem}
            key={cartItem.eventId}
            onIncreaseTicket={onIncreaseTicket}
            onDecreaseTicket={onDecreaseTicket}
            onRemoveTicket={onRemoveTicket}
          />
        ))}
      </ol>

      <CheckoutCartSummary checkoutTotals={checkoutTotals} />
    </div>
  );
};

export default function CheckoutReview({
  cartItems = [],
  onIncreaseTicket,
  onDecreaseTicket,
  onRemoveTicket,
}) {
  const isCartEmpty = cartItems.length === 0;

  return (
    <section
      className={styles.container}
      aria-labelledby="checkout-review-title"
    >
      <h2 id="checkout-review-title" className={styles.title}>
        Your Cart
      </h2>

      {isCartEmpty ? (
        <EmptyCart />
      ) : (
        <CheckoutCart
          cartItems={cartItems}
          onIncreaseTicket={onIncreaseTicket}
          onDecreaseTicket={onDecreaseTicket}
          onRemoveTicket={onRemoveTicket}
        />
      )}
    </section>
  );
}
