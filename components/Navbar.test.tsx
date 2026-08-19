// components/Navbar.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Navbar } from "./Navbar";
import { navLinks } from "@/lib/site-data";

describe("Navbar", () => {
  it("shows the Stack Analytics logo and signature", () => {
    render(<Navbar />);
    expect(screen.getByAltText("Logo Stack Analytics")).toBeInTheDocument();
    expect(screen.getByText("Stack Analytics")).toBeInTheDocument();
    expect(screen.getByText("Edilson Ebenezer")).toBeInTheDocument();
  });

  it("renders every nav link with the right anchor", () => {
    render(<Navbar />);
    navLinks.forEach((link) => {
      const anchors = screen.getAllByRole("link", { name: link.label });
      expect(anchors[0]).toHaveAttribute("href", link.href);
    });
  });

  it("toggles the mobile menu on button click", async () => {
    const user = userEvent.setup();
    render(<Navbar />);
    const toggle = screen.getByLabelText("Abrir menu");
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
