import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Portfolio } from "./Portfolio";
import { portfolioUrl } from "@/lib/site-data";

describe("Portfolio", () => {
  it("links the CTA to the external portfolio in a new tab", () => {
    render(<Portfolio />);
    const link = screen.getByRole("link", { name: "Ver meus projetos" });
    expect(link).toHaveAttribute("href", portfolioUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("has a section id of portfolio", () => {
    const { container } = render(<Portfolio />);
    expect(container.querySelector("#portfolio")).not.toBeNull();
  });
});
