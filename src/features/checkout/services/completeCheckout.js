import {
  createConfirmedOrder,
  generateLocalTicketsFromOrder,
} from "../lib/checkoutConfirmation.js";
import { appendOrder } from "../../orders/lib/orderStorage";
import { appendTickets } from "../../tickets/lib/ticketStorage.js";
import { clearCart } from "../../cart/lib/cartStorage.js";
export function completeCheckout({
  items,
  totals,
  buyerDetails,
  paymentDetails,
}) {
  if (!items.length) {
    throw new Error("can't complete checkout with no items");
  }

  const confirmedOrder = createConfirmedOrder({
    items,
    totals,
    buyerDetails,
    paymentDetails,
  });

  if (!confirmedOrder) {
    throw new Error("Cannot complete checkout without a confirmed order.");
  }

  const tickets = generateLocalTicketsFromOrder(confirmedOrder);

  appendOrder(confirmedOrder);
  appendTickets(tickets);

  clearCart();

  return {
    confirmedOrder,
    tickets,
  };
}
