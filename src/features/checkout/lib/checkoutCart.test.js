import { beforeEach, describe, expect, it } from "vitest";
import { CART_STORAGE_KEY } from "../../cart/config/cartConfig.js";

import { getCheckoutCart } from "./checkoutCart.js";

describe("checkoutCart", () => {
  beforeEach(() => {
    localStorage.removeItem(CART_STORAGE_KEY);
  });

  it("returns an empty array if there are no items in localStorage", () => {
    expect(getCheckoutCart()).toEqual([]);
  });

  it("returns checkout cart items enriched with event and tier data", () => {
    const persistedCartItems = [
      {
        eventId: "evt_013",
        selectedTickets: [
          {
            tierId: "general",
            quantity: 2,
            unitPrice: 59,
            lineTotal: 118,
          },
        ],
        subtotal: 118,
        serviceFee: 10,
        total: 128,
        addedAt: "2026-04-19T02:32:10.806Z",
      },
      {
        eventId: "evt_020",
        selectedTickets: [
          {
            tierId: "general",
            quantity: 1,
            unitPrice: 89,
            lineTotal: 89,
          },
          {
            tierId: "vip",
            quantity: 1,
            unitPrice: 149,
            lineTotal: 149,
          },
        ],
        subtotal: 238,
        serviceFee: 10,
        total: 248,
        addedAt: "2026-04-19T02:32:37.766Z",
      },
    ];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(persistedCartItems));
    const checkoutCart = getCheckoutCart();

    expect(checkoutCart).toEqual([
      {
        eventId: "evt_013",
        eventData: {
          title: "Country Road Live",
          startsAt: "2026-04-24T00:00:00Z",
          timezone: "America/Chicago",
          imageUrl:
            "https://images.unsplash.com/photo-1466584820433-9ad1cc6798f3",
          genres: ["Country"],
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
        ],
        addedAt: "2026-04-19T02:32:10.806Z",
      },
      {
        eventId: "evt_020",
        eventData: {
          title: "Summer Rock Fest",
          startsAt: "2026-06-06T22:00:00Z",
          timezone: "America/New_York",
          imageUrl:
            "https://images.unsplash.com/photo-1760160741849-0809daa8e4c8",
          genres: ["Rock"],
          venue: {
            name: "Starlight Amphitheater",
            city: "Pittsburgh, PA",
          },
        },
        selectedTickets: [
          {
            tierId: "general",
            quantity: 1,
            unitPrice: 89,
            lineTotal: 89,
            tierData: {
              name: "General",
              price: 89,
              remaining: 276,
              perOrderLimit: 8,
            },
          },
          {
            tierId: "vip",
            quantity: 1,
            unitPrice: 149,
            lineTotal: 149,
            tierData: {
              name: "VIP",
              price: 149,
              remaining: 44,
              perOrderLimit: 4,
            },
          },
        ],
        addedAt: "2026-04-19T02:32:37.766Z",
      },
    ]);
  });

  it("filters cart items when the event no longer exists", () => {
    const persistedCartItems = [
      {
        eventId: "bad-id",
        selectedTickets: [
          {
            tierId: "general",
            quantity: 1,
            unitPrice: 59,
            lineTotal: 59,
          },
        ],
        subtotal: 59,
        serviceFee: 5,
        total: 64,
        addedAt: "2026-04-19T02:32:10.806Z",
      },
    ];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(persistedCartItems));

    expect(getCheckoutCart()).toEqual([]);
  });

  it("filters selected tickets when the tier no longer exists", () => {
    const persistedCartItems = [
      {
        eventId: "evt_013",
        selectedTickets: [
          {
            tierId: "bad-tier",
            quantity: 1,
            unitPrice: 59,
            lineTotal: 59,
          },
          {
            tierId: "general",
            quantity: 2,
            unitPrice: 59,
            lineTotal: 118,
          },
        ],
        subtotal: 177,
        serviceFee: 15,
        total: 192,
        addedAt: "2026-04-19T02:32:10.806Z",
      },
    ];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(persistedCartItems));

    expect(getCheckoutCart()).toHaveLength(1);
    expect(getCheckoutCart()[0].selectedTickets).toEqual([
      expect.objectContaining({
        tierId: "general",
        quantity: 2,
        tierData: expect.objectContaining({
          name: "General",
          remaining: 146,
          perOrderLimit: 8,
        }),
      }),
    ]);
  });

  it("filters cart items when every selected ticket tier is invalid", () => {
    const persistedCartItems = [
      {
        eventId: "evt_013",
        selectedTickets: [
          {
            tierId: "bad-tier",
            quantity: 1,
            unitPrice: 59,
            lineTotal: 59,
          },
        ],
        subtotal: 59,
        serviceFee: 5,
        total: 64,
        addedAt: "2026-04-19T02:32:10.806Z",
      },
    ];

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(persistedCartItems));

    expect(getCheckoutCart()).toEqual([]);
  });
});
