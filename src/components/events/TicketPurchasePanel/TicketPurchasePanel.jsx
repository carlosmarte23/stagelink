import { useState } from "react";

import { getEffectiveTierLimit } from "../../../features/events/lib/eventSelectors";
import { formatCurrency } from "../../../utils/currency.js";
import { SERVICE_FEE_AMOUNT } from "../../../features/events/config/ticketPurchaseConfig";

import styles from "./TicketPurchasePanel.module.css";

export function TicketPurchasePanel({ ticketTiers }) {
  const initialState = ticketTiers.reduce((acc, tier) => {
    acc[tier.id] = 0;
    return acc;
  }, {});

  const [ticketTierQuantity, setTicketTierQuantity] = useState(initialState);

  const totalTicketQuantity = Object.values(ticketTierQuantity).reduce(
    (acc, quantity) => acc + quantity,
    0,
  );

  const isCtaDisabled = totalTicketQuantity === 0;

  function handleTicketTierChange(tierId, quantity) {
    setTicketTierQuantity((prev) => ({
      ...prev,
      [tierId]: quantity,
    }));
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

  const subTotalPrice = ticketTiers.reduce((acc, tier) => {
    const quantity = ticketTierQuantity[tier.id];
    return acc + tier.price * quantity;
  }, 0);
  const serviceFee = totalTicketQuantity === 0 ? 0 : SERVICE_FEE_AMOUNT;
  const totalPrice = subTotalPrice + serviceFee;

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
        <p className={styles.subTotal} aria-label={"Subtotal"}>
          Subtotal: <span>{formatCurrency(subTotalPrice)}</span>
        </p>
        <p className={styles.serviceFee} aria-label={"Service fee"}>
          Service fee: <span>{formatCurrency(serviceFee)}</span>
        </p>
        <p className={styles.total} aria-label={"Pricing Total"}>
          Total: <span>{formatCurrency(totalPrice)}</span>
        </p>
      </div>

      <button
        type="button"
        disabled={isCtaDisabled}
        aria-disabled={isCtaDisabled}
        className={`button button--primary ${styles.ctaButton}`}
      >
        Buy tickets
      </button>
    </aside>
  );
}
