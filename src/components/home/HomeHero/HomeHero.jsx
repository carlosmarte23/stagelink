import styles from "./HomeHero.module.css";
import { Link } from "react-router-dom";

export default function HomeHero() {
  const HERO_BG_URL =
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1280&auto=format&fit=crop";
  return (
    <section
      className={styles.hero}
      style={{ "--hero-bg-url": `url(${HERO_BG_URL})` }}
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
