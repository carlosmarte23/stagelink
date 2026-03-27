import { Link } from "react-router-dom";

import heroImg from "../../../assets/images/hero-image.webp";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  return (
    <section
      className={styles.hero}
      style={{
        backgroundImage: `
    linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgba(0, 0, 0, 0.7) 85%,
      var(--bg) 100%
    ),
    url(${heroImg})
    `,
      }}
      aria-labelledby="home-hero-title"
    >
      <div className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          Live music, <span className={styles.highlight}>unforgettable</span>
          <span> moments.</span>
        </h1>
        <p className={styles.heroText}>
          The modern way to experience live events. Discover curated concerts
          and get your tickets in seconds.
        </p>
        <div className={styles.heroCta}>
          <a
            href="#featured-events"
            className={`button button--primary ${styles.heroCta}`}
          >
            Explore Featured Events
          </a>

          <Link to="/events" className={`button  ${styles.heroCta}`}>
            See All Events
          </Link>
        </div>
      </div>
    </section>
  );
}
