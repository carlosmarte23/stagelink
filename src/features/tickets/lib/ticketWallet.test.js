import { describe, it, expect } from "vitest";

import {
  getTicketEventDate,
  getTicketDateGroup,
  normalizeTicketSearchValue,
  ticketMatchesSearch,
  sortTicketsByDate,
  getShortTicketId,
  getVisibleTickets,
  TICKET_DATE_GROUPS,
} from "./ticketWallet.js";

const currentDate = new Date("2026-04-30T12:00:00Z");

const upcomingGeneralTicket = {
  orderId: "SL-A1B2C3D4",
  ticketId: "SL-A1B2C3D4-EVT_016-GENERAL-001",
  status: "active",
  holderName: "Alex Mercer",
  eventId: "evt_016",
  tierId: "general",
  qrValue:
    "https://stagelink.vercel.app/?source=stagelink-ticket&ticket=SL-A1B2C3D4-EVT_016-GENERAL-001",
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
    name: "General",
    unitPrice: 59,
  },
};

const upcomingVipTicket = {
  orderId: "SL-E5F6G7H8",
  ticketId: "SL-E5F6G7H8-EVT_019-VIP-001",
  status: "active",
  holderName: "Jordan Lee",
  eventId: "evt_019",
  tierId: "vip",
  qrValue:
    "https://stagelink.vercel.app/?source=stagelink-ticket&ticket=SL-E5F6G7H8-EVT_019-VIP-001",
  eventSnapshot: {
    title: "Midnight Syndicate",
    startsAt: "2026-06-14T01:00:00Z",
    timezone: "America/New_York",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    venue: {
      name: "The Obsidian Lounge",
      city: "New York, NY",
    },
  },
  tierSnapshot: {
    name: "VIP Access",
    unitPrice: 129,
  },
};

const pastTicket = {
  orderId: "SL-B0FC44D4",
  ticketId: "SL-B0FC44D4-EVT_013-GENERAL-001",
  status: "active",
  holderName: "John Doe",
  eventId: "evt_013",
  tierId: "general",
  qrValue:
    "https://stagelink.vercel.app/?source=stagelink-ticket&ticket=SL-B0FC44D4-EVT_013-GENERAL-001",
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
};

const recentPastTicket = {
  orderId: "SL-C1D2E3F4",
  ticketId: "SL-C1D2E3F4-EVT_014-VIP-001",
  status: "active",
  holderName: "Taylor Green",
  eventId: "evt_014",
  tierId: "vip",
  qrValue:
    "https://stagelink.vercel.app/?source=stagelink-ticket&ticket=SL-C1D2E3F4-EVT_014-VIP-001",
  eventSnapshot: {
    title: "Acoustic Sunset Sessions",
    startsAt: "2026-04-28T01:30:00Z",
    timezone: "America/Los_Angeles",
    imageUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81",
    venue: {
      name: "Golden Hour Amphitheater",
      city: "San Diego, CA",
    },
  },
  tierSnapshot: {
    name: "VIP",
    unitPrice: 89,
  },
};

const invalidDateTicket = {
  orderId: "SL-Z9Y8X7W6",
  ticketId: "SL-Z9Y8X7W6-EVT_404-GENERAL-001",
  status: "active",
  holderName: "Casey Morgan",
  eventId: "evt_404",
  tierId: "general",
  qrValue:
    "https://stagelink.vercel.app/?source=stagelink-ticket&ticket=SL-Z9Y8X7W6-EVT_404-GENERAL-001",
  eventSnapshot: {
    title: "Broken Date Showcase",
    startsAt: "not-a-date",
    timezone: "America/New_York",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    venue: {
      name: "Test Venue",
      city: "Boston, MA",
    },
  },
  tierSnapshot: {
    name: "General",
    unitPrice: 49,
  },
};

const savedTickets = [
  upcomingGeneralTicket,
  upcomingVipTicket,
  pastTicket,
  recentPastTicket,
  invalidDateTicket,
];

describe("ticketWallet", () => {
  it("returns the event date from the ticket data", () => {
    const date = getTicketEventDate(upcomingGeneralTicket);

    expect(date).toBeInstanceOf(Date);
    expect(isNaN(date.getTime())).toBe(false);
    expect(date.toISOString()).toBe("2026-05-21T02:00:00.000Z");
  });

  it("returns UPCOMING if the ticket is in the future", () => {
    expect(getTicketDateGroup(upcomingGeneralTicket, currentDate)).toBe(
      TICKET_DATE_GROUPS.UPCOMING,
    );
  });

  it("returns PAST if the ticket is in the past", () => {
    expect(getTicketDateGroup(pastTicket, currentDate)).toBe(
      TICKET_DATE_GROUPS.PAST,
    );
  });

  it("returns INVALID if the ticket date is invalid", () => {
    expect(getTicketDateGroup(invalidDateTicket, currentDate)).toBe(
      TICKET_DATE_GROUPS.INVALID,
    );
  });

  it("normalizes the search value", () => {
    expect(normalizeTicketSearchValue(" Electronic BloOM   Denver ")).toBe(
      "electronic bloom denver",
    );
  });

  it("returns true if the ticket matches the search value", () => {
    expect(
      ticketMatchesSearch(upcomingGeneralTicket, "electronic bloom denver"),
    ).toBe(true);
  });

  it("sorts the tickets array by date", () => {
    expect(sortTicketsByDate(savedTickets)).toEqual([
      pastTicket,
      recentPastTicket,
      upcomingGeneralTicket,
      upcomingVipTicket,
    ]);

    expect(sortTicketsByDate(savedTickets, "desc")).toEqual([
      upcomingVipTicket,
      upcomingGeneralTicket,
      recentPastTicket,
      pastTicket,
    ]);
  });

  it("returns the short ticket ID", () => {
    expect(getShortTicketId(upcomingGeneralTicket.ticketId)).toBe(
      "TK-GENERAL-001",
    );
  });

  it("returns the visible tickets", () => {
    const visibleGeneralTicket = {
      ...upcomingGeneralTicket,
      shortTicketId: "TK-GENERAL-001",
    };

    const visibleVipTicket = {
      ...upcomingVipTicket,
      shortTicketId: "TK-VIP-001",
    };

    const visiblePastTicket = {
      ...pastTicket,
      shortTicketId: "TK-GENERAL-001",
    };

    const visibleRecentPastTicket = {
      ...recentPastTicket,
      shortTicketId: "TK-VIP-001",
    };

    expect(
      getVisibleTickets({
        tickets: savedTickets,
        activeTab: "upcoming",
        searchQuery: "",
        now: currentDate,
      }),
    ).toEqual([visibleGeneralTicket, visibleVipTicket]);

    expect(
      getVisibleTickets({
        tickets: savedTickets,
        activeTab: "upcoming",
        searchQuery: "electronic bloom denver",
        now: currentDate,
      }),
    ).toEqual([visibleGeneralTicket]);

    expect(
      getVisibleTickets({
        tickets: savedTickets,
        activeTab: "past",
        searchQuery: "",
        now: currentDate,
      }),
    ).toEqual([visibleRecentPastTicket, visiblePastTicket]);
  });
});
