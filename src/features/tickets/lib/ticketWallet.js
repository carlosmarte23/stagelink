export const TICKET_DATE_GROUPS = {
  UPCOMING: "upcoming",
  PAST: "past",
  INVALID: "invalid",
};

export function getTicketEventDate(ticket) {
  const date = new Date(ticket?.eventSnapshot?.startsAt);

  if (!Number.isNaN(date.getTime())) return date;

  return null;
}

export function getTicketDateGroup(ticket, now = new Date()) {
  const eventDate = getTicketEventDate(ticket);

  if (!eventDate) return TICKET_DATE_GROUPS.INVALID;

  if (eventDate < now) return TICKET_DATE_GROUPS.PAST;
  return TICKET_DATE_GROUPS.UPCOMING;
}

export function normalizeTicketSearchValue(value) {
  if (!value) return "";

  return value.toLowerCase().trim().replace(/\s+/g, " ");
}

function createSearchText(values) {
  return normalizeTicketSearchValue(
    values
      .filter((value) => value !== null && value !== undefined && value !== "")
      .join(" "),
  );
}

function getTicketSearchText(ticket) {
  return createSearchText([
    ticket.orderId,
    ticket.ticketId,
    ticket.status,
    ticket.holderName,
    ticket.eventSnapshot?.title,
    ticket.eventSnapshot?.venue?.name,
    ticket.eventSnapshot?.venue?.city,
    ticket.tierSnapshot?.name,
    ticket.tierSnapshot?.unitPrice,
  ]);
}

export function ticketMatchesSearch(ticket, query) {
  const searchTerms = normalizeTicketSearchValue(query)
    .split(" ")
    .filter(Boolean);

  if (searchTerms.length === 0) return true;

  return searchTerms.every((term) =>
    getTicketSearchText(ticket).includes(term),
  );
}

export function sortTicketsByDate(tickets, direction = "asc") {
  if (!Array.isArray(tickets)) return [];

  if (tickets.length === 0) return tickets;

  return tickets
    .filter((ticket) => getTicketEventDate(ticket) !== null)
    .toSorted((firstTicket, secondTicket) => {
      const firstDate = getTicketEventDate(firstTicket);
      const secondDate = getTicketEventDate(secondTicket);

      if (direction === "asc") return firstDate - secondDate;

      return secondDate - firstDate;
    });
}

export function getShortTicketId(ticketId) {
  const parts = ticketId.split("-");
  const ticketNumber = parts.at(-1);
  const tierId = parts.at(-2);

  if (!tierId || !ticketNumber) return "";

  return `TK-${tierId}-${ticketNumber}`.toUpperCase();
}

export function getVisibleTickets({
  tickets,
  activeTab,
  searchQuery,
  sortOrder = activeTab === "upcoming" ? "asc" : "desc",
  now = new Date(),
}) {
  if (!Array.isArray(tickets)) return [];

  const filteredTickets = tickets
    .filter((ticket) => getTicketDateGroup(ticket, now) === activeTab)
    .filter((ticket) => ticketMatchesSearch(ticket, searchQuery));

  const sortedTickets = sortTicketsByDate(filteredTickets, sortOrder);

  const visibleTickets = sortedTickets.map((ticket) => ({
    ...ticket,
    shortTicketId: getShortTicketId(ticket.ticketId),
  }));

  return visibleTickets;
}
