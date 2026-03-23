import styles from "./FeaturedEventsSection.module.css";
import EventCard from "../../events/EventCard/EventCard";
import { Link } from "react-router-dom";

export default function FeaturedEventsSection({ events }) {
  return (
    <section id="featured-events" className={styles.featuredSection}>
      <div className={styles.header}>
        <div className={styles.text}>
          <p className={styles.kicker}>Selected for you</p>
          <h2 className={styles.title}>Featured Events</h2>
        </div>
        <Link to="/events" className={styles.cta}>
          View all events
          <span className={styles.chevron}>
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
              <path d="M13 18l6 -6" />
              <path d="M13 6l6 6" />
            </svg>
          </span>
        </Link>
      </div>
      <div className={styles.featuredGrid}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} variant={"featured"} />
        ))}
      </div>
    </section>
  );
}
