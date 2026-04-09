import { getAllEvents } from "../features/events/data/eventsRepository.js";
import { getUpcomingEvents } from "../features/events/lib/eventListingUtils.js";

import HomeHero from "../components/home/HomeHero/HomeHero.jsx";
import FeaturedEventsSection from "../components/home/FeaturedEventsSection/FeaturedEventsSection.jsx";
import NewsletterForm from "../components/home/NewsletterForm/NewsletterForm.jsx";

export default function Home() {
  const upcomingEvents = getUpcomingEvents(getAllEvents());

  const featured = upcomingEvents
    .filter((event) => event.isFeatured)
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
