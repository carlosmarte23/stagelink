import { describe, it, expect } from "vitest";

import {
  createConfirmedOrder,
  generateLocalTicketsFromOrder,
} from "./checkoutConfirmation.js";

const mockOrderPayload = {
  items: [
    {
      eventId: "evt_013",
      eventData: {
        title: "Country Road Live",
        startsAt: "2026-04-24T00:00:00Z",
        timezone: "America/Chicago",
        imageUrl:
          "https://images.unsplash.com/photo-1466584820433-9ad1cc6798f3",
        venue: {
          name: "Skyline Pavilion",
          city: "Nashville, TN",
        },
      },
      selectedTickets: [
        {
          tierId: "general",
          quantity: 2,
          unitPrice: 59,
          lineTotal: 118,
          tierData: {
            name: "General",
            price: 59,
            remaining: 146,
            perOrderLimit: 8,
          },
        },
        {
          tierId: "vip",
          quantity: 1,
          unitPrice: 109,
          lineTotal: 109,
          tierData: {
            name: "VIP",
            price: 109,
            remaining: 24,
            perOrderLimit: 4,
          },
        },
      ],
      addedAt: "2026-04-23T17:22:30.274Z",
    },
    {
      eventId: "evt_016",
      eventData: {
        title: "Electronic Bloom",
        startsAt: "2026-05-21T02:00:00Z",
        timezone: "America/Denver",
        imageUrl:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
        venue: {
          name: "Neon Warehouse",
          city: "Denver, CO",
        },
      },
      selectedTickets: [
        {
          tierId: "general",
          quantity: 1,
          unitPrice: 59,
          lineTotal: 59,
          tierData: {
            name: "General",
            price: 59,
            remaining: 80,
            perOrderLimit: 8,
          },
        },
      ],
      addedAt: "2026-04-23T17:28:30.274Z",
    },
  ],
  buyerDetails: {
    fullName: "Carlos Marte",
    email: "carlos@test.com",
    phone: "5555551234",
  },
  paymentDetails: {
    method: "card",
    cardLast4: "4242",
    saveCard: false,
  },
  totals: {
    ticketsQuantity: 4,
    subtotal: 286,
    serviceFees: 20,
    facilityCharge: 15,
    total: 321,
  },
};

describe("checkoutConfirmation", () => {
  it("createConfirmedOrder returns confirmed order metadata as object", () => {
    const confirmedOrder = createConfirmedOrder(mockOrderPayload);

    expect(confirmedOrder).toMatchObject({
      orderId: expect.any(String),
      status: "confirmed",
      buyerDetails: mockOrderPayload.buyerDetails,
      paymentDetails: {
        method: "card",
        cardLast4: "4242",
        saveCard: false,
      },
      totals: mockOrderPayload.totals,
      items: [
        {
          eventId: "evt_013",
          title: "Country Road Live",
          startsAt: "2026-04-24T00:00:00Z",
          timezone: "America/Chicago",
          imageUrl: expect.any(String),
          venue: {
            name: "Skyline Pavilion",
            city: "Nashville, TN",
          },
          tickets: [
            {
              tierId: "general",
              tierName: "General",
              quantity: 2,
              unitPrice: 59,
              lineTotal: 118,
            },
            {
              tierId: "vip",
              tierName: "VIP",
              quantity: 1,
              unitPrice: 109,
              lineTotal: 109,
            },
          ],
        },
        {
          eventId: "evt_016",
          title: "Electronic Bloom",
          startsAt: "2026-05-21T02:00:00Z",
          timezone: "America/Denver",
          imageUrl: expect.any(String),
          venue: {
            name: "Neon Warehouse",
            city: "Denver, CO",
          },
          tickets: [
            {
              tierId: "general",
              tierName: "General",
              quantity: 1,
              unitPrice: 59,
              lineTotal: 59,
            },
          ],
        },
      ],
    });

    expect(confirmedOrder.orderId).toEqual(expect.any(String));
    expect(confirmedOrder.confirmedAt).toEqual(expect.any(String));
    expect(confirmedOrder).not.toHaveProperty("cardNumber");
    expect(confirmedOrder).not.toHaveProperty("expirationDate");
    expect(confirmedOrder).not.toHaveProperty("securityCode");
  });

  it("generateTicketsFromOrder returns one ticket object per purchased ticket quantity", () => {
    const order = createConfirmedOrder(mockOrderPayload);
    const tickets = generateLocalTicketsFromOrder(order);

    expect(tickets).toHaveLength(4);
    expect(tickets[0]).toMatchObject({
      orderId: order.orderId,
      status: "active",
      holderName: mockOrderPayload.buyerDetails.fullName,
      eventId: "evt_013",
      tierId: "general",
      eventSnapshot: {
        title: "Country Road Live",
        startsAt: "2026-04-24T00:00:00Z",
        timezone: "America/Chicago",
        imageUrl: expect.any(String),
        venue: {
          name: "Skyline Pavilion",
          city: "Nashville, TN",
        },
      },
      tierSnapshot: {
        name: "General",
        unitPrice: 59,
      },
    });

    expect(tickets[0].ticketId).toEqual(expect.any(String));
    expect(tickets[0].qrValue).toContain(tickets[0].ticketId);
    expect(tickets[0].qrValue).toMatch(/^STAGELINK:TICKET:/);
  });
});
