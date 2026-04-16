export function getCart() {
  throw new Error("Not implemented");
}
export function saveCart(cart) {
  throw new Error("Not implemented");
}
export function addEventTicketsToCart(cart, eventCartItem) {
  throw new Error("Not implemented");
}
export function findCartItemByEventId(cart, eventId) {
  throw new Error("Not implemented");
}
// Event cart item:
// - `eventId`
// - `selectedTickets`
// - `subtotal`
// - `serviceFee`
// - `total`
// - `addedAt`

// Selected ticket []:
// - `tierId`
// - `quantity`
// - `unitPrice`
// - `lineTotal`
