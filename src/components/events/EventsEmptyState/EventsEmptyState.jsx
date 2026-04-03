import EventCard from "../EventCard/EventCard";
import styles from "./EventsEmptyState.module.css";

export default function EventsEmptyState({ suggestedEvents, onClearFilters }) {
  const handleResetClick = (e) => {
    e.preventDefault();
    onClearFilters();
  };

  return (
    <section className={styles.section}>
      <div className={styles.noEvents}>
        <div className={styles.image}>
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
            <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
            <path d="M10 13v.01" />
            <path d="M10 7v3" />
          </svg>
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
