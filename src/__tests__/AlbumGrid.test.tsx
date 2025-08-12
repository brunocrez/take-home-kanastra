/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { useGetAlbums } from "@/hooks/useGetAlbums";
import { beforeEach } from "node:test";
import type { AlbumResponse } from "@/models/AlbumResponse";
import { AlbumGrid } from "@/components/AlbumGrid";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

vi.mock("@/hooks/useGetAlbums", () => {
  return {
    useGetAlbums: vi.fn(),
    useNavigate: vi.fn(),
  };
});

const fakeAlbums: AlbumResponse = {
  total: 3,
  next: "nextPage",
  previous: "previousPage",
  limit: 20,
  offset: 0,
  items: [
    {
      id: "123",
      album_type: "album",
      name: "Fake Album 1",
      release_date: "2022-01-01",
      total_tracks: 12,
      images: [
        {
          url: "fakeURL1",
          width: 100,
          height: 100,
        },
        {
          url: "fakeURL2",
          width: 100,
          height: 100,
        },
        {
          url: "fakeURL3",
          width: 100,
          height: 100,
        },
      ],
    },
    {
      id: "124",
      album_type: "album",
      name: "Fake Album 2",
      release_date: "2023-05-10",
      total_tracks: 10,
      images: [
        {
          url: "fakeURL4",
          width: 100,
          height: 100,
        },
        {
          url: "fakeURL5",
          width: 100,
          height: 100,
        },
        {
          url: "fakeURL6",
          width: 100,
          height: 100,
        },
      ],
    },
    {
      id: "125",
      album_type: "album",
      name: "Fake Album 3",
      release_date: "2024-08-15",
      total_tracks: 14,
      images: [
        {
          url: "fakeURL7",
          width: 100,
          height: 100,
        },
        {
          url: "fakeURL8",
          width: 100,
          height: 100,
        },
        {
          url: "fakeURL9",
          width: 100,
          height: 100,
        },
      ],
    },
  ],
};

describe("AlbumGrid Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render skeleton while fetching data", () => {
    (useGetAlbums as any).mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <AlbumGrid artistId="artist123" />
      </MemoryRouter>
    );

    const skeletons = screen.getAllByTestId("skeleton-albumns");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("should show the albums when fetching is done", () => {
    (useGetAlbums as any).mockReturnValue({
      data: fakeAlbums,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <AlbumGrid artistId="artist123" />
      </MemoryRouter>
    );

    expect(screen.getByText(/fake album 1/i)).toBeVisible();
    expect(screen.getByText(/fake album 2/i)).toBeVisible();
    expect(screen.getByText(/fake album 3/i)).toBeVisible();
  });

  it("should filter albumns when user types a value", async () => {
    (useGetAlbums as any).mockReturnValue({
      data: fakeAlbums,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <AlbumGrid artistId="artist123" />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/filtrar por álbum/i);
    await userEvent.type(input, "1");

    expect(screen.getByText(/fake album 1/i)).toBeVisible();
    expect(screen.queryByText(/fake album 2/i)).toBe(null);
    expect(screen.queryByText(/fake album 3/i)).toBe(null);
  });

  it("should show empty state when filter fails", async () => {
    (useGetAlbums as any).mockReturnValue({
      data: fakeAlbums,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <AlbumGrid artistId="artist123" />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/filtrar por álbum/i);
    await userEvent.type(input, "some words");

    expect(screen.queryByText(/fake album 1/i)).toBe(null);
    expect(screen.queryByText(/fake album 2/i)).toBe(null);
    expect(screen.queryByText(/fake album 3/i)).toBe(null);
    expect(
      screen.getByText(/não encontramos nenhum álbum com esse nome/i)
    ).toBeVisible();
  });
});
