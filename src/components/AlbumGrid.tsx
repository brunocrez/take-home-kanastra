import { useState } from "react";
import type { AlbumResponse } from "@/models/AlbumResponse";
import { Button } from "./ui/button";
import { useGetAlbums } from "@/hooks/useGetAlbums";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { LIMIT_PER_PAGE, SMALLEST_IMG_INDEX } from "@/utils/constants";
import { Input } from "./ui/input";

type AlbumGridProps = {
  albums?: AlbumResponse | undefined;
  columns?: number;
  artistId: string | undefined;
};

export function AlbumGrid({ artistId }: AlbumGridProps) {
  const [offset, setOffset] = useState(0);
  const [textInput, setTextInput] = useState("");
  const { data: albums } = useGetAlbums(artistId ?? "", offset);

  const filterAlbums = albums?.items.filter((album) => {
    const name = album.name.toLowerCase();
    return name.includes(textInput.toLowerCase());
  });

  const handleNext = () => {
    setTextInput("");
    setOffset((prev) => prev + LIMIT_PER_PAGE);
  };

  const handlePrev = () => {
    setTextInput("");
    setOffset((prev) => prev - LIMIT_PER_PAGE);
  };

  return (
    <div>
      <Input
        className="mb-6 text-gray-300"
        placeholder="Filtrar por álbum"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        {filterAlbums?.map((item) => {
          return (
            <div
              key={item.id}
              className="bg-slate-600 rounded-md text-gray-200"
            >
              <div className="flex flex-col gap-2 items-center p-2">
                <img
                  src={item.images[SMALLEST_IMG_INDEX].url}
                  width={64}
                  height={64}
                  className="rounded-md"
                />
                <span className="w-full text-sm text-center overflow-hidden text-ellipsis whitespace-nowrap">
                  {item.name}
                </span>
                <span className="text-xs">
                  {item.release_date.split("-")[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-6 justify-end">
        <Button
          disabled={!albums?.previous}
          className="cursor-pointer bg-white hover:bg-white hover:scale-105"
          onClick={handlePrev}
        >
          <ArrowLeftIcon className="text-slate-800" />
        </Button>
        <Button
          disabled={!albums?.next}
          className="cursor-pointer bg-white hover:bg-white hover:scale-105"
          onClick={handleNext}
        >
          <ArrowRightIcon className="text-slate-800" />
        </Button>
      </div>
    </div>
  );
}
