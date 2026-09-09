import React, { useState, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ListMusic,
} from 'lucide-react';
import { Track } from '../types';

interface MusicPlayerProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  progressSec: number;
  onSeek: (seconds: number) => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  playlist: Track[];
  onSelectTrack: (trackId: string) => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export function MusicPlayer({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  progressSec,
  onSeek,
  volume,
  onVolumeChange,
  playlist,
  onSelectTrack,
  isOpen,
  onToggleOpen,
}: MusicPlayerProps) {
  const [showQueue, setShowQueue] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(volume);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Time formatter
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = Math.min(100, (progressSec / currentTrack.durationSec) * 100);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    onSeek(ratio * currentTrack.durationSec);
  };

  const toggleMute = () => {
    if (isMuted) {
      onVolumeChange(previousVolume || 0.8);
      setIsMuted(false);
    } else {
      setPreviousVolume(volume);
      onVolumeChange(0);
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Queue Drawer Sheet */}
      {showQueue && (
        <div className="fixed bottom-20 md:bottom-24 right-4 md:right-10 z-50 w-[360px] max-w-[calc(100vw-32px)] bg-[#121116] border border-[#232128] shadow-2xl p-6">
          <div className="flex items-center justify-between pb-4 hairline-b mb-4">
            <div className="flex items-center space-x-2 font-mono text-xs text-[#f3f0e6]">
              <ListMusic className="w-4 h-4 text-[#ff5c28]" />
              <span>LISTENING QUEUE</span>
            </div>
            <button
              onClick={() => setShowQueue(false)}
              className="text-[#78757d] hover:text-[#f3f0e6] font-mono text-xs cursor-pointer"
            >
              CLOSE
            </button>
          </div>

          <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
            {playlist.map((item, index) => {
              const isCurrent = item.id === currentTrack.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectTrack(item.id);
                  }}
                  className={`flex items-center justify-between p-2.5 cursor-pointer transition-colors ${
                    isCurrent
                      ? 'bg-[#18161d] border-l-2 border-[#ff5c28]'
                      : 'hover:bg-[#18161d]'
                  }`}
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className="font-mono text-[10px] text-[#78757d]">
                      0{index + 1}
                    </span>
                    <div className="truncate">
                      <p
                        className={`text-xs font-sans truncate ${
                          isCurrent ? 'text-[#ff5c28] font-medium' : 'text-[#f3f0e6]'
                        }`}
                      >
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[#78757d] font-sans truncate">
                        {item.artist}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#78757d] ml-2">
                    {item.duration}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e0d11]/98 backdrop-blur-md hairline-t">
        {/* Full-width Razor-Thin Scrubbing Track */}
        <div
          ref={progressBarRef}
          onClick={handleProgressBarClick}
          className="relative w-full h-1.5 bg-[#1a191f] cursor-pointer group"
          role="slider"
          aria-label="Seek progress"
          aria-valuemin={0}
          aria-valuemax={currentTrack.durationSec}
          aria-valuenow={progressSec}
        >
          <div
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-[#ff5c28] relative transition-all duration-75"
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-3.5 bg-[#f3f0e6] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Left: Track Information & Album Thumbnail */}
          <div className="flex items-center space-x-3 md:space-x-4 min-w-0 max-w-[280px] sm:max-w-[340px]">
            <div className="relative w-11 h-11 md:w-13 md:h-13 bg-[#121116] border border-[#232128] flex-shrink-0 overflow-hidden">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className={`w-full h-full object-cover ${isPlaying ? 'contrast-110' : 'grayscale'}`}
              />
              {isPlaying && (
                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#ff5c28] rounded-full animate-ping" />
              )}
            </div>

            <div className="min-w-0">
              <h4 className="font-serif text-sm md:text-base text-[#f3f0e6] truncate font-light">
                {currentTrack.title}
              </h4>
              <p className="font-sans text-xs text-[#dedad0] truncate">
                {currentTrack.artist}
              </p>
              <div className="hidden lg:flex items-center space-x-2 font-mono text-[9px] text-[#78757d] tracking-wider pt-0.5">
                <span>{currentTrack.catalogCode}</span>
                <span>•</span>
                <span className="text-[#ff5c28]">96.0 kHz / 24-BIT</span>
              </div>
            </div>
          </div>

          {/* Center: Transport Controls */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={onPrevTrack}
                className="text-[#dedad0] hover:text-[#ff5c28] p-1.5 transition-colors cursor-pointer"
                aria-label="Previous track"
              >
                <SkipBack className="w-4 h-4 md:w-5 md:h-5" />
              </button>

              <button
                onClick={onTogglePlay}
                className="w-9 h-9 md:w-11 md:h-11 bg-[#ff5c28] hover:bg-[#ff6b35] text-[#0c0b0e] flex items-center justify-center transition-all cursor-pointer rounded-none active:scale-95 amber-glow"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                id="player-play-pause-btn"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                ) : (
                  <Play className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={onNextTrack}
                className="text-[#dedad0] hover:text-[#ff5c28] p-1.5 transition-colors cursor-pointer"
                aria-label="Next track"
              >
                <SkipForward className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Timestamps */}
            <div className="hidden sm:flex items-center space-x-2 font-mono text-[10px] text-[#78757d] mt-1">
              <span>{formatTime(progressSec)}</span>
              <span>/</span>
              <span>{currentTrack.duration}</span>
            </div>
          </div>

          {/* Right: Volume & Queue Actions */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Volume Control */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="text-[#78757d] hover:text-[#f3f0e6] transition-colors p-1"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-4 h-4 text-[#ff5c28]" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>

              <input
                type="range"
                min="0"
                max="1"
                step="0.02"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setIsMuted(false);
                  onVolumeChange(parseFloat(e.target.value));
                }}
                className="w-16 lg:w-24 h-1 bg-[#232128] accent-[#ff5c28] cursor-pointer"
                aria-label="Volume slider"
              />
            </div>

            {/* Queue Toggle */}
            <button
              onClick={() => setShowQueue(!showQueue)}
              className={`p-2 border transition-colors cursor-pointer flex items-center space-x-1.5 font-mono text-xs ${
                showQueue
                  ? 'border-[#ff5c28] text-[#ff5c28] bg-[#18161d]'
                  : 'border-[#232128] text-[#dedad0] hover:border-[#dedad0]'
              }`}
              aria-label="Toggle playlist queue"
              id="toggle-queue-button"
            >
              <ListMusic className="w-4 h-4" />
              <span className="hidden sm:inline-block">QUEUE</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
