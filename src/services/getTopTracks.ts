import type { AxiosInstance } from "axios";
import type { TrackResponse } from "@/models/TrackResponse";

export const getTopTracks = async (api: AxiosInstance, artistId: string) => {
  try {
    const response = await api.get<TrackResponse>(
      `/artists/${artistId}/top-tracks`
    );
    return response.data.tracks;
  } catch (error) {
    console.error(error);
  }
};
