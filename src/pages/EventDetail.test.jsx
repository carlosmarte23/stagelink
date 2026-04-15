import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import * as eventRepository from "../features/events/data/eventsRepository";
import EventDetail from "./EventDetail.jsx";

function renderEventDetailPage(eventId = "evt_001") {
  const fullPath = `/events/${eventId}`;

  return (
    <MemoryRouter initialEntries={[fullPath]}>
      <Routes>
        <Route path="/events/:eventId" element={<EventDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("EventDetail", () => {
  const validId = "evt_001";

  it("renders the event correctly from route params", () => {
    render(renderEventDetailPage(validId));

    const event = eventRepository.getEventById("evt_001");
    expect(screen.getByText(event.title)).toBeInTheDocument();
    expect(screen.getByText(event.description)).toBeInTheDocument();
    expect(screen.getByText(event.venue.name)).toBeInTheDocument();
    expect(screen.getByText(event.venue.address)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /select your tickets/i }),
    ).toBeInTheDocument();
  });

  it("renders a fallback when the event does not exist", () => {
    render(renderEventDetailPage("bad-id"));

    expect(screen.getByText(/event not found/i)).toBeInTheDocument();
    expect(screen.getByText(/we couldn.t find/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go back/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /browse all events/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /go home/i })).toBeInTheDocument();
  });
});
