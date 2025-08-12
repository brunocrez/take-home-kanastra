import { AlbumGrid } from "@/components/AlbumGrid";
import { Container } from "@/components/Container";
import { Track } from "@/components/Track";
import { useArtist } from "@/context/ArtistContext";
import { useGetTopTracks } from "@/hooks/useGetTopTracks";
import { QueueListIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline";

export default function ArtistPage() {
  const { artist } = useArtist();
  const { data: tracks } = useGetTopTracks(artist?.id ?? "");

  return (
    <>
      <div>
        <img src={artist?.bgImage} alt="artist background image" />
      </div>
      <Container>
        <div className="flex items-center gap-2 mb-6 pb-2 border-b-[1px]">
          <SpeakerWaveIcon className="w-8 h-8 text-gray-200" />
          <h2 className="text-2xl text-gray-200">Mais Tocadas</h2>
        </div>

        <div className="mb-12">
          {tracks?.map((track, idx) => (
            <Track key={`track-${idx}`} track={track} position={idx} />
          ))}
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
