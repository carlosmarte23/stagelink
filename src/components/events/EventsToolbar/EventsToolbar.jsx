import styles from "./EventsToolbar.module.css";

export default function EventsToolbar({
  resultsCount,
  onOpenFilters,
  sortValue,
  onSortChange,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upcoming Events</h1>
        <p className={styles.results}>{`(${resultsCount} results)`}</p>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={onOpenFilters}
          className={`button ${styles.filtersButton}`}
        >
          <span className={styles.filtersIcon} aria-hidden="true">
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
              <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227" />
            </svg>
          </span>
          <span>Filters</span>
        </button>
        <label className={styles.sortLabel}>
          <span className={styles.srOnly}>Sort Events</span>
          <select
            value={sortValue}
            onChange={onSortChange}
            className={styles.sortSelect}
          >
            <option value="recommended">Recommended</option>
            <option value="date">Date</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </label>
      </div>
    </div>
  );
}
