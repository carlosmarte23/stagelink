import { describe, expect, it } from "vitest";

import {
  addDays,
  endOfDay,
  getNextSevenDays,
  getNextThirtyDays,
  getThisMonthRange,
  getThisWeekRange,
  getThisWeekendRange,
  startOfDay,
  isEventInDateRange,
  formatDateTimeParts,
} from "./dates";

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

describe("startOfDay", () => {
  it("returns the same date at 00:00:00.000", () => {
    const input = makeDate(2026, 3, 8, 15, 42, 11, 321);

    const result = startOfDay(input);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(3);
    expect(result.getDate()).toBe(8);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
  });
});

describe("endOfDay", () => {
  it("returns the same date at 23:59:59.999", () => {
    const input = makeDate(2026, 3, 8, 15, 42, 11, 321);

    const result = endOfDay(input);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(3);
    expect(result.getDate()).toBe(8);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });
});

describe("addDays", () => {
  it("returns a new date with the requested number of days added", () => {
    const original = makeDate(2026, 3, 8, 10, 0, 0, 0);

    const result = addDays(original, 5);

    expect(result.getDate()).toBe(13);
  });

  it("does not mutate the original date", () => {
    const original = makeDate(2026, 3, 8, 10, 0, 0, 0);

    addDays(original, 5);

    expect(original.getDate()).toBe(8);
  });
});

describe("getThisWeekRange", () => {
  it("returns start of week as first day of week or day given at time 00:00:00.000", () => {
    const now = makeDate(2026, 3, 8, 14, 30); // Wednesday
    const result = getThisWeekRange(now);

    expect(result.start.getFullYear()).toBe(2026);
    expect(result.start.getMonth()).toBe(3);
    expect(result.start.getDate()).toBe(8);
    expect(result.start.getHours()).toBe(0);
    expect(result.start.getMinutes()).toBe(0);
    expect(result.start.getSeconds()).toBe(0);
    expect(result.start.getMilliseconds()).toBe(0);
  });
  it("returns end as sunday with time 23:59:59.999", () => {
    const now = makeDate(2026, 3, 8, 14, 30); // Wednesday
    const result = getThisWeekRange(now);

    expect(result.end.getFullYear()).toBe(2026);
    expect(result.end.getMonth()).toBe(3);
    expect(result.end.getDate()).toBe(12);
    expect(result.end.getHours()).toBe(23);
    expect(result.end.getMinutes()).toBe(59);
    expect(result.end.getSeconds()).toBe(59);
    expect(result.end.getMilliseconds()).toBe(999);
  });
});

describe("getThisWeekendRange", () => {
  it("returns start as friday date is prior", () => {
    const now = makeDate(2026, 3, 7, 14, 30); // Tuesday
    const result = getThisWeekendRange(now);

    expect(result.start.getFullYear()).toBe(2026);
    expect(result.start.getMonth()).toBe(3);
    expect(result.start.getDate()).toBe(10);
    expect(result.start.getHours()).toBe(0);
    expect(result.start.getMinutes()).toBe(0);
    expect(result.start.getSeconds()).toBe(0);
    expect(result.start.getMilliseconds()).toBe(0);
  });

  it("returns start as friday date is friday", () => {
    const now = makeDate(2026, 3, 10, 14, 30); // Friday
    const result = getThisWeekendRange(now);

    expect(result.start.getFullYear()).toBe(2026);
    expect(result.start.getMonth()).toBe(3);
    expect(result.start.getDate()).toBe(10);
    expect(result.start.getHours()).toBe(0);
    expect(result.start.getMinutes()).toBe(0);
    expect(result.start.getSeconds()).toBe(0);
    expect(result.start.getMilliseconds()).toBe(0);
  });

  it("returns start as saturday if date is saturday", () => {
    const now = makeDate(2026, 3, 11, 14, 30); // Saturday
    const result = getThisWeekendRange(now);

    expect(result.start.getFullYear()).toBe(2026);
    expect(result.start.getMonth()).toBe(3);
    expect(result.start.getDate()).toBe(11);
    expect(result.start.getHours()).toBe(0);
    expect(result.start.getMinutes()).toBe(0);
    expect(result.start.getSeconds()).toBe(0);
    expect(result.start.getMilliseconds()).toBe(0);
  });

  it("returns start as sunday if date is sunday", () => {
    const now = makeDate(2026, 3, 12, 14, 30); // Sunday
    const result = getThisWeekendRange(now);

    expect(result.start.getFullYear()).toBe(2026);
    expect(result.start.getMonth()).toBe(3);
    expect(result.start.getDate()).toBe(12);
    expect(result.start.getHours()).toBe(0);
    expect(result.start.getMinutes()).toBe(0);
    expect(result.start.getSeconds()).toBe(0);
    expect(result.start.getMilliseconds()).toBe(0);
  });

  it("returns end as end of sunday", () => {
    const now = makeDate(2026, 3, 7, 14, 30); // Tuesday
    const result = getThisWeekendRange(now);

    expect(result.end.getFullYear()).toBe(2026);
    expect(result.end.getMonth()).toBe(3);
    expect(result.end.getDate()).toBe(12);
    expect(result.end.getHours()).toBe(23);
    expect(result.end.getMinutes()).toBe(59);
    expect(result.end.getSeconds()).toBe(59);
    expect(result.end.getMilliseconds()).toBe(999);
  });
});

describe("getNextSevenDays", () => {
  it("returns start as the given date with time 00:00:00.000", () => {
    const now = makeDate(2026, 3, 7, 12, 34);

    const result = getNextSevenDays(now);

    expect(result.start.getFullYear()).toBe(2026);
    expect(result.start.getMonth()).toBe(3);
    expect(result.start.getDate()).toBe(7);
    expect(result.start.getHours()).toBe(0);
    expect(result.start.getMinutes()).toBe(0);
    expect(result.start.getSeconds()).toBe(0);
    expect(result.start.getMilliseconds()).toBe(0);
  });
  it("returns end as seven days after given date with time 23:59:59.999", () => {
    const now = makeDate(2026, 3, 7, 12, 34);

    const result = getNextSevenDays(now);

    expect(result.end.getFullYear()).toBe(2026);
    expect(result.end.getMonth()).toBe(3);
    expect(result.end.getDate()).toBe(14);
    expect(result.end.getHours()).toBe(23);
    expect(result.end.getMinutes()).toBe(59);
    expect(result.end.getSeconds()).toBe(59);
    expect(result.end.getMilliseconds()).toBe(999);
  });
});

describe("getNextThirtyDays", () => {
  it("returns start as the given date with time 00:00:00.000", () => {
    const now = makeDate(2026, 3, 7, 12, 34);

    const result = getNextThirtyDays(now);

    expect(result.start.getFullYear()).toBe(2026);
    expect(result.start.getMonth()).toBe(3);
    expect(result.start.getDate()).toBe(7);
    expect(result.start.getHours()).toBe(0);
    expect(result.start.getMinutes()).toBe(0);
    expect(result.start.getSeconds()).toBe(0);
    expect(result.start.getMilliseconds()).toBe(0);
  });
  it("returns end as thirty days after given date with time 23:59:59.999", () => {
    const now = makeDate(2026, 3, 7, 12, 34);

    const result = getNextThirtyDays(now);

    expect(result.end.getFullYear()).toBe(2026);
    expect(result.end.getMonth()).toBe(4);
    expect(result.end.getDate()).toBe(7);
    expect(result.end.getHours()).toBe(23);
    expect(result.end.getMinutes()).toBe(59);
    expect(result.end.getSeconds()).toBe(59);
    expect(result.end.getMilliseconds()).toBe(999);
  });
});

describe("getThisMonthRange", () => {
  it("returns start as the given date with time 00:00:00.000", () => {
    const now = makeDate(2026, 3, 7, 12, 34);

    const result = getThisMonthRange(now);

    expect(result.start.getFullYear()).toBe(2026);
    expect(result.start.getMonth()).toBe(3);
    expect(result.start.getDate()).toBe(7);
    expect(result.start.getHours()).toBe(0);
    expect(result.start.getMinutes()).toBe(0);
    expect(result.start.getSeconds()).toBe(0);
    expect(result.start.getMilliseconds()).toBe(0);
  });

  it("returns the last day of the month with time 23:59:59.999", () => {
    const now = makeDate(2026, 3, 7, 12, 34);

    const result = getThisMonthRange(now);

    expect(result.end.getFullYear()).toBe(2026);
    expect(result.end.getMonth()).toBe(3);
    expect(result.end.getDate()).toBe(30);
    expect(result.end.getHours()).toBe(23);
    expect(result.end.getMinutes()).toBe(59);
    expect(result.end.getSeconds()).toBe(59);
    expect(result.end.getMilliseconds()).toBe(999);
  });
});

describe("isEventInDateRange", () => {
  it("returns false when eventDate is null", () => {
    const range = {
      start: makeDate(2026, 3, 8, 0, 0, 0, 0),
      end: makeDate(2026, 3, 12, 23, 59, 59, 999),
    };

    const eventDate = null;

    expect(isEventInDateRange(eventDate, range.start, range.end)).toBe(false);
  });

  it("returns false when eventDate is before start boundary", () => {
    const range = {
      start: makeDate(2026, 3, 8, 0, 0, 0, 0),
      end: makeDate(2026, 3, 12, 23, 59, 59, 999),
    };

    const eventDate = makeDate(2026, 3, 7, 0, 0, 0);

    expect(isEventInDateRange(eventDate, range.start, range.end)).toBe(false);
  });

  it("returns false when eventDate is after end boundary", () => {
    const range = {
      start: makeDate(2026, 3, 8, 0, 0, 0, 0),
      end: makeDate(2026, 3, 12, 23, 59, 59, 999),
    };

    const eventDate = makeDate(2026, 3, 13, 0, 0, 0);

    expect(isEventInDateRange(eventDate, range.start, range.end)).toBe(false);
  });

  it("returns true when eventDate is between start and end boundary", () => {
    const range = {
      start: makeDate(2026, 3, 8, 0, 0, 0, 0),
      end: makeDate(2026, 3, 12, 23, 59, 59, 999),
    };

    let eventDate = makeDate(2026, 3, 8, 0, 0, 0);
    expect(isEventInDateRange(eventDate, range.start, range.end)).toBe(true);

    eventDate = makeDate(2026, 3, 10, 13, 30, 0);
    expect(isEventInDateRange(eventDate, range.start, range.end)).toBe(true);

    eventDate = makeDate(2026, 3, 12, 23, 59, 59, 999);
    expect(isEventInDateRange(eventDate, range.start, range.end)).toBe(true);
  });
});

describe.only("formatDateTimeParts", () => {
  const dateString = "2026-04-12T23:30:00Z";
  const timeZone = "America/New_York";

  it("returns formatted date parts for a valid date and timezone", () => {
    const result = formatDateTimeParts(dateString, timeZone);

    expect(result).toEqual({
      fullDate: "Sunday, April 12, 2026",
      shortDate: "Apr 12, 2026",
      time: "7:30 PM",
      timeWithZone: "7:30 PM EDT",
    });
  });

  it("returns null if dateString is null", () => {
    const result = formatDateTimeParts(null, timeZone);

    expect(result).toBe(null);
  });

  it("returns null if dateString is invalid", () => {
    const result = formatDateTimeParts("not-a-date", timeZone);

    expect(result).toBe(null);
  });

  it("returns null if timezone is null", () => {
    const result = formatDateTimeParts(dateString, null);

    expect(result).toBe(null);
  });
});
