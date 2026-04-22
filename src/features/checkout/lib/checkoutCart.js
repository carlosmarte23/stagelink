import { getCart } from "../../cart/lib/cartStorage.js";
import { getEventById } from "../../../features/events/data/eventsRepository.js";
function enrichEventCartItems(cartItems) {
  return cartItems
    .map((cartItem) => enrichCheckoutCartItem(cartItem))
    .filter(Boolean);
}

function enrichCheckoutCartItem(cartItem) {
  const eventData = getEventById(cartItem.eventId);

  if (!eventData) return null;

  const selectedTickets = cartItem.selectedTickets
    .map((selectedTicket) => {
      if (!selectedTicket) return null;
      const tierData = eventData.ticketTiers.find(
        (tiersData) => tiersData.id === selectedTicket.tierId,
      );

      if (!tierData) return null;

      return {
        ...selectedTicket,
        tierData: {
          name: tierData.name,
          price: tierData.price,
          remaining: tierData.remaining,
          perOrderLimit: tierData.perOrderLimit,
        },
      };
    })
    .filter(Boolean);

  if (selectedTickets.length === 0) return null;

  const enrichedEvent = {
    eventId: cartItem.eventId,
    eventData: {
      title: eventData.title,
      startsAt: eventData.startsAt,
      timezone: eventData.timezone,
      imageUrl: eventData.imageUrl,
      genres: eventData.genres,
      venue: {
        name: eventData.venue.name,
        city: eventData.venue.city,
      },
    },
    selectedTickets,
    addedAt: cartItem.addedAt,
  };

  return enrichedEvent;
}

export function getCheckoutCart() {
  return enrichEventCartItems(getCart());
}
