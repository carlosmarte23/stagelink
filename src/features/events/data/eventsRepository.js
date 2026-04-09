import data from "../../../data/events.json";

export function getAllEvents() {
  const events = [...data];
  return events;
}

export function getEventById(eventId) {
  const event = data.find((event) => event.id === eventId);

  if (!event) return null;
  return event;
}
