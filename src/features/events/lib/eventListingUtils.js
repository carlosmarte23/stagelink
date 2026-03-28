export function getGenreOptions(events) {
  return [
    { value: "all", label: "All" },
    ...Array.from(new Set(events.flatMap((event) => event.genres)))
      .sort()
      .map((genre) => ({ value: genre.toLowerCase(), label: genre })),
  ];
}

export function getUpcomingEvents(events, now = new Date()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  return events.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate > today;
  });
}

// TODO: apply all filters
export function filterEvents(events, filters) {
  let filteredEvents = events;

  // genre
  if (filters.genre.toLowerCase() !== "all") {
    filteredEvents = filteredEvents.filter((event) =>
      event.genres.some((genre) => genre.toLowerCase() === filters.genre),
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
}

export function hasActiveFilters(filters, initialFilters) {
  return Object.keys(filters).some(
    (key) => filters[key] !== initialFilters[key],
  );
}
