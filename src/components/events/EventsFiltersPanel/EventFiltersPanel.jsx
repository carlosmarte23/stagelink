import { useState } from "react";
import styles from "./EventFiltersPanel.module.css";
import { getPriceRangeLabel } from "../../../features/events/lib/eventListingUtils.js";

export default function EventFiltersPanel({
  filters,
  genreOptions,
  onGenreChange,
  venueOptions,
  onVenueChange,
  cityOptions,
  onCityChange,
  dateRangeOptions,
  onDateRangeChange,
  priceRange,
  onMinPriceChange,
  onMaxPriceChange,
  hasActiveFilters,
  onClearFilters,
  eventCount,
  isMobile,
}) {
  const [openSections, setOpenSections] = useState({
    genres: !isMobile,
    venue: !isMobile,
    city: !isMobile,
    dateRange: !isMobile,
    priceRange: !isMobile,
  });

  const toggleSection = (section) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [section]: !prevOpenSections[section],
    }));
  };

  const range = priceRange.max - priceRange.min;
  const minPercent = ((filters.priceMin - priceRange.min) / range) * 100;
  const maxPercent = ((filters.priceMax - priceRange.min) / range) * 100;

  const priceRangeLabel = getPriceRangeLabel(filters, priceRange);

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <p
          className={styles.subtitle}
        >{`Refine ${eventCount} upcoming events`}</p>
      </div>
      <div className={`${styles.scrollBody}`}>
        <div className={`${styles.groups}`}>
          <section
            className={`${styles.group} ${!openSections.genres && styles.groupCollapsed}`}
          >
            <button
              type="button"
              onClick={() => toggleSection("genres")}
              aria-expanded={openSections.genres}
              aria-controls={`genres-section-${isMobile ? "mobile" : "desktop"}`}
              className={styles.groupHeaderButton}
            >
              <span className={styles.groupHeader}>
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
              </span>
              <span
                className={`${styles.groupChevron} ${openSections.genres ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 9l6 6l6 -6" />
                </svg>
              </span>
            </button>
            <div
              id={`genres-section-${isMobile ? "mobile" : "desktop"}`}
              className={`${styles.groupContentWrap} ${!openSections.genres ? styles.groupContentWrapCollapsed : ""}`}
            >
              <div className={styles.groupContent}>
                <div className={styles.chips}>
                  {genreOptions.map((genre) => {
                    const isActive = genre.value === filters.genre;
                    const isDisabled = genre.disabled && genre.value !== "all";

                    return (
                      <button
                        key={genre.value}
                        type="button"
                        onClick={() => onGenreChange(genre.value)}
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                        className={`${styles.chip} ${isActive ? styles.chipActive : ""} ${isDisabled ? styles.chipDisabled : ""}`}
                      >
                        {genre.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section
            className={`${styles.group} ${!openSections.city && styles.groupCollapsed}`}
          >
            <button
              type="button"
              onClick={() => toggleSection("city")}
              aria-expanded={openSections.city}
              aria-controls={`city-section-${isMobile ? "mobile" : "desktop"}`}
              className={styles.groupHeaderButton}
            >
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
                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                    <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />
                  </svg>
                </span>
                <h3 className={styles.groupTitle}>City</h3>
              </div>
              <span
                className={`${styles.groupChevron} ${openSections.city ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 9l6 6l6 -6" />
                </svg>
              </span>
            </button>

            <div
              id={`city-section-${isMobile ? "mobile" : "desktop"}`}
              className={`${styles.groupContentWrap} ${!openSections.city ? styles.groupContentWrapCollapsed : ""}`}
            >
              <div className={styles.groupContent}>
                <div className={styles.chips}>
                  {cityOptions.map((city) => {
                    const isActive = city.value === filters.city;
                    const isDisabled = city.disabled && city.value !== "all";
                    return (
                      <button
                        key={city.value}
                        type="button"
                        onClick={() => onCityChange(city.value)}
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                        className={`${styles.chip} ${isActive ? styles.chipActive : ""} ${isDisabled ? styles.chipDisabled : ""}`}
                      >
                        {city.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section
            className={`${styles.group} ${!openSections.venue && styles.groupCollapsed}`}
          >
            <button
              type="button"
              onClick={() => toggleSection("venue")}
              aria-expanded={openSections.venue}
              aria-controls={`venue-section-${isMobile ? "mobile" : "desktop"}`}
              className={styles.groupHeaderButton}
            >
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
                    <path d="M3 21l18 0" />
                    <path d="M9 8l1 0" />
                    <path d="M9 12l1 0" />
                    <path d="M9 16l1 0" />
                    <path d="M14 8l1 0" />
                    <path d="M14 12l1 0" />
                    <path d="M14 16l1 0" />
                    <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16" />
                  </svg>
                </span>
                <h3 className={styles.groupTitle}>Venue</h3>
              </div>
              <span
                className={`${styles.groupChevron} ${openSections.venue ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 9l6 6l6 -6" />
                </svg>
              </span>
            </button>

            <div
              id={`venue-section-${isMobile ? "mobile" : "desktop"}`}
              className={`${styles.groupContentWrap} ${!openSections.venue ? styles.groupContentWrapCollapsed : ""}`}
            >
              <div className={styles.groupContent}>
                <div className={styles.chips}>
                  {venueOptions.map((venue) => {
                    const isActive = venue.value === filters.venue;
                    const isDisabled = venue.disabled && venue.value !== "all";
                    return (
                      <button
                        key={venue.value}
                        type="button"
                        onClick={() => onVenueChange(venue.value)}
                        disabled={isDisabled}
                        aria-disabled={isDisabled}
                        className={`${styles.chip} ${isActive ? styles.chipActive : ""} ${isDisabled ? styles.chipDisabled : ""}`}
                      >
                        {venue.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section
            className={`${styles.group} ${!openSections.dateRange && styles.groupCollapsed}`}
          >
            <button
              type="button"
              onClick={() => toggleSection("dateRange")}
              aria-expanded={openSections.dateRange}
              aria-controls={`dateRange-section-${isMobile ? "mobile" : "desktop"}`}
              className={styles.groupHeaderButton}
            >
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
              <span
                className={`${styles.groupChevron} ${openSections.dateRange ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 9l6 6l6 -6" />
                </svg>
              </span>
            </button>

            <div
              id={`dateRange-section-${isMobile ? "mobile" : "desktop"}`}
              className={`${styles.groupContentWrap} ${!openSections.dateRange ? styles.groupContentWrapCollapsed : ""}`}
            >
              <div className={styles.groupContent}>
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
                </div>
              </div>
            </div>
          </section>

          <section
            className={`${styles.group} ${!openSections.priceRange && styles.groupCollapsed}`}
          >
            <button
              type="button"
              onClick={() => toggleSection("priceRange")}
              aria-expanded={openSections.priceRange}
              aria-controls={`priceRange-section-${isMobile ? "mobile" : "desktop"}`}
              className={styles.groupHeaderButton}
            >
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
              <span
                className={`${styles.groupChevron} ${openSections.priceRange ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M6 9l6 6l6 -6" />
                </svg>
              </span>
            </button>

            <div
              id={`priceRange-section-${isMobile ? "mobile" : "desktop"}`}
              className={`${styles.groupContentWrap} ${!openSections.priceRange ? styles.groupContentWrapCollapsed : ""}`}
            >
              <div className={styles.groupContent}>
                <div className={styles.dateOptions}>
                  <div className={styles.priceRangeLabel}>
                    <p>{priceRangeLabel}</p>
                  </div>
                  <div className={styles.priceRange}>
                    <div className={styles.rangeTrack} aria-hidden="true">
                      <span className={styles.rangeTrackInactive} />
                      <span
                        style={{
                          left: `${minPercent}%`,
                          right: `${100 - maxPercent}%`,
                        }}
                        className={styles.rangeTrackActive}
                      />
                      <input
                        min={priceRange.min}
                        max={priceRange.max}
                        step={priceRange.step}
                        value={filters.priceMin}
                        onChange={(e) => onMinPriceChange(e.target.value)}
                        type="range"
                        aria-label="Min Price"
                        className={`${styles.rangeInput} ${styles.rangeInputMin}`}
                      />
                      <input
                        min={priceRange.min}
                        max={priceRange.max}
                        step={priceRange.step}
                        value={filters.priceMax}
                        onChange={(e) => onMaxPriceChange(e.target.value)}
                        type="range"
                        aria-label="Max Price"
                        className={`${styles.rangeInput} ${styles.rangeInputMax}`}
                      />
                    </div>

                    <div className={styles.rangeLabels}>
                      <span
                        className={styles.rangeLabel}
                      >{`$${priceRange.min}`}</span>
                      <span
                        className={styles.rangeLabel}
                      >{`$${priceRange.max}`}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
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
