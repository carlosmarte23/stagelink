import { useState, useEffect } from "react";

import EventsToolbar from "../components/events/EventsToolbar/EventsToolbar.jsx";
import EventsGrid from "../components/events/EventsGrid/EventsGrid.jsx";
import EventsFiltersPanel from "../components/events/EventsFiltersPanel/EventFiltersPanel.jsx";
import Pagination from "../components/shared/Pagination/Pagination.jsx";

import events from "../data/events.json";
import styles from "./EventListings.module.css";

export default function EventListings() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Filters
  const INITIAL_FILTERS = {
    genre: "all",
    dateRange: "any-date",
    priceMin: 0,
    priceMax: 250,
  };

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  const genreOptions = [
    { value: "all", label: "All" },
    ...Array.from(new Set(events.flatMap((event) => event.genres)))
      .sort()
      .map((genre) => ({ value: genre.toLowerCase(), label: genre })),
  ];
  // Upcoming events

  const upcomingEvents = events.filter((event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date);
    return eventDate > today;
  });

  const filterEvents = (events, filters) => {
    let filteredEvents = events;

    // genre
    if (filters.genre.toLowerCase() !== "all") {
      filteredEvents = filteredEvents.filter((event) =>
        event.genres.some(
          (genre) => genre.toLowerCase() === filters.genre.toLowerCase(),
        ),
      );
    }

    // date range
    if (filters.dateRange.toLowerCase() === "any-date") {
      filteredEvents = filteredEvents.filter((event) => event.date !== null);
    } // TODO: implement date range filter with predefined ranges on UI.

    // price range
    filteredEvents = filteredEvents.filter(
      (event) =>
        event.priceFrom >= filters.priceMin &&
        event.priceFrom <= filters.priceMax,
    );

    return filteredEvents;
  };

  const filteredEvents = filterEvents(events, filters); // TODO: apply filters
  const eventCount = filteredEvents.length;

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
          <EventsFiltersPanel
            filters={filters}
            genreOptions={genreOptions}
            onGenreChange={(value) => handleFilterChange("genre", value)}
            hasActiveFilters={hasActiveFilters}
            eventCount={eventCount}
          />
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
              <EventsFiltersPanel
                filters={filters}
                genreOptions={genreOptions}
                onGenreChange={(value) => handleFilterChange("genre", value)}
                hasActiveFilters={hasActiveFilters}
                eventCount={eventCount}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
