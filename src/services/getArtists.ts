import type { AxiosInstance } from "axios";
import type { ArtistResponse } from "@/models/ArtistResponse";

export const getArtists = async (api: AxiosInstance) => {
  const artistsIDs =
    "2SNzxY1OsSCHBLVi77mpPQ,74XFHRwlV6OrjEM0A2NCMF,711MCceyCBcFnzjGY4Q7Un,4DWX7u8BV0vZIQSpJQQDWU,4Cqia9vrAbm7ANXbJGXsTE,79FMDwzZQxHgSkIYBl3ODU,0L8ExT028jH3ddEcZwqJJ5,0hEurMDQu99nJRq8pTxO14,2UazAtjfzqBF0Nho2awK4z,13YmWQJFwgZrd4bf5IjMY4,4gzpq5DPGxSnKTe4SA8HAU,7jy3rLJdDQY21OgRLCZ9sD";
  try {
    const response = await api.get<ArtistResponse>("/artists", {
      params: { ids: artistsIDs },
    });
    return response.data.artists;
  } catch (error) {
    console.error(error);
  }
};
