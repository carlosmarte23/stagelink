import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Pagination from "./Pagination.jsx";
let scrollToSpy;

function renderPagination(props = {}) {
  const onPageChange = vi.fn();

  render(
    <Pagination
      currentPage={2}
      totalPages={5}
      onPageChange={onPageChange}
      {...props}
    />,
  );

  return { onPageChange };
}

describe("Pagination", () => {
  beforeEach(() => {
    scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders pagination navigation and page buttons", () => {
    renderPagination();

    expect(
      screen.getByRole("navigation", { name: /events pagination/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /next page/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /previous page/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /2/i })).toHaveAttribute(
      "aria-current",
      "page",
    );

    const pageButtons = screen
      .getAllByRole("button")
      .filter((button) =>
        /go to page | current page/i.test(
          button.getAttribute("aria-label") ?? "",
        ),
      );

    expect(pageButtons).toHaveLength(5);
  });

  it("calls onPageChange and scrolls to top when a page button is clicked", async () => {
    const user = userEvent.setup();

    const { onPageChange } = renderPagination();

    await user.click(screen.getByRole("button", { name: /go to page 4/i }));

    expect(onPageChange).toHaveBeenCalledWith(4);

    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  it("goes to the previous page when the previous button is clicked", async () => {
    const user = userEvent.setup();
    const { onPageChange } = renderPagination({ currentPage: 3 });

    await user.click(screen.getByRole("button", { name: /previous/i }));

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  it("goes to the next page when the next button is clicked", async () => {
    const user = userEvent.setup();
    const { onPageChange } = renderPagination({ currentPage: 3 });

    await user.click(screen.getByRole("button", { name: /next/i }));

    expect(onPageChange).toHaveBeenCalledWith(4);
    expect(scrollToSpy).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  it("disables previous button on the first page", async () => {
    renderPagination({ currentPage: 1 });

    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled();
  });

  it("disables next button on the last page", async () => {
    renderPagination({ currentPage: 5 });

    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });
});
