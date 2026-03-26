import { useState } from "react";

import EventsToolbar from "../components/events/EventsToolbar/EventsToolbar.jsx";
import EventsGrid from "../components/events/EventsGrid/EventsGrid.jsx";
import EventsFiltersPanel from "../components/events/EventsFiltersPanel/EventFiltersPanel.jsx";

import events from "../data/events.json";
import styles from "./EventListings.module.css";

export default function EventListings() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filteredEvents = events; // TODO: apply filters
  const eventCount = filteredEvents.length;

  const eventsSample = events.slice(0, 10); // TODO: apply pagination

  return (
    <section className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <EventsToolbar
            resultsCount={eventCount}
            onOpenFilters={() => setIsFilterOpen(true)}
            sortValue="recommended"
            onSortChange={() => {}}
          />

          <EventsGrid events={eventsSample} />

          <div className={styles.pagination}>Pagination Component</div>
        </div>

        <aside className={styles.desktopFilters}>
          <EventsFiltersPanel eventCount={eventCount} />
        </aside>

        {isFilterOpen && (
          <div className={styles.mobileFiltersModal} role="presentation">
            <button
              type="button"
              className={styles.mobileFiltersBackdrop}
              aria-label="Close Filters"
              onClick={() => setIsFilterOpen(false)}
            />

            <div
              className={styles.mobileFiltersShell}
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
            >
              <button
                type="button"
                className={`button ${styles.mobileFiltersClose}`}
                onClick={() => setIsFilterOpen(false)}
              >
                Close
              </button>
              <div className={styles.mobileFiltersPanel}>
                <EventsFiltersPanel eventCount={eventCount} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
