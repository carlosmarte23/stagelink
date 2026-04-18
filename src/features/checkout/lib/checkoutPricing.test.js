import { describe, expect, it } from "vitest";

import {
  calculateTicketQuantity,
  calculateSubtotal,
  calculateServiceFees,
  calculateFacilityCharge,
  calculateCheckoutTotals,
} from "./checkoutPricing";

import {
  SERVICE_FEE_PER_TICKET,
  FACILITY_FEE_PER_ORDER,
} from "../config/checkoutConfig";

const selectedTestTickets = [
  {
    tierId: "general",
    quantity: 1,
    unitPrice: 10,
    lineTotal: 10,
  },
  {
    tierId: "vip",
    quantity: 2,
    unitPrice: 40,
    lineTotal: 80,
  },
];
describe("checkoutPricing", () => {
  it("returns a calculated ticket quantity", () => {
    expect(calculateTicketQuantity(selectedTestTickets)).toBe(3);
  });

  it("returns a calculated subtotal", () => {
    expect(calculateSubtotal(selectedTestTickets)).toBe(90);
  });

  it("returns a calculated service fees", () => {
    const ticketQuantity = calculateTicketQuantity(selectedTestTickets);
    const serviceFee = ticketQuantity * SERVICE_FEE_PER_TICKET;

    expect(calculateServiceFees(selectedTestTickets)).toBe(serviceFee);
  });

  it("returns a calculated facility charge if the cart has items", () => {
    const hasItems = true;

    expect(calculateFacilityCharge(hasItems)).toBe(FACILITY_FEE_PER_ORDER);
  });

  it("returns a zero facility charge if the cart has no items", () => {
    const hasItems = false;

    expect(calculateFacilityCharge(hasItems)).toBe(0);
  });

  it("returns a calculated checkout totals", () => {
    const cartItems = [
      {
        eventId: "evt_001",
        selectedTickets: [
          { tierId: "meet-greet", quantity: 1, unitPrice: 229, lineTotal: 229 },
        ],
        subtotal: 229,
        serviceFee: 5,
        total: 234,
        addedAt: "2026-04-16T20:01:41.833Z",
      },
      {
        eventId: "evt_009",
        selectedTickets: [
          { tierId: "vip", quantity: 4, unitPrice: 85, lineTotal: 340 },
        ],
        subtotal: 340,
        serviceFee: 5,
        total: 345,
        addedAt: "2026-04-16T20:02:00.493Z",
      },
      {
        eventId: "evt_014",
        selectedTickets: [
          { tierId: "general", quantity: 2, unitPrice: 89, lineTotal: 178 },
        ],
        subtotal: 178,
        serviceFee: 5,
        total: 183,
        addedAt: "2026-04-17T14:12:28.586Z",
      },
    ];

    const allSelectedTickets = cartItems.flatMap(
      (cartItem) => cartItem.selectedTickets,
    );

    const calculatedSubtotal = calculateSubtotal(allSelectedTickets);
    const calculatedServiceFees = calculateServiceFees(allSelectedTickets);
    const calculatedFacilityCharge = calculateFacilityCharge(
      allSelectedTickets.length > 0,
    );
    const calculatedTotal =
      calculatedSubtotal + calculatedServiceFees + calculatedFacilityCharge;

    expect(calculateCheckoutTotals(cartItems)).toEqual({
      ticketsQuantity: calculateTicketQuantity(allSelectedTickets),
      subtotal: calculatedSubtotal,
      serviceFees: calculatedServiceFees,
      facilityCharge: calculatedFacilityCharge,
      total: calculatedTotal,
    });
  });

  it("ignores stale persisted totals", () => {
    const cartItems = [
      {
        selectedTickets: [
          {
            tierId: "meet-greet",
            quantity: 2,
            unitPrice: 100,
            lineTotal: 999999,
          },
        ],
        subtotal: 9999,
        serviceFee: 9999,
        total: 9999,
      },
    ];

    expect(calculateCheckoutTotals(cartItems)).toEqual({
      ticketsQuantity: 2,
      subtotal: 200,
      serviceFees: 10,
      facilityCharge: 15,
      total: 225,
    });
  });

  it("returns an object with all calculated values as 0 if cart is empty", () => {
    const cartItems = [];

    expect(calculateCheckoutTotals(cartItems)).toEqual({
      ticketsQuantity: 0,
      subtotal: 0,
      serviceFees: 0,
      facilityCharge: 0,
      total: 0,
    });
  });
});
