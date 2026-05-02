export const TICKET_STORAGE_KEY = "stageLinkTickets";
const DEFAULT_TICKET_QR_BASE_URL = "https://stagelink-one.vercel.app/";

export const TICKET_QR_BASE_URL =
  import.meta.env.VITE_TICKET_QR_BASE_URL?.trim() || DEFAULT_TICKET_QR_BASE_URL;

function createDemoQrValue(ticketId) {
  const url = new URL(TICKET_QR_BASE_URL);

  url.searchParams.set("source", "stagelink-ticket");
  url.searchParams.set("ticketId", ticketId);

  return url.toString();
}

const DEMO_PAST_TICKET_ID = "SL-DEMO-PAST-EVT_001-GENERAL-001";

export const DEFAULT_DEMO_TICKETS = [
  {
    orderId: "SL-DEMO-PAST",
    ticketId: DEMO_PAST_TICKET_ID,
    status: "active",
    holderName: "Alex Mercer",
    eventId: "evt_001",
    tierId: "general",
    qrValue: createDemoQrValue(DEMO_PAST_TICKET_ID),
    eventSnapshot: {
      title: "Neon Nights Tour",
      startsAt: "2026-04-14T20:00:00Z",
      timezone: "America/New_York",
      imageUrl: "https://images.unsplash.com/photo-1622136352909-642073a6be1f",
      venue: {
        name: "The Grand Arena",
        city: "Philadelphia, PA",
      },
    },
    tierSnapshot: {
      name: "General",
      unitPrice: 79,
    },
  },
];
