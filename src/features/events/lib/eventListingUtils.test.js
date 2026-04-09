import { describe, expect, it } from "vitest";
import {
  getUpcomingEvents,
  filterEvents,
  sortEvents,
  getPriceRangeLabel,
  hasActiveFilters,
  getGenreOptions,
  getCityOptions,
  getVenueOptions,
} from "./eventListingUtils.js";

function makeDate(
  year,
  month,
  day,
  hours = 0,
  minutes = 0,
  seconds = 0,
  ms = 0,
) {
  return new Date(year, month, day, hours, minutes, seconds, ms);
}

const now = makeDate(2026, 3, 8, 12, 0);

function createEvents() {
  return [
    {
      id: "evt_001",
      title: "Past Rock Night",
      startsAt: "2026-04-06T20:00:00.000Z", // past
      timezone: "America/New_York",
      venue: {
        name: "Skyline Hall",
        city: "Lancaster",
        address: "101 Main Street, Lancaster, PA 17602",
      },
      ticketTiers: [
        { id: "general", name: "General", price: 25, remaining: 80 },
      ],
      genres: ["Rock"],
      isFeatured: false,
    },
    {
      id: "evt_002",
      title: "Midweek Pop Show",
      startsAt: "2026-04-09T20:00:00.000Z", // this week
      timezone: "America/New_York",
      venue: {
        name: "Skyline Hall",
        city: "Lancaster",
        address: "101 Main Street, Lancaster, PA 17602",
      },
      ticketTiers: [
        { id: "general", name: "General", price: 40, remaining: 120 },
        { id: "vip", name: "VIP", price: 80, remaining: 24 },
      ],
      genres: ["Pop"],
      isFeatured: true,
    },
    {
      id: "evt_003",
      title: "Friday EDM Rush",
      startsAt: "2026-04-10T22:00:00.000Z", // this weekend
      timezone: "America/New_York",
      venue: {
        name: "River Center",
        city: "Philadelphia",
        address: "220 River Road, Philadelphia, PA 19106",
      },
      ticketTiers: [
        { id: "general", name: "General", price: 65, remaining: 90 },
        { id: "vip", name: "VIP", price: 120, remaining: 18 },
      ],
      genres: ["Electronic", "EDM"],
      isFeatured: false,
    },
    {
      id: "evt_004",
      title: "Saturday Latin Fest",
      startsAt: "2026-04-11T19:00:00.000Z", // this weekend
      timezone: "America/New_York",
      venue: {
        name: "River Center",
        city: "Philadelphia",
        address: "220 River Road, Philadelphia, PA 19106",
      },
      ticketTiers: [
        { id: "general", name: "General", price: 95, remaining: 60 },
        { id: "vip", name: "VIP", price: 150, remaining: 10 },
      ],
      genres: ["Latin", "Pop"],
      isFeatured: true,
    },
    {
      id: "evt_005",
      title: "Sunday Jazz Brunch",
      startsAt: "2026-04-12T16:00:00.000Z", // this weekend
      timezone: "America/New_York",
      venue: {
        name: "Blue Note Room",
        city: "New York",
        address: "55 Broadway, New York, NY 10004",
      },
      ticketTiers: [
        { id: "general", name: "General", price: 55, remaining: 100 },
      ],
      genres: ["Jazz"],
      isFeatured: false,
    },
    {
      id: "evt_006",
      title: "Next Week Indie Lights",
      startsAt: "2026-04-15T20:00:00.000Z", // next seven days boundary area
      timezone: "America/New_York",
      venue: {
        name: "Blue Note Room",
        city: "New York",
        address: "55 Broadway, New York, NY 10004",
      },
      ticketTiers: [
        { id: "general", name: "General", price: 70, remaining: 75 },
      ],
      genres: ["Indie", "Rock"],
      isFeatured: true,
    },
    {
      id: "evt_007",
      title: "Late April Hip-Hop Takeover",
      startsAt: null, // null date case
      timezone: "America/New_York",
      venue: {
        name: "Capital Stage",
        city: "Washington",
        address: "10 Liberty Avenue, Washington, DC 20001",
      },
      ticketTiers: [
        { id: "general", name: "General", price: 110, remaining: 50 },
      ],
      genres: ["Hip-Hop"],
      isFeatured: false,
    },
    {
      id: "evt_008",
      title: "Date TBA Acoustic Session",
      startsAt: "2026-05-01T21:00:00.000Z", // inside next thirty days, outside next seven
      timezone: "America/New_York",
      venue: {
        name: "Skyline Hall",
        city: "Lancaster",
        address: "101 Main Street, Lancaster, PA 17602",
      },
      ticketTiers: [
        { id: "general", name: "General", price: 35, remaining: 64 },
      ],
      genres: ["Acoustic", "Folk"],
      isFeatured: false,
    },
  ];
}

function getSortableEvents() {
  return createEvents().filter((event) => event.startsAt !== null);
}

const baseFilters = {
  genre: "all",
  city: "all",
  venue: "all",
  dateRange: "any-date",
  priceMin: 0,
  priceMax: 500,
};

function getFilteredIds(filters) {
  const events = createEvents();
  return filterEvents(events, filters, now).map((event) => event.id);
}

describe("getUpcomingEvents", () => {
  it("returns the events that are not in the past", () => {
    const events = createEvents();
    const result = getUpcomingEvents(events, now);

    expect(result.length).toBe(6);
    expect(result.map((event) => event.id)).toEqual([
      "evt_002",
      "evt_003",
      "evt_004",
      "evt_005",
      "evt_006",
      "evt_008",
    ]);
  });
});

describe("filterEvents", () => {
  it("returns all valid events if default filters are selected", () => {
    expect(getFilteredIds(baseFilters)).toEqual([
      "evt_001",
      "evt_002",
      "evt_003",
      "evt_004",
      "evt_005",
      "evt_006",
      "evt_008",
    ]);
  });

  describe("genre", () => {
    it("returns only events matching the selected genre", () => {
      const filters = { ...baseFilters, genre: "rock" };
      expect(getFilteredIds(filters)).toEqual(["evt_001", "evt_006"]);
    });

    it("returns an empty array when no events match the selected genre", () => {
      const filters = { ...baseFilters, genre: "rap" };

      expect(getFilteredIds(filters)).toEqual([]);
    });
  });

  describe("city", () => {
    it("returns only events matching the selected city", () => {
      const filters = { ...baseFilters, city: "lancaster" };

      expect(getFilteredIds(filters)).toEqual([
        "evt_001",
        "evt_002",
        "evt_008",
      ]);
    });

    it("returns an empty array when no events match the selected city", () => {
      const filters = { ...baseFilters, city: "new jersey" };

      expect(getFilteredIds(filters)).toEqual([]);
    });
  });

  describe("venue", () => {
    it("returns only events matching the selected venue", () => {
      const filters = { ...baseFilters, venue: "river center" };

      expect(getFilteredIds(filters)).toEqual(["evt_003", "evt_004"]);
    });

    it("returns an empty array when no events match the selected venue", () => {
      const filters = { ...baseFilters, venue: "foo" };

      expect(getFilteredIds(filters)).toEqual([]);
    });
  });

  describe("date range", () => {
    it("any-date excludes events with null dates", () => {
      const filters = { ...baseFilters, dateRange: "any-date" };

      expect(getFilteredIds(filters)).toEqual([
        "evt_001",
        "evt_002",
        "evt_003",
        "evt_004",
        "evt_005",
        "evt_006",
        "evt_008",
      ]);
    });

    describe("this-weekend", () => {
      it("returns only events inside the current the weekend range", () => {
        const filters = { ...baseFilters, dateRange: "this-weekend" };

        expect(getFilteredIds(filters)).toEqual([
          "evt_003",
          "evt_004",
          "evt_005",
        ]);
      });
    });

    describe("this-week", () => {
      it("returns only events inside the current week range", () => {
        const filters = { ...baseFilters, dateRange: "this-week" };

        expect(getFilteredIds(filters)).toEqual([
          "evt_002",
          "evt_003",
          "evt_004",
          "evt_005",
        ]);
      });
    });

    describe("next-seven-days", () => {
      it("returns only events inside the next seven days range", () => {
        const filters = { ...baseFilters, dateRange: "next-seven-days" };

        expect(getFilteredIds(filters)).toEqual([
          "evt_002",
          "evt_003",
          "evt_004",
          "evt_005",
          "evt_006",
        ]);
      });
    });

    describe("this-month", () => {
      it("returns only events in the current month range", () => {
        const filters = { ...baseFilters, dateRange: "this-month" };

        expect(getFilteredIds(filters)).toEqual([
          "evt_002",
          "evt_003",
          "evt_004",
          "evt_005",
          "evt_006",
        ]);
      });
    });

    describe("next-thirty-days", () => {
      it("returns events only in the next thirty days range", () => {
        const filters = { ...baseFilters, dateRange: "next-thirty-days" };

        expect(getFilteredIds(filters)).toEqual([
          "evt_002",
          "evt_003",
          "evt_004",
          "evt_005",
          "evt_006",
          "evt_008",
        ]);
      });
    });
  });

  describe("price range", () => {
    it("returns only events within the selected minimum and maximum price", () => {
      const filters = { ...baseFilters, priceMin: 50, priceMax: 80 };

      expect(getFilteredIds(filters)).toEqual([
        "evt_003",
        "evt_005",
        "evt_006",
      ]);
    });

    it("returns events that match the exact minimum and maximum boundaries", () => {
      const filters = { ...baseFilters, priceMin: 25, priceMax: 40 };

      expect(getFilteredIds(filters)).toEqual([
        "evt_001",
        "evt_002",
        "evt_008",
      ]);
    });

    it("returns only the matching event within the bounds", () => {
      const filters = { ...baseFilters, priceMin: 90, priceMax: 100 };

      expect(getFilteredIds(filters)).toEqual(["evt_004"]);
    });

    it("returns an empty array when no events match the selected price range", () => {
      const filters = { ...baseFilters, priceMin: 111, priceMax: 200 };

      expect(getFilteredIds(filters)).toEqual([]);
    });
  });

  describe("combined filters", () => {
    it("returns only events that match all the selected filters", () => {
      const filters = { ...baseFilters, genre: "pop", city: "lancaster" };
      expect(getFilteredIds(filters)).toEqual(["evt_002"]);

      const filters2 = {
        ...baseFilters,
        city: "philadelphia",
        priceMin: 90,
        priceMax: 100,
      };
      expect(getFilteredIds(filters2)).toEqual(["evt_004"]);
    });

    it("does not include null-date events even when the price range matches", () => {
      const filters = {
        ...baseFilters,
        city: "washington",
        priceMin: 100,
        priceMax: 120,
      };

      expect(getFilteredIds(filters)).toEqual([]);
    });
  });
});

describe("sortEvents", () => {
  it("does not mutate the original array", () => {
    const events = getSortableEvents();
    const sortedEvents = sortEvents(events, "date");

    expect(sortedEvents).not.toBe(events);
    expect(events.map((event) => event.id)).toEqual([
      "evt_001",
      "evt_002",
      "evt_003",
      "evt_004",
      "evt_005",
      "evt_006",
      "evt_008",
    ]);
  });

  it("returns original order when sort option is unknown", () => {
    const events = getSortableEvents();

    expect(sortEvents(events, "foo").map((event) => event.id)).toEqual([
      "evt_001",
      "evt_002",
      "evt_003",
      "evt_004",
      "evt_005",
      "evt_006",
      "evt_008",
    ]);
  });

  it("returns events sorted by date earliest to latest", () => {
    const events = getSortableEvents();

    expect(sortEvents(events, "date").map((event) => event.id)).toEqual([
      "evt_001",
      "evt_002",
      "evt_003",
      "evt_004",
      "evt_005",
      "evt_006",
      "evt_008",
    ]);
  });

  it("returns events sorted by isFeatured: true first, then by date", () => {
    const events = getSortableEvents();
    expect(sortEvents(events, "recommended").map((event) => event.id)).toEqual([
      "evt_002",
      "evt_004",
      "evt_006",
      "evt_001",
      "evt_003",
      "evt_005",
      "evt_008",
    ]);
  });

  it("returns events sorted by price lowest to highest", () => {
    const events = getSortableEvents();

    expect(sortEvents(events, "price-low").map((event) => event.id)).toEqual([
      "evt_001",
      "evt_008",
      "evt_002",
      "evt_005",
      "evt_003",
      "evt_006",
      "evt_004",
    ]);
  });

  it("returns events sorted by price highest to lowest", () => {
    const events = getSortableEvents();

    expect(sortEvents(events, "price-high").map((event) => event.id)).toEqual([
      "evt_004",
      "evt_006",
      "evt_003",
      "evt_005",
      "evt_002",
      "evt_008",
      "evt_001",
    ]);
  });
});

describe("getPriceRangeLabel", () => {
  const fullPriceRange = {
    min: 0,
    max: 500,
  };

  it(`returns "Any price" when the selected range matches the full range`, () => {
    const filters = {
      ...baseFilters,
      priceMin: fullPriceRange.min,
      priceMax: fullPriceRange.max,
    };

    expect(getPriceRangeLabel(filters, fullPriceRange)).toBe("Any price");
  });

  it(`returns "Up to "$X" when only the maximum price changes`, () => {
    const max = 200;
    const filters = {
      ...baseFilters,
      priceMin: fullPriceRange.min,
      priceMax: max,
    };

    expect(getPriceRangeLabel(filters, fullPriceRange)).toBe(`Up to $${max}`);
  });

  it(`returns "From "$X" when only the minimum price changes`, () => {
    const min = 200;
    const filters = {
      ...baseFilters,
      priceMin: min,
      priceMax: fullPriceRange.max,
    };

    expect(getPriceRangeLabel(filters, fullPriceRange)).toBe(`From $${min}`);
  });

  it(`returns "$X - $Y" when the minimum and maximum price changes`, () => {
    const min = 100;
    const max = 200;
    const filters = {
      ...baseFilters,
      priceMin: min,
      priceMax: max,
    };

    expect(getPriceRangeLabel(filters, fullPriceRange)).toBe(
      `$${min} - $${max}`,
    );
  });
});

describe("hasActiveFilters", () => {
  it("returns false when filters match the initial filters", () => {
    const filters = { ...baseFilters };
    expect(hasActiveFilters(filters, baseFilters)).toBe(false);
  });

  it("returns true when one filter is selected", () => {
    const filters = { ...baseFilters, genre: "rock" };
    expect(hasActiveFilters(filters, baseFilters)).toBe(true);
  });

  it("return true when multiple filters are selected", () => {
    const filters = {
      ...baseFilters,
      city: "lancaster",
      priceMin: 100,
      priceMax: 200,
    };
    expect(hasActiveFilters(filters, baseFilters)).toBe(true);
  });
});

describe("getGenreOptions", () => {
  it("returns all available genres on the events data when no filter is selected", () => {
    const options = getGenreOptions(createEvents(), baseFilters, now);
    expect(options.length).toBe(11);
  });

  it(`includes the "all" option with the count of all available events`, () => {
    const options = getGenreOptions(createEvents(), baseFilters, now);
    const allOption = options.find((option) => option.value === "all");
    expect(allOption.count).toBe(7);
  });

  it("returns the correct count for a genre with matching events", () => {
    const options = getGenreOptions(createEvents(), baseFilters, now);
    const rockOption = options.find((option) => option.value === "rock");
    expect(rockOption).toEqual({
      value: "rock",
      label: "Rock",
      count: 2,
      disabled: false,
    });
  });

  it("returns a genre with count of 0 when there are no matching events", () => {
    const options = getGenreOptions(createEvents(), baseFilters, now);
    const hipHopOption = options.find((option) => option.value === "hip-hop");
    expect(hipHopOption).toEqual({
      value: "hip-hop",
      label: "Hip-Hop",
      count: 0,
      disabled: true,
    });
  });

  it("keeps the selected genre enabled even when its available count is 0", () => {
    const filters = { ...baseFilters, genre: "hip-hop" };
    const options = getGenreOptions(createEvents(), filters, now);
    const hipHopOption = options.find((option) => option.value === "hip-hop");
    expect(hipHopOption).toEqual({
      value: "hip-hop",
      label: "Hip-Hop",
      count: 0,
      disabled: false,
    });
  });
});

describe("getVenueOptions", () => {
  it("returns all available venues on the events data when no filter is selected", () => {
    const options = getVenueOptions(createEvents(), baseFilters, now);

    expect(options.length).toBe(5);
  });

  it(`returns the option "all" with the count of all available events`, () => {
    const options = getVenueOptions(createEvents(), baseFilters, now);
    const allOption = options.find((option) => option.value === "all");
    expect(allOption.count).toBe(7);
  });

  it("returns the correct count for a venue with matching events", () => {
    const options = getVenueOptions(createEvents(), baseFilters, now);
    const skylineOption = options.find(
      (option) => option.value === "skyline hall",
    );
    expect(skylineOption).toEqual({
      value: "skyline hall",
      label: "Skyline Hall",
      count: 3,
      disabled: false,
    });
  });

  it("returns a venue with count of 0 when there are no matching events", () => {
    const filters = { ...baseFilters, city: "new york" };
    const options = getVenueOptions(createEvents(), filters, now);
    const skylineOption = options.find(
      (option) => option.value === "skyline hall",
    );

    expect(skylineOption).toEqual({
      value: "skyline hall",
      label: "Skyline Hall",
      count: 0,
      disabled: true,
    });
  });

  it("keeps the selected venue enabled even when its available count is 0", () => {
    const filters = { ...baseFilters, city: "new york", venue: "skyline hall" };
    const options = getVenueOptions(createEvents(), filters, now);
    const skylineOption = options.find(
      (option) => option.value === "skyline hall",
    );

    expect(skylineOption).toEqual({
      value: "skyline hall",
      label: "Skyline Hall",
      count: 0,
      disabled: false,
    });
  });
});

describe("getCityOptions", () => {
  it("returns all available cities on the events data when no filter is selected", () => {
    const options = getCityOptions(createEvents(), baseFilters, now);

    expect(options.length).toBe(5);
  });

  it(`returns the option "all" with the count of all available events when no filter is selected`, () => {
    const options = getCityOptions(createEvents(), baseFilters, now);
    const allOption = options.find((option) => option.value === "all");

    expect(allOption).toEqual({
      value: "all",
      label: "All",
      count: 7,
      disabled: false,
    });
  });

  it("returns the correct count for a city with matching events", () => {
    const filters = { ...baseFilters, city: "new york" };
    const options = getCityOptions(createEvents(), filters, now);
    const newYorkOption = options.find((option) => option.value === "new york");

    expect(newYorkOption).toEqual({
      value: "new york",
      label: "New York",
      count: 2,
      disabled: false,
    });
  });

  it("returns a city with count of 0 when there are no matching events", () => {
    const filters = { ...baseFilters, venue: "skyline hall" };
    const options = getCityOptions(createEvents(), filters, now);
    const newYorkOption = options.find((option) => option.value === "new york");

    expect(newYorkOption).toEqual({
      value: "new york",
      label: "New York",
      count: 0,
      disabled: true,
    });
  });

  it("keeps the selected city enabled even when its available count is 0", () => {
    const filters = { ...baseFilters, venue: "skyline hall", city: "new york" };
    const options = getCityOptions(createEvents(), filters, now);
    const newYorkOption = options.find((option) => option.value === "new york");

    expect(newYorkOption).toEqual({
      value: "new york",
      label: "New York",
      count: 0,
      disabled: false,
    });
  });
});
