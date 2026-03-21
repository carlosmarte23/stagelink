import events from "../data/events.json";

import HomeHero from "../components/home/HomeHero/HomeHero.jsx";
import FeaturedEventsSection from "../components/home/FeaturedEventsSection/FeaturedEventsSection.jsx";

export default function Home() {
  const featured = events
    .filter((event) => event.isFeatured)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);
  return (
    <>
      <HomeHero />

      <div className="container">
        <FeaturedEventsSection events={featured} />
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
