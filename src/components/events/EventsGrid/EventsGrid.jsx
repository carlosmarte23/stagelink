import styles from "./EventsGrid.module.css";
import EventCard from "../EventCard/EventCard.jsx";

export default function EventsGrid({ events }) {
  return (
    <div className={styles.grid}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} variant="listings" />
      ))}
    </div>
  );
}
