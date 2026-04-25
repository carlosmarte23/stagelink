import { Filter } from "lucide-react";
import { SORT_OPTIONS } from "../../../features/events/config/eventListingConfig";

import styles from "./EventsToolbar.module.css";

export default function EventsToolbar({
  resultsCount,
  totalCount,
  onOpenFilters,
  sortValue,
  onSortChange,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upcoming Events</h1>
        <p
          className={styles.results}
        >{`(Showing ${resultsCount} of ${totalCount} events)`}</p>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={onOpenFilters}
          className={`button ${styles.filtersButton}`}
        >
          <span className={styles.filtersIcon} aria-hidden="true">
            <Filter />
          </span>
          <span>Filters</span>
        </button>
        <div className={styles.sortField}>
          <label htmlFor="event-sort" className={styles.sortLabel}>
            Sort by:
          </label>
          <select
            id="event-sort"
            value={sortValue}
            onChange={onSortChange}
            className={styles.sortSelect}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
