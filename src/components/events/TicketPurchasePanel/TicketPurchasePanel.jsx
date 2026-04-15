import styles from "./TicketPurchasePanel.module.css";

export function TicketPurchasePanel({ ticketTiers }) {
  return (
    <aside
      className={styles.ticketsPanel}
      aria-labelledby="ticket-panel-heading"
    >
      <h2 id="ticket-panel-heading">Select Your Tickets</h2>
      <ul aria-label="Ticket tiers">
        {ticketTiers.map((tier) => (
          <li key={tier.id} aria-disabled={tier.remaining === 0}>
            <div className={styles.tierData}>
              <h3>{tier.name}</h3>
              <span>{tier.description}</span>
              <span>{`$${tier.price}.00`}</span>
            </div>
            {tier.remaining === 0 && (
              <span className={styles.soldOut}>Sold out</span>
            )}
            <div className={styles.tierControls}>
              <button type="button">-</button>
              <span aria-label={`${tier.name} quantity`}>0</span>
              <button type="button">+</button>
            </div>
          </li>
        ))}
      </ul>
      <button type="button" disabled aria-disabled="true">
        Buy tickets
      </button>
    </aside>
  );
}
