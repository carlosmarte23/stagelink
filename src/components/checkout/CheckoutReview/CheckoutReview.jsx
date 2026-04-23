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
      <article aria-labelledby={`checkout-event-${eventId}`}>
        <header className={styles.checkoutEventHeader}>
          <img src={imageUrl} alt={title} className={styles.eventImage} />
          <div className={styles.eventInfo}>
            <div className={styles.eventGenres}>
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
            </div>

            <h3 className={styles.eventTitle}>{title}</h3>
            <p className={styles.eventDate}>
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
                <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M7 14h.013" />
                <path d="M10.01 14h.005" />
                <path d="M13.01 14h.005" />
                <path d="M16.015 14h.005" />
                <path d="M13.015 17h.005" />
                <path d="M7.01 17h.005" />
                <path d="M10.01 17h.005" />
              </svg>
              <span>{`${shortDate}, ${timeWithZone}`}</span>
            </p>
            <p className={styles.eventVenue}>
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
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />
              </svg>
              <span>{`${venue.name}, ${venue.city}`}</span>
            </p>
          </div>
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
            );
          })}
        </ol>
        <footer className={styles.eventSubtotal}>
          <p className={styles.label}>Event Subtotal</p>
          <p className={styles.value}>{eventSubtotal}</p>
        </footer>
      </article>
    </li>
  );
};

const CheckoutCartSummary = ({ checkoutTotals, onContinue }) => {
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
};

const CheckoutCart = ({
  cartItems,
  onIncreaseTicket,
  onDecreaseTicket,
  onRemoveTicket,
}) => {
  return (
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
  );
};

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
