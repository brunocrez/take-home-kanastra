import type { AlbumItem } from "./AlbumResponse";

export type Track = {
  id: string;
  duration_ms: number;
  name: string;
  album: AlbumItem;
};

export type TrackResponse = {
  tracks: Track[];
};
