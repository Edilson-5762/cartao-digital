// components/StoryCarousel.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StoryCarousel } from "./StoryCarousel";
import { storySlides } from "@/lib/site-data";

describe("StoryCarousel", () => {
  it("starts on the first slide", () => {
    render(<StoryCarousel />);
    expect(screen.getByText(storySlides[0].title)).toBeInTheDocument();
  });

  it("advances to the next slide on click", async () => {
    const user = userEvent.setup();
    render(<StoryCarousel />);
    await user.click(screen.getByLabelText("Próximo slide"));
    expect(screen.getByText(storySlides[1].title)).toBeInTheDocument();
  });

  it("wraps from the last slide back to the first", async () => {
    const user = userEvent.setup();
    render(<StoryCarousel />);
    const next = screen.getByLabelText("Próximo slide");
    for (let i = 0; i < storySlides.length; i += 1) {
      await user.click(next);
    }
    expect(screen.getByText(storySlides[0].title)).toBeInTheDocument();
  });

  it("wraps backwards from the first slide to the last", async () => {
    const user = userEvent.setup();
    render(<StoryCarousel />);
    await user.click(screen.getByLabelText("Slide anterior"));
    expect(
      screen.getByText(storySlides[storySlides.length - 1].title)
    ).toBeInTheDocument();
  });

  it("jumps to a slide when its dot is clicked", async () => {
    const user = userEvent.setup();
    render(<StoryCarousel />);
    await user.click(screen.getByLabelText("Ir para slide 4"));
    expect(screen.getByText(storySlides[3].title)).toBeInTheDocument();
  });
});
