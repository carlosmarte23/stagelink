import { Link } from "react-router-dom";

import styles from "./EventDetailNotFound.module.css";
export function EventDetailNotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <img
          className={styles.image}
          src="https://source.unsplash.com/random"
          alt="Event not found"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.icon}>svg</div>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>Event not found</h1>
        <p className={styles.description}>
          We couldn’t find the event you’re looking for. It might have been
          moved, canceled, or the link might be incorrect.
        </p>
        <Link to="/events">Go back</Link>
      </div>
      <div className={styles.footer}>
        <Link to="/events" className={styles.footerButton}>
          <span>icon</span>
          <div className={styles.text}>
            <span className={styles.label}>Browse All Events</span>
            <span className={styles.caption}>Find other live music</span>
          </div>
        </Link>
        <Link to="/" className={styles.footerButton}>
          <span>icon</span>
          <div className={styles.text}>
            <span className={styles.label}>Go Home</span>
            <span className={styles.caption}>Return to the home page</span>
          </div>
        </Link>
      </div>
    </main>
  );
}
