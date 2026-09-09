import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedTrack } from './components/FeaturedTrack';
import { Discover } from './components/Discover';
import { Artists } from './components/Artists';
import { NewReleases } from './components/NewReleases';
import { ImmersiveSection } from './components/ImmersiveSection';
import { Moods } from './components/Moods';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MusicPlayer } from './components/MusicPlayer';
import { TRACKS } from './data/musicData';
import { audioEngine } from './utils/audioEngine';
import { Mood, Track } from './types';

export default function App() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSec, setProgressSec] = useState(42); // start with a natural progress
  const [volume, setVolume] = useState(0.8);
  const [isPlayerOpen, setIsPlayerOpen] = useState(true);
  const [activeMoodId, setActiveMoodId] = useState<string | undefined>('calm');

  const currentTrack = TRACKS[currentTrackIndex];

  // Playback timer ticker
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgressSec((prev) => {
          if (prev >= currentTrack.durationSec) {
            // Loop to next track
            setCurrentTrackIndex((idx) => (idx + 1) % TRACKS.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.durationSec]);

  // Sync volume with audioEngine
  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    audioEngine.setVolume(newVol);
  };

  // Toggle play/pause
  const handleTogglePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      audioEngine.play();
      setIsPlaying(true);
    }
  };

  // Track switching
  const handleSelectTrack = (trackId: string) => {
    const idx = TRACKS.findIndex((t) => t.id === trackId);
    if (idx !== -1) {
      setCurrentTrackIndex(idx);
      setProgressSec(0);
      setIsPlaying(true);
      audioEngine.play();
    }
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setProgressSec(0);
    if (!isPlaying) {
      setIsPlaying(true);
      audioEngine.play();
    }
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? TRACKS.length - 1 : prev - 1));
    setProgressSec(0);
    if (!isPlaying) {
      setIsPlaying(true);
      audioEngine.play();
    }
  };

  const handleSeek = (seconds: number) => {
    setProgressSec(Math.round(seconds));
  };

  const handleSelectMood = (mood: Mood) => {
    setActiveMoodId(mood.id);
    handleSelectTrack(mood.recommendedTrackId);
  };

  const handlePlayAlbum = (albumId: string) => {
    const albumTrackMap: Record<string, string> = {
      'after-midnight-lp': 'after-midnight',
      'static-dreams-lp': 'static-dreams',
      'blue-hour-lp': 'blue-hour',
      'low-signal-lp': 'low-signal',
    };
    const trackId = albumTrackMap[albumId];
    if (trackId) {
      handleSelectTrack(trackId);
    }
  };

  const scrollToFeatured = () => {
    const el = document.querySelector('#featured');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (!isPlaying) {
      handleTogglePlay();
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0b0e] text-[#f3f0e6] relative flex flex-col font-sans">
      {/* Subtle Analog Vinyl Grain Overlay */}
      <div className="analog-grain" />

      {/* 1. Navigation */}
      <Navbar
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onOpenPlayer={() => setIsPlayerOpen(!isPlayerOpen)}
        isPlayerOpen={isPlayerOpen}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Hero */}
        <Hero
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />

        {/* 3. Featured Track */}
        <FeaturedTrack
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
          progressSec={progressSec}
          onSeek={handleSeek}
        />

        {/* 4. Discover */}
        <Discover
          onSelectCategoryTrack={handleSelectTrack}
        />

        {/* 5. Artists */}
        <Artists
          onSelectTrack={handleSelectTrack}
          currentTrackId={currentTrack.id}
          isPlaying={isPlaying}
        />

        {/* 6. New This Week */}
        <NewReleases
          onPlayAlbumTrack={handlePlayAlbum}
          activeTrackId={currentTrack.id}
          isPlaying={isPlaying}
        />

        {/* 7. Immersive Music section */}
        <ImmersiveSection
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={handleTogglePlay}
        />

        {/* 8. Moods */}
        <Moods
          onSelectMood={handleSelectMood}
          activeMoodId={activeMoodId}
        />

        {/* 9. Final CTA */}
        <FinalCTA
          onStartListening={scrollToFeatured}
          isPlaying={isPlaying}
        />
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* 11. Persistent Music Player */}
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onNextTrack={handleNextTrack}
        onPrevTrack={handlePrevTrack}
        progressSec={progressSec}
        onSeek={handleSeek}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        playlist={TRACKS}
        onSelectTrack={handleSelectTrack}
        isOpen={isPlayerOpen}
        onToggleOpen={() => setIsPlayerOpen(!isPlayerOpen)}
      />
    </div>
  );
}
