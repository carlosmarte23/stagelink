import { Link } from "react-router-dom";

import { formatDateTimeParts } from "../../../utils/dates";
import TicketQrCode from "../TicketQrCode.jsx";
import { MapPin } from "lucide-react";

import styles from "./TicketCard.module.css";

export default function TicketCard({ ticket, onViewTicketModal }) {
  const {
    orderId,
    eventId,
    shortTicketId,
    holderName,
    qrValue,
    eventSnapshot,
    tierSnapshot,
  } = ticket;
  const { title, startsAt, timezone, imageUrl, venue } = eventSnapshot;
  const { name: venueName, city } = venue;
  const { name: tierName } = tierSnapshot;

  const eventDateParts = formatDateTimeParts(startsAt, timezone);

  function handleClick() {
    onViewTicketModal(ticket);
  }

  return (
    <div className={styles.ticketCard}>
      <div className={styles.ticketLayout}>
        <Link to={`/events/${eventId}`} className={styles.ticketImageContainer}>
          <img src={imageUrl} alt={title} className={styles.ticketImage} />
        </Link>
        <div className={styles.ticketContent}>
          <div className={styles.ticketHeader}>
            <div className={styles.ticketEventData}>
              <div className={styles.ticketDate}>
                {`${eventDateParts.shortDate} - ${eventDateParts.time}`}{" "}
              </div>
              <div className={styles.ticketTier}>
                <p>{tierName}</p>
              </div>
            </div>
            <Link to={`/events/${eventId}`}>
              <h3 className={styles.ticketTitle}>{title}</h3>
            </Link>
            <div className={styles.ticketVenue}>
              <MapPin aria-hidden="true" />
              <p>{`${venueName}, ${city}`}</p>
            </div>
          </div>
          <div className={styles.ticketDataRow}>
            <div className={styles.ticketData}>
              <p className={styles.ticketDataLabel}>Holder Name</p>
              <p className={styles.ticketDataValue}>{holderName}</p>
            </div>
            <div className={styles.ticketData}>
              <p className={styles.ticketDataLabel}>Order #</p>
              <p className={styles.ticketDataValue}>{orderId}</p>
            </div>
          </div>
          <div className={styles.ticketFooter}>
            <div className={styles.qrCode}>
              <TicketQrCode value={qrValue} size={48} />
            </div>
            <div className={styles.ticketData}>
              <p className={styles.ticketDataLabel}>Ticket #</p>
              <p className={styles.ticketDataValue}>{shortTicketId}</p>
            </div>
            <button
              type="button"
              className={`button button--primary ${styles.qrButton}`}
              onClick={handleClick}
            >
              View QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
