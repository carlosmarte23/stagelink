import { CART_STORAGE_KEY } from "../config/cartConfig.js";

export function getCart() {
  const cart = localStorage.getItem(CART_STORAGE_KEY);

  if (!cart) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(cart);
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}
export function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));

  const savedCart = getCart();
  return savedCart;
}
export function addEventTicketsToCart(cart, eventCartItem) {
  if (!isValidEventCartItem(eventCartItem)) {
    throw new Error("Invalid event cart item");
  }

  const itemExists = cart.some(
    (cartItem) => cartItem.eventId === eventCartItem.eventId,
  );

  if (itemExists)
    return cart.map((cartItem) => {
      if (cartItem.eventId !== eventCartItem.eventId) return cartItem;
      return eventCartItem;
    });

  return [...cart, eventCartItem];
}

export function findCartItemByEventId(cart, eventId) {
  return cart.find((cartItem) => cartItem.eventId === eventId);
}

function isValidEventCartItem(eventCartItem) {
  if (
    eventCartItem === null ||
    typeof eventCartItem !== "object" ||
    Object.values(eventCartItem).some((value) => value === undefined)
  )
    return false;
  const { eventId, selectedTickets, subtotal, serviceFee, total, addedAt } =
    eventCartItem;

  if (typeof eventId !== "string" || eventId.trim() === "") return false;
  if (typeof subtotal !== "number" || Number.isFinite(subtotal) === false)
    return false;
  if (typeof serviceFee !== "number" || Number.isFinite(serviceFee) === false)
    return false;
  if (typeof total !== "number" || Number.isFinite(total) === false)
    return false;

  if (typeof addedAt !== "string" || addedAt.trim() === "") return false;
  if (
    Array.isArray(selectedTickets) === false ||
    selectedTickets === null ||
    selectedTickets.length === 0
  )
    return false;

  const hasValidSelectedTickets = selectedTickets.every((ticket) => {
    return (
      ticket &&
      typeof ticket === "object" &&
      typeof ticket.tierId === "string" &&
      ticket.tierId.trim() !== "" &&
      typeof ticket.quantity === "number" &&
      ticket.quantity >= 0 &&
      typeof ticket.unitPrice === "number" &&
      ticket.unitPrice >= 0 &&
      typeof ticket.lineTotal === "number" &&
      ticket.lineTotal >= 0
    );
  });

  if (!hasValidSelectedTickets) return false;

  return true;
}
