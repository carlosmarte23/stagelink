import {
  getThisWeekendRange,
  getThisWeekRange,
  getNextSevenDays,
  getThisMonthRange,
  getNextThirtyDays,
  isEventInDateRange,
} from "../../../utils/dates.js";

export function getGenreOptions(events) {
  return [
    { value: "all", label: "All" },
    ...Array.from(new Set(events.flatMap((event) => event.genres)))
      .sort()
      .map((genre) => ({ value: genre.toLowerCase(), label: genre })),
  ];
}

export function getVenueOptions(events) {
  return [
    { value: "all", label: "All" },
    ...Array.from(new Set(events.flatMap((event) => event.venue)))
      .sort()
      .map((venue) => ({ value: venue.toLowerCase(), label: venue })),
  ];
}

export function getCityOptions(events) {
  return [
    { value: "all", label: "All" },
    ...Array.from(new Set(events.flatMap((event) => event.city)))
      .sort()
      .map((city) => ({ value: city.toLowerCase(), label: city })),
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

export function filterEvents(events, filters, now = new Date()) {
  let filteredEvents = events;

  // genre
  if (filters.genre.toLowerCase() !== "all") {
    filteredEvents = filteredEvents.filter((event) =>
      event.genres.some((genre) => genre.toLowerCase() === filters.genre),
    );
  }

  // city
  if (filters.city.toLowerCase() !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) => event.city.toLowerCase() === filters.city,
    );
  }

  // venue
  if (filters.venue.toLowerCase() !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) => event.venue.toLowerCase() === filters.venue,
    );
  }

  // date range
  if (filters.dateRange.toLowerCase() === "any-date") {
    filteredEvents = filteredEvents.filter((event) => event.date !== null);
  } else
    switch (filters.dateRange.toLowerCase()) {
      case "this-weekend": {
        const { start, end } = getThisWeekendRange(now);

        filteredEvents = filteredEvents.filter((event) =>
          isEventInDateRange(event.date, start, end),
        );
        break;
      }
      case "this-week": {
        const { start, end } = getThisWeekRange(now);

        filteredEvents = filteredEvents.filter((event) =>
          isEventInDateRange(event.date, start, end),
        );
        break;
      }
      case "next-seven-days":
        {
          const { start, end } = getNextSevenDays(now);

          filteredEvents = filteredEvents.filter((event) =>
            isEventInDateRange(event.date, start, end),
          );
        }
        break;
      case "this-month":
        {
          const { start, end } = getThisMonthRange(now);
          filteredEvents = filteredEvents.filter((event) =>
            isEventInDateRange(event.date, start, end),
          );
        }
        break;
      case "next-thirty-days":
        {
          const { start, end } = getNextThirtyDays(now);
          filteredEvents = filteredEvents.filter((event) =>
            isEventInDateRange(event.date, start, end),
          );
        }
        break;
      default: {
        filteredEvents = filteredEvents.filter((event) => event.date !== null);
      }
    }
  // price range
  filteredEvents = filteredEvents.filter(
    (event) =>
      event.priceFrom >= filters.priceMin &&
      event.priceFrom <= filters.priceMax,
  );

  return filteredEvents;
}

function getEventTime(event) {
  return new Date(event.date).getTime();
}

export function sortEvents(events, sortOption) {
  const sortedEvents = [...events];

  switch (sortOption) {
    case "date":
      return sortedEvents.sort((a, b) => getEventTime(a) - getEventTime(b));
    case "recommended":
      sortedEvents.sort((a, b) => {
        const aFeatured = Boolean(a.isFeatured);
        const bFeatured = Boolean(b.isFeatured);
        if (aFeatured !== bFeatured) {
          return aFeatured ? -1 : 1;
        }

        return getEventTime(a) - getEventTime(b);
      });
      return sortedEvents;
    case "price-low":
      return sortedEvents.sort((a, b) => a.priceFrom - b.priceFrom);
    case "price-high":
      return sortedEvents.sort((a, b) => b.priceFrom - a.priceFrom);
    default:
      return sortedEvents;
  }
}

export function getPriceRangeLabel(filters, priceRange) {
  const { priceMin, priceMax } = filters;
  if (priceMin === priceRange.min && priceMax === priceRange.max) {
    return "Any price";
  } else if (priceMin === priceRange.min) {
    return `Up to $${priceMax}`;
  } else if (priceMax === priceRange.max) {
    return `From $${priceMin}`;
  } else {
    return `$${priceMin} - $${priceMax}`;
  }
}

export function hasActiveFilters(filters, initialFilters) {
  return Object.keys(filters).some(
    (key) => filters[key] !== initialFilters[key],
  );
}
