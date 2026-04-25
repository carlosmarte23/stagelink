import { useParams, Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import { getEventById } from "../features/events/data/eventsRepository";
import {
  getVenueName,
  getVenueAddress,
  getFormattedShowAt,
  getFormattedDoorsAt,
} from "../features/events/lib/eventSelectors";

import { buildUnsplashImageUrl } from "../utils/images";

import { EventDetailNotFound } from "../components/events/EventDetailNotFound/EventDetailNotFound.jsx";
import { TicketPurchasePanel } from "../components/events/TicketPurchasePanel/TicketPurchasePanel.jsx";

import styles from "./EventDetail.module.css";

export default function EventDetail() {
  const { eventId } = useParams();
  const event = getEventById(eventId);

  if (!event) return <EventDetailNotFound />;

  const mobileHeroImg = buildUnsplashImageUrl(event.imageUrl, {
    width: 600,
    quality: 70,
  });

  const desktopHeroImg = buildUnsplashImageUrl(event.imageUrl, {
    width: 900,
    quality: 75,
  });

  const venueName = getVenueName(event);
  const venueAddress = getVenueAddress(event);
  const eventStartsAt = getFormattedShowAt(event);
  const eventDoorsAt = getFormattedDoorsAt(event);
  const ticketTiers = event.ticketTiers;

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <img
          className={styles.image}
          src={mobileHeroImg}
          srcSet={`${mobileHeroImg} 600w, ${desktopHeroImg} 900w`}
          sizes={`(max-width: 768px) 100vw, 60vw`}
          alt={event.title}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.mainInfo}>
          <header className={styles.header}>
            <h1 className={styles.title}>{event.title}</h1>
            <p className={styles.description}>{event.description}</p>
          </header>
          <div className={styles.infoSections}>
            <section className={styles.contentSection}>
              <span className={styles.icon} aria-hidden="true">
                <CalendarDays />
              </span>
              <div className={styles.text}>
                <h2 className={styles.title}>{eventStartsAt.fullDate}</h2>
                <p className={styles.detail}>
                  <span>{`Doors at ${eventDoorsAt?.time},`}</span>
                  <span>{`Show at ${eventStartsAt?.timeWithZone}`}</span>
                </p>
              </div>
            </section>
            <section className={styles.contentSection}>
              <span className={styles.icon}>
                <MapPin />
              </span>
              <div className={styles.text}>
                <h2 className={styles.title}>{venueName}</h2>
                <p className={styles.detail}>{venueAddress}</p>
              </div>
            </section>
          </div>
          <div className={styles.backLinkWrapper}>
            <Link className={`${styles.backLink}`} to="/events">
              <ArrowLeft />
              Go back to events
            </Link>
          </div>
        </div>
        <TicketPurchasePanel eventId={eventId} ticketTiers={ticketTiers} />
      </div>
    </div>
  );
}
