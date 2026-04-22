import { useState } from "react";

import { getEffectiveTierLimit } from "../../../features/events/lib/eventSelectors";
import { formatCurrency } from "../../../utils/currency.js";
import { SERVICE_FEE_PER_TICKET } from "../../../features/checkout/config/checkoutConfig.js";
import {
  saveCart,
  getCart,
  addEventTicketsToCart,
  findCartItemByEventId,
} from "../../../features/cart/lib/cartStorage.js";

import styles from "./TicketPurchasePanel.module.css";

function getInitialTicketQuantities(ticketTiers, eventCartItem) {
  return ticketTiers.reduce((acc, tier) => {
    const savedTicket = eventCartItem?.selectedTickets.find(
      (ticket) => ticket.tierId === tier.id,
    );
    const savedQuantity = savedTicket ? savedTicket.quantity : 0;
    acc[tier.id] = Math.min(savedQuantity, getEffectiveTierLimit(tier));

    return acc;
  }, {});
}

function getInitialPanelState(eventId, ticketTiers) {
  const eventCartItem = findCartItemByEventId(getCart(), eventId);

  return {
    quantities: getInitialTicketQuantities(ticketTiers, eventCartItem),
    isSelectionAddedToCart: Boolean(eventCartItem),
  };
}

export function TicketPurchasePanel({ eventId, ticketTiers }) {
  const [initialPanelState] = useState(() =>
    getInitialPanelState(eventId, ticketTiers),
  );

  const [ticketTierQuantity, setTicketTierQuantity] = useState(() => {
    return initialPanelState.quantities;
  });

  const [cartFeedBackMessage, setCartFeedBackMessage] = useState("");

  const totalTicketQuantity = Object.values(ticketTierQuantity).reduce(
    (acc, quantity) => acc + quantity,
    0,
  );

  const [isSelectionAddedToCart, setIsSelectionAddedToCart] = useState(
    initialPanelState.isSelectionAddedToCart,
  );

  const isCtaDisabled = totalTicketQuantity === 0 || isSelectionAddedToCart;

  function handleTicketTierChange(tierId, quantity) {
    setTicketTierQuantity((prev) => ({
      ...prev,
      [tierId]: quantity,
    }));

    if (cartFeedBackMessage) {
      setCartFeedBackMessage("");
    }

    setIsSelectionAddedToCart(false);
  }
  function reduceTicketQuantity(tier) {
    const currentValue = ticketTierQuantity[tier.id];
    if (currentValue > 0) {
      handleTicketTierChange(tier.id, currentValue - 1);
    }
  }
  function increaseTicketQuantity(tier) {
    const currentValue = ticketTierQuantity[tier.id];
    const tierLimit = getEffectiveTierLimit(tier);

    if (tierLimit === currentValue) return;

    handleTicketTierChange(tier.id, currentValue + 1);
  }

  function handleBuyClick() {
    const selectedTickets = Object.entries(ticketTierQuantity)
      .filter(([_tierId, quantity]) => {
        return quantity > 0;
      })
      .map(([tierId, quantity]) => {
        const tier = ticketTiers.find((tier) => tier.id === tierId);
        return {
          tierId,
          quantity,
          unitPrice: tier.price,
          lineTotal: tier.price * quantity,
        };
      });

    const subtotal = selectedTickets.reduce((acc, tier) => {
      return acc + tier.lineTotal;
    }, 0);

    const eventCartItem = {
      eventId: eventId,
      selectedTickets: selectedTickets,
      subtotal: subtotal,
      serviceFee: serviceFee,
      total: subtotal + serviceFee,
      addedAt: new Date().toISOString(),
    };
    const currentCart = getCart();
    const updatedCart = addEventTicketsToCart(currentCart, eventCartItem);
    saveCart(updatedCart);

    setCartFeedBackMessage("Tickets added to cart!");
    setIsSelectionAddedToCart(true);
  }

  const subtotalPrice = ticketTiers.reduce((acc, tier) => {
    const quantity = ticketTierQuantity[tier.id];
    return acc + tier.price * quantity;
  }, 0);

  const serviceFee = totalTicketQuantity * SERVICE_FEE_PER_TICKET;
  const totalPrice = subtotalPrice + serviceFee;

  return (
    <aside
      className={styles.ticketsPanel}
      aria-labelledby="ticket-panel-heading"
    >
      <h2 id="ticket-panel-heading" className={styles.panelHeading}>
        Select Your Tickets
      </h2>
      <ul aria-label="Ticket tiers" className={styles.tierList}>
        {ticketTiers.map((tier) => {
          const selectedQuantity = ticketTierQuantity[tier.id];
          const effectiveLimit = getEffectiveTierLimit(tier);
          const isSoldOut = effectiveLimit === 0;

          const isDecreaseDisabled = selectedQuantity === 0;
          const isIncreaseDisabled = effectiveLimit === selectedQuantity;

          return (
            <li key={tier.id} aria-disabled={isSoldOut} className={styles.tier}>
              <div className={styles.tierContent}>
                <div className={styles.tierData}>
                  <h3 className={styles.tierName}>{tier.name}</h3>
                  <p className={styles.tierDescription}>{tier.description}</p>
                  <span className={styles.tierPrice}>
                    {formatCurrency(tier.price)}
                  </span>
                </div>

                <div className={styles.tierControls}>
                  <button
                    type="button"
                    className={`${styles.quantityButton} ${styles.decreaseButton}`}
                    disabled={isDecreaseDisabled}
                    aria-label={`Decrease quantity of ${tier.name}`}
                    aria-disabled={isDecreaseDisabled}
                    onClick={() => reduceTicketQuantity(tier)}
                  >
                    -
                  </button>
                  <span
                    aria-label={`${tier.name} quantity`}
                    className={styles.tierQuantity}
                  >
                    {ticketTierQuantity[tier.id]}
                  </span>
                  <button
                    type="button"
                    disabled={isIncreaseDisabled}
                    aria-label={`Increase quantity of ${tier.name}`}
                    aria-disabled={isIncreaseDisabled}
                    onClick={() => increaseTicketQuantity(tier)}
                    className={`${styles.quantityButton} ${styles.increaseButton}`}
                  >
                    +
                  </button>
                </div>
              </div>
              {isSoldOut && (
                <span className={styles.soldOutBadge}>Sold out</span>
              )}
            </li>
          );
        })}
      </ul>

      <div className={styles.summary} aria-label={"Pricing summary"}>
        <p className={styles.summaryItem} aria-label={"Subtotal"}>
          Subtotal: <span>{formatCurrency(subtotalPrice)}</span>
        </p>
        <p className={styles.summaryItem} aria-label={"Service fee"}>
          Fees: <span>{formatCurrency(serviceFee)}</span>
        </p>
        <p
          className={`${styles.summaryItem} ${styles.summaryTotal}`}
          aria-label={"Pricing Total"}
        >
          Total: <span>{formatCurrency(totalPrice)}</span>
        </p>
      </div>

      <button
        type="button"
        disabled={isCtaDisabled}
        aria-disabled={isCtaDisabled}
        className={`button button--primary ${styles.ctaButton}`}
        onClick={handleBuyClick}
      >
        Buy tickets
      </button>
      {cartFeedBackMessage && (
        <p role="status" className={styles.cartMessage}>
          {cartFeedBackMessage}
        </p>
      )}
    </aside>
  );
}
