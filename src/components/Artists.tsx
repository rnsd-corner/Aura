import { Play } from 'lucide-react';
import { ARTISTS } from '../data/musicData';

interface ArtistsProps {
  onSelectTrack: (trackId: string) => void;
  currentTrackId: string;
  isPlaying: boolean;
}

export function Artists({ onSelectTrack, currentTrackId, isPlaying }: ArtistsProps) {
  return (
    <section id="artists" className="w-full max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28 hairline-b">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
        <div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#ff5c28] uppercase block mb-2">
            // ROSTER & PROFILES
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3f0e6] font-light tracking-tight">
            ARTISTS WORTH HEARING
          </h2>
        </div>
        <p className="mt-4 md:mt-0 font-sans text-sm text-[#dedad0] max-w-[360px] font-light">
          Visionaries operating outside the algorithmic conveyor belt, shaping contemporary sound through physical instruments and deliberate space.
        </p>
      </div>

      {/* Featured Lead Artist (Mira Vale) - Large Broadsheet Editorial */}
      <div className="mb-14 bg-[#121116] border border-[#232128]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column: Natural Crop Photo */}
          <div className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto overflow-hidden bg-[#0c0b0e]">
            <img
              src={ARTISTS[0].imageUrl}
              alt={ARTISTS[0].name}
              className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute top-4 left-4 bg-[#0c0b0e]/90 px-3 py-1 border border-[#232128] font-mono text-[10px] text-[#ff5c28] tracking-widest">
              RESIDENT ARTIST // 01
            </div>
          </div>

          {/* Right Column: Editorial Text & Listen Trigger */}
          <div className="lg:col-span-6 p-8 md:p-12 lg:p-14 flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 font-mono text-[11px] text-[#78757d] tracking-widest uppercase mb-4">
                <span>{ARTISTS[0].origin}</span>
                <span>•</span>
                <span>{ARTISTS[0].releasesCount} RELEASES</span>
              </div>

              <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3f0e6] font-light mb-4">
                {ARTISTS[0].name}
              </h3>

              <div className="font-mono text-xs text-[#ff5c28] tracking-wider mb-6">
                {ARTISTS[0].genre}
              </div>

              <blockquote className="font-serif italic text-lg sm:text-xl text-[#dedad0] leading-relaxed mb-6 pl-4 border-l-2 border-[#ff5c28]">
                {ARTISTS[0].quote}
              </blockquote>

              <p className="font-sans text-sm text-[#dedad0] leading-relaxed font-light mb-8">
                {ARTISTS[0].bio}
              </p>
            </div>

            <div className="pt-6 hairline-t flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => onSelectTrack(ARTISTS[0].featuredTrackId)}
                className="flex items-center space-x-3 px-6 py-3 bg-[#ff5c28] hover:bg-[#ff6b35] text-[#0c0b0e] font-mono text-xs font-semibold tracking-widest transition-transform active:scale-95 cursor-pointer"
                id="listen-mira-vale"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>LISTEN TO AFTER MIDNIGHT</span>
              </button>

              <span className="font-mono text-xs text-[#78757d]">
                ACTIVE SINCE {ARTISTS[0].activeSince}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of the Other 4 Artists (Editorial Matrix, not generic cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ARTISTS.slice(1).map((artist, idx) => {
          const isThisArtistPlaying = currentTrackId === artist.featuredTrackId && isPlaying;
          return (
            <div
              key={artist.id}
              className="bg-[#121116] border border-[#232128] flex flex-col justify-between group hover:border-[#dedad0] transition-colors"
            >
              {/* Natural Photography Crop */}
              <div className="relative aspect-square overflow-hidden bg-[#0c0b0e] border-b border-[#232128]">
                <img
                  src={artist.imageUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-3 left-3 bg-[#0c0b0e]/90 px-2 py-0.5 border border-[#232128] font-mono text-[9px] text-[#78757d] tracking-widest">
                  // 0{idx + 2}
                </div>
              </div>

              {/* Info Block */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="font-mono text-[10px] text-[#78757d] tracking-widest uppercase mb-1">
                    {artist.origin}
                  </div>
                  <h4 className="font-serif text-2xl text-[#f3f0e6] font-light mb-2">
                    {artist.name}
                  </h4>
                  <p className="font-sans text-xs text-[#dedad0] font-light line-clamp-3 mb-4">
                    {artist.bio}
                  </p>
                </div>

                <div className="pt-4 hairline-t flex items-center justify-between">
                  <button
                    onClick={() => onSelectTrack(artist.featuredTrackId)}
                    className="flex items-center space-x-2 font-mono text-xs text-[#ff5c28] hover:text-[#f3f0e6] cursor-pointer transition-colors"
                    id={`listen-artist-${artist.id}`}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isThisArtistPlaying ? 'PLAYING' : 'LISTEN'}</span>
                  </button>
                  <span className="font-mono text-[10px] text-[#78757d]">
                    {artist.releasesCount} RELEASES
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
