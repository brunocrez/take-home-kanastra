import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardTrack } from "@/components/CardTrack";
import type { AlbumItem } from "@/models/AlbumResponse";
import type { Track as TrackType } from "@/models/TrackResponse";

const fakeTrack: TrackType = {
  id: "123",
  name: "Fake Track",
  duration_ms: 300000,
  album: {
    name: "Fake Album",
    images: [
      { width: 200, height: 300, url: "https://fakeimg.com/1.jpg" },
      { width: 200, height: 300, url: "https://fakeimg.com/2.jpg" },
      { width: 200, height: 300, url: "https://fakeimg.com/3.jpg" },
    ],
  } as AlbumItem,
};

describe("CardTrack Component", () => {
  it("should render card with right data", () => {
    render(<CardTrack track={fakeTrack} />);
    expect(screen.getByText(/fake track/i)).toBeVisible();
    expect(screen.getByText(/fake album/i)).toBeVisible();
  });

  it("should get the right url for img tag", () => {
    render(<CardTrack track={fakeTrack} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "https://fakeimg.com/1.jpg");
    expect(img).toHaveAttribute("alt", "album image");
  });
});
