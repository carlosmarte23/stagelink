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
          className={styles.filtersButton}
        >
          Filters
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
