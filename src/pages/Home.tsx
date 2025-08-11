import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { useGetArtists } from "@/hooks/useGetArtists";
import { MusicalNoteIcon, StarIcon } from "@heroicons/react/24/outline";
import { useArtist } from "@/context/ArtistContext";
import type { Artist } from "@/models/ArtistResponse";
import { Container } from "@/components/Container";

const BIGGEST_IMG_INDEX = 0;
const SMALLEST_IMG_INDEX = 2;

export default function HomePage() {
  const navigate = useNavigate();
  const { data } = useGetArtists();
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
      <Input
        className="mb-6 text-gray-300"
        placeholder="Filtrar por artista"
        onChange={(e) => setTextInput(e.target.value)}
      />

      <div className="flex flex-col gap-6">
        {filterArtists?.map((artist) => {
          return (
            <div
              className="flex gap-2 hover:scale-105 hover:bg-slate-700 rounded-xl transition-all ease-in-out cursor-pointer"
              key={artist.id}
              onClick={() => handleClick(artist)}
            >
              <img
                className="rounded-xl"
                src={artist.images[SMALLEST_IMG_INDEX].url}
                alt="artist image"
                width={120}
                height={120}
              />
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <MusicalNoteIcon className="w-4 h-4 text-white" />
                  <p className="text-gray-100 text-base">{artist.name}</p>
                </div>

                <div className="flex items-center gap-2">
                  <StarIcon className="w-4 h-4 text-white" />
                  <p className="text-gray-200 text-sm">
                    Popularidade: {artist.popularity}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
