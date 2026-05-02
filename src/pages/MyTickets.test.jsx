import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import {
  DEFAULT_DEMO_ORDERS,
  ORDER_STORAGE_KEY,
} from "../features/orders/config/orderConfig.js";
import {
  DEFAULT_DEMO_TICKETS,
  TICKET_STORAGE_KEY,
} from "../features/tickets/config/ticketConfig.js";

import MyTickets from "./MyTickets.jsx";

vi.mock("qrcode", () => ({
  default: {
    toCanvas: vi.fn(),
  },
}));

function renderMyTickets(initializeOrders = true) {
  if (initializeOrders) setupInitialOrders();

  render(
    <MemoryRouter>
      <MyTickets />
    </MemoryRouter>,
  );
}

const initialOrders = [
  {
    orderId: "SL-F8B8903F",
    status: "confirmed",
    items: [
      {
        eventId: "evt_002",
        title: "Midnight Bass Rave",
        imageUrl:
          "https://images.unsplash.com/photo-1768053917161-34fc3365c9b2",
        startsAt: "2026-06-21T23:00:00Z",
        timezone: "America/New_York",
        tickets: [
          {
            tierId: "general",
            tierName: "General",
            quantity: 2,
            unitPrice: 49,
            lineTotal: 98,
          },
          {
            tierId: "vip",
            tierName: "VIP",
            quantity: 1,
            unitPrice: 99,
            lineTotal: 99,
          },
        ],
        venue: {
          name: "Neon Warehouse",
          city: "Baltimore, MD",
        },
      },
    ],
    totals: {
      ticketsQuantity: 3,
      subtotal: 197,
      serviceFees: 15,
      facilityCharge: 15,
      total: 227,
    },
    buyerDetails: {
      fullName: "John Doe",
      email: "john_doe@test.com",
      phone: "5551234567",
    },
    paymentDetails: {
      method: "card",
      cardLast4: "1234",
      saveCard: false,
    },
    createdAt: "2026-04-30T18:27:37.377Z",
    confirmedAt: "2026-04-30T18:27:37.377Z",
  },
  {
    orderId: "SL-59E1BFA1",
    status: "confirmed",
    items: [
      {
        eventId: "evt_004",
        title: "Hip-Hop Takeover: Live Cypher",
        imageUrl:
          "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
        startsAt: "2026-07-07T02:00:00Z",
        timezone: "America/New_York",
        tickets: [
          {
            tierId: "meet-greet",
            tierName: "Meet & Greet",
            quantity: 1,
            unitPrice: 179,
            lineTotal: 179,
          },
        ],
        venue: {
          name: "Uptown Theater",
          city: "Washington, DC",
        },
      },
      {
        eventId: "evt_018",
        title: "Electronic Bloom",
        imageUrl:
          "https://images.unsplash.com/photo-1768053917161-34fc3365c9b2",
        startsAt: "2026-09-22T02:00:00Z",
        timezone: "America/Denver",
        tickets: [
          {
            tierId: "general",
            tierName: "General",
            quantity: 2,
            unitPrice: 59,
            lineTotal: 118,
          },
        ],
        venue: {
          name: "Neon Warehouse",
          city: "Denver, CO",
        },
      },
    ],
    totals: {
      ticketsQuantity: 3,
      subtotal: 297,
      serviceFees: 15,
      facilityCharge: 15,
      total: 327,
    },
    buyerDetails: {
      fullName: "Jane Smith",
      email: "janesmith01@gmail.com",
      phone: "5553214321",
    },
    paymentDetails: {
      method: "card",
      cardLast4: "4321",
      saveCard: true,
    },
    createdAt: "2026-04-30T18:28:47.645Z",
    confirmedAt: "2026-04-30T18:28:47.645Z",
  },
];

const initialTickets = [
  {
    orderId: "SL-F8B8903F",
    ticketId: "SL-F8B8903F-EVT_002-GENERAL-001",
    status: "active",
    holderName: "John Doe",
    eventId: "evt_002",
    tierId: "general",
    qrValue:
      "https://stagelink-one.vercel.app/?source=stagelink-ticket&ticketId=SL-F8B8903F-EVT_002-GENERAL-001",
    eventSnapshot: {
      title: "Midnight Bass Rave",
      startsAt: "2026-06-21T23:00:00Z",
      timezone: "America/New_York",
      imageUrl: "https://images.unsplash.com/photo-1768053917161-34fc3365c9b2",
      venue: {
        name: "Neon Warehouse",
        city: "Baltimore, MD",
      },
    },
    tierSnapshot: {
      name: "General",
      unitPrice: 49,
    },
  },
  {
    orderId: "SL-F8B8903F",
    ticketId: "SL-F8B8903F-EVT_002-GENERAL-002",
    status: "active",
    holderName: "John Doe",
    eventId: "evt_002",
    tierId: "general",
    qrValue:
      "https://stagelink-one.vercel.app/?source=stagelink-ticket&ticketId=SL-F8B8903F-EVT_002-GENERAL-002",
    eventSnapshot: {
      title: "Midnight Bass Rave",
      startsAt: "2026-06-21T23:00:00Z",
      timezone: "America/New_York",
      imageUrl: "https://images.unsplash.com/photo-1768053917161-34fc3365c9b2",
      venue: {
        name: "Neon Warehouse",
        city: "Baltimore, MD",
      },
    },
    tierSnapshot: {
      name: "General",
      unitPrice: 49,
    },
  },
  {
    orderId: "SL-F8B8903F",
    ticketId: "SL-F8B8903F-EVT_002-VIP-001",
    status: "active",
    holderName: "John Doe",
    eventId: "evt_002",
    tierId: "vip",
    qrValue:
      "https://stagelink-one.vercel.app/?source=stagelink-ticket&ticketId=SL-F8B8903F-EVT_002-VIP-001",
    eventSnapshot: {
      title: "Midnight Bass Rave",
      startsAt: "2026-06-21T23:00:00Z",
      timezone: "America/New_York",
      imageUrl: "https://images.unsplash.com/photo-1768053917161-34fc3365c9b2",
      venue: {
        name: "Neon Warehouse",
        city: "Baltimore, MD",
      },
    },
    tierSnapshot: {
      name: "VIP",
      unitPrice: 99,
    },
  },
  {
    orderId: "SL-59E1BFA1",
    ticketId: "SL-59E1BFA1-EVT_004-MEET-GREET-001",
    status: "active",
    holderName: "Jane Smith",
    eventId: "evt_004",
    tierId: "meet-greet",
    qrValue:
      "https://stagelink-one.vercel.app/?source=stagelink-ticket&ticketId=SL-59E1BFA1-EVT_004-MEET-GREET-001",
    eventSnapshot: {
      title: "Hip-Hop Takeover: Live Cypher",
      startsAt: "2026-07-07T02:00:00Z",
      timezone: "America/New_York",
      imageUrl: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
      venue: {
        name: "Uptown Theater",
        city: "Washington, DC",
      },
    },
    tierSnapshot: {
      name: "Meet & Greet",
      unitPrice: 179,
    },
  },
  {
    orderId: "SL-59E1BFA1",
    ticketId: "SL-59E1BFA1-EVT_018-GENERAL-001",
    status: "active",
    holderName: "Jane Smith",
    eventId: "evt_018",
    tierId: "general",
    qrValue:
      "https://stagelink-one.vercel.app/?source=stagelink-ticket&ticketId=SL-59E1BFA1-EVT_018-GENERAL-001",
    eventSnapshot: {
      title: "Electronic Bloom",
      startsAt: "2026-09-22T02:00:00Z",
      timezone: "America/Denver",
      imageUrl: "https://images.unsplash.com/photo-1768053917161-34fc3365c9b2",
      venue: {
        name: "Neon Warehouse",
        city: "Denver, CO",
      },
    },
    tierSnapshot: {
      name: "General",
      unitPrice: 59,
    },
  },
  {
    orderId: "SL-59E1BFA1",
    ticketId: "SL-59E1BFA1-EVT_018-GENERAL-002",
    status: "active",
    holderName: "Jane Smith",
    eventId: "evt_018",
    tierId: "general",
    qrValue:
      "https://stagelink-one.vercel.app/?source=stagelink-ticket&ticketId=SL-59E1BFA1-EVT_018-GENERAL-002",
    eventSnapshot: {
      title: "Electronic Bloom",
      startsAt: "2026-09-22T02:00:00Z",
      timezone: "America/Denver",
      imageUrl: "https://images.unsplash.com/photo-1768053917161-34fc3365c9b2",
      venue: {
        name: "Neon Warehouse",
        city: "Denver, CO",
      },
    },
    tierSnapshot: {
      name: "General",
      unitPrice: 59,
    },
  },
];

function setupInitialOrders() {
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(initialOrders));
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(initialTickets));
}

describe("MyTickets", () => {
  beforeEach(() => {
    localStorage.removeItem(ORDER_STORAGE_KEY);
    localStorage.removeItem(TICKET_STORAGE_KEY);
  });

  describe("initial render", () => {
    it("renders the page and heading correctly", () => {
      renderMyTickets();

      expect(
        screen.getByRole("heading", { name: /my tickets/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/access and manage your digital event passes/i),
      ).toBeInTheDocument();
    });

    it("renders the empty state when there are no buyed tickets", () => {
      renderMyTickets(false);

      expect(
        screen.getByRole("heading", {
          level: 2,
          name: /no tickets yet/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          /you haven't purchased any tickets for upcoming events/i,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /explore events/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /load demo tickets/i }),
      ).toBeInTheDocument();
      expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
      expect(
        screen.queryByRole("link", { name: /browse more events/i }),
      ).not.toBeInTheDocument();
    });

    it("loads demo tickets from the empty state", async () => {
      const user = userEvent.setup();

      renderMyTickets(false);

      await user.click(
        screen.getByRole("button", { name: /load demo tickets/i }),
      );

      expect(screen.getByRole("searchbox")).toBeInTheDocument();
      expect(
        screen.getByRole("heading", { name: /indie sunset sessions/i }),
      ).toBeInTheDocument();
      expect(JSON.parse(localStorage.getItem(TICKET_STORAGE_KEY))).toEqual(
        DEFAULT_DEMO_TICKETS,
      );
      expect(JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY))).toEqual(
        DEFAULT_DEMO_ORDERS,
      );
    });

    it("renders the list of tickets when there are buyed tickets", () => {
      renderMyTickets();
    });

    it("renders a simple no results message when filters hide all tickets", async () => {
      const user = userEvent.setup();

      renderMyTickets();

      await user.type(screen.getByRole("searchbox"), "does-not-exist");

      expect(
        screen.getByText(/no tickets match your search/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/try another event, venue, or order number/i),
      ).toBeInTheDocument();
    });
  });
});
