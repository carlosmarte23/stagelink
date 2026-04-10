import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

let mockEvents = [];

vi.mock("../features/events/data/eventsRepository.js", () => ({
  getAllEvents: () => mockEvents,
}));

import EventListings from "./EventListings.jsx";

function getResultsSummary() {
  const summary = screen.getByText(/\(showing \d+ of \d+ events\)/i);
  const match = summary.textContent.match(/\(showing (\d+) of (\d+) events\)/i);

  return {
    showing: Number(match[1]),
    total: Number(match[2]),
  };
}

describe("EventListings", () => {
  beforeEach(() => {
    mockEvents = [
      {
        id: "evt_test_000",
        title: "Past City Lights",
        description: "Past test event",
        startsAt: "2020-01-15T20:00:00Z",
        timezone: "America/New_York",
        imageUrl: "https://images.unsplash.com/photo-test-past",
        genres: ["Pop"],
        venue: {
          name: "Old Theater",
          city: "Austin, TX",
          address: "100 Archive Street, Austin, TX 78701",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Past admission.",
            price: 29,
            remaining: 20,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_001",
        title: "Acoustic Stories: Unplugged",
        description: "Test event",
        startsAt: "2099-04-10T00:30:00Z",
        timezone: "America/Chicago",
        imageUrl: "https://images.unsplash.com/photo-test-1",
        genres: ["Indie"],
        isFeatured: true,
        venue: {
          name: "Uptown Theater",
          city: "Austin, TX",
          address: "500 Red River Street, Austin, TX 78701",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Reserved floor seating for the acoustic set.",
            price: 39,
            remaining: 88,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_002",
        title: "Metal Forge Night",
        description: "Test event",
        startsAt: "2099-04-12T23:30:00Z",
        timezone: "America/New_York",
        imageUrl: "https://images.unsplash.com/photo-test-2",
        genres: ["Metal", "Rock"],
        isFeatured: true,
        venue: {
          name: "Riverfront Hall",
          city: "Cleveland, OH",
          address: "340 Rockside Avenue, Cleveland, OH 44114",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Standing-room access near the main stage.",
            price: 69,
            remaining: 104,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_003",
        title: "Jazz After Dark",
        description: "Test event",
        startsAt: "2099-04-15T01:00:00Z",
        timezone: "America/Chicago",
        imageUrl: "https://images.unsplash.com/photo-test-3",
        genres: ["Jazz"],
        venue: {
          name: "Blue Note Room",
          city: "New Orleans, LA",
          address: "901 Canal Street, New Orleans, LA 70112",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Reserved seating.",
            price: 49,
            remaining: 50,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_004",
        title: "Pop Icons Live",
        description: "Test event",
        startsAt: "2099-05-02T01:00:00Z",
        timezone: "America/Los_Angeles",
        imageUrl: "https://images.unsplash.com/photo-test-4",
        genres: ["Pop"],
        venue: {
          name: "The Grand Arena",
          city: "Los Angeles, CA",
          address: "800 Figueroa Street, Los Angeles, CA 90015",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Standard arena seating.",
            price: 129,
            remaining: 120,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_005",
        title: "Country Road Live",
        description: "Test event",
        startsAt: "2099-05-04T00:00:00Z",
        timezone: "America/Chicago",
        imageUrl: "https://images.unsplash.com/photo-test-5",
        genres: ["Country"],
        venue: {
          name: "Skyline Pavilion",
          city: "Nashville, TN",
          address: "201 Broadway, Nashville, TN 37201",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Open seating.",
            price: 59,
            remaining: 146,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_006",
        title: "Electronic Bloom",
        description: "Test event",
        startsAt: "2099-05-10T02:00:00Z",
        timezone: "America/Denver",
        imageUrl: "https://images.unsplash.com/photo-test-6",
        genres: ["Electronic"],
        venue: {
          name: "Neon Warehouse",
          city: "Denver, CO",
          address: "310 Blake Street, Denver, CO 80205",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Standard warehouse admission.",
            price: 89,
            remaining: 134,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_007",
        title: "Hip-Hop Arena: Main Event",
        description: "Test event",
        startsAt: "2099-05-16T01:00:00Z",
        timezone: "America/Chicago",
        imageUrl: "https://images.unsplash.com/photo-test-7",
        genres: ["Hip-Hop"],
        isFeatured: true,
        venue: {
          name: "The Grand Arena",
          city: "Houston, TX",
          address: "1515 Texas Avenue, Houston, TX 77002",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Arena seating.",
            price: 99,
            remaining: 260,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_008",
        title: "City Pulse Live",
        description: "Test event",
        startsAt: "2099-05-22T01:30:00Z",
        timezone: "America/New_York",
        imageUrl: "https://images.unsplash.com/photo-test-8",
        genres: ["Pop", "Electronic"],
        venue: {
          name: "Harbor Lights",
          city: "Baltimore, MD",
          address: "12 Harbor Way, Baltimore, MD 21202",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "General standing admission.",
            price: 79,
            remaining: 90,
            perOrderLimit: 8,
          },
        ],
      },
      {
        id: "evt_test_009",
        title: "Southern Strings",
        description: "Test event",
        startsAt: "2099-05-28T00:00:00Z",
        timezone: "America/Chicago",
        imageUrl: "https://images.unsplash.com/photo-test-9",
        genres: ["Country", "Indie"],
        venue: {
          name: "Crescent Hall",
          city: "Dallas, TX",
          address: "75 Elm Street, Dallas, TX 75201",
        },
        ticketTiers: [
          {
            id: "general",
            name: "General",
            description: "Reserved hall seating.",
            price: 64,
            remaining: 72,
            perOrderLimit: 8,
          },
        ],
      },
    ];

    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders initial event results", () => {
    render(
      <MemoryRouter>
        <EventListings />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: /upcoming events/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/acoustic stories: unplugged/i),
    ).toBeInTheDocument();

    const desktopFilters = screen.getByRole("complementary", {
      name: /desktop filters/i,
    });
    expect(desktopFilters).toBeInTheDocument();
    expect(
      within(desktopFilters).getByRole("button", { name: /clear all/i }),
    ).toBeInTheDocument();
  });

  it("applies a filter and updates the visible results", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <EventListings />
      </MemoryRouter>,
    );

    // make sure a event exist
    expect(screen.getByText(/metal forge night/i)).toBeInTheDocument();

    //click a filter
    await user.click(
      within(
        screen.getByRole("complementary", {
          name: /desktop filters/i,
        }),
      ).getByRole("button", { name: /austin, tx/i }),
    );

    // make sure the event no longer exist
    expect(screen.queryByText(/metal forge night/i)).not.toBeInTheDocument();
  });

  it("reduces results after filtering and restores them when clearing filters", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <EventListings />
      </MemoryRouter>,
    );

    const initialResults = getResultsSummary();

    const desktopFilters = screen.getByRole("complementary", {
      name: /desktop filters/i,
    });

    await user.click(
      within(desktopFilters).getByRole("button", { name: /rock/i }),
    );

    const filteredResults = getResultsSummary();
    expect(filteredResults.showing).toBeLessThan(initialResults.showing);
    expect(filteredResults.total).toBe(initialResults.total);

    await user.click(
      within(desktopFilters).getByRole("button", { name: /clear all/i }),
    );

    const clearedResults = getResultsSummary();
    expect(clearedResults.showing).toBe(initialResults.showing);
    expect(clearedResults.total).toBe(initialResults.total);
  });

  it("resets pagination to 1 when changing sort order", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <EventListings />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: /go to page 2/i }));

    expect(
      screen.getByRole("button", { name: /page 2, current page/i }),
    ).toHaveAttribute("aria-current", "page");

    const sortSelect = screen.getByRole("combobox", { name: /sort by/i });

    await user.selectOptions(sortSelect, "price-high");

    expect(
      screen.getByRole("button", { name: /page 1, current page/i }),
    ).toHaveAttribute("aria-current", "page");

    expect(
      screen.queryByRole("button", { name: /page 2, current page/i }),
    ).not.toBeInTheDocument();
  });

  it("shows empty state when filter combination has no results", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <EventListings />
      </MemoryRouter>,
    );

    await user.click(
      within(
        screen.getByRole("complementary", {
          name: /desktop filters/i,
        }),
      ).getByRole("button", { name: /austin, tx/i }),
    );

    const minPriceSlider = within(
      screen.getByRole("complementary", {
        name: /desktop filters/i,
      }),
    ).getByLabelText(/min price/i);

    fireEvent.change(minPriceSlider, { target: { value: 80 } });

    expect(
      screen.getByRole("heading", { name: /no events found/i }),
    ).toBeInTheDocument();
  });
});
