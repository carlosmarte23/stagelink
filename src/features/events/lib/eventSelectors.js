import { DEFAULT_PER_ORDER_LIMIT } from "../config/eventSelectorsConfig";
import { formatDateTimeParts } from "../../../utils/dates.js";
export function getAvailableTicketTiers(event) {
  return event.ticketTiers.filter((tier) => tier.remaining > 0);
}
export function getEventPriceFrom(event) {
  const availableTiers = getAvailableTicketTiers(event);
  if (availableTiers.length === 0) return null;

  const prices = availableTiers.map((tier) => tier.price);
  return Math.min(...prices);
}
export function isEventSoldOut(event) {
  return getAvailableTicketTiers(event).length === 0;
}
export function getDisplayDoorsAt(event) {
  const { doorsAt, startsAt } = event;
  const doorsAtDate = new Date(doorsAt);
  if (doorsAt && isNaN(doorsAtDate.valueOf())) return null;

  if (doorsAt) return doorsAt;

  const startsAtDate = new Date(startsAt);
  if (isNaN(startsAtDate.valueOf())) return null;

  const oneHourBefore = new Date(startsAtDate.getTime() - 60 * 60 * 1000);

  return oneHourBefore.toISOString().replace(".000Z", "Z");
}

export function getFormattedShowAt(event) {
  const { startsAt, timezone } = event;
  return formatDateTimeParts(startsAt, timezone);
}

export function getFormattedDoorsAt(event) {
  const { timezone } = event;
  const doorsAt = getDisplayDoorsAt(event);
  return formatDateTimeParts(doorsAt, timezone);
}

export function getEffectiveTierLimit(tier) {
  const { perOrderLimit, remaining } = tier;
  return Math.min(remaining, perOrderLimit ?? DEFAULT_PER_ORDER_LIMIT);
}
export function getVenueName(event) {
  return event.venue.name;
}
export function getVenueCity(event) {
  return event.venue.city;
}
export function getVenueAddress(event) {
  return event.venue.address;
}
