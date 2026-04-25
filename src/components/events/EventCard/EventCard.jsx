import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

import {
  getVenueName,
  getVenueCity,
  getEventPriceFrom,
  getFormattedShowAt,
} from "../../../features/events/lib/eventSelectors.js";
import { buildUnsplashImageUrl } from "../../../utils/images.js";
import styles from "./EventCard.module.css";

export default function EventCard({ event, variant = "default" }) {
  if (!event) return null;

  const showCity = variant !== "featured";
  const eventVenue = getVenueName(event);
  const eventCity = showCity ? getVenueCity(event) : null;
  const locationText = showCity ? `${eventVenue} - ${eventCity}` : eventVenue;
  const eventPriceFrom = getEventPriceFrom(event);
  const isSoldOut = eventPriceFrom === null;

  const imgSrc = buildUnsplashImageUrl(event.imageUrl, {
    width: 400,
    quality: 70,
  });

  const isFeatured = event.isFeatured;

  const cardClassName = `${styles.card}
  ${variant === "listings" ? styles.listings : ""}
  ${variant === "suggested" ? styles.suggested : ""}
  ${isFeatured ? styles.featured : ""}`;

  const eventShortDate = getFormattedShowAt(event)?.shortDate;

  return (
    <Link to={`/events/${event.id}`} className={cardClassName}>
      <div className={styles.cardHeader}>
        {isFeatured && <span className={styles.featuredBadge}>Featured</span>}
        <img src={imgSrc} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={styles.cardInner}>
        <div className={styles.cardBody}>
          <div className={styles.meta}>
            <p className={styles.genres}>
              {event.genres.slice(0, 2).join(", ")}
            </p>

            <time className={styles.date}>{eventShortDate}</time>
          </div>
          <h3 className={styles.title}>{event.title}</h3>
          <div className={styles.location}>
            <span className={styles.icon}>
              <MapPin aria-hidden="true" />
            </span>
            <span className={styles.text}>{locationText}</span>
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.price}>
            {isSoldOut ? (
              <span className={styles.priceSoldOut}>Sold Out</span>
            ) : (
              <span className={styles.priceContent}>
                <span className={styles.priceValue}>${eventPriceFrom}</span>
                <span className={styles.priceSuffix}>/seat</span>
              </span>
            )}
          </div>
          {isSoldOut ? (
            <span className={`button ${styles.soldOutButton}`}>
              No Tickets Left
            </span>
          ) : (
            <span className="button button--secondary">Get Tickets</span>
          )}
        </div>
      </div>
    </Link>
  );
}
