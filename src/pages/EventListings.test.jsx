import { render, screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

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
