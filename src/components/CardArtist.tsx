import type { Artist } from "@/models/ArtistResponse";
import { SMALLEST_IMG_INDEX } from "@/utils/constants";
import { MusicalNoteIcon, StarIcon } from "@heroicons/react/24/outline";

type CardArtistProps = {
  artist: Artist;
  onClick: () => void;
};

export function CardArtist({ artist, onClick }: CardArtistProps) {
  return (
    <div
      className="flex gap-2 hover:scale-105 hover:bg-slate-700 rounded-xl transition-all ease-in-out cursor-pointer"
      key={artist.id}
      onClick={onClick}
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
}
