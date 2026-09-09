import { ArrowUpRight, Compass } from 'lucide-react';
import { DISCOVER_CATEGORIES } from '../data/musicData';

interface DiscoverProps {
  onSelectCategoryTrack?: (trackId: string) => void;
}

export function Discover({ onSelectCategoryTrack }: DiscoverProps) {
  const handleCategoryClick = (categoryId: string) => {
    // Map category to a relevant track
    const categoryTrackMap: Record<string, string> = {
      'late-night': 'after-midnight',
      focus: 'monolith-echo',
      dreamy: 'blue-hour',
      energy: 'low-signal',
      soul: 'after-midnight',
      discovery: 'static-dreams',
    };

    const trackId = categoryTrackMap[categoryId];
    if (trackId && onSelectCategoryTrack) {
      onSelectCategoryTrack(trackId);
    }
  };

  return (
    <section id="discover" className="w-full max-w-[1440px] mx-auto px-6 md:px-10 py-20 md:py-28 hairline-b">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 hairline-b">
        <div>
          <div className="flex items-center space-x-3 mb-2 font-mono text-[10px] tracking-[0.16em] text-[#78757d]">
            <Compass className="w-3.5 h-3.5 text-[#ff5c28]" />
            <span>CURATION ARCHIVES // VOL. 04</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#f3f0e6] font-light tracking-tight">
            FIND YOUR FREQUENCY
          </h2>
        </div>
        <p className="mt-4 md:mt-0 font-sans text-sm text-[#dedad0] max-w-[380px] font-light">
          Six distinct sonic spectrums calibrated for nocturnal hours, cognitive focus, and emotional immersion.
        </p>
      </div>

      {/* Asymmetric Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. LATE NIGHT (Oversized 2-column editorial tile with atmospheric photography) */}
        <div
          onClick={() => handleCategoryClick('late-night')}
          className="col-span-1 md:col-span-2 relative bg-[#121116] border border-[#232128] overflow-hidden group cursor-pointer transition-all duration-300 hover:border-[#ff5c28]"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px]">
            <div className="md:col-span-6 p-8 md:p-10 flex flex-col justify-between z-10">
              <div>
                <span className="font-mono text-[10px] tracking-[0.16em] text-[#ff5c28] block mb-3">
                  FREQUENCY 01 // 01:00 — 05:00
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#f3f0e6] font-light mb-4">
                  LATE NIGHT
                </h3>
                <p className="font-sans text-sm text-[#dedad0] leading-relaxed max-w-[320px] font-light">
                  Deep analog sub-harmonics, muted Rhodes chords, and solitary room acoustics for midnight listening.
                </p>
              </div>

              <div className="pt-6 font-mono text-xs text-[#78757d] group-hover:text-[#ff5c28] flex items-center space-x-2 transition-colors">
                <span>TUNE TO FREQUENCY</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <div className="md:col-span-6 relative overflow-hidden bg-[#0c0b0e] h-[220px] md:h-auto">
              <img
                src={DISCOVER_CATEGORIES[0].imageUrl}
                alt="Late Night frequency"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#121116] via-transparent to-transparent hidden md:block" />
            </div>
          </div>
        </div>

        {/* 2. FOCUS (Pure Typographic & Monospaced Technical Unit) */}
        <div
          onClick={() => handleCategoryClick('focus')}
          className="col-span-1 bg-[#121116] border border-[#232128] p-8 flex flex-col justify-between group cursor-pointer hover:border-[#d49a3d] transition-all"
        >
          <div>
            <div className="flex justify-between items-center font-mono text-[10px] tracking-[0.16em] text-[#d49a3d] mb-6">
              <span>FREQUENCY 02</span>
              <span>BPM: 70–88</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#f3f0e6] font-light mb-4">
              FOCUS
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-[#dedad0] leading-relaxed font-light mb-6">
              Non-vocal modular cycles, tape delays, and generative pulse patterns to deepen cognitive flow.
            </p>

            {/* Technical VU Meter / Grid representation */}
            <div className="py-3 px-4 bg-[#0c0b0e] border border-[#232128] font-mono text-[10px] text-[#78757d] space-y-1.5">
              <div className="flex justify-between">
                <span>TAPE GRAIN:</span>
                <span className="text-[#dedad0]">4-TRACK ANALOG</span>
              </div>
              <div className="flex justify-between">
                <span>DISSONANCE:</span>
                <span className="text-[#dedad0]">0.02% THD</span>
              </div>
              <div className="flex justify-between">
                <span>FILTER:</span>
                <span className="text-[#d49a3d]">24dB LADDER</span>
              </div>
            </div>
          </div>

          <div className="pt-6 font-mono text-xs text-[#78757d] group-hover:text-[#d49a3d] flex items-center space-x-2 transition-colors">
            <span>ENGAGE COGNITIVE PULSE</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* 3. DREAMY (Textured Atmospheric Vignette) */}
        <div
          onClick={() => handleCategoryClick('dreamy')}
          className="col-span-1 bg-[#121116] border border-[#232128] p-8 flex flex-col justify-between group cursor-pointer hover:border-[#dedad0] transition-all relative overflow-hidden"
        >
          <div className="relative z-10">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#78757d] block mb-4">
              FREQUENCY 03 // ETHEREAL
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#f3f0e6] font-light mb-3">
              DREAMY
            </h3>
            <p className="font-serif italic text-[#dedad0] text-sm leading-relaxed mb-4">
              "Melodies that linger in the space between waking and sleep."
            </p>
            <p className="font-sans text-xs text-[#78757d]">
              Reverb-drenched guitar lines, celestial vocals, and tape saturation.
            </p>
          </div>

          <div className="pt-6 font-mono text-xs text-[#78757d] group-hover:text-[#f3f0e6] flex items-center space-x-2 transition-colors z-10">
            <span>LISTEN TO DRIFT</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* 4. ENERGY (High-Contrast Red Wash Live Concert Crop) */}
        <div
          onClick={() => handleCategoryClick('energy')}
          className="col-span-1 md:col-span-2 relative bg-[#121116] border border-[#232128] overflow-hidden group cursor-pointer hover:border-[#ff5c28] transition-all"
        >
          <div className="relative min-h-[320px] p-8 md:p-10 flex flex-col justify-between">
            {/* Background live photo */}
            <img
              src={DISCOVER_CATEGORIES[3].imageUrl}
              alt="Live Stage Energy"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-40 group-hover:opacity-60 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0b0e] via-[#0c0b0e]/70 to-transparent" />

            <div className="relative z-10">
              <span className="font-mono text-[10px] tracking-[0.18em] text-[#ff5c28] block mb-2">
                FREQUENCY 04 // 128 BPM TRANSIENTS
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl text-[#f3f0e6] font-light">
                ENERGY
              </h3>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <p className="font-sans text-xs sm:text-sm text-[#dedad0] max-w-[400px] font-light">
                Overdriven rhythm boxes, live basement sweat, and kinetic post-punk distortion.
              </p>
              <div className="font-mono text-xs text-[#ff5c28] flex items-center space-x-2">
                <span>STREAM RAW DESK MIX</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* 5. SOUL (Warm Studio Intimacy) */}
        <div
          onClick={() => handleCategoryClick('soul')}
          className="col-span-1 bg-[#121116] border border-[#232128] p-8 flex flex-col justify-between group cursor-pointer hover:border-[#ff5c28] transition-all"
        >
          <div>
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#78757d] block mb-4">
              FREQUENCY 05 // ANALOG WARMTH
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#f3f0e6] font-light mb-3">
              SOUL
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#dedad0] font-light leading-relaxed mb-6">
              Close-mic vocals, unquantized rhythms, and tube preamp character straight to tape.
            </p>
          </div>

          <div className="pt-6 font-mono text-xs text-[#78757d] group-hover:text-[#ff5c28] flex items-center space-x-2 transition-colors">
            <span>EXPLORE ACOUSTIC SOUL</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* 6. DISCOVERY (Archival Vault & Limited Editions) */}
        <div
          onClick={() => handleCategoryClick('discovery')}
          className="col-span-1 md:col-span-2 lg:col-span-2 bg-[#121116] border border-[#232128] p-8 flex flex-col justify-between group cursor-pointer hover:border-[#ff5c28] transition-all"
        >
          <div>
            <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.16em] text-[#78757d] mb-4">
              <span>FREQUENCY 06 // ARCHIVAL VAULT</span>
              <span className="text-[#ff5c28]">LIMITED TO 500 PRESSINGS</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#f3f0e6] font-light mb-3">
              DISCOVERY
            </h3>

            <p className="font-sans text-xs sm:text-sm text-[#dedad0] font-light max-w-[500px] leading-relaxed mb-4">
              Rare lathe cuts, limited test pressings, and acoustic documents unearthed from independent artist archives worldwide.
            </p>
          </div>

          <div className="pt-4 font-mono text-xs text-[#78757d] group-hover:text-[#ff5c28] flex items-center space-x-2 transition-colors">
            <span>ACCESS CATALOG ARCHIVES</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </section>
  );
}
