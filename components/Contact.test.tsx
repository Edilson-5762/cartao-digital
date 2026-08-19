// components/Contact.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";
import { contactLinks, location } from "@/lib/site-data";

describe("Contact", () => {
  it("renders every contact channel with its exact link", () => {
    render(<Contact />);
    contactLinks.forEach((contact) => {
      const textNode = screen.getByText(contact.label);
      const anchor = textNode.closest("a");
      expect(anchor).toHaveAttribute("href", contact.href);
    });
  });

  it("shows the location", () => {
    render(<Contact />);
    expect(screen.getByText(location)).toBeInTheDocument();
  });

  it("has a section id of contato", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("#contato")).not.toBeNull();
  });
});
