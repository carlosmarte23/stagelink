import { Link } from "react-router-dom";
import events from "../data/events.json";
import styles from "./Home.module.css";
import HomeHero from "../components/home/HomeHero/HomeHero.jsx";
import EventCard from "../components/events/EventCard/EventCard.jsx";

export default function Home() {
  const featured = events
    .filter((event) => event.isFeatured)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);
  return (
    <>
      <HomeHero />

      <div className="container">
        <section id="featured-events" className={styles.featured}>
          <div className={styles.featuredHeader}>
            <p className={styles.kicker}>Selected for you</p>
            <h2 className={styles.featuredTitle}>Featured Events</h2>
            <Link to="/events" className={styles.viewAll}>
              View all events
            </Link>
          </div>
          <div className={styles.featuredGrid}>
            {featured.map((event) => (
              <EventCard key={event.id} event={event} variant={"featured"} />
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
      </div>
    </>
  );
}
