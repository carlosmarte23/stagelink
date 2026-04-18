import {
  SERVICE_FEE_PER_TICKET,
  FACILITY_FEE_PER_ORDER,
} from "../config/checkoutConfig";

export function calculateTicketQuantity(selectedTickets) {
  return selectedTickets
    .map((tickets) => tickets.quantity)
    .reduce((acc, quantity) => acc + quantity, 0);
}

export function calculateSubtotal(selectedTickets) {
  return selectedTickets
    .map((tickets) => tickets.quantity * tickets.unitPrice)
    .reduce((acc, ticketSubtotal) => acc + ticketSubtotal, 0);
}
export function calculateServiceFees(selectedTickets) {
  return selectedTickets
    .map((tickets) => tickets.quantity * SERVICE_FEE_PER_TICKET)
    .reduce((acc, ticketSubtotal) => acc + ticketSubtotal, 0);
}
export function calculateFacilityCharge(hasItems) {
  return hasItems ? FACILITY_FEE_PER_ORDER : 0;
}
export function calculateCheckoutTotals(cartItems) {
  const allSelectedTickets = cartItems.flatMap((item) => item.selectedTickets);

  const calculatedTotalTickets = calculateTicketQuantity(allSelectedTickets);
  const calculatedSubtotal = calculateSubtotal(allSelectedTickets);
  const calculatedServiceFees = calculateServiceFees(allSelectedTickets);
  const calculatedFacilityCharge = calculateFacilityCharge(
    cartItems.length > 0,
  );

  return {
    ticketsQuantity: calculatedTotalTickets,
    subtotal: calculatedSubtotal,
    serviceFees: calculatedServiceFees,
    facilityCharge: calculatedFacilityCharge,
    total:
      calculatedSubtotal + calculatedServiceFees + calculatedFacilityCharge,
  };
}
