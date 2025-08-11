import type { AxiosInstance } from "axios";

export const getArtists = async (api: AxiosInstance) => {
  try {
    const response = await api.get("artists/0TnOYISbd1XYRBk9myaseg");
    console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
