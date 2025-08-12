import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useGetArtists } from "@/hooks/useGetArtists";
import { useArtist } from "@/context/ArtistContext";
import { Container } from "@/components/Container";
import { BIGGEST_IMG_INDEX } from "@/utils/constants";
import { CardArtistLoading } from "@/components/CardArtistLoading";
import { CardArtist } from "@/components/CardArtist";
import { Skeleton } from "@/components/ui/skeleton";
import type { Artist } from "@/models/ArtistResponse";

export default function HomePage() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetArtists();
  const { setArtist } = useArtist();
  const [textInput, setTextInput] = useState("");

  const filterArtists = data?.filter((artist) => {
    const name = artist.name.toLowerCase();
    return name.includes(textInput.toLowerCase());
  });

  const handleClick = (artist: Artist) => {
    setArtist({
      id: artist.id,
      name: artist.name,
      followers: artist.followers.total,
      bgImage: artist.images[BIGGEST_IMG_INDEX].url,
    });

    return navigate(`/artist/${artist.id}`);
  };

  return (
    <Container>
      {isLoading ? (
        <Skeleton className="w-full max-w-[350px] h-[36px] mb-6" />
      ) : (
        <Input
          className="max-w-[350px] mb-6 text-gray-300"
          placeholder="Filtrar por artista"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
      )}

      {isLoading ? (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <CardArtistLoading key={idx} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filterArtists?.map((artist) => (
            <CardArtist
              key={artist.id}
              artist={artist}
              onClick={() => handleClick(artist)}
            />
          ))}
        </div>
      )}
    </Container>
  );
}
