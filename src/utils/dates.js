export function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function endOfDay(date) {
  const result = new Date(date);
  result.setHours(23, 59, 59, 999);
  return result;
}
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function getThisWeekRange(now = new Date()) {
  const today = startOfDay(now);
  const day = today.getDay(); // 0 = Sunday, 5 = friday, 6 = saturday

  let daysUntilEndOfWeek;
  if (day !== 0) {
    daysUntilEndOfWeek = 7 - day;
  } else {
    daysUntilEndOfWeek = 0;
  }

  const start = startOfDay(today);
  const end = endOfDay(addDays(today, daysUntilEndOfWeek));

  return {
    start,
    end,
  };
}

export function getThisWeekendRange(now = new Date()) {
  const today = startOfDay(now);
  const day = today.getDay(); // 0 = Sunday, 5 = friday, 6 = saturday

  let daysUntilFriday;

  if (day <= 5 && day !== 0) {
    daysUntilFriday = 5 - day;
  } else if (day === 6) {
    daysUntilFriday = -1;
  } else {
    daysUntilFriday = -2;
  }

  const friday = startOfDay(addDays(today, daysUntilFriday));
  const sunday = endOfDay(addDays(friday, 2));

  return {
    start: today > friday ? today : friday,
    end: sunday,
  };
}

export function getNextSevenDays(now = new Date()) {
  const today = startOfDay(now);
  const end = endOfDay(addDays(today, 7));
  return {
    start: today,
    end,
  };
}

export function getThisMonthRange(now = new Date()) {
  const today = startOfDay(now);
  const month = today.getMonth();

  const start = today;
  const end = endOfDay(new Date(today.getFullYear(), month + 1, 0));
  return {
    start,
    end,
  };
}

export function getNextThirtyDays(now = new Date()) {
  const today = startOfDay(now);
  const end = endOfDay(addDays(today, 30));
  return {
    start: today,
    end,
  };
}

export function isEventInDateRange(eventDate, start, end) {
  if (!eventDate) return false;

  const value = new Date(eventDate);
  return value >= start && value <= end;
}

export function formatDateTimeParts(dateString, timezone) {
  if (!dateString || !timezone) return null;

  const dateValue = new Date(dateString);

  if (isNaN(dateValue.getTime())) return null;

  const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
    timezone,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shortDateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const timeWithTimezoneFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZoneName: "short",
  });

  return {
    fullDate: fullDateFormatter.format(dateValue),
    shortDate: shortDateFormatter.format(dateValue),
    time: timeFormatter.format(dateValue),
    timeWithZone: timeWithTimezoneFormatter.format(dateValue),
  };
}
