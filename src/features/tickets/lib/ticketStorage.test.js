import { beforeEach, describe, it, expect } from "vitest";

import {
  appendTickets,
  getTicketById,
  getTickets,
  saveTickets,
} from "./ticketStorage.js";
import { TICKET_STORAGE_KEY } from "../config/ticketConfig.js";

const mockTickets = [
  {
    orderId: "SL-B0FC44D4",
    ticketId: "SL-B0FC44D4-EVT_013-GENERAL-001",
    status: "active",
    holderName: "Jhon Doe",
    eventId: "evt_013",
    tierId: "general",
    qrValue: "STAGELINK:TICKET:SL-B0FC44D4-EVT_013-GENERAL-001",
    eventSnapshot: {
      title: "Country Road Live",
      startsAt: "2026-04-24T00:00:00Z",
      timezone: "America/Chicago",
      imageUrl: "https://images.unsplash.com/photo-1466584820433-9ad1cc6798f3",
      venue: {
        name: "Skyline Pavilion",
        city: "Nashville, TN",
      },
    },
    tierSnapshot: {
      name: "General",
      unitPrice: 59,
    },
  },
  {
    orderId: "SL-B0FC44D4",
    ticketId: "SL-B0FC44D4-EVT_013-GENERAL-002",
    status: "active",
    holderName: "Jhon Doe",
    eventId: "evt_013",
    tierId: "general",
    qrValue: "STAGELINK:TICKET:SL-B0FC44D4-EVT_013-GENERAL-002",
    eventSnapshot: {
      title: "Country Road Live",
      startsAt: "2026-04-24T00:00:00Z",
      timezone: "America/Chicago",
      imageUrl: "https://images.unsplash.com/photo-1466584820433-9ad1cc6798f3",
      venue: {
        name: "Skyline Pavilion",
        city: "Nashville, TN",
      },
    },
    tierSnapshot: {
      name: "General",
      unitPrice: 59,
    },
  },
];

const newMockTickets = [
  {
    orderId: "SL-A1B2C3D4",
    ticketId: "SL-A1B2C3D4-EVT_016-VIP-001",
    status: "active",
    holderName: "Alice Foo",
    eventId: "evt_016",
    tierId: "vip",
    qrValue: "STAGELINK:TICKET:SL-A1B2C3D4-EVT_016-VIP-001",
    eventSnapshot: {
      title: "Electronic Bloom",
      startsAt: "2026-05-21T02:00:00Z",
      timezone: "America/Denver",
      imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
      venue: {
        name: "Neon Warehouse",
        city: "Denver, CO",
      },
    },
    tierSnapshot: {
      name: "VIP",
      unitPrice: 109,
    },
  },
  {
    orderId: "SL-A1B2C3D4",
    ticketId: "SL-A1B2C3D4-EVT_016-VIP-002",
    status: "active",
    holderName: "Alice Foo",
    eventId: "evt_016",
    tierId: "vip",
    qrValue: "STAGELINK:TICKET:SL-A1B2C3D4-EVT_016-VIP-002",
    eventSnapshot: {
      title: "Electronic Bloom",
      startsAt: "2026-05-21T02:00:00Z",
      timezone: "America/Denver",
      imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
      venue: {
        name: "Neon Warehouse",
        city: "Denver, CO",
      },
    },
    tierSnapshot: {
      name: "VIP",
      unitPrice: 109,
    },
  },
];

describe("ticketStorage", () => {
  beforeEach(() => {
    localStorage.removeItem(TICKET_STORAGE_KEY);
  });

  it("returns an empty array when no tickets exist", () => {
    expect(getTickets()).toEqual([]);
  });

  it("saves generated tickets", () => {
    const savedTickets = saveTickets(mockTickets);

    expect(savedTickets).toEqual(mockTickets);
    expect(getTickets()).toEqual(mockTickets);
  });

  it("appends generated tickets without removing existing tickets", () => {
    saveTickets(mockTickets);

    const updatedTickets = appendTickets(newMockTickets);

    expect(updatedTickets).toEqual([...mockTickets, ...newMockTickets]);
    expect(getTickets()).toEqual([...mockTickets, ...newMockTickets]);
  });

  it("returns a ticket by id", () => {
    saveTickets(mockTickets);

    expect(getTicketById("SL-B0FC44D4-EVT_013-GENERAL-001")).toEqual(
      mockTickets[0],
    );
  });
});
