export const TICKET_STORAGE_KEY = "stageLinkTickets";
const DEFAULT_TICKET_QR_BASE_URL = "https://stagelink-one.vercel.app/";

export const TICKET_QR_BASE_URL =
  import.meta.env.VITE_TICKET_QR_BASE_URL?.trim() || DEFAULT_TICKET_QR_BASE_URL;
