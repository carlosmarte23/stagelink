import { describe, it, expect } from "vitest";

import {
  getOrders,
  getOrderById,
  saveOrders,
  appendOrder,
} from "./orderStorage.js";
import { ORDER_STORAGE_KEY } from "../config/orderConfig.js";
import { beforeEach } from "vitest";

const mockOrder = {
  orderId: "SL-B0FC44D4",
  status: "confirmed",
  items: [
    {
      eventId: "evt_013",
      title: "Country Road Live",
      imageUrl: "https://images.unsplash.com/photo-1466584820433-9ad1cc6798f3",
      startsAt: "2026-04-24T00:00:00Z",
      timezone: "America/Chicago",
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
      venue: { name: "Skyline Pavilion", city: "Nashville, TN" },
    },
  ],
  totals: {
    ticketsQuantity: 3,
    subtotal: 227,
    serviceFees: 15,
    facilityCharge: 10,
    total: 252,
  },
  buyerDetails: {
    fullName: "Jhon Doe",
    email: "john_doe@example.com",
    phone: "5555551234",
  },
  paymentDetails: { method: "card", cardLast4: "4242", saveCard: false },
  createdAt: "2026-04-27T19:40:15.716Z",
  confirmedAt: "2026-04-27T19:40:15.716Z",
};

const newMockOrder = {
  orderId: "SL-A1A2A3A4",
  status: "confirmed",
  items: [
    {
      eventId: "evt_016",
      title: "Electronic Bloom",
      imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
      startsAt: "2026-05-21T02:00:00Z",
      timezone: "America/Denver",
      tickets: [
        {
          tierId: "general",
          tierName: "General",
          quantity: 1,
          unitPrice: 59,
          lineTotal: 59,
        },
      ],
      venue: { name: "Neon Warehouse", city: "Denver, CO" },
    },
  ],
  totals: {
    ticketsQuantity: 1,
    subtotal: 286,
    serviceFees: 20,
    facilityCharge: 15,
    total: 321,
  },
  buyerDetails: {
    fullName: "Alice Foo",
    email: "alice@foo.com",
    phone: "5555551234",
  },
  paymentDetails: { method: "card", cardLast4: "1234", saveCard: true },
  createdAt: "2026-05-01T19:40:15.716Z",
  confirmedAt: "2026-05-01T19:40:15.716Z",
};

describe("orderStorage", () => {
  beforeEach(() => {
    localStorage.removeItem(ORDER_STORAGE_KEY);
  });

  it("returns an empty array when no orders exist", () => {
    expect(getOrders()).toEqual([]);
  });

  it("saves a confirmed order to local storage", () => {
    const savedOrders = saveOrders([mockOrder]);

    expect(getOrders()).toEqual([mockOrder]);
    expect(savedOrders).toEqual([mockOrder]);
  });

  it("appends a confirmed order without removing existing orders", () => {
    saveOrders([mockOrder]);

    const updatedOrders = appendOrder(newMockOrder);

    expect(getOrders()).toHaveLength(2);
    expect(updatedOrders).toEqual([mockOrder, newMockOrder]);
    expect(getOrders()).toEqual([mockOrder, newMockOrder]);
  });

  it("returns an order by id", () => {
    saveOrders([mockOrder]);

    expect(getOrderById("SL-B0FC44D4")).toEqual(mockOrder);
  });
});
