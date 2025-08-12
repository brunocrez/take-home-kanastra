import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { PaginationControl } from "@/components/PaginationControl";
import type { AlbumItem, AlbumResponse } from "@/models/AlbumResponse";
import userEvent from "@testing-library/user-event";

const fakeAlbums: AlbumResponse = {
  total: 103,
  previous: "prevPageToken",
  next: "nextPageToken",
  limit: 20,
  offset: 0,
  items: [] as AlbumItem[],
};

describe("PaginationControl Component", () => {
  it("should show current and total pages correctly", () => {
    render(
      <PaginationControl
        albums={fakeAlbums}
        isLoading={false}
        onClickNext={() => {}}
        onClickPrev={() => {}}
        currPage={2}
      />
    );
    expect(screen.getByText(/página 2 de 6/i)).toBeVisible();
  });

  it("should disable previous button if previous prop is null", () => {
    render(
      <PaginationControl
        albums={{ ...fakeAlbums, previous: null }}
        isLoading={false}
        onClickNext={() => {}}
        onClickPrev={() => {}}
        currPage={1}
      />
    );

    const btn = screen.getByTestId("previous-btn");
    expect(btn).toBeDisabled();
  });

  it("should disable next button if next prop is null", () => {
    render(
      <PaginationControl
        albums={{ ...fakeAlbums, next: null }}
        isLoading={false}
        onClickNext={() => {}}
        onClickPrev={() => {}}
        currPage={1}
      />
    );

    const btn = screen.getByTestId("next-btn");
    expect(btn).toBeDisabled();
  });

  it("should disable both controls if is loading is true", () => {
    const { rerender } = render(
      <PaginationControl
        albums={fakeAlbums}
        isLoading={true}
        onClickNext={() => {}}
        onClickPrev={() => {}}
        currPage={5}
      />
    );

    const btnPrev = screen.getByTestId("previous-btn");
    const btnNext = screen.getByTestId("next-btn");

    expect(btnPrev).toBeDisabled();
    expect(btnNext).toBeDisabled();

    rerender(
      <PaginationControl
        albums={fakeAlbums}
        isLoading={false}
        onClickNext={() => {}}
        onClickPrev={() => {}}
        currPage={5}
      />
    );

    expect(btnPrev).not.toBeDisabled();
    expect(btnNext).not.toBeDisabled();
  });

  it("should call onClickNext when next btn is clicked", async () => {
    const fn = vi.fn();
    render(
      <PaginationControl
        albums={fakeAlbums}
        isLoading={false}
        onClickNext={fn}
        onClickPrev={() => {}}
        currPage={5}
      />
    );

    const btn = screen.getByTestId("next-btn");
    await userEvent.click(btn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should call onClickPrev when prev btn is clicked", async () => {
    const fn = vi.fn();
    render(
      <PaginationControl
        albums={fakeAlbums}
        isLoading={false}
        onClickNext={() => {}}
        onClickPrev={fn}
        currPage={5}
      />
    );

    const btn = screen.getByTestId("previous-btn");
    await userEvent.click(btn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should update current page when some btn is clicked", async () => {
    render(
      <PaginationControl
        albums={fakeAlbums}
        isLoading={false}
        onClickNext={() => {}}
        onClickPrev={() => {}}
        currPage={4}
      />
    );

    expect(screen.getByText(/página 4 de 6/i)).toBeVisible();
    const btn = screen.getByTestId("previous-btn");
    await userEvent.click(btn);
    waitFor(() => {
      expect(screen.getByText(/página 3 de 6/i)).toBeVisible();
    });
  });
});
