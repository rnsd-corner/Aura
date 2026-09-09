import { Play } from 'lucide-react';
import { ALBUMS } from '../data/musicData';

interface NewReleasesProps {
  onPlayAlbumTrack: (albumId: string) => void;
  activeTrackId: string;
  isPlaying: boolean;
}

export function NewReleases({ onPlayAlbumTrack, activeTrackId, isPlaying }: NewReleasesProps) {
  // Map album to track ID
  const albumToTrackMap: Record<string, string> = {
    'after-midnight-lp': 'after-midnight',
    'static-dreams-lp': 'static-dreams',
    'blue-hour-lp': 'blue-hour',
    'low-signal-lp': 'low-signal',
  };

  return (
    <section id="albums" className="w-full max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28 hairline-b">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 hairline-b">
        <div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#ff5c28] uppercase block mb-2">
            // PHYSICAL & DIGITAL ARCHIVE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3f0e6] font-light tracking-tight">
            NEW THIS WEEK
          </h2>
        </div>
        <div className="mt-4 md:mt-0 font-mono text-xs text-[#78757d]">
          CATALOG RELEASES // CURATED BY EDITORIAL DESK
        </div>
      </div>

      {/* Album Grid (Clean, exhibition wall format) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {ALBUMS.map((album) => {
          const trackId = albumToTrackMap[album.id];
          const isCurrentlyActive = activeTrackId === trackId && isPlaying;

          return (
            <div
              key={album.id}
              className="bg-[#121116] border border-[#232128] group flex flex-col justify-between hover:border-[#ff5c28] transition-colors duration-200"
            >
              {/* Artwork Container (Strictly 1:1, crisp 1px stroke, subtle hover response) */}
              <div className="relative aspect-square w-full bg-[#0c0b0e] overflow-hidden border-b border-[#232128]">
                <img
                  src={album.coverUrl}
                  alt={`${album.title} - ${album.artist}`}
                  className="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-[1.02] transition-all duration-500 ease-out"
                />

                {/* Subtle Play Overlay on Hover */}
                <div className="absolute inset-0 bg-[#0c0b0e]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={() => onPlayAlbumTrack(album.id)}
                    className="w-12 h-12 bg-[#ff5c28] text-[#0c0b0e] flex items-center justify-center rounded-none shadow-lg cursor-pointer transform active:scale-95 transition-transform"
                    aria-label={`Play ${album.title}`}
                    id={`play-album-${album.id}`}
                  >
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </button>
                </div>

                {/* Format tag */}
                <div className="absolute bottom-2.5 right-2.5 bg-[#0c0b0e]/90 px-2 py-0.5 border border-[#232128] font-mono text-[9px] text-[#dedad0] tracking-wider uppercase">
                  {album.year}
                </div>
              </div>

              {/* Album Metadata */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-[#78757d] mb-1">
                    <span>{album.catalogCode}</span>
                    <span>{album.tracksCount} TRACKS</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#f3f0e6] font-light tracking-tight group-hover:text-[#ff5c28] transition-colors">
                    {album.title}
                  </h3>
                  
                  <p className="font-sans text-xs text-[#dedad0] font-light mt-0.5">
                    {album.artist}
                  </p>
                </div>

                {/* Format & Play Action */}
                <div className="pt-3 hairline-t flex items-center justify-between font-mono text-[10px] text-[#78757d]">
                  <span className="truncate max-w-[150px]">{album.format}</span>
                  <button
                    onClick={() => onPlayAlbumTrack(album.id)}
                    className="text-[#ff5c28] hover:text-[#f3f0e6] cursor-pointer flex items-center space-x-1"
                  >
                    <span>{isCurrentlyActive ? 'PLAYING' : 'LISTEN'}</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
