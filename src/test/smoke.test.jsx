import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

function SmokeComponent() {
  return <p>Testing is working</p>;
}

describe("testing setup", () => {
  it("renders visible text", () => {
    render(<SmokeComponent />);

    expect(screen.getByText("Testing is working")).toBeInTheDocument();
  });
});
