import { Skeleton } from "./ui/skeleton";

export function CardArtistLoading() {
  return (
    <div className="flex gap-2">
      <Skeleton className="w-[120px] h-[120px]" />
      <div className="flex flex-col gap-2 mt-2">
        <Skeleton className="w-[145px] h-6" />
        <Skeleton className="w-[145px] h-6" />
      </div>
    </div>
  );
}
