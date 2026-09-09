import { Play, Pause } from 'lucide-react';
import { Track } from '../types';
import { ASSETS } from '../data/musicData';

interface HeroProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function Hero({ currentTrack, isPlaying, onTogglePlay }: HeroProps) {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-10 pb-20 md:pt-16 md:pb-28 hairline-b overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
        
        {/* Left Column: Monumental Editorial Statement */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
          <div>
            {/* Archival metadata index */}
            <div className="flex items-center space-x-4 mb-6 md:mb-8 font-mono text-[11px] tracking-[0.16em] text-[#78757d]">
              <span className="text-[#ff5c28]">// 01</span>
              <span>CURATION ESSAY</span>
              <span className="w-8 h-[1px] bg-[#232128]" />
              <span>ISSUE NO. 04</span>
            </div>

            {/* Main Statement */}
            <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[86px] leading-[0.95] tracking-[-0.03em] text-[#f3f0e6] uppercase font-light">
              LISTEN<br />
              BEYOND<br />
              <span className="italic font-light text-[#dedad0]">THE NOISE.</span>
            </h1>

            {/* Editorial deck note */}
            <p className="mt-8 md:mt-10 font-sans text-base md:text-lg text-[#dedad0] max-w-[560px] leading-relaxed font-light">
              A curated physical and digital acoustic space for deep listeners. Rejecting algorithmic uniformity in pursuit of magnetic tape intimacy, room resonance, and long-form sonic narratives.
            </p>
          </div>

          {/* Now Playing Block */}
          <div className="bg-[#121116] border border-[#232128] p-5 sm:p-6 max-w-[480px]">
            <div className="flex items-center justify-between pb-3 hairline-b mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-[#ff5c28] rounded-full inline-block animate-pulse" />
                <span className="font-mono text-[10px] tracking-[0.14em] text-[#78757d] uppercase">
                  NOW PLAYING
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#ff5c28] tracking-wider">
                {currentTrack.catalogCode}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl text-[#f3f0e6] font-normal tracking-tight">
                  {currentTrack.title}
                </h3>
                <p className="font-sans text-xs text-[#dedad0] tracking-wide">
                  {currentTrack.artist}
                </p>
                <div className="flex items-center space-x-3 pt-1 font-mono text-[10px] text-[#78757d] tracking-wider">
                  <span>{currentTrack.duration}</span>
                  <span>•</span>
                  <span>{currentTrack.genre}</span>
                </div>
              </div>

              {/* Play Trigger */}
              <button
                onClick={onTogglePlay}
                className="w-12 h-12 flex-shrink-0 bg-[#ff5c28] hover:bg-[#ff6b35] text-[#0c0b0e] flex items-center justify-center transition-transform active:scale-95 cursor-pointer amber-glow"
                aria-label={isPlaying ? 'Pause current track' : 'Play current track'}
                id="hero-play-button"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Photography Composition */}
        <div className="lg:col-span-5 relative flex flex-col justify-end">
          <div className="relative border border-[#232128] bg-[#121116] overflow-hidden group">
            {/* Large Artist Portrait */}
            <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full overflow-hidden">
              <img
                src={ASSETS.miraValePortrait}
                alt="Mira Vale in analog recording studio"
                className="w-full h-full object-cover grayscale contrast-105 hover:grayscale-0 transition-all duration-700 ease-out scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0e] via-transparent to-transparent opacity-80" />
            </div>

            {/* Overlaid Vinyl Cover Inset */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-28 sm:w-36 aspect-square border border-[#232128] bg-[#0c0b0e] shadow-2xl p-1">
              <img
                src={ASSETS.afterMidnightCover}
                alt="After Midnight Album Artwork"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-5 right-0 font-mono text-[9px] text-[#78757d] tracking-widest uppercase">
                LP // 180G VINYL
              </div>
            </div>

            {/* Photo Caption / Credit */}
            <div className="p-4 sm:p-5 hairline-t bg-[#0c0b0e]/90 flex items-center justify-between font-mono text-[11px] text-[#78757d]">
              <div>
                <span className="text-[#dedad0]">MIRA VALE</span> — STUDIO ARCHIVE
              </div>
              <span className="tracking-widest">96.0 kHz / 24-BIT</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
