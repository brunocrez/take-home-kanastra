import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../services/getArtists";
import { useDefaultAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";

export function useGetArtists() {
  const api = useDefaultAPI();
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["get-artists"],
    queryFn: () => getArtists(api),
    enabled: !!accessToken,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
