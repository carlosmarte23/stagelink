import { Link } from "react-router-dom";
import styles from "./EventCard.module.css";

export default function EventCard({ event, variant }) {
  const showCity = variant !== "featured";
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(event.date));

  return (
    <>
      <Link to={`/events/${event.id}`} className={styles.card}>
        <div className={styles.cardHeader}>
          <img src={event.imageUrl} alt="" />
        </div>
        <div className={styles.cardInner}>
          <div className={styles.cardBody}>
            <div className={styles.meta}>
              <p className={styles.genres}>
                {event.genres.slice(0, 2).join(", ")}
              </p>

              <time className={styles.date}>{formattedDate}</time>
            </div>
            <h3 className={styles.title}>{event.title}</h3>
            <div className={styles.location}>
              <span className={styles.icon}>
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
              </span>
              <span className={styles.text}>
                {event.venueName}
                {showCity && event.city && ` · ${event.city}`}
              </span>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <p className={styles.price}>
              <span className={styles.priceValue}>${event.priceFrom}</span>
              <span className={styles.priceSuffix}>/seat</span>
            </p>
            <span className="button button--secondary">Get Tickets</span>
          </div>
        </div>
      </Link>
    </>
  );
}
