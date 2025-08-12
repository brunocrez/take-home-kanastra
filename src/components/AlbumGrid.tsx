import { useState } from "react";
import { useNavigate } from "react-router";
import { useGetAlbums } from "@/hooks/useGetAlbums";
import { LIMIT_PER_PAGE } from "@/utils/constants";
import { Input } from "./ui/input";
import { Skeleton } from "./ui/skeleton";
import { CardAlbum } from "./CardAlbum";
import type { AlbumResponse } from "@/models/AlbumResponse";
import { EmptyState } from "./EmptyState";
import { PaginationControl } from "./PaginationControl";

type AlbumGridProps = {
  albums?: AlbumResponse | undefined;
  columns?: number;
  artistId: string | undefined;
};

export function AlbumGrid({ artistId }: AlbumGridProps) {
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [currPage, setCurrPage] = useState(1);
  const [textInput, setTextInput] = useState("");
  const {
    data: albums,
    isLoading,
    isError,
  } = useGetAlbums(artistId ?? "", offset);

  if (isError) {
    navigate("/error");
  }

  const filterAlbums =
    albums?.items.filter((album) => {
      const name = album.name.toLowerCase();
      return name.includes(textInput.toLowerCase());
    }) ?? [];

  const handleNext = () => {
    setTextInput("");
    setOffset((prev) => prev + LIMIT_PER_PAGE);
    setCurrPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    setTextInput("");
    setOffset((prev) => prev - LIMIT_PER_PAGE);
    setCurrPage((prev) => prev - 1);
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
            <Skeleton
              data-testid="skeleton-albumns"
              key={idx}
              className="w-full h-[132px]"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filterAlbums?.map((album) => (
            <CardAlbum key={album.id} album={album} />
          ))}
        </div>
      )}

      {filterAlbums?.length < 1 && !isLoading && (
        <EmptyState message="Não encontramos nenhum álbum com esse nome." />
      )}

      <PaginationControl
        albums={albums}
        isLoading={isLoading}
        onClickNext={handleNext}
        onClickPrev={handlePrev}
        currPage={currPage}
      />
    </div>
  );
}
