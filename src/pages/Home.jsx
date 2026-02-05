import { Link } from "react-router-dom";
import events from "../data/events.json";
import styles from "./Home.module.css";

const HERO_URL =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1280&auto=format&fit=crop";
export default function Home() {
  const featured = events
    .filter((event) => event.isFeatured)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);
  return (
    <>
      <section className={styles.hero} aria-labelledby="home-hero-title">
        <div
          className={styles.heroBg}
          style={{ backgroundImage: `url(${HERO_URL})` }}
          aria-hidden="true"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />

        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Live music, <span className={styles.highlight}>unforgettable</span>{" "}
            moments.
          </h1>
          <p className={styles.heroText}>
            The modern way to experience live events. Discover curated concerts
            and get your tickets in seconds.
          </p>
          <Link
            to="/events"
            className={`button button--primary ${styles.heroCta}`}
          >
            Explore Events
          </Link>
        </div>
      </section>

      <section className="container content">
        <div className="content__heading">
          <p>Selected for you</p>
          <h2>Featured Events</h2>
          <Link to="/events">View all events</Link>
        </div>
        <div className="featured-grid">
          {featured.map((event) => (
            <Link
              key={event.id}
              to={`/events/${event.id}`}
              className="card card--featured"
            >
              {/* <img src={event.imageUrl} alt="" /> */}
              <div className="card__content">
                <p>{event.date}</p>
                <h3>{event.title}</h3>
                <p>{event.venueName}</p>
                <h3>{event.city}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="newsletter-form">
        <h2>Never miss a beat.</h2>
        <p>
          Sign up for our newsletter to receive personalized event
          recommendations and early bird access to tickets.
        </p>
        <form>
          <input type="email" placeholder="Enter your email" />
          <button type="submit" className="button button--primary">
            Subscribe
          </button>
        </form>
      </section>
    </>
  );
}
