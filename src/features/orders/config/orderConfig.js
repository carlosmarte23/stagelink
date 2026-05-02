export const ORDER_STORAGE_KEY = "stageLinkOrders";

export const DEFAULT_DEMO_ORDERS = [
  {
    orderId: "SL-DEMO-PAST",
    status: "confirmed",
    items: [
      {
        eventId: "evt_001",
        title: "Neon Nights Tour",
        imageUrl:
          "https://images.unsplash.com/photo-1622136352909-642073a6be1f",
        startsAt: "2026-04-14T20:00:00Z",
        timezone: "America/New_York",
        tickets: [
          {
            tierId: "general",
            tierName: "General",
            quantity: 1,
            unitPrice: 79,
            lineTotal: 79,
          },
        ],
        venue: {
          name: "The Grand Arena",
          city: "Philadelphia, PA",
        },
      },
    ],
    totals: {
      ticketsQuantity: 1,
      subtotal: 79,
      serviceFees: 5,
      facilityCharge: 15,
      total: 99,
    },
    buyerDetails: {
      fullName: "Alex Mercer",
      email: "alex@example.com",
      phone: "5555550100",
    },
    paymentDetails: {
      method: "card",
      cardLast4: "4242",
      saveCard: false,
    },
    createdAt: "2026-04-02T18:00:00.000Z",
    confirmedAt: "2026-04-02T18:00:00.000Z",
  },
  {
    orderId: "SL-DEMO-UPCOMING",
    status: "confirmed",
    items: [
      {
        eventId: "evt_003",
        title: "Indie Sunset Sessions",
        imageUrl:
          "https://images.unsplash.com/photo-1604177052603-c2b4cff228db",
        startsAt: "2026-07-01T00:30:00Z",
        timezone: "America/New_York",
        tickets: [
          {
            tierId: "general",
            tierName: "General",
            quantity: 1,
            unitPrice: 65,
            lineTotal: 65,
          },
        ],
        venue: {
          name: "Skyline Pavilion",
          city: "New York, NY",
        },
      },
    ],
    totals: {
      ticketsQuantity: 1,
      subtotal: 65,
      serviceFees: 5,
      facilityCharge: 15,
      total: 85,
    },
    buyerDetails: {
      fullName: "Alex Mercer",
      email: "alex@example.com",
      phone: "5555550100",
    },
    paymentDetails: {
      method: "card",
      cardLast4: "4242",
      saveCard: false,
    },
    createdAt: "2026-04-28T18:00:00.000Z",
    confirmedAt: "2026-04-28T18:00:00.000Z",
  },
];
