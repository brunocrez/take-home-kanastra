import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Track } from "@/components/Track";
import type { Track as TrackType } from "@/models/TrackResponse";
import type { AlbumItem } from "@/models/AlbumResponse";

const fakeTrack: TrackType = {
  id: "123",
  name: "Fake Track",
  duration_ms: 300000,
  album: {} as AlbumItem,
};

describe("Track Component", () => {
  it("should render the track with proper data", () => {
    render(<Track track={fakeTrack} position={0} />);
    const pos = screen.getByTestId("track-position");
    const name = screen.getByTestId("track-name");
    expect(pos).toBeVisible();
    expect(pos.textContent).toBe("01");
    expect(name).toBeVisible();
    expect(name.textContent).toEqual("Fake Track");
  });

  it("should show the correct format for duration", () => {
    render(<Track track={fakeTrack} position={0} />);
    const pos = screen.getByTestId("track-duration");
    expect(pos).toBeVisible();
    expect(pos.textContent).toBe("5:00");
  });
});
