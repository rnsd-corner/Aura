import { useEffect, useState, useRef } from 'react';
import { ArrowRight, Volume2, X, Play, Pause } from 'lucide-react';
import { ASSETS } from '../data/musicData';
import { Track } from '../types';

interface ImmersiveSectionProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export function ImmersiveSection({
  currentTrack,
  isPlaying,
  onTogglePlay,
}: ImmersiveSectionProps) {
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modalCanvasRef = useRef<HTMLCanvasElement>(null);

  // Frequency wave animation on the section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let step = 0;

    const render = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isPlaying ? '#ff5c28' : '#78757d';

      ctx.beginPath();
      const sliceWidth = canvas.width / 120;
      let x = 0;

      for (let i = 0; i <= 120; i++) {
        const amplitude = isPlaying ? 25 : 8;
        const freq1 = Math.sin(step + i * 0.08) * amplitude;
        const freq2 = Math.cos(step * 0.5 + i * 0.04) * (amplitude * 0.5);
        const y = canvas.height / 2 + freq1 + freq2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }
      ctx.stroke();

      step += isPlaying ? 0.04 : 0.015;
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, [isPlaying]);

  // Modal visualizer when experience mode is open
  useEffect(() => {
    if (!isExperienceModalOpen) return;
    const canvas = modalCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const renderModal = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      ctx.fillStyle = '#0c0b0e';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw concentric acoustic rings
      const rings = 8;
      for (let r = 1; r <= rings; r++) {
        ctx.beginPath();
        const radius = (r * 60) + Math.sin(tick + r) * (isPlaying ? 14 : 4);
        ctx.arc(cx, cy, Math.max(10, radius), 0, Math.PI * 2);
        ctx.strokeStyle = r === 3 ? '#ff5c28' : '#232128';
        ctx.lineWidth = r === 3 ? 2 : 1;
        ctx.stroke();
      }

      tick += isPlaying ? 0.03 : 0.008;
      animId = requestAnimationFrame(renderModal);
    };

    animId = requestAnimationFrame(renderModal);
    return () => cancelAnimationFrame(animId);
  }, [isExperienceModalOpen, isPlaying]);

  return (
    <section className="relative w-full hairline-b overflow-hidden bg-[#0a090c]">
      {/* Background Cinematic Visual */}
      <div className="relative min-h-[560px] md:min-h-[640px] flex items-center">
        <img
          src={ASSETS.atmosphericSoundHall}
          alt="AURA Immersive Listening Hall"
          className="absolute inset-0 w-full h-full object-cover object-center grayscale contrast-125 opacity-40 scale-[1.01]"
        />

        {/* Darkness overlays to retain high readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0e] via-[#0c0b0e]/60 to-[#0c0b0e]" />
        <div className="absolute inset-0 bg-radial from-transparent to-[#0c0b0e]/90" />

        {/* Content Container */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 py-24 w-full flex flex-col items-start justify-between">
          <div className="max-w-[760px]">
            <div className="flex items-center space-x-3 mb-6 font-mono text-[10px] tracking-[0.2em] text-[#ff5c28] uppercase">
              <span className="w-2 h-2 bg-[#ff5c28] inline-block rounded-none" />
              <span>SPATIAL ROOM ACOUSTICS</span>
              <span>// 360° FIELD</span>
            </div>

            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[84px] leading-[0.95] text-[#f3f0e6] font-light tracking-[-0.03em] uppercase mb-8">
              LOSE YOURSELF<br />
              <span className="italic text-[#dedad0]">IN THE SOUND.</span>
            </h2>

            <p className="font-sans text-base md:text-lg text-[#dedad0] max-w-[540px] font-light leading-relaxed mb-10">
              Step away from screen distractions into an unhurried, monolithic listening space. Every recording preserved in original tape harmonics and natural reverberation.
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <button
                onClick={() => {
                  if (!isPlaying) onTogglePlay();
                  setIsExperienceModalOpen(true);
                }}
                className="px-8 py-4 bg-[#ff5c28] hover:bg-[#ff6b35] text-[#0c0b0e] font-mono text-xs font-semibold tracking-widest flex items-center space-x-3 cursor-pointer transition-transform active:scale-95 amber-glow"
                id="enter-experience-btn"
              >
                <span>ENTER EXPERIENCE</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-3 font-mono text-xs text-[#78757d]">
                <Volume2 className="w-4 h-4 text-[#ff5c28]" />
                <span>FLAC 24-BIT / 96.0 kHz DIRECT</span>
              </div>
            </div>
          </div>

          {/* Real-time Frequency Sine Canvas Banner */}
          <div className="w-full mt-16 pt-8 hairline-t flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="font-mono text-[10px] text-[#78757d] tracking-widest uppercase">
              FREQUENCY REAL-TIME RESONANCE MONITOR
            </div>
            <div className="w-full md:w-[480px] h-12 bg-[#0c0b0e]/70 border border-[#232128]">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Listening Experience Modal */}
      {isExperienceModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c0b0e] flex flex-col justify-between p-6 md:p-12">
          <canvas ref={modalCanvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-60" />

          {/* Modal Header */}
          <div className="relative z-10 flex justify-between items-center hairline-b pb-6">
            <div>
              <span className="font-serif text-2xl text-[#f3f0e6]">AURA DEEP IMMERSION</span>
              <span className="font-mono text-[10px] text-[#78757d] block tracking-widest">
                SESSION NO. 09 // ANALOG SOUNDSTAGE
              </span>
            </div>

            <button
              onClick={() => setIsExperienceModalOpen(false)}
              className="p-3 border border-[#232128] hover:border-[#ff5c28] text-[#f3f0e6] transition-colors cursor-pointer"
              aria-label="Exit experience"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center Stage Focus */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto space-y-6 max-w-xl mx-auto">
            <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-[#ff5c28] rounded-full flex items-center justify-center relative">
              <div className={`w-full h-full rounded-full border border-[#dedad0]/30 ${isPlaying ? 'animate-ping opacity-30' : ''}`} />
              <button
                onClick={onTogglePlay}
                className="absolute inset-0 flex items-center justify-center text-[#ff5c28] hover:text-[#f3f0e6] cursor-pointer"
              >
                {isPlaying ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-4xl sm:text-5xl text-[#f3f0e6] font-light">
                {currentTrack.title}
              </h3>
              <p className="font-sans text-lg text-[#dedad0]">{currentTrack.artist}</p>
              <div className="font-mono text-xs text-[#ff5c28] tracking-widest pt-2">
                {currentTrack.genre} • {currentTrack.bpm} BPM
              </div>
            </div>

            <p className="font-serif italic text-[#78757d] text-sm max-w-md">
              "Close your eyes. Listen to the physical room where the notes were born."
            </p>
          </div>

          {/* Modal Footer Controls */}
          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center hairline-t pt-6 gap-4 font-mono text-xs text-[#78757d]">
            <span>PRESS SPACEBAR OR CENTER ICON TO TOGGLE</span>
            <button
              onClick={() => setIsExperienceModalOpen(false)}
              className="text-[#ff5c28] hover:underline"
            >
              RETURN TO EDITORIAL ARCHIVE →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
