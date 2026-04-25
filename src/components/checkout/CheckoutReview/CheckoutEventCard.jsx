import { buildUnsplashImageUrl } from "../../../utils/images.js";
import { formatCurrency } from "../../../utils/currency.js";
import { formatDateTimeParts } from "../../../utils/dates.js";
import { calculateEventSubtotal } from "../../../features/pricing/lib/ticketPricing.js";

import CheckoutTicketRow from "./CheckoutTicketRow.jsx";

import styles from "./CheckoutReview.module.css";
import { CalendarDays } from "lucide-react";
import { MapPin } from "lucide-react";

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
              <CalendarDays
                className={styles.eventDateIcon}
                aria-hidden="true"
              />
              <span>{`${shortDate}, ${timeWithZone}`}</span>
            </p>
            <p className={styles.eventVenue}>
              <MapPin className={styles.eventVenueIcon} aria-hidden="true" />
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
