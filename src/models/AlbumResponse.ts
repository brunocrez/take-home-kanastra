import type { Image } from "./Image";

type AlbumItem = {
  id: string;
  album_type: "single" | "album";
  total_tracks: number;
  name: string;
  images: Image[];
  release_date: string;
};

export type AlbumResponse = {
  items: AlbumItem[];
  limit: number;
  next: string | null;
  previous: string | null;
  offset: number;
  total: number;
};
