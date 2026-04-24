import { beforeEach, describe, expect, it } from "vitest";

import {
  getCart,
  addEventTicketsToCart,
  saveCart,
  increaseCartTicketQuantity,
  decreaseCartTicketQuantity,
  removeCartTicketTier,
} from "./cartStorage.js";
import { CART_STORAGE_KEY } from "../config/cartConfig.js";
import { SERVICE_FEE_PER_TICKET } from "../../pricing/config/pricingConfig.js";

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

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({}));
    expect(getCart()).toEqual([]);
  });

  describe("updates the cart from checkout", () => {
    it("increases the selected tier quantity and recalculates the stored cart item", () => {
      saveCart([mockEventCartItem]);

      const updatedCart = increaseCartTicketQuantity("evt_001", "general");
      const subtotal = 466;
      const serviceFee = SERVICE_FEE_PER_TICKET * 4;

      expect(updatedCart).toEqual([
        {
          ...mockEventCartItem,
          selectedTickets: [
            {
              tierId: "general",
              quantity: 3,
              unitPrice: 79,
              lineTotal: 237,
            },
            {
              tierId: "meet-greet",
              quantity: 1,
              unitPrice: 229,
              lineTotal: 229,
            },
          ],
          subtotal,
          serviceFee,
          total: subtotal + serviceFee,
        },
      ]);
      expect(getCart()).toEqual(updatedCart);
    });

    it("decreases the selected tier quantity and recalculates the stored cart item", () => {
      saveCart([mockEventCartItem]);

      const updatedCart = decreaseCartTicketQuantity("evt_001", "general");
      const subtotal = 308;
      const serviceFee = SERVICE_FEE_PER_TICKET * 2;

      expect(updatedCart).toEqual([
        {
          ...mockEventCartItem,
          selectedTickets: [
            {
              tierId: "general",
              quantity: 1,
              unitPrice: 79,
              lineTotal: 79,
            },
            {
              tierId: "meet-greet",
              quantity: 1,
              unitPrice: 229,
              lineTotal: 229,
            },
          ],
          subtotal,
          serviceFee,
          total: subtotal + serviceFee,
        },
      ]);
      expect(getCart()).toEqual(updatedCart);
    });

    it("does not decrease a selected tier below one ticket", () => {
      saveCart([anotherEventCartItem]);

      const updatedCart = decreaseCartTicketQuantity("evt_002", "vip");

      expect(updatedCart).toEqual([
        {
          ...anotherEventCartItem,
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
        },
      ]);
      expect(getCart()).toEqual(updatedCart);
    });

    it("removes the selected tier and recalculates the event when other tiers remain", () => {
      saveCart([mockEventCartItem]);

      const updatedCart = removeCartTicketTier("evt_001", "general");
      const subtotal = 229;
      const serviceFee = SERVICE_FEE_PER_TICKET * 1;

      expect(updatedCart).toEqual([
        {
          ...mockEventCartItem,
          selectedTickets: [
            {
              tierId: "meet-greet",
              quantity: 1,
              unitPrice: 229,
              lineTotal: 229,
            },
          ],
          subtotal,
          serviceFee,
          total: subtotal + serviceFee,
        },
      ]);

      expect(getCart()).toEqual(updatedCart);
    });

    it("removes the event when the user removes its last selected tier", () => {
      saveCart([anotherEventCartItem]);

      const updatedCart = removeCartTicketTier("evt_002", "vip");

      expect(updatedCart).toEqual([]);
      expect(getCart()).toEqual([]);
    });

    it("does not modify other events or tiers when updating one selected tier", () => {
      saveCart([mockEventCartItem, anotherEventCartItem]);
      const updatedCart = increaseCartTicketQuantity("evt_001", "general");

      expect(updatedCart).toEqual([
        {
          ...mockEventCartItem,
          selectedTickets: [
            {
              tierId: "general",
              quantity: 3,
              unitPrice: 79,
              lineTotal: 237,
            },
            {
              tierId: "meet-greet",
              quantity: 1,
              unitPrice: 229,
              lineTotal: 229,
            },
          ],
          subtotal: 466,
          serviceFee: 20,
          total: 486,
        },
        {
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
        },
      ]);

      expect(getCart()).toEqual(updatedCart);
    });

    it("leaves the cart unchanged when the event or tier does not exist", () => {
      saveCart([mockEventCartItem, anotherEventCartItem]);
      const updatedCartForMissingEvent = increaseCartTicketQuantity(
        "evt_003",
        "general",
      );
      const updatedCartForMissingTier = removeCartTicketTier(
        "evt_001",
        "missing-tier",
      );

      expect(updatedCartForMissingEvent).toEqual([
        mockEventCartItem,
        anotherEventCartItem,
      ]);
      expect(updatedCartForMissingTier).toEqual([
        mockEventCartItem,
        anotherEventCartItem,
      ]);
      expect(getCart()).toEqual([mockEventCartItem, anotherEventCartItem]);
    });
  });
});
