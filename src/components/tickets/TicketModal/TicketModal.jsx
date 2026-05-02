import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { X, CircleAlert } from "lucide-react";

import TicketQrCode from "../TicketQrCode.jsx";
import styles from "./TicketModal.module.css";

export default function TicketModal({ ticket, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;

    if (!modal) return;

    if (ticket && !modal.open) {
      modal.showModal();
    }

    if (!ticket && modal.open) {
      modal.close();
    }
  }, [ticket]);

  function handleClose() {
    onClose();
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  if (!ticket) return null;

  const { eventId, eventSnapshot, tierSnapshot, holderName, shortTicketId } =
    ticket;
  const { title: eventName } = eventSnapshot;
  const { name: tierName } = tierSnapshot;
  return (
    <dialog
      ref={modalRef}
      className={styles.modal}
      onClose={handleClose}
      onClick={handleBackdropClick}
      aria-labelledby="ticket-modal-title"
    >
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close ticket modal"
      >
        <X aria-hidden="true" />
      </button>

      <header className={styles.header}>
        <Link to={`/events/${eventId}`} className={styles.eventLink}>
          <h2 id="ticket-modal-title" className={styles.title}>
            {eventName}
          </h2>
        </Link>
        <p className={styles.tier}>{tierName}</p>
      </header>

      <div className={styles.qrFrame}>
        <TicketQrCode value={ticket.qrValue} size={196} />
      </div>

      <div className={styles.meta}>
        <div className={styles.metaHolder}>
          <span className={styles.metaLabel}>Holder</span>
          <strong className={styles.metaValue}>{holderName}</strong>
        </div>
        <div className={styles.metaTicket}>
          <span className={styles.metaLabel}>Ticket ID</span>
          <strong className={styles.metaValue}>{shortTicketId}</strong>
        </div>
        <div className={styles.metaNote}>
          <CircleAlert aria-hidden="true" className={styles.metaIcon} />
          <span className={styles.metaValue}>
            Present this code at the entrance
          </span>
        </div>
      </div>
    </dialog>
  );
}
