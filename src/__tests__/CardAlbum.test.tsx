import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CardAlbum } from "@/components/CardAlbum";
import type { AlbumItem } from "@/models/AlbumResponse";

const fakeAlbum: AlbumItem = {
  id: "123",
  name: "Fake Album",
  images: [
    { width: 200, height: 300, url: "https://fakeimg.com/1.jpg" },
    { width: 200, height: 300, url: "https://fakeimg.com/2.jpg" },
    { width: 200, height: 300, url: "https://fakeimg.com/3.jpg" },
  ],
  album_type: "album",
  release_date: "2025-01-01",
  total_tracks: 100,
};

describe("CardAlbum Component", () => {
  it("should render the album name", () => {
    render(<CardAlbum album={fakeAlbum} />);
    expect(screen.getByText("Fake Album")).toBeVisible();
  });

  it("should show the correct alt for album image", () => {
    render(<CardAlbum album={fakeAlbum} />);
    const img = screen.getByAltText("album cover image");
    expect(img).toBeVisible();
    expect(img).toHaveAttribute("src", "https://fakeimg.com/3.jpg");
  });

  it("should show the release year", () => {
    render(<CardAlbum album={fakeAlbum} />);
    const el = screen.getByTestId("album-release-year");
    expect(el).toHaveTextContent("2025");
  });

  it("should have right classes for album name", () => {
    render(<CardAlbum album={fakeAlbum} />);
    const nameEl = screen.getByText(/fake album/i);
    expect(nameEl).toHaveClass("whitespace-nowrap");
    expect(nameEl).toHaveClass("overflow-hidden");
  });
});
