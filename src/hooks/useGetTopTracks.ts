import { useQuery } from "@tanstack/react-query";
import { useDefaultAPI } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { getTopTracks } from "@/services/getTopTracks";

export function useGetTopTracks(id: string) {
  const api = useDefaultAPI();
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["top-tracks", id],
    queryFn: () => getTopTracks(api, id),
    enabled: !!accessToken && !!id,
    refetchOnWindowFocus: false,
    select: (data) => data?.slice(0, 5),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
