import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

window.scroll = vi.fn();

afterEach(() => {
  cleanup();
  window.scroll.mockClear();
});
