import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the exact title with no years-of-experience claim", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: "Full Stack Developer | Data Analytics",
      })
    ).toBeInTheDocument();
    expect(screen.queryByText(/anos de experiência/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/em formação/i)).not.toBeInTheDocument();
  });

  it("shows the tech stack icons and the developer photo", () => {
    render(<Hero />);
    expect(screen.getByAltText("Python")).toBeInTheDocument();
    expect(
      screen.getByAltText("Foto de Edilson Coelho Moraes")
    ).toBeInTheDocument();
  });

  it("links both CTAs to the right sections", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: "Meus projetos" })).toHaveAttribute(
      "href",
      "#portfolio"
    );
    expect(screen.getByRole("link", { name: "Fale comigo" })).toHaveAttribute(
      "href",
      "#contato"
    );
  });

  it("has a section id of inicio", () => {
    const { container } = render(<Hero />);
    expect(container.querySelector("#inicio")).not.toBeNull();
  });
});
