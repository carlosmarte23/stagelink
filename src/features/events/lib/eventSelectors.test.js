import { describe, expect, it } from "vitest";
import {
  getAvailableTicketTiers,
  getEventPriceFrom,
  isEventSoldOut,
  getDisplayDoorsAt,
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
