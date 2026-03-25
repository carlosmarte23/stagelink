import EventsToolbar from "../components/events/EventsToolbar/EventsToolbar.jsx";

import styles from "./EventListings.module.css";

export default function EventListings() {
  return (
    <section className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <EventsToolbar
            resultsCount={40}
            onOpenFilters={() => {}}
            sortValue="recommended"
            onSortChange={() => {}}
          />
          <div className={styles.eventsList}>EventsList component</div>
          <div className={styles.pagination}>Pagination Component</div>
        </div>

        <aside className={styles.desktopFilters}>
          EventFiltersPanel Component
        </aside>

        <div className={styles.mobileFiltersDialog}>
          Mobile Filters Dialog Component
        </div>
      </div>
    </section>
  );
}
