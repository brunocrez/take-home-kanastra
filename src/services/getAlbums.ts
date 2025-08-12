import type { AxiosInstance } from "axios";
import type { AlbumResponse } from "@/models/AlbumResponse";

export const getAlbums = async (
  api: AxiosInstance,
  artistId: string,
  offset: number
) => {
  try {
    const response = await api.get<AlbumResponse>(
      `/artists/${artistId}/albums`,
      { params: { offset, include_groups: "album,compilation,appears_on" } }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
