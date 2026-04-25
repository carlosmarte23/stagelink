import { Link2Off, ArrowLeft, Search, Home } from "lucide-react";
import { Link } from "react-router-dom";

import styles from "./EventDetailNotFound.module.css";

export function EventDetailNotFound() {
  return (
    <div className={styles.page}>
      <div className={styles.backgroundLayer} aria-hidden="true">
        <div className={styles.backgroundIcon} aria-hidden="true">
          <Link2Off />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.hero}>
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
          <span className={styles.backIcon} aria-hidden="true">
            <ArrowLeft />
          </span>
          <span>Go back</span>
        </Link>
      </div>
      <div className={styles.footer}>
        <Link to="/events" className={`button ${styles.footerButton}`}>
          <span className={styles.footerIcon} aria-hidden="true">
            <Search />
          </span>
          <div className={styles.text}>
            <span className={styles.label}>Browse All Events</span>
            <span className={styles.caption}>Find other live music</span>
          </div>
        </Link>
        <Link to="/" className={`button ${styles.footerButton}`}>
          <span className={styles.footerIcon} aria-hidden="true">
            <Home />
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
