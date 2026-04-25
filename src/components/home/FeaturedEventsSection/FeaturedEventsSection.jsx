import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import EventCard from "../../events/EventCard/EventCard";

import styles from "./FeaturedEventsSection.module.css";

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
            <ArrowRight />
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
