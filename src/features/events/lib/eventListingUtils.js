import {
  getThisWeekendRange,
  getThisWeekRange,
  getNextSevenDays,
  getThisMonthRange,
  getNextThirtyDays,
  isEventInDateRange,
} from "../../../utils/dates.js";

import {
  getVenueCity,
  getVenueName,
  getEventPriceFrom,
} from "./eventSelectors.js";

//Events
export function getUpcomingEvents(events, now = new Date()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  return events
    .filter((event) => {
      const eventDate = new Date(event.startsAt);
      return eventDate > today;
    })
    .sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
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
      (event) => getVenueCity(event).toLowerCase() === filters.city,
    );
  }

  // venue
  if (filters.venue.toLowerCase() !== "all") {
    filteredEvents = filteredEvents.filter(
      (event) => getVenueName(event).toLowerCase() === filters.venue,
    );
  }

  // date range
  if (filters.dateRange.toLowerCase() === "any-date") {
    filteredEvents = filteredEvents.filter((event) => event.startsAt !== null);
  } else
    switch (filters.dateRange.toLowerCase()) {
      case "this-weekend": {
        const { start, end } = getThisWeekendRange(now);

        filteredEvents = filteredEvents.filter((event) =>
          isEventInDateRange(event.startsAt, start, end),
        );
        break;
      }
      case "this-week": {
        const { start, end } = getThisWeekRange(now);

        filteredEvents = filteredEvents.filter((event) =>
          isEventInDateRange(event.startsAt, start, end),
        );
        break;
      }
      case "next-seven-days":
        {
          const { start, end } = getNextSevenDays(now);

          filteredEvents = filteredEvents.filter((event) =>
            isEventInDateRange(event.startsAt, start, end),
          );
        }
        break;
      case "this-month":
        {
          const { start, end } = getThisMonthRange(now);
          filteredEvents = filteredEvents.filter((event) =>
            isEventInDateRange(event.startsAt, start, end),
          );
        }
        break;
      case "next-thirty-days":
        {
          const { start, end } = getNextThirtyDays(now);
          filteredEvents = filteredEvents.filter((event) =>
            isEventInDateRange(event.startsAt, start, end),
          );
        }
        break;
      default: {
        filteredEvents = filteredEvents.filter(
          (event) => event.startsAt !== null,
        );
      }
    }
  // price range
  filteredEvents = filteredEvents.filter(
    (event) =>
      getEventPriceFrom(event) >= filters.priceMin &&
      getEventPriceFrom(event) <= filters.priceMax,
  );

  return filteredEvents;
}

function getEventTime(event) {
  return new Date(event.startsAt).getTime();
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
      return sortedEvents.sort(
        (a, b) => getEventPriceFrom(a) - getEventPriceFrom(b),
      );
    case "price-high":
      return sortedEvents.sort(
        (a, b) => getEventPriceFrom(b) - getEventPriceFrom(a),
      );
    default:
      return sortedEvents;
  }
}

// Filters Options
function getOptionValue(event, type) {
  switch (type) {
    case "genres":
      return event.genres;
    case "venue":
      return getVenueName(event);
    case "city":
      return getVenueCity(event);
    default:
      return event[type];
  }
}
function enrichEventOptions(options, events, type, selectedValue) {
  const counts = {};

  events.forEach((event) => {
    if (type === "genres") {
      event.genres.forEach((genre) => {
        const key = genre.toLowerCase();
        counts[key] = (counts[key] ?? 0) + 1;
      });

      return;
    }

    const value = getOptionValue(event, type);
    if (!value) return;

    const key = value.toLowerCase();

    counts[key] = (counts[key] ?? 0) + 1;
  });

  return options.map((option) => {
    if (option.value === "all") {
      return { ...option, disabled: false, count: events.length };
    }

    const count = counts[option.value] ?? 0;

    return {
      ...option,
      disabled: count === 0 && option.value !== selectedValue,
      count,
    };
  });
}

export function getGenreOptions(events, filters, now = new Date()) {
  const baseOptions = [
    { value: "all", label: "All" },
    ...Array.from(new Set(events.flatMap((event) => event.genres)))
      .sort()
      .map((genre) => ({ value: genre.toLowerCase(), label: genre })),
  ];

  const availableEvents = filterEvents(
    events,
    { ...filters, genre: "all" },
    now,
  );

  return enrichEventOptions(
    baseOptions,
    availableEvents,
    "genres",
    filters.genre,
  );
}

export function getVenueOptions(events, filters, now = new Date()) {
  const baseOptions = [
    { value: "all", label: "All" },
    ...Array.from(new Set(events.flatMap((event) => getVenueName(event))))
      .sort()
      .map((venue) => ({ value: venue.toLowerCase(), label: venue })),
  ];

  const availableEvents = filterEvents(
    events,
    { ...filters, venue: "all" },
    now,
  );

  return enrichEventOptions(
    baseOptions,
    availableEvents,
    "venue",
    filters.venue,
  );
}

export function getCityOptions(events, filters, now = new Date()) {
  const baseOptions = [
    { value: "all", label: "All" },
    ...Array.from(new Set(events.flatMap((event) => getVenueCity(event))))
      .sort()
      .map((city) => ({ value: city.toLowerCase(), label: city })),
  ];

  const availableEvents = filterEvents(
    events,
    { ...filters, city: "all" },
    now,
  );

  return enrichEventOptions(baseOptions, availableEvents, "city", filters.city);
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
