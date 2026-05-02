import {
  DEFAULT_DEMO_TICKETS,
  TICKET_STORAGE_KEY,
} from "../config/ticketConfig.js";

function cloneTickets(tickets) {
  return JSON.parse(JSON.stringify(tickets));
}

export function getTickets() {
  const tickets = localStorage.getItem(TICKET_STORAGE_KEY);

  if (!tickets) {
    return cloneTickets(DEFAULT_DEMO_TICKETS);
  }

  try {
    const parsedTickets = JSON.parse(tickets);
    return Array.isArray(parsedTickets) ? parsedTickets : [];
  } catch {
    return [];
  }
}

export function getTicketById(TicketId) {
  const tickets = getTickets();

  if (tickets.length === 0) {
    return null;
  }

  return tickets.find((ticket) => ticket.ticketId === TicketId);
}

export function saveTickets(tickets) {
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
  return tickets;
}
export function appendTickets(tickets) {
  const savedTickets = getTickets();
  const updatedTickets = [...savedTickets, ...tickets];

  return saveTickets(updatedTickets);
}
