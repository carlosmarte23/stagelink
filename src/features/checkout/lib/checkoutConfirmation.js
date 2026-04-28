function createRandomIdSegment() {
  if (crypto.randomUUID) {
    return crypto.randomUUID().slice(0, 8).toUpperCase();
  }

  if (crypto.getRandomValues) {
    const values = new Uint8Array(4);
    crypto.getRandomValues(values);

    return Array.from(values)
      .map((value) => value.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase();
  }

  return Math.random().toString(16).slice(2, 10).toUpperCase();
}

function createOrderId() {
  return `SL-${createRandomIdSegment().slice(0, 8).toUpperCase()}`;
}

function createTicketId(orderId, eventId, tierId, ticketNumber) {
  if (!orderId || !eventId) throw new Error("Missing orderId or eventId");
  if (!ticketNumber || !Number.isInteger(ticketNumber) || ticketNumber <= 0)
    throw new Error("Invalid ticketNumber");

  const paddedTicketNumber = ticketNumber.toString().padStart(3, "0");
  return `${orderId}-${eventId.toUpperCase()}-${tierId.toUpperCase()}-${paddedTicketNumber}`;
}

function createQRValue(ticketId) {
  return `STAGELINK:TICKET:${ticketId}`;
}

export function createConfirmedOrder({
  items,
  totals,
  buyerDetails,
  paymentDetails,
}) {
  if (!items.length) return null;
  const orderId = createOrderId();

  const now = new Date().toISOString();

  const returnItems = items.map((item) => ({
    eventId: item.eventId,
    title: item.eventData.title,
    imageUrl: item.eventData.imageUrl,
    startsAt: item.eventData.startsAt,
    timezone: item.eventData.timezone,
    tickets: item.selectedTickets.map((ticket) => ({
      tierId: ticket.tierId,
      tierName: ticket.tierData.name,
      quantity: ticket.quantity,
      unitPrice: ticket.unitPrice,
      lineTotal: ticket.lineTotal,
    })),
    venue: {
      name: item.eventData.venue.name,
      city: item.eventData.venue.city,
    },
  }));

  return {
    orderId,
    status: "confirmed",
    items: returnItems,
    totals: totals,
    buyerDetails,
    paymentDetails,
    createdAt: now,
    confirmedAt: now,
  };
}

export function generateLocalTicketsFromOrder(order) {
  const { items, orderId, buyerDetails } = order;
  const orderTickets = items.flatMap((item) => {
    const { eventId, title, startsAt, timezone, imageUrl, venue, tickets } =
      item;

    const eventSnapshot = {
      title,
      startsAt,
      timezone,
      imageUrl,
      venue,
    };

    return tickets.flatMap((ticket) => {
      const { tierId, tierName, quantity, unitPrice } = ticket;
      const tierSnapshot = {
        name: tierName,
        unitPrice,
      };
      let orderTickets = [];

      for (let i = 1; i <= quantity; i++) {
        const ticketId = createTicketId(orderId, eventId, tierId, i);
        const qrValue = createQRValue(ticketId);

        orderTickets.push({
          orderId,
          ticketId,
          status: "active",
          holderName: buyerDetails.fullName,
          eventId: eventId,
          tierId: tierId,
          qrValue,
          eventSnapshot,
          tierSnapshot,
        });
      }
      return orderTickets;
    });
  });
  return orderTickets;
}
