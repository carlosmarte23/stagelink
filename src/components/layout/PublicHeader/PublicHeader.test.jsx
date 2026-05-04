import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import PublicHeader from "./PublicHeader.jsx";

function renderPublicHeader() {
  return render(
    <MemoryRouter>
      <PublicHeader />
    </MemoryRouter>,
  );
}

describe("PublicHeader", () => {
  it("labels the mobile menu button and reflects its expanded state", async () => {
    const user = userEvent.setup();

    renderPublicHeader();

    const openButton = screen.getByRole("button", {
      name: /open navigation menu/i,
    });

    expect(openButton).toHaveAttribute("aria-controls", "mobile-menu");
    expect(openButton).toHaveAttribute("aria-expanded", "false");

    await user.click(openButton);

    const closeButton = screen.getByRole("button", {
      name: /close navigation menu/i,
    });

    expect(closeButton).toHaveAttribute("aria-expanded", "true");
  });

  it("closes the mobile menu when a mobile navigation link is selected", async () => {
    const user = userEvent.setup();

    renderPublicHeader();

    await user.click(
      screen.getByRole("button", { name: /open navigation menu/i }),
    );

    const mobileNavigation = screen.getByRole("navigation", {
      name: /mobile navigation/i,
    });

    await user.click(
      within(mobileNavigation).getByRole("link", { name: /events/i }),
    );

    expect(
      screen.getByRole("button", { name: /open navigation menu/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });
});
