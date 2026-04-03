import { useState, useEffect } from "react";

import EventsToolbar from "../components/events/EventsToolbar/EventsToolbar.jsx";
import EventsGrid from "../components/events/EventsGrid/EventsGrid.jsx";
import EventsEmptyState from "../components/events/EventsEmptyState/EventsEmptyState.jsx";
import EventsFiltersPanel from "../components/events/EventsFiltersPanel/EventFiltersPanel.jsx";
import Pagination from "../components/shared/Pagination/Pagination.jsx";

import events from "../data/events.json";
import styles from "./EventListings.module.css";

import {
  INITIAL_FILTERS,
  INITIAL_SORT_OPTION,
  DATE_RANGE_OPTIONS,
  PRICE_RANGE,
  EVENTS_PER_PAGE,
} from "../features/events/config/eventListingConfig.js";

import {
  getUpcomingEvents,
  getGenreOptions,
  getVenueOptions,
  getCityOptions,
  filterEvents,
  sortEvents,
  hasActiveFilters,
} from "../features/events/lib/eventListingUtils.js";

export default function EventListings() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [sortValue, setSortValue] = useState(INITIAL_SORT_OPTION);
  const [currentPage, setCurrentPage] = useState(1);

  const upcomingEvents = getUpcomingEvents(events);
  const suggestedEvents = upcomingEvents.slice(0, 3);

  const dateRangeOptions = DATE_RANGE_OPTIONS;
  const genreOptions = getGenreOptions(upcomingEvents);
  const venueOptions = getVenueOptions(upcomingEvents);
  const cityOptions = getCityOptions(upcomingEvents);

  const filteredEvents = filterEvents(upcomingEvents, filters, new Date());

  const sortedEvents = sortEvents(filteredEvents, sortValue);
  const eventsCount = sortedEvents.length;

  const isClearDisabled = !hasActiveFilters(filters, INITIAL_FILTERS);

  // pagination
  const totalPages = Math.ceil(eventsCount / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;

  const paginatedEvents = sortedEvents.slice(startIndex, endIndex);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));

    setCurrentPage(1);
  };

  const handleMinPriceChange = (value) => {
    const priceMin = Number(value);

    if (priceMin < PRICE_RANGE.min) return;

    if (priceMin <= filters.priceMax - PRICE_RANGE.step) {
      handleFilterChange("priceMin", priceMin);
    }
  };

  const handleMaxPriceChange = (value) => {
    const priceMax = Number(value);

    if (priceMax > PRICE_RANGE.max) return;

    if (priceMax >= filters.priceMin + PRICE_RANGE.step) {
      handleFilterChange("priceMax", priceMax);
    }
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
    if (isFilterModalOpen) {
      setIsFilterModalOpen(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(scrollPageToTop);
      });

      return;
    }

    scrollPageToTop();
  };

  const handleSortChange = (value) => {
    setSortValue(value);
    setCurrentPage(1);
  };

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  const scrollPageToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
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
    venueOptions,
    onVenueChange: (value) => handleFilterChange("venue", value),
    cityOptions,
    onCityChange: (value) => handleFilterChange("city", value),
    dateRangeOptions,
    onDateRangeChange: (value) => handleFilterChange("dateRange", value),
    priceRange: PRICE_RANGE,
    onMinPriceChange: handleMinPriceChange,
    onMaxPriceChange: handleMaxPriceChange,
    hasActiveFilters: !isClearDisabled,
    onClearFilters: handleClearFilters,
    eventCount: eventsCount,
    isMobile: false,
  };

  return (
    <section className={styles.page}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.content}>
          {eventsCount > 0 && (
            <EventsToolbar
              resultsCount={eventsCount}
              onOpenFilters={() => setIsFilterModalOpen(true)}
              sortValue={sortValue}
              onSortChange={(e) => handleSortChange(e.target.value)}
            />
          )}

          {eventsCount === 0 ? (
            <EventsEmptyState
              suggestedEvents={suggestedEvents}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <EventsGrid events={paginatedEvents} />
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
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
