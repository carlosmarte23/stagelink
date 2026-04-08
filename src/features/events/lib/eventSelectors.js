import { DEFAULT_PER_ORDER_LIMIT } from "../config/eventSelectorsConfig";

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
  if (event.doorsAt) return event.doorsAt;

  const startsAt = new Date(event.startsAt);
  const oneHourBefore = new Date(startsAt.getTime() - 60 * 60 * 1000);

  return oneHourBefore.toISOString().replace(".000Z", "Z");
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
