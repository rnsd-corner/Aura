import { useState } from 'react';
import { Menu, X, Volume2, Disc3 } from 'lucide-react';
import { Track } from '../types';

interface NavbarProps {
  currentTrack: Track;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onOpenPlayer: () => void;
  isPlayerOpen: boolean;
}

export function Navbar({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onOpenPlayer,
  isPlayerOpen,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'DISCOVER', href: '#discover' },
    { label: 'ARTISTS', href: '#artists' },
    { label: 'ALBUMS', href: '#albums' },
    { label: 'MOODS', href: '#moods' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0c0b0e]/95 backdrop-blur-md hairline-b">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-baseline space-x-3">
            <a
              href="#"
              className="font-serif text-2xl md:text-3xl font-light tracking-tight text-[#f3f0e6] hover:text-[#ff5c28] transition-colors"
              id="brand-logo"
            >
              AURA
            </a>
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#78757d] hidden sm:inline-block">
              ED. 2026 // SONIC ARCHIVE
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="font-mono text-xs tracking-[0.14em] text-[#dedad0] hover:text-[#ff5c28] transition-colors cursor-pointer py-1 relative group"
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#ff5c28] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right Action: Open Player / Now Playing preview */}
          <div className="hidden md:flex items-center space-x-5">
            {isPlaying && (
              <div className="flex items-center space-x-2 font-mono text-[11px] text-[#ff5c28] tracking-wider pr-3 border-r border-[#232128]">
                <span className="inline-block w-1.5 h-1.5 bg-[#ff5c28] animate-pulse rounded-full" />
                <span className="truncate max-w-[120px] text-[#dedad0]">{currentTrack.title}</span>
                <div className="flex items-end space-x-[2px] h-3">
                  <span className="w-[2px] bg-[#ff5c28] animate-[bounce_1s_infinite_100ms] h-2" />
                  <span className="w-[2px] bg-[#ff5c28] animate-[bounce_1s_infinite_300ms] h-3" />
                  <span className="w-[2px] bg-[#ff5c28] animate-[bounce_1s_infinite_200ms] h-1.5" />
                </div>
              </div>
            )}

            <button
              onClick={onOpenPlayer}
              className={`font-mono text-xs tracking-[0.12em] px-4 py-2 border transition-all duration-200 cursor-pointer flex items-center space-x-2 ${
                isPlayerOpen
                  ? 'border-[#ff5c28] text-[#ff5c28] bg-[#18161d]'
                  : 'border-[#232128] text-[#f3f0e6] hover:border-[#dedad0] hover:bg-[#121116]'
              }`}
              id="open-player-button"
            >
              <Disc3 className={`w-3.5 h-3.5 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>{isPlayerOpen ? 'PLAYER ACTIVE' : 'OPEN PLAYER'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={onTogglePlay}
              className="p-2 text-[#dedad0] hover:text-[#ff5c28] border border-[#232128]"
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
            >
              <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#ff5c28]' : ''}`} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#f3f0e6] border border-[#232128]"
              aria-label="Toggle navigation menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c0b0e] flex flex-col justify-between p-8 md:hidden">
          <div className="flex justify-between items-center hairline-b pb-6">
            <span className="font-serif text-2xl tracking-tight text-[#f3f0e6]">AURA</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 border border-[#232128] text-[#f3f0e6]"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col space-y-8 my-auto">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className="text-left font-serif text-3xl text-[#f3f0e6] hover:text-[#ff5c28] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hairline-t pt-6 flex flex-col space-y-4 font-mono text-xs text-[#78757d]">
            <div className="flex justify-between items-center">
              <span>ACTIVE RELEASE:</span>
              <span className="text-[#dedad0]">{currentTrack.title}</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPlayer();
              }}
              className="w-full py-3 bg-[#ff5c28] text-[#0c0b0e] font-mono font-semibold tracking-widest text-center"
            >
              OPEN PLAYER
            </button>
          </div>
        </div>
      )}
    </>
  );
}
