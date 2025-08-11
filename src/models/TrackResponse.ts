export type Track = {
  id: string;
  duration_ms: number;
  name: string;
};

export type TrackResponse = {
  tracks: Track[];
};
