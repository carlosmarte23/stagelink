import { useState } from "react";
import {
  ChevronDown,
  Music4,
  MapPin,
  Building2,
  CalendarDays,
  Coins,
} from "lucide-react";

import { getPriceRangeLabel } from "../../../features/events/lib/eventListingUtils.js";

import styles from "./EventFiltersPanel.module.css";

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
                  <Music4 />
                </span>
                <h3 className={styles.groupTitle}>Genres</h3>
              </span>
              <span
                className={`${styles.groupChevron} ${openSections.genres ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <ChevronDown />
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
                  <MapPin />
                </span>
                <h3 className={styles.groupTitle}>City</h3>
              </div>
              <span
                className={`${styles.groupChevron} ${openSections.city ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <ChevronDown />
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
                  <Building2 />
                </span>
                <h3 className={styles.groupTitle}>Venue</h3>
              </div>
              <span
                className={`${styles.groupChevron} ${openSections.venue ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <ChevronDown />
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
                  <CalendarDays />
                </span>
                <h3 className={styles.groupTitle}>Date Range</h3>
              </div>
              <span
                className={`${styles.groupChevron} ${openSections.dateRange ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <ChevronDown />
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
                  <Coins />
                </span>
                <h3 className={styles.groupTitle}>Price Range</h3>
              </div>
              <span
                className={`${styles.groupChevron} ${openSections.priceRange ? styles.groupChevronOpen : ""}`}
                aria-hidden="true"
              >
                <ChevronDown />
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
