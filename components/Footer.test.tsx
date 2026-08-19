// components/Footer.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { contactLinks } from "@/lib/site-data";

describe("Footer", () => {
  it("shows a WhatsApp link pointing at the user's WhatsApp", () => {
    render(<Footer />);
    const whatsapp = contactLinks.find((c) => c.icon === "whatsapp");
    const link = screen.getByLabelText("Fale comigo no WhatsApp");
    expect(link).toHaveAttribute("href", whatsapp?.href);
    expect(link).toHaveAttribute("target", "_blank");
  });
});
