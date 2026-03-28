import styles from "./EventFiltersPanel.module.css";

export default function EventFiltersPanel({
  filters,
  genreOptions,
  onGenreChange,
  dateRangeOptions,
  onDateRangeChange,
  hasActiveFilters,
  onClearFilters,
  eventCount,
  isMobile,
}) {
  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <p
          className={styles.subtitle}
        >{`Refine ${eventCount} upcoming events`}</p>
      </div>
      <div className={styles.groups}>
        <section className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={styles.groupIcon} aria-hidden="true">
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
                <path d="M3 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M13 17a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M9 17v-13h10v13" />
                <path d="M9 8h10" />
              </svg>
            </span>
            <h3 className={styles.groupTitle}>Genres</h3>
          </div>
          <div className={styles.chips}>
            {genreOptions.map((genre) => {
              const isActive = genre.value === filters.genre;
              return (
                <button
                  key={genre.value}
                  type="button"
                  onClick={() => onGenreChange(genre.value)}
                  className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                >
                  {genre.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={styles.groupIcon} aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M16 2a1 1 0 0 1 .993 .883l.007 .117v1h1a3 3 0 0 1 2.995 2.824l.005 .176v12a3 3 0 0 1 -2.824 2.995l-.176 .005h-12a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-12a3 3 0 0 1 2.824 -2.995l.176 -.005h1v-1a1 1 0 0 1 1.993 -.117l.007 .117v1h6v-1a1 1 0 0 1 1 -1m3 8h-14v8.625c0 .705 .386 1.286 .883 1.366l.117 .009h12c.513 0 .936 -.53 .993 -1.215l.007 -.16zm-9 4a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-2a1 1 0 0 1 1 -1z" />
              </svg>
            </span>
            <h3 className={styles.groupTitle}>Date Range</h3>
          </div>
          <div className={styles.dateOptions}>
            {dateRangeOptions.map((dateRange) => {
              const isActive = dateRange.value === filters.dateRange;
              return (
                <label key={dateRange.value} className={styles.option}>
                  <input
                    type="radio"
                    name={`dateRange-${isMobile ? "mobile" : "desktop"}`}
                    checked={isActive}
                    onChange={() => onDateRangeChange(dateRange.value)}
                    value={dateRange.value}
                  />
                  <span>{dateRange.label}</span>
                </label>
              );
            })}
            {/* <label className={styles.option}>
              <input type="radio" name="dateRange" checked readOnly />
              <span>Any Date</span>
            </label>

            <label className={styles.option}>
              <input type="radio" name="dateRange" />
              <span>This Weekend</span>
            </label>

            <label className={styles.option}>
              <input type="radio" name="dateRange" />
              <span>Next 7 Days</span>
            </label>

            <label className={styles.option}>
              <input type="radio" name="dateRange" />
              <span>This Month</span>
            </label>

            <label className={styles.option}>
              <input type="radio" name="dateRange" />
              <span>Next Month</span>
            </label> */}
          </div>
        </section>

        <section className={styles.group}>
          <div className={styles.groupHeader}>
            <span className={styles.groupIcon} aria-hidden="true">
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
                <path d="M7 15h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v3" />
                <path d="M7 10a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1l0 -8" />
                <path d="M12 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
              </svg>
            </span>
            <h3 className={styles.groupTitle}>Price Range</h3>
          </div>
          <div className={styles.priceRange}>
            <div className={styles.rangeTrack} aria-hidden="true">
              <span className={styles.rangeTrackInactive} />
              <span className={styles.rangeTrackActive} />
              <span
                className={`${styles.rangeThumb} ${styles.rangeThumbMin}`}
              />
              <span
                className={`${styles.rangeThumb} ${styles.rangeThumbMax}`}
              />
            </div>
            <div className={styles.rangeLabels}>
              <span className={styles.rangeLabel}>$40</span>
              <span className={styles.rangeLabel}>$250+</span>
            </div>
          </div>
        </section>
      </div>
      <button
        type="button"
        disabled={!hasActiveFilters}
        aria-disabled={!hasActiveFilters}
        onClick={onClearFilters}
        className={`button ${styles.clearButton}`}
      >
        Clear All
      </button>
    </div>
  );
}
