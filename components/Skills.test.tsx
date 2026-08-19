// components/Skills.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Skills } from "./Skills";
import { skills } from "@/lib/site-data";

describe("Skills", () => {
  it("renders every skill name and icon", () => {
    render(<Skills />);
    skills.forEach((skill) => {
      expect(screen.getByAltText(skill.name)).toHaveAttribute(
        "src",
        skill.icon
      );
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    });
  });

  it("has a section id of habilidades", () => {
    const { container } = render(<Skills />);
    expect(container.querySelector("#habilidades")).not.toBeNull();
  });
});
