import { describe, expect, it } from "vitest";
import {
  getAvailableTicketTiers,
  getEventPriceFrom,
  isEventSoldOut,
  getDisplayDoorsAt,
  getFormattedShowAt,
  getFormattedDoorsAt,
  getEffectiveTierLimit,
  getVenueName,
  getVenueCity,
  getVenueAddress,
} from "./eventSelectors.js";
import { DEFAULT_PER_ORDER_LIMIT } from "../config/eventSelectorsConfig.js";

describe("eventSelectors", () => {
  const availableEvent = {
    ticketTiers: [
      { name: "Tier 1", price: 100, remaining: 10 },
      { name: "Tier 2", price: 200, remaining: 0 },
      { name: "Tier 3", price: 300, remaining: 5 },
    ],

    venue: {
      name: "The Grand Arena",
      city: "Philadelphia, PA",
      address: "101 Arena Plaza, Philadelphia, PA 19107",
    },
  };

  const soldOutEvent = {
    ticketTiers: [
      { name: "Tier 1", price: 100, remaining: 0 },
      { name: "Tier 2", price: 200, remaining: 0 },
      { name: "Tier 3", price: 300, remaining: 0 },
    ],
  };

  it("returns only the available ticket tiers", () => {
    expect(getAvailableTicketTiers(availableEvent)).toEqual([
      { name: "Tier 1", price: 100, remaining: 10 },
      { name: "Tier 3", price: 300, remaining: 5 },
    ]);
  });

  describe("getEventPriceFrom", () => {
    it("returns a number with the lowest tier price", () => {
      expect(getEventPriceFrom(availableEvent)).toBe(100);
    });

    it("returns null if event has no available ticket tiers", () => {
      expect(getEventPriceFrom(soldOutEvent)).toBe(null);
    });
  });

  describe("isEventSoldOut", () => {
    it("returns false when the event still have at least a tier with tickets", () => {
      expect(isEventSoldOut(availableEvent)).toBe(false);
    });

    it("returns true when the event have no tickets remaining", () => {
      expect(isEventSoldOut(soldOutEvent)).toBe(true);
    });
  });

  describe("getDisplayDoorsAt", () => {
    it("returns doorsAt with real value if exist in event", () => {
      const event = {
        id: "mock_event",
        startsAt: "2026-02-14T20:00:00Z",
        doorsAt: "2026-02-14T19:00:00Z",
      };

      expect(getDisplayDoorsAt(event)).toBe("2026-02-14T19:00:00Z");
    });

    it("returns doorsAt with calculated value of -1h from startsAt if it doesn't exist in event", () => {
      const event = {
        id: "mock_event",
        startsAt: "2026-02-14T20:00:00Z",
        timezone: "America/New_York",
      };

      expect(getDisplayDoorsAt(event)).toBe("2026-02-14T19:00:00Z");
    });
  });

  describe("getFormattedShowAt", () => {
    it("returns the formatted show time from startsAt exist", () => {
      const event = {
        id: "mock_event",
        startsAt: "2026-04-12T23:30:00Z",
        timezone: "America/New_York",
      };

      expect(getFormattedShowAt(event)).toEqual({
        fullDate: "Sunday, April 12, 2026",
        shortDate: "Apr 12, 2026",
        time: "7:30 PM",
        timeWithZone: "7:30 PM EDT",
      });
    });

    it("returns null if given a invalid or null showAt value", () => {
      const event = {
        id: "mock_event",
        startsAt: "not-valid",
        timezone: "America/New_York",
      };

      expect(getFormattedShowAt(event)).toBe(null);

      const event2 = {
        id: "mock_event",
        timezone: "America/New_York",
      };

      expect(getFormattedShowAt(event2)).toBe(null);
    });

    it("returns null if timezone is missing", () => {
      const event = {
        id: "mock_event",
        startsAt: "2026-04-12T23:30:00Z",
      };

      expect(getFormattedShowAt(event)).toBe(null);
    });
  });

  describe("getFormattedDoorsAt", () => {
    it("returns the formatted doors time from doorsAt exist", () => {
      const event = {
        id: "mock_event",
        startsAt: "2026-04-12T23:30:00Z",
        doorsAt: "2026-04-12T22:00:00Z",
        timezone: "America/New_York",
      };

      expect(getFormattedDoorsAt(event)).toEqual({
        fullDate: "Sunday, April 12, 2026",
        shortDate: "Apr 12, 2026",
        time: "6:00 PM",
        timeWithZone: "6:00 PM EDT",
      });
    });

    it("returns the formatted doors time derived from startsAt if doorsAt doesn't exist", () => {
      const event = {
        id: "mock_event",
        startsAt: "2026-04-12T23:30:00Z",
        timezone: "America/New_York",
      };

      expect(getFormattedDoorsAt(event)).toEqual({
        fullDate: "Sunday, April 12, 2026",
        shortDate: "Apr 12, 2026",
        time: "6:30 PM",
        timeWithZone: "6:30 PM EDT",
      });
    });

    it("returns null if given a invalid or doorsAt value", () => {
      const event = {
        id: "mock_event",
        startsAt: "2026-04-12T23:30:00Z",
        doorsAt: "not-valid-value",
        timezone: "America/New_York",
      };

      expect(getFormattedDoorsAt(event)).toBe(null);
    });

    it("returns null if not given a doorsAt value and startsAt is invalid", () => {
      const event = {
        id: "mock_event",
        startsAt: "not-valid-value",
        timezone: "America/New_York",
      };

      expect(getFormattedDoorsAt(event)).toBe(null);
    });

    it("returns null if timezone is missing", () => {
      const event = {
        id: "mock_event",
        startsAt: "2026-04-12T23:30:00Z",
      };

      expect(getFormattedDoorsAt(event)).toBe(null);
    });
  });

  describe("getEffectiveTierLimit", () => {
    it("returns perOrderLimit if it exist in the event", () => {
      const tier = {
        id: "general",
        name: "General",
        description: "Access to the main floor and lower bowl seating.",
        price: 79,
        remaining: 180,
        perOrderLimit: 8,
      };

      expect(getEffectiveTierLimit(tier)).toBe(8);
    });

    it("returns remaining if it preorderLimit doesn't exist in the event and is less than the default value", () => {
      const tier = {
        id: "general",
        name: "General",
        description: "Access to the main floor and lower bowl seating.",
        price: 79,
        remaining: 3,
      };

      expect(getEffectiveTierLimit(tier)).toBe(tier.remaining);
    });

    it("returns remaining if its less than perOrderLimit", () => {
      const tier = {
        id: "general",
        name: "General",
        description: "Access to the main floor and lower bowl seating.",
        price: 79,
        remaining: 4,
        perOrderLimit: 8,
      };

      expect(getEffectiveTierLimit(tier)).toBe(4);
    });

    it("returns default value if perOrderLimit doesn't exist in the tier", () => {
      const tier = {
        id: "general",
        name: "General",
        description: "Access to the main floor and lower bowl seating.",
        price: 79,
        remaining: 180,
      };

      expect(getEffectiveTierLimit(tier)).toBe(DEFAULT_PER_ORDER_LIMIT);
    });
  });

  describe("getVenueName", () => {
    it("returns the correct venue name", () => {
      expect(getVenueName(availableEvent)).toBe("The Grand Arena");
    });
  });

  describe("getCity", () => {
    it("returns the correct city name", () => {
      expect(getVenueCity(availableEvent)).toBe("Philadelphia, PA");
    });
  });

  describe("getAddress", () => {
    it("returns the correct address for the event", () => {
      expect(getVenueAddress(availableEvent)).toBe(
        "101 Arena Plaza, Philadelphia, PA 19107",
      );
    });
  });
});
