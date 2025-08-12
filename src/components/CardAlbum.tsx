import type { AlbumItem } from "@/models/AlbumResponse";
import { SMALLEST_IMG_INDEX } from "@/utils/constants";

type CardAlbumProps = {
  album: AlbumItem;
};

export function CardAlbum({ album }: CardAlbumProps) {
  return (
    <div className="bg-slate-600 rounded-md text-gray-200">
      <div className="flex flex-col gap-2 items-center p-2">
        <img
          src={album.images[SMALLEST_IMG_INDEX].url}
          alt="album cover image"
          width={64}
          height={64}
          className="rounded-md"
        />
        <span className="w-full text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap">
          {album.name}
        </span>
        <span data-testid="album-release-year" className="text-xs">
          {album.release_date.split("-")[0]}
        </span>
      </div>
    </div>
  );
}
