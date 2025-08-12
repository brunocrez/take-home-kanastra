import type { AlbumResponse } from "@/models/AlbumResponse";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { LIMIT_PER_PAGE } from "@/utils/constants";
import { useEffect, useMemo, useState } from "react";

type PaginationControlProps = {
  isLoading: boolean;
  albums: AlbumResponse | undefined;
  onClickPrev: () => void;
  onClickNext: () => void;
  currPage: number;
};

export function PaginationControl({
  albums,
  isLoading,
  onClickPrev,
  onClickNext,
  currPage,
}: PaginationControlProps) {
  const [pages, setPages] = useState(albums?.total ?? 0);

  useEffect(() => {
    if (albums) {
      setPages(albums.total);
    }
  }, [albums]);

  const totalPages = useMemo(() => Math.ceil(pages / LIMIT_PER_PAGE), [pages]);

  return (
    <div className="flex gap-2 mt-6 justify-end items-center">
      <span className="text-gray-200 mr-6 text-sm md:text-base">
        Página {currPage} de {totalPages}
      </span>
      <Button
        data-testid="previous-btn"
        disabled={!albums?.previous || isLoading}
        className="cursor-pointer bg-white hover:bg-white hover:scale-105"
        onClick={onClickPrev}
      >
        <ArrowLeftIcon className="text-slate-800" />
      </Button>
      <Button
        data-testid="next-btn"
        disabled={!albums?.next || isLoading}
        className="cursor-pointer bg-white hover:bg-white hover:scale-105"
        onClick={onClickNext}
      >
        <ArrowRightIcon className="text-slate-800" />
      </Button>
    </div>
  );
}
