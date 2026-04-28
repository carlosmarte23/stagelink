import { beforeEach, describe, expect, it } from "vitest";

import { CART_STORAGE_KEY } from "../../cart/config/cartConfig.js";
import { getCart, saveCart } from "../../cart/lib/cartStorage.js";
import { ORDER_STORAGE_KEY } from "../../orders/config/orderConfig.js";
import { getOrders } from "../../orders/lib/orderStorage.js";
import { TICKET_STORAGE_KEY } from "../../tickets/config/ticketConfig.js";
import { getTickets } from "../../tickets/lib/ticketStorage.js";
import { completeCheckout } from "./completeCheckout.js";

const mockRawCart = [
  {
    eventId: "evt_013",
    selectedTickets: [
      { tierId: "general", quantity: 2, unitPrice: 59, lineTotal: 118 },
      { tierId: "vip", quantity: 1, unitPrice: 109, lineTotal: 109 },
    ],
    subtotal: 227,
    serviceFee: 15,
    total: 242,
    addedAt: "2026-04-23T17:22:30.274Z",
  },
  {
    eventId: "evt_016",
    selectedTickets: [
      { tierId: "general", quantity: 1, unitPrice: 59, lineTotal: 59 },
    ],
    subtotal: 59,
    serviceFee: 5,
    total: 64,
    addedAt: "2026-04-23T17:28:30.274Z",
  },
];

const mockCheckoutItems = [
  {
    eventId: "evt_013",
    eventData: {
      title: "Country Road Live",
      startsAt: "2026-04-24T00:00:00Z",
      timezone: "America/Chicago",
      imageUrl: "https://images.unsplash.com/photo-1466584820433-9ad1cc6798f3",
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
      imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
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
];

const mockTotals = {
  ticketsQuantity: 4,
  subtotal: 286,
  serviceFees: 20,
  facilityCharge: 15,
  total: 321,
};

const mockBuyerDetails = {
  fullName: "John Doe",
  email: "john@test.com",
  phone: "5555551234",
};

const mockPaymentDetails = {
  method: "card",
  cardLast4: "4242",
  saveCard: false,
};

describe("completeCheckout", () => {
  beforeEach(() => {
    localStorage.removeItem(CART_STORAGE_KEY);
    localStorage.removeItem(ORDER_STORAGE_KEY);
    localStorage.removeItem(TICKET_STORAGE_KEY);
  });

  it("creates a confirmed order, generates tickets, persists them, and clears the cart", () => {
    saveCart(mockRawCart);

    const result = completeCheckout({
      items: mockCheckoutItems,
      totals: mockTotals,
      buyerDetails: mockBuyerDetails,
      paymentDetails: mockPaymentDetails,
    });

    const savedOrders = getOrders();
    const savedTickets = getTickets();

    expect(savedOrders).toHaveLength(1);
    expect(savedTickets).toHaveLength(4);
    expect(getCart()).toEqual([]);

    expect(result.confirmedOrder).toEqual(savedOrders[0]);
    expect(result.tickets).toEqual(savedTickets);
  });

  it("does not complete checkout when there are no checkout items", () => {
    expect(() =>
      completeCheckout({
        items: [],
        totals: mockTotals,
        buyerDetails: mockBuyerDetails,
        paymentDetails: mockPaymentDetails,
      }),
    ).toThrow(/can't complete checkout with no items/i);

    expect(getOrders()).toEqual([]);
    expect(getTickets()).toEqual([]);
    expect(getCart()).toEqual([]);
  });
});
