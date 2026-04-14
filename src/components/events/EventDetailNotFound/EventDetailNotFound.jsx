import { Link } from "react-router-dom";

import styles from "./EventDetailNotFound.module.css";
export function EventDetailNotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <div className={styles.backgroundIcon} aria-hidden="true">
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
            <path d="M17 22v-2" />
            <path d="M9 15l6 -6" />
            <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
            <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
            <path d="M20 17h2" />
            <path d="M2 7h2" />
            <path d="M7 2v2" />
          </svg>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.hero}>
          <div className={styles.centerIcon} aria-hidden="true">
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
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M10 10l4 4m0 -4l-4 4" />
            </svg>
          </div>
          <span className={styles.code}>404</span>
        </div>
        <h1 className={styles.title}>Event not found</h1>
        <p className={styles.description}>
          We couldn’t find the event you’re looking for. It might have been
          moved, canceled, or the link might be incorrect.
        </p>
        <Link
          className={`button button--primary ${styles.backButton}`}
          to="/events"
        >
          <span className={styles.backIcon}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l14 0" />
              <path d="M5 12l4 4" />
              <path d="M5 12l4 -4" />
            </svg>
          </span>
          <span>Go back</span>
        </Link>
      </div>
      <div className={styles.footer}>
        <Link to="/events" className={`button ${styles.footerButton}`}>
          <span className={styles.footerIcon}>
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
              <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </span>
          <div className={styles.text}>
            <span className={styles.label}>Browse All Events</span>
            <span className={styles.caption}>Find other live music</span>
          </div>
        </Link>
        <Link to="/" className={`button ${styles.footerButton}`}>
          <span className={styles.footerIcon}>
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
              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
              <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
            </svg>
          </span>
          <div className={styles.text}>
            <span className={styles.label}>Go Home</span>
            <span className={styles.caption}>Return to the home page</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
