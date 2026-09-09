import { useState } from 'react';
import { MOODS } from '../data/musicData';
import { Mood } from '../types';

interface MoodsProps {
  onSelectMood: (mood: Mood) => void;
  activeMoodId?: string;
}

export function Moods({ onSelectMood, activeMoodId }: MoodsProps) {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);

  return (
    <section id="moods" className="w-full max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28 hairline-b">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 hairline-b">
        <div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#ff5c28] uppercase block mb-2">
            // EMOTIVE RESONANCE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3f0e6] font-light tracking-tight">
            HOW ARE YOU FEELING?
          </h2>
        </div>
        <p className="mt-4 md:mt-0 font-sans text-sm text-[#dedad0] max-w-[340px] font-light">
          Acoustic selection tailored to internal states, from quiet solace to kinetic drive.
        </p>
      </div>

      {/* Typographic and Expressive Grid (No emoji, no generic cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x border border-[#232128] bg-[#121116]">
        {MOODS.map((mood, idx) => {
          const isSelected = activeMoodId === mood.id;
          const isHovered = hoveredMood === mood.id;

          return (
            <div
              key={mood.id}
              onClick={() => onSelectMood(mood)}
              onMouseEnter={() => setHoveredMood(mood.id)}
              onMouseLeave={() => setHoveredMood(null)}
              className={`p-8 md:p-10 cursor-pointer transition-all duration-300 relative group flex flex-col justify-between min-h-[260px] ${
                isSelected
                  ? 'bg-[#18161d]'
                  : 'hover:bg-[#18161d]'
              } ${idx >= 3 ? 'md:border-t md:border-[#232128]' : ''}`}
            >
              {/* Top Index & Tag */}
              <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.16em] text-[#78757d] mb-6">
                <span className="group-hover:text-[#ff5c28] transition-colors">
                  STATE // 0{idx + 1}
                </span>
                <span>{mood.tempo}</span>
              </div>

              {/* Expressive Editorial Typography */}
              <div>
                <h3
                  className={`font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight transition-all duration-300 mb-3 ${
                    isSelected || isHovered
                      ? 'text-[#ff5c28] translate-x-1 italic'
                      : 'text-[#f3f0e6] font-light'
                  }`}
                >
                  {mood.title}
                </h3>
                
                <p className="font-sans text-xs sm:text-sm text-[#dedad0] font-light leading-relaxed max-w-[280px]">
                  {mood.tagline}
                </p>
              </div>

              {/* Bottom Cue */}
              <div className="pt-6 hairline-t flex items-center justify-between font-mono text-[11px]">
                <span className="text-[#78757d] uppercase tracking-wider text-[10px]">
                  {mood.associatedGenre}
                </span>
                <span
                  className={`transition-colors ${
                    isSelected ? 'text-[#ff5c28]' : 'text-[#78757d] group-hover:text-[#f3f0e6]'
                  }`}
                >
                  {isSelected ? 'ACTIVE FREQUENCY' : 'TUNE IN →'}
                </span>
              </div>

              {/* Left Accent indicator for active state */}
              {isSelected && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ff5c28]" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
