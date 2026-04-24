import { describe, expect, it } from "vitest";

import {
  calculateTicketQuantity,
  calculateSubtotal,
  calculateServiceFees,
  calculateFacilityCharge,
  calculateCheckoutTotals,
  calculateEventSubtotal,
} from "./ticketPricing.js";

import {
  SERVICE_FEE_PER_TICKET,
  FACILITY_FEE_PER_ORDER,
} from "../config/pricingConfig.js";

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
describe("ticketPricing", () => {
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

  it("returns a calculated event subtotal", () => {
    const cartEventItem = {
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
    };

    expect(calculateEventSubtotal(cartEventItem)).toEqual(238);
  });
});
