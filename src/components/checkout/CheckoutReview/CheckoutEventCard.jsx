import { buildUnsplashImageUrl } from "../../../utils/images.js";
import { formatCurrency } from "../../../utils/currency.js";
import { formatDateTimeParts } from "../../../utils/dates.js";
import { calculateEventSubtotal } from "../../../features/pricing/lib/ticketPricing.js";

import CheckoutTicketRow from "./CheckoutTicketRow.jsx";

import styles from "./CheckoutReview.module.css";

export default function CheckoutEventCard({
  cartItem,
  onIncreaseTicket,
  onDecreaseTicket,
  onRemoveTicket,
}) {
  const { eventId } = cartItem;
  const { eventData, selectedTickets } = cartItem;
  const imageUrl = buildUnsplashImageUrl(eventData.imageUrl, {
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

        <ul className={styles.ticketList}>
          {selectedTickets.map((ticket) => {
            return (
              <CheckoutTicketRow
                key={ticket.tierId}
                eventId={eventId}
                title={title}
                ticket={ticket}
                onIncreaseTicket={onIncreaseTicket}
                onDecreaseTicket={onDecreaseTicket}
                onRemoveTicket={onRemoveTicket}
              />
            );
          })}
        </ul>

        <footer className={styles.eventSubtotal}>
          <p className={styles.label}>Event Subtotal</p>
          <p className={styles.value}>{eventSubtotal}</p>
        </footer>
      </article>
    </li>
  );
}
