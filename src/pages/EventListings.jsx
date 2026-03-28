import { useState, useEffect } from "react";

import EventsToolbar from "../components/events/EventsToolbar/EventsToolbar.jsx";
import EventsGrid from "../components/events/EventsGrid/EventsGrid.jsx";
import EventsFiltersPanel from "../components/events/EventsFiltersPanel/EventFiltersPanel.jsx";
import Pagination from "../components/shared/Pagination/Pagination.jsx";

import events from "../data/events.json";
import styles from "./EventListings.module.css";

import {
  INITIAL_FILTERS,
  DATE_RANGE_OPTIONS,
} from "../features/events/config/eventListingConfig.js";

import {
  getUpcomingEvents,
  getGenreOptions,
  filterEvents,
  hasActiveFilters,
} from "../features/events/lib/eventListingUtils.js";

export default function EventListings() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const genreOptions = getGenreOptions(events);
  const dateRangeOptions = DATE_RANGE_OPTIONS;

  const upcomingEvents = getUpcomingEvents(events);
  const filteredEvents = filterEvents(upcomingEvents, filters, new Date());
  const eventCount = filteredEvents.length;

  const isClearDisabled = !hasActiveFilters(filters, INITIAL_FILTERS);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const scrollPageToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    if (isFilterModalOpen) {
      setIsFilterModalOpen(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(scrollPageToTop);
      });

      return;
    }

    scrollPageToTop();
  };

  useEffect(() => {
    if (!isFilterModalOpen) return;

    const previousStyles = {
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };

    const scrollY = window.scrollY;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = previousStyles.overflow;
      document.body.style.position = previousStyles.position;
      document.body.style.top = previousStyles.top;
      document.body.style.width = previousStyles.width;
      window.scrollTo(0, scrollY);
    };
  }, [isFilterModalOpen]);

  const filtersPanelProps = {
    filters,
    genreOptions,
    onGenreChange: (value) => handleFilterChange("genre", value),
    dateRangeOptions,
    onDateRangeChange: (value) => handleFilterChange("dateRange", value),

    hasActiveFilters: !isClearDisabled,
    onClearFilters: handleClearFilters,
    eventCount,
  };

  return (
    <section className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          <EventsToolbar
            resultsCount={eventCount}
            onOpenFilters={() => setIsFilterModalOpen(true)}
            sortValue="recommended"
            onSortChange={() => {}}
          />

          <EventsGrid events={filteredEvents} />

          <Pagination />
        </div>

        <aside className={styles.desktopFilters}>
          <EventsFiltersPanel {...filtersPanelProps} />
        </aside>

        <div
          className={`${styles.mobileFiltersModal} ${isFilterModalOpen ? styles.open : ""}`}
          role="presentation"
        >
          <button
            type="button"
            className={styles.mobileFiltersBackdrop}
            aria-label="Close Filters"
            onClick={() => setIsFilterModalOpen(false)}
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
              onClick={() => setIsFilterModalOpen(false)}
            >
              Close
            </button>
            <div className={styles.mobileFiltersPanel}>
              <EventsFiltersPanel {...filtersPanelProps} isMobile={true} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
