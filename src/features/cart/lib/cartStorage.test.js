import { beforeEach, describe, expect, it } from "vitest";

import { getCart, addEventTicketsToCart, saveCart } from "./cartStorage.js";
import { CART_STORAGE_KEY } from "../config/cartConfig.js";

const mockEventCartItem = {
  eventId: "evt_001",
  selectedTickets: [
    {
      tierId: "general",
      quantity: 2,
      unitPrice: 79,
      lineTotal: 158,
    },
    {
      tierId: "meet-greet",
      quantity: 1,
      unitPrice: 229,
      lineTotal: 229,
    },
  ],
  subtotal: 387,
  serviceFee: 5,
  total: 392,
  addedAt: "2026-04-15T18:30:00.000Z",
};

const anotherEventCartItem = {
  eventId: "evt_002",
  selectedTickets: [
    {
      tierId: "vip",
      quantity: 1,
      unitPrice: 99,
      lineTotal: 99,
    },
  ],
  subtotal: 99,
  serviceFee: 5,
  total: 104,
  addedAt: "2026-04-15T18:35:00.000Z",
};

describe("cartStorage", () => {
  beforeEach(() => {
    localStorage.removeItem(CART_STORAGE_KEY);
  });

  it("returns an empty cart when there is no stored cart data", () => {
    localStorage.removeItem(CART_STORAGE_KEY);

    expect(getCart()).toEqual([]);
  });

  it("adds a new event ticket selection to an empty cart", () => {
    const currentCart = getCart();
    expect(currentCart).toEqual([]);

    const updatedCart = addEventTicketsToCart(currentCart, mockEventCartItem);

    expect(updatedCart).toEqual([mockEventCartItem]);
  });

  it("saves a new event ticket selection to the cart", () => {
    const currentCart = getCart();
    expect(currentCart).toEqual([]);
    saveCart([mockEventCartItem]);

    expect(getCart()).toEqual([mockEventCartItem]);
  });

  it("replaces an existing cart item when the same event is added again", () => {
    let currentCart = getCart();

    expect(currentCart).toEqual([]);
    saveCart([mockEventCartItem]);

    const editedMockEventCartItem = {
      ...mockEventCartItem,
      selectedTickets: [
        {
          tierId: "vip",
          quantity: 1,
          unitPrice: 99,
          lineTotal: 99,
        },
      ],
    };

    currentCart = getCart();

    const updatedCart = addEventTicketsToCart(
      currentCart,
      editedMockEventCartItem,
    );

    expect(updatedCart).toEqual([editedMockEventCartItem]);

    saveCart(updatedCart);

    expect(getCart()).toEqual([editedMockEventCartItem]);
  });

  it("preserves other event cart items when replacing one event selection", () => {
    saveCart([mockEventCartItem, anotherEventCartItem]);

    const currentCart = getCart();
    expect(currentCart).toEqual([mockEventCartItem, anotherEventCartItem]);

    const editedMockEventCartItem = {
      ...mockEventCartItem,
      selectedTickets: [
        {
          tierId: "vip",
          quantity: 1,
          unitPrice: 99,
          lineTotal: 99,
        },
      ],
    };
    const updatedCart = addEventTicketsToCart(
      currentCart,
      editedMockEventCartItem,
    );

    expect(updatedCart).toEqual([
      editedMockEventCartItem,
      anotherEventCartItem,
    ]);

    saveCart(updatedCart);
    expect(getCart()).toEqual(updatedCart);
  });

  it("returns an empty cart when stored cart data is invalid", () => {
    localStorage.setItem(CART_STORAGE_KEY, "not-valid-JSON");
    expect(getCart()).toEqual([]);

    localStorage.setItem(CART_STORAGE_KEY, {});
    expect(getCart()).toEqual([]);
  });
});
