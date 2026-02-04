import { Link } from "react-router-dom";
import events from "../data/events.json";

export default function Home() {
  const featured = events
    .filter((event) => event.isFeatured)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);
  return (
    <>
      <section className="hero" aria-labelledby="home-hero-title">
        <div className="hero__content">
          <h1 id="home-hero-title">
            Live music, <span className="highlight">unforgettable</span>{" "}
            moments.
          </h1>
          <p>
            The modern way to experience live events. Discover curated concerts
            and get your tickets in seconds.
          </p>
          <Link to="/events" className="button button--primary">
            Explore
          </Link>
        </div>
        <div className="hero__image" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1280&auto=format&fit=crop"
            alt=""
          />
        </div>
      </section>

      <section className="content">
        <div className="content__heading">
          <p>Selected for you</p>
          <h2>Featured Events</h2>
          <Link to="/events">View all events</Link>
        </div>
        <div className="featured-grid">
          {events
            .filter((event) => event.isFeatured)
            .map((event) => (
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
