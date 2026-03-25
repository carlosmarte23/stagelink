import EventsToolbar from "../components/events/EventsToolbar/EventsToolbar.jsx";
import EventsGrid from "../components/events/EventsGrid/EventsGrid.jsx";

import events from "../data/events.json";
import styles from "./EventListings.module.css";

export default function EventListings() {
  const eventsSample = events.slice(0, 10);

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

          <EventsGrid events={eventsSample} />

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
