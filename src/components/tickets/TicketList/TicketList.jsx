import TicketCard from "../TicketCard/TicketCard.jsx";
import styles from "./TicketList.module.css";

export default function TicketList({ tickets, onViewTicketModal }) {
  if (tickets.length === 0) {
    return (
      <div className={styles.noResults} role="status">
        <h2>No tickets match your search</h2>
        <p>Try another event, venue, or order number.</p>
      </div>
    );
  }

  return (
    <div className={styles.ticketList}>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.ticketId}
          ticket={ticket}
          onViewTicketModal={onViewTicketModal}
        />
      ))}
    </div>
  );
}
