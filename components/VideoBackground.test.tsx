// components/VideoBackground.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { VideoBackground } from "./VideoBackground";

describe("VideoBackground", () => {
  it("renders a looping muted autoplay background video", () => {
    const { container } = render(<VideoBackground />);
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video).not.toBeNull();
    expect(video.getAttribute("src")).toBe("/video/background.mp4");
    expect(video.autoplay).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.muted).toBe(true);
  });

  it("renders an 80%-opacity dark overlay above the video", () => {
    render(<VideoBackground />);
    const overlay = screen.getByTestId("video-overlay");
    expect(overlay.className).toContain("bg-graphite-950/80");
  });
});
