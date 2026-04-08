import { describe, expect, it } from "vitest";
import { getAllEvents, getEventById } from "./eventsRepository.js";

describe("eventsRepository", () => {
  it("should return all events in an array", () => {
    const events = getAllEvents();

    expect(Array.isArray(events)).toBe(true);
    expect(events.length).toBeGreaterThan(0);
    expect(events[0]).toHaveProperty("id");
    expect(events[0]).toHaveProperty("title");
    expect(events[0]).toHaveProperty("ticketTiers");
    expect(events[0]).toHaveProperty("startsAt");
    expect(events[0]).toHaveProperty("venue");
  });

  it("should return an event by id", () => {
    const event = getEventById("evt_001");

    expect(event).not.toBeNull();
    expect(event.id).toBe("evt_001");
  });

  it("should return null if event does not exist", () => {
    const event = getEventById("bad-id");

    expect(event).toBeNull();
  });
});
