import { SearchAlert } from "lucide-react";

import EventCard from "../EventCard/EventCard";
import styles from "./EventsEmptyState.module.css";

export default function EventsEmptyState({ suggestedEvents, onClearFilters }) {
  const handleResetClick = (e) => {
    e.preventDefault();
    onClearFilters();
  };

  return (
    <section className={styles.section}>
      <div id="no-events" className={styles.noEvents}>
        <div className={styles.image} aria-hidden="true">
          <SearchAlert />
        </div>
        <h1 className={styles.title}>No events found</h1>
        <p className={styles.description}>
          Try adjusting your filters to find what you&apos;re looking for. The
          night is young and there&apos;s always something happening.
        </p>

        <button
          type="button"
          onClick={handleResetClick}
          className={`button button--primary ${styles.button}`}
        >
          Reset Filters
        </button>
      </div>
      <div className={styles.suggestions}>
        <div className={styles.suggestionsHeader}>
          <h2 className={styles.suggestionsTitle}>Featured picks for you</h2>
          <span className={styles.suggestionsLine} aria-hidden="true" />
        </div>
        <div className={styles.suggestionsGrid}>
          {suggestedEvents.map((event) => (
            <EventCard key={event.id} event={event} variant="suggested" />
          ))}
        </div>
      </div>
    </section>
  );
}
