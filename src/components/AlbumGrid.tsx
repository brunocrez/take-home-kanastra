import { useState } from "react";
import { Button } from "./ui/button";
import { useGetAlbums } from "@/hooks/useGetAlbums";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { LIMIT_PER_PAGE } from "@/utils/constants";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { CardAlbum } from "./CardAlbum";
import type { AlbumResponse } from "@/models/AlbumResponse";

type AlbumGridProps = {
  albums?: AlbumResponse | undefined;
  columns?: number;
  artistId: string | undefined;
};

export function AlbumGrid({ artistId }: AlbumGridProps) {
  const [offset, setOffset] = useState(0);
  const [textInput, setTextInput] = useState("");
  const { data: albums, isLoading } = useGetAlbums(artistId ?? "", offset);

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
      {isLoading ? (
        <Skeleton className="w-full max-w-[300px] h-9 mb-6" />
      ) : (
        <Input
          className="mb-6 text-gray-300 w-full max-w-[300px]"
          placeholder="Filtrar por álbum"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
      )}

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 20 }).map((_, idx) => (
            <Skeleton key={idx} className="w-[140px] h-[132px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filterAlbums?.map((album) => (
            <CardAlbum key={album.id} album={album} />
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-6 justify-end">
        <Button
          disabled={!albums?.previous || isLoading}
          className="cursor-pointer bg-white hover:bg-white hover:scale-105"
          onClick={handlePrev}
        >
          <ArrowLeftIcon className="text-slate-800" />
        </Button>
        <Button
          disabled={!albums?.next || isLoading}
          className="cursor-pointer bg-white hover:bg-white hover:scale-105"
          onClick={handleNext}
        >
          <ArrowRightIcon className="text-slate-800" />
        </Button>
      </div>
    </div>
  );
}
