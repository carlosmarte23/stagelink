import { Link } from "react-router-dom";
import { Ticket } from "lucide-react";

import styles from "./EmptyTicketList.module.css";

export default function EmptyTicketList({ onLoadDemoTickets }) {
  return (
    <div className={styles.emptyStateContainer}>
      <div className={styles.image} aria-hidden="true">
        <Ticket />
      </div>
      <h2 className={styles.title}>No tickets yet</h2>
      <p className={styles.description}>
        You haven&apos;t purchased any tickets for upcoming events. The night
        is young, find your next experience.
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          className={`button button--primary ${styles.button}`}
          onClick={onLoadDemoTickets}
        >
          Load Demo Tickets
        </button>
        <Link to={"/events"} className={`button ${styles.button}`}>
          Explore Events
        </Link>
      </div>
    </div>
  );
}
