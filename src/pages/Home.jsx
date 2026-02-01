import events from "../data/events.json";

export default function Home() {
  return (
    <>
      <h1>StageLink</h1>
      <div>
        {events.map((event) => (
          <div key={event.id}>
            <h3>{event.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
