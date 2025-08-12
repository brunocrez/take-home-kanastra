import type { Track } from "@/models/TrackResponse";
import { msToMinutesSeconds } from "@/utils/msToMinutesSeconds";
import { ChartBarIcon } from "@heroicons/react/24/outline";

type TrackProps = {
  track: Track;
  position: number;
};

export function Track({ track, position }: TrackProps) {
  return (
    <div className="bg-slate-700 rounded-md text-gray-200 flex items-center gap-2 px-2 py-4 mb-4">
      <span className="text-xs">
        {(position + 1).toString().padStart(2, "0")}
      </span>
      <span className="text-xs">{track.name}</span>
      <div className="ml-auto flex items-center gap-2">
        <span className="text-xs">{msToMinutesSeconds(track.duration_ms)}</span>
        <ChartBarIcon className="w-4 h-4" />
      </div>
    </div>
  );
}
