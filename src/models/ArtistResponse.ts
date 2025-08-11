type Image = {
  url: string;
  width: number;
  height: number;
};

export type Artist = {
  id: string;
  name: string;
  popularity: number;
  images: Image[];
  followers: { total: number };
};

export type ArtistResponse = {
  artists: Artist[];
};
