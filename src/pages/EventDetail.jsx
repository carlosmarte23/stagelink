import { useParams, Link } from "react-router-dom";

import { getEventById } from "../features/events/data/eventsRepository";
import {
  getVenueName,
  getVenueAddress,
  getFormattedShowAt,
  getFormattedDoorsAt,
} from "../features/events/lib/eventSelectors";

import { buildUnspashImageUrl } from "../utils/images";

import styles from "./EventDetail.module.css";

import { EventDetailNotFound } from "../components/events/EventDetailNotFound/EventDetailNotFound.jsx";
import { TicketPurchasePanel } from "../components/events/TicketPurchasePanel/TicketPurchasePanel.jsx";

export default function EventDetail() {
  const { eventId } = useParams();
  const event = getEventById(eventId);

  if (!event) return <EventDetailNotFound />;

  const mobileHeroImg = buildUnspashImageUrl(event.imageUrl, {
    width: 600,
    quality: 70,
  });

  const desktopHeroImg = buildUnspashImageUrl(event.imageUrl, {
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
              <span className={styles.icon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12" />
                  <path d="M16 3v4" />
                  <path d="M8 3v4" />
                  <path d="M4 11h16" />
                  <path d="M7 14h.013" />
                  <path d="M10.01 14h.005" />
                  <path d="M13.01 14h.005" />
                  <path d="M16.015 14h.005" />
                  <path d="M13.015 17h.005" />
                  <path d="M7.01 17h.005" />
                  <path d="M10.01 17h.005" />
                </svg>
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6" />
                </svg>
              </span>
              <div className={styles.text}>
                <h2 className={styles.title}>{venueName}</h2>
                <p className={styles.detail}>{venueAddress}</p>
              </div>
            </section>
          </div>
          <div className={styles.backLinkWrapper}>
            <Link className={`${styles.backLink}`} to="/events">
              <svg
                className={styles.backLinkIcon}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M5 12l4 4" />
                <path d="M5 12l4 -4" />
              </svg>
              Go back to events
            </Link>
          </div>
        </div>
        <TicketPurchasePanel ticketTiers={ticketTiers} />
      </div>
    </div>
  );
}
