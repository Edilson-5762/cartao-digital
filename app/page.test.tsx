// app/page.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders every section with the anchor ids the navbar links to", () => {
    const { container } = render(<Home />);
    ["#inicio", "#habilidades", "#historia", "#portfolio", "#contato"].forEach(
      (id) => {
        expect(container.querySelector(id)).not.toBeNull();
      }
    );
  });

  it("renders exactly one background video", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("video")).toHaveLength(1);
  });
});
