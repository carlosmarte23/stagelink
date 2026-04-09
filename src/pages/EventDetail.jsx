import { useParams } from "react-router-dom";

import { getEventById } from "../features/events/data/eventsRepository";
import {
  getVenueName,
  getVenueAddress,
  getFormattedShowAt,
  getFormattedDoorsAt,
} from "../features/events/lib/eventSelectors";

import styles from "./EventDetail.module.css";
import { EventDetailNotFound } from "../components/events/EventDetailNotFound/EventDetailNotFound.jsx";

export default function EventDetail() {
  const { eventId } = useParams();
  const event = getEventById(eventId);

  if (!event) return <EventDetailNotFound />;

  const venueName = getVenueName(event);
  const venueAddress = getVenueAddress(event);
  const eventStartsAt = getFormattedShowAt(event);
  const eventDoorsAt = getFormattedDoorsAt(event);

  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <img className={styles.image} src={event.imageUrl} alt={event.title} />
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{event.title}</h1>
          <p className={styles.description}>{event.description}</p>
        </header>
        <section className={styles.date}>
          <span className={styles.icon}>icon</span>
          <div className={styles.text}>
            <h2>{eventStartsAt.fullDate}</h2>
            <p>{`Doors at ${eventDoorsAt?.time}, Show at ${eventStartsAt?.timeWithZone}`}</p>
          </div>
        </section>
        <section className={styles.venue}>
          <span>icon</span>
          <div className={styles.text}>
            <h2>{venueName}</h2>
            <p>{venueAddress}</p>
          </div>
        </section>
      </div>
      <aside className={styles.ticketsPanel}>
        <h2>Select Your Tickets</h2>
      </aside>
    </main>
  );
}
