import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CardArtist } from "@/components/CardArtist";
import type { Artist } from "@/models/ArtistResponse";

const fakeArtist: Artist = {
  id: "123",
  name: "Fake Artist",
  popularity: 88,
  images: [
    { width: 200, height: 300, url: "https://fakeimg.com/1.jpg" },
    { width: 200, height: 300, url: "https://fakeimg.com/2.jpg" },
    { width: 200, height: 300, url: "https://fakeimg.com/3.jpg" },
  ],
  followers: { total: 100 },
};

describe("CardArtist Component", () => {
  it("should render component with proper data", () => {
    render(<CardArtist artist={fakeArtist} onClick={() => {}} />);
    expect(screen.getByText("Fake Artist")).toBeVisible();
    expect(screen.getByText(/Popularidade: 88/i)).toBeVisible();

    const img = screen.getByAltText("image of the artist Fake Artist");
    expect(img).toBeVisible();
    expect(img).toHaveAttribute("src", "https://fakeimg.com/3.jpg");
  });

  it("should call function when button is clicked", async () => {
    const fn = vi.fn();
    render(<CardArtist artist={fakeArtist} onClick={fn} />);
    const el = screen.getByTestId("card-artist");
    await userEvent.click(el);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should have correct a11y info", () => {
    render(<CardArtist artist={fakeArtist} onClick={() => {}} />);
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("alt", "image of the artist Fake Artist");
  });
});
