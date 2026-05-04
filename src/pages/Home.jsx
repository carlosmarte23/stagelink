import SEO from "../components/seo/SEO.jsx";
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
      <SEO
        title="Discover Live Events"
        description="Find curated concerts and live experiences, choose tickets, and keep your passes together with StageLink."
        canonicalPath="/"
      />
      <HomeHero />
      <div className="container">
        <FeaturedEventsSection events={featured} />
        <NewsletterForm />
      </div>
    </>
  );
}
