import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Sample() {
  return <p>ok</p>;
}

describe("testing pipeline", () => {
  it("renders and finds text via jsdom + React Testing Library", () => {
    render(<Sample />);
    expect(screen.getByText("ok")).toBeInTheDocument();
  });
});
