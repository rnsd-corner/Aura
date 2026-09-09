import React, { useEffect, useState, useRef } from 'react';
import { Play, Pause, Radio } from 'lucide-react';
import { Track } from '../types';
import { audioEngine } from '../utils/audioEngine';

interface FeaturedTrackProps {
  track: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  progressSec: number;
  onSeek: (seconds: number) => void;
}

export function FeaturedTrack({
  track,
  isPlaying,
  onTogglePlay,
  progressSec,
  onSeek,
}: FeaturedTrackProps) {
  const [waveformBars, setWaveformBars] = useState<number[]>(
    Array.from({ length: 48 }, (_, i) => 20 + Math.sin(i * 0.3) * 15 + ((i * 13) % 25))
  );
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Animate waveform bars when playing using real audio analyser or dynamic fallback
  useEffect(() => {
    let animationFrameId: number;

    const updateWaveform = () => {
      if (isPlaying) {
        const freqs = audioEngine.getFrequencies();
        setWaveformBars((prev) =>
          prev.map((val, idx) => {
            const freqVal = freqs[idx % freqs.length] || 30;
            const target = Math.max(12, Math.min(95, (freqVal / 255) * 100 + Math.sin(Date.now() * 0.004 + idx * 0.4) * 20));
            return Math.round(val * 0.7 + target * 0.3);
          })
        );
      }
      animationFrameId = requestAnimationFrame(updateWaveform);
    };

    animationFrameId = requestAnimationFrame(updateWaveform);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPlaying]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, (progressSec / track.durationSec) * 100);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * track.durationSec);
  };

  return (
    <section id="featured" className="w-full max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-24 hairline-b">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 hairline-b">
        <div>
          <span className="font-mono text-[10px] tracking-[0.16em] text-[#ff5c28] uppercase block mb-2">
            // FEATURED LISTENING
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#f3f0e6] font-light">
            THE LISTENING ROOM
          </h2>
        </div>
        <div className="mt-4 md:mt-0 font-mono text-xs text-[#78757d] tracking-wider">
          ROTATION CATALOG // {track.catalogCode}
        </div>
      </div>

      {/* Featured Player Container */}
      <div className="bg-[#121116] border border-[#232128] p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Vinyl & Artwork Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-square group">
              
              {/* Vinyl Disc that peeks out on hover or spins when playing */}
              <div
                className={`absolute top-0 right-0 w-full h-full rounded-full bg-[#0a090c] border-2 border-[#1c1b20] transition-all duration-700 ease-out flex items-center justify-center shadow-2xl ${
                  isPlaying
                    ? 'translate-x-12 sm:translate-x-16 rotate-[360deg] animate-[spin_12s_linear_infinite]'
                    : 'group-hover:translate-x-8'
                }`}
              >
                {/* Grooves */}
                <div className="w-[85%] h-[85%] rounded-full border border-[#1f1e24]/80 flex items-center justify-center">
                  <div className="w-[70%] h-[70%] rounded-full border border-[#232128]/70 flex items-center justify-center">
                    <div className="w-[50%] h-[50%] rounded-full border border-[#18161d] flex items-center justify-center">
                      {/* Center Label */}
                      <div className="w-20 h-20 rounded-full bg-[#ff5c28] flex flex-col items-center justify-center text-[8px] font-mono text-[#0c0b0e] font-bold p-1 text-center leading-tight">
                        <span>AURA</span>
                        <span className="text-[6px] tracking-wider">33 RPM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Album Sleeve Cover (Squared 1:1, crisp border) */}
              <div className="relative z-10 w-full h-full border border-[#232128] bg-[#0c0b0e] overflow-hidden shadow-2xl">
                <img
                  src={track.coverUrl}
                  alt={`${track.title} by ${track.artist}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-[#0c0b0e]/90 px-2.5 py-1 border border-[#232128] font-mono text-[9px] text-[#dedad0] tracking-widest uppercase">
                  ORIGINAL MASTER
                </div>
              </div>
            </div>
          </div>

          {/* Details & Interactive Audio Controls Column */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div>
              {/* Meta Tagline */}
              <div className="flex items-center space-x-3 font-mono text-[11px] text-[#ff5c28] tracking-[0.14em] uppercase mb-3">
                <Radio className="w-3.5 h-3.5" />
                <span>ARCHIVAL FEATURE TRACK</span>
                <span>•</span>
                <span>{track.genre}</span>
              </div>

              {/* Title & Artist */}
              <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#f3f0e6] font-light tracking-tight mb-2">
                {track.title}
              </h3>
              <p className="font-sans text-xl text-[#dedad0] font-light mb-6">
                by <span className="font-medium text-[#f3f0e6]">{track.artist}</span>
              </p>

              {/* Curatorial Description */}
              <p className="font-sans text-sm md:text-base text-[#dedad0] leading-relaxed max-w-[580px] font-light mb-8">
                {track.description}
              </p>

              {/* Acoustic Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 bg-[#0c0b0e] border border-[#232128] font-mono text-[11px] text-[#78757d] mb-8">
                <div>
                  <span className="block text-[9px] text-[#78757d] uppercase tracking-wider mb-0.5">FORMAT</span>
                  <span className="text-[#dedad0] font-medium">180G VINYL</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#78757d] uppercase tracking-wider mb-0.5">TEMPO</span>
                  <span className="text-[#dedad0] font-medium">{track.bpm} BPM</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#78757d] uppercase tracking-wider mb-0.5">HARMONIC KEY</span>
                  <span className="text-[#dedad0] font-medium">{track.key}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-[#78757d] uppercase tracking-wider mb-0.5">RESOLUTION</span>
                  <span className="text-[#ff5c28] font-medium">96kHz / 24-BIT</span>
                </div>
              </div>
            </div>

            {/* Interactive Player Controls & Waveform */}
            <div className="space-y-5">
              
              {/* Subtle Frequency Waveform */}
              <div className="bg-[#0c0b0e] border border-[#232128] p-4 flex items-end justify-between h-20 gap-[2px]">
                {waveformBars.map((height, i) => {
                  const barProgress = (i / waveformBars.length) * 100;
                  const isPassed = barProgress <= progressPercent;
                  return (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className={`flex-1 transition-all duration-75 min-w-[2px] ${
                        isPassed
                          ? 'bg-[#ff5c28]'
                          : 'bg-[#232128] hover:bg-[#78757d]'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Scrubbable Progress Bar */}
              <div
                ref={progressBarRef}
                onClick={handleProgressBarClick}
                className="relative w-full h-3 bg-[#18161d] border border-[#232128] cursor-pointer group flex items-center"
                role="slider"
                aria-label="Track progress"
                aria-valuemin={0}
                aria-valuemax={track.durationSec}
                aria-valuenow={progressSec}
              >
                <div
                  style={{ width: `${progressPercent}%` }}
                  className="h-full bg-[#ff5c28] relative transition-all duration-100 ease-linear"
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-5 bg-[#f3f0e6] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Time Indicators & Transport Actions */}
              <div className="flex items-center justify-between font-mono text-xs text-[#78757d]">
                <span>{formatTime(progressSec)}</span>
                
                <div className="flex items-center space-x-6">
                  <button
                    onClick={onTogglePlay}
                    className="flex items-center space-x-3 px-6 py-2.5 bg-[#ff5c28] hover:bg-[#ff6b35] text-[#0c0b0e] font-mono text-xs font-semibold tracking-widest cursor-pointer transition-all active:scale-95"
                    id="featured-play-button"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>PAUSE SESSION</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                        <span>LISTEN NOW</span>
                      </>
                    )}
                  </button>
                </div>

                <span>{track.duration}</span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
