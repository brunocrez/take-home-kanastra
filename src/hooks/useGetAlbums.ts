import { useQuery } from "@tanstack/react-query";
import { useDefaultAPI } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { getAlbums } from "@/services/getAlbums";

export function useGetAlbums(id: string, offset: number) {
  const api = useDefaultAPI();
  const { accessToken } = useAuth();

  return useQuery({
    queryKey: ["albums", id, offset],
    queryFn: () => getAlbums(api, id, offset),
    enabled: !!accessToken && !!id,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
