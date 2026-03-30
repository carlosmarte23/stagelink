import events from "../data/events.json";

import HomeHero from "../components/home/HomeHero/HomeHero.jsx";
import FeaturedEventsSection from "../components/home/FeaturedEventsSection/FeaturedEventsSection.jsx";
import NewsletterForm from "../components/home/NewsletterForm/NewsletterForm.jsx";

export default function Home() {
  const upcomingEvents = events.filter((event) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.date);
    return eventDate > today;
  });

  const featured = upcomingEvents
    .filter((event) => event.isFeatured)
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 6);
  return (
    <>
      <HomeHero />
      <div className="container">
        <FeaturedEventsSection events={featured} />
        <NewsletterForm />
      </div>
    </>
  );
}
