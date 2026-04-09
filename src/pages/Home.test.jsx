import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

import { render, screen, within } from "@testing-library/react";

import Home from "./Home.jsx";

function renderHome() {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  );
}

describe("Home", () => {
  it("renders the featured events section", () => {
    renderHome();

    expect(
      screen.getByRole("heading", { name: /featured events/i }),
    ).toBeInTheDocument();
  });

  it("doesnt render more than 6 featured events", () => {
    renderHome();

    const featuredSection = screen
      .getByRole("heading", { name: /featured events/i })
      .closest("section");

    expect(featuredSection).toBeInTheDocument();

    expect(
      within(featuredSection).getAllByText(/get tickets/i).length,
    ).toBeLessThanOrEqual(6);
  });
});
