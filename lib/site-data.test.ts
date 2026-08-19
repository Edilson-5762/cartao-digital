import { describe, it, expect } from "vitest";
import {
  navLinks,
  skills,
  storySlides,
  contactLinks,
  portfolioUrl,
  location,
} from "./site-data";

describe("site-data", () => {
  it("has 5 nav links matching site sections in order", () => {
    expect(navLinks.map((l) => l.href)).toEqual([
      "#inicio",
      "#habilidades",
      "#historia",
      "#portfolio",
      "#contato",
    ]);
  });

  it("has 14 skills including Python, PyAutoGUI and Next.js", () => {
    expect(skills).toHaveLength(14);
    const names = skills.map((s) => s.name);
    expect(names).toContain("Python");
    expect(names).toContain("PyAutoGUI");
    expect(names).toContain("Next.js");
  });

  it("has 6 story slides in chronological order", () => {
    expect(storySlides).toHaveLength(6);
    expect(storySlides[0].images).toEqual(["/story/01-chef-prime.jpg"]);
    expect(storySlides[5].images).toEqual(["/story/06-desenvolvedor.png"]);
  });

  it("has the exact WhatsApp deep link", () => {
    const whatsapp = contactLinks.find((c) => c.icon === "whatsapp");
    expect(whatsapp?.href).toBe(
      "https://api.whatsapp.com/send?phone=5561993998764&text=."
    );
  });

  it("points the portfolio CTA at the external portfolio", () => {
    expect(portfolioUrl).toBe("https://porfifolio-theta.vercel.app");
  });

  it("has the correct location label", () => {
    expect(location).toBe("Brasília, DF");
  });
});
