import type { Track } from "@/models/TrackResponse";
import { BIGGEST_IMG_INDEX } from "@/utils/constants";

type MostPlayedTrackProps = {
  track: Track | undefined;
};

export function MostPlayedTrack({ track }: MostPlayedTrackProps) {
  return (
    <div className="bg-slate-700 rounded-md mb-4">
      <div className="flex flex-col items-center gap-2 p-4 ">
        <img
          className="rounded-md"
          src={track?.album.images[BIGGEST_IMG_INDEX].url}
          alt="album image"
          width={100}
          height={100}
        />
        <span className="text-center text-gray-200">{track?.name}</span>
        <span className="text-center text-sm text-gray-400">
          {track?.album.name}
        </span>
      </div>
    </div>
  );
}
