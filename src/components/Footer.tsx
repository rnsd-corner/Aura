export function Footer() {
  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full max-w-[1440px] mx-auto px-6 md:px-10 pt-16 pb-32 md:pb-36 bg-[#0c0b0e]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-16 hairline-b">
        
        {/* Brand & Mission Statement */}
        <div className="md:col-span-5 flex flex-col justify-between space-y-6">
          <div>
            <span className="font-serif text-3xl md:text-4xl font-light text-[#f3f0e6] tracking-tight block mb-3">
              AURA
            </span>
            <p className="font-mono text-xs tracking-widest text-[#78757d] uppercase max-w-[280px]">
              ANALOG ARCHIVES & DIGITAL BROADCASTS
            </p>
          </div>

          <div className="font-mono text-[11px] text-[#dedad0] tracking-wider">
            CURATED FOR CURIOUS LISTENERS.
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-4 flex flex-col space-y-3 font-mono text-xs tracking-[0.14em]">
          <span className="text-[10px] text-[#78757d] uppercase tracking-[0.2em] mb-2 block">
            INDEX
          </span>
          {['DISCOVER', 'ARTISTS', 'ALBUMS', 'MOODS'].map((link) => (
            <button
              key={link}
              onClick={() => handleScroll(`#${link.toLowerCase()}`)}
              className="text-left text-[#dedad0] hover:text-[#ff5c28] transition-colors cursor-pointer py-0.5"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Social Broadcasts */}
        <div className="md:col-span-3 flex flex-col space-y-3 font-mono text-xs tracking-[0.14em]">
          <span className="text-[10px] text-[#78757d] uppercase tracking-[0.2em] mb-2 block">
            TRANSMISSIONS
          </span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dedad0] hover:text-[#ff5c28] transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dedad0] hover:text-[#ff5c28] transition-colors"
          >
            YOUTUBE
          </a>
          <a
            href="https://soundcloud.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#dedad0] hover:text-[#ff5c28] transition-colors"
          >
            SOUNDCLOUD
          </a>
        </div>
      </div>

      {/* Copyright & Technical Stamp */}
      <div className="pt-8 flex flex-col sm:flex-row justify-between items-center font-mono text-[11px] text-[#78757d] gap-4">
        <div>© 2026 AURA. ALL RIGHTS RESERVED.</div>
        <div className="flex items-center space-x-4">
          <span>MASTERED AT 96.0 kHz</span>
          <span>•</span>
          <span className="text-[#dedad0]">INDEPENDENT SOUND</span>
        </div>
      </div>
    </footer>
  );
}
