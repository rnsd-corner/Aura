import { Disc3 } from 'lucide-react';

interface FinalCTAProps {
  onStartListening: () => void;
  isPlaying: boolean;
}

export function FinalCTA({ onStartListening, isPlaying }: FinalCTAProps) {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-6 md:px-10 py-24 md:py-36 text-center hairline-b">
      <div className="max-w-[800px] mx-auto flex flex-col items-center">
        {/* Monospaced metadata seal */}
        <div className="flex items-center space-x-2 font-mono text-[10px] tracking-[0.2em] text-[#ff5c28] uppercase mb-8">
          <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
          <span>AURA SONIC ARCHIVE // VOL. 04</span>
        </div>

        {/* Editorial Heading */}
        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[0.98] text-[#f3f0e6] font-light tracking-[-0.03em] uppercase mb-6">
          GOOD MUSIC<br />
          <span className="italic font-light text-[#dedad0]">STAYS WITH YOU.</span>
        </h2>

        {/* Supporting copy */}
        <p className="font-sans text-base md:text-xl text-[#dedad0] font-light mb-10 max-w-[480px]">
          Discover something worth listening to.
        </p>

        {/* Monolithic Action Button */}
        <button
          onClick={onStartListening}
          className="px-10 py-4 bg-[#ff5c28] hover:bg-[#ff6b35] text-[#0c0b0e] font-mono text-xs font-semibold tracking-[0.16em] uppercase cursor-pointer transition-transform active:scale-95 amber-glow"
          id="final-start-listening-btn"
        >
          {isPlaying ? 'ACTIVE LISTENING ROOM' : 'START LISTENING'}
        </button>
      </div>
    </section>
  );
}
