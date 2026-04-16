import { describe, expect, it } from "vitest";

import { formatCurrency } from "./currency.js";

describe("currency", () => {
  it("formats integer as currency with two decimals", () => {
    expect(formatCurrency(100)).toBe("$100.00");
  });

  it("formats float as currency with two decimals", () => {
    expect(formatCurrency(100.25)).toBe("$100.25");
  });

  it("keeps two decimals if given", () => {
    expect(formatCurrency(100.25)).toBe("$100.25");
  });

  it("formats zero as currency with two decimals", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });
});
