import { AlbumGrid } from "@/components/AlbumGrid";
import { Container } from "@/components/Container";
import { CardTrack } from "@/components/CardTrack";
import { Track } from "@/components/Track";
import { Skeleton } from "@/components/ui/skeleton";
import { useArtist } from "@/context/ArtistContext";
import { useGetTopTracks } from "@/hooks/useGetTopTracks";
import { QueueListIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

export default function ArtistPage() {
  const { artist } = useArtist();
  const { data: tracks, isLoading: isLoadingTracks } = useGetTopTracks(
    artist?.id ?? ""
  );

  return (
    <>
      <div className="bg-gradient-to-br from-slate-600 to-slate-800 flex justify-center">
        <div className="relative">
          <img src={artist?.bgImage} alt="artist background image" />
          <div className="absolute bottom-0 left-0 w-full bg-slate-900 p-3">
            <h2 className="text-gray-200 text-sm lg:text-xl text-center">
              {artist?.name}
            </h2>
          </div>
        </div>
      </div>

      <Container>
        <div className="flex items-center gap-2 mb-6 pb-2 border-b-[1px]">
          <SpeakerWaveIcon className="w-8 h-8 text-gray-200" />
          <h2 className="text-2xl text-gray-200">Mais Tocadas</h2>
        </div>

        <div className="mb-12 lg:hidden">
          {isLoadingTracks ? (
            <>
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="w-full h-[44px] mb-4" />
              ))}
            </>
          ) : (
            <>
              {tracks?.map((track, idx) => (
                <Track key={`track-${idx}`} track={track} position={idx} />
              ))}
            </>
          )}
        </div>

        <div className="hidden lg:block mb-12">
          {isLoadingTracks ? (
            <div className="grid grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Skeleton key={idx} className="w-full h-[200px]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-5 gap-6">
              {tracks?.map((track, idx) => (
                <CardTrack key={`track-${idx}`} track={track} />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-6 pb-2 border-b-[1px]">
          <QueueListIcon className="w-8 h-8 text-gray-200" />
          <h2 className="text-2xl text-gray-200">Álbuns</h2>
        </div>

        <div>
          <AlbumGrid artistId={artist?.id} />
        </div>
      </Container>
    </>
  );
}
