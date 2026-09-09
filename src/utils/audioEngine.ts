/**
 * AURA Analog Web Audio Synthesizer Engine
 * Generates rich, warm analog ambient musical soundscapes (pads, sub-bass, vinyl grain)
 * and provides real-time frequency analysis for responsive waveforms.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private isRunning: boolean = false;
  private timerId: number | null = null;
  private chordIndex: number = 0;
  private noiseNode: AudioBufferSourceNode | null = null;
  private activeOscs: (OscillatorNode | GainNode)[] = [];
  private volume: number = 0.8;

  // Chord frequencies (Hz) for atmospheric progression in D minor
  private chords: number[][] = [
    [146.83, 220.0, 261.63, 329.63], // Dm9
    [196.0, 293.66, 349.23, 440.0],  // Gm7
    [116.54, 174.61, 233.08, 293.66], // Bbmaj7
    [110.0, 164.81, 220.0, 261.63],  // Am7
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.85;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Generate subtle vinyl/tape noise texture
  private startVinylNoise() {
    if (!this.ctx || !this.masterGain) return;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      // Pink/brown noise approximation
      data[i] = (Math.random() * 2 - 1) * 0.015;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 1200;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.value = 0.08;

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.masterGain);
    noise.start();
    this.noiseNode = noise;
  }

  // Play a warm analog synth chord with slow envelope
  private playChord() {
    if (!this.ctx || !this.masterGain || !this.isRunning) return;

    const chord = this.chords[this.chordIndex % this.chords.length];
    this.chordIndex++;

    const chordGain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    const attack = 1.5;
    const sustainTime = 4.0;
    const release = 2.0;

    chordGain.gain.setValueAtTime(0, now);
    chordGain.gain.linearRampToValueAtTime(0.18, now + attack);
    chordGain.gain.setValueAtTime(0.18, now + attack + sustainTime);
    chordGain.gain.linearRampToValueAtTime(0, now + attack + sustainTime + release);

    // Filter for analog warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.exponentialRampToValueAtTime(1400, now + attack);
    filter.frequency.exponentialRampToValueAtTime(500, now + attack + sustainTime + release);

    filter.connect(chordGain);
    chordGain.connect(this.masterGain);

    chord.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      // Slight detune for analog chorus thickness
      osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.detune.setValueAtTime((Math.random() - 0.5) * 12, now);
      osc.connect(filter);
      osc.start(now);
      osc.stop(now + attack + sustainTime + release + 0.1);
    });

    // Sub-bass root
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(chord[0] / 2, now);
    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.linearRampToValueAtTime(0.24, now + attack * 0.8);
    subGain.gain.linearRampToValueAtTime(0, now + attack + sustainTime + release);
    subOsc.connect(subGain);
    subGain.connect(this.masterGain);
    subOsc.start(now);
    subOsc.stop(now + attack + sustainTime + release + 0.1);
  }

  public play() {
    try {
      this.initContext();
      this.isRunning = true;
      this.startVinylNoise();
      this.playChord();

      // Schedule next chord every 6 seconds
      this.timerId = window.setInterval(() => {
        if (this.isRunning) {
          this.playChord();
        }
      }, 5800);
    } catch {
      // Graceful fallback if Web Audio is restricted
      this.isRunning = true;
    }
  }

  public pause() {
    this.isRunning = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // ignore
      }
      this.noiseNode = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public getFrequencies(): Uint8Array {
    if (!this.analyser) {
      // Fallback synthetic subtle movement
      const arr = new Uint8Array(24);
      if (this.isRunning) {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(40 + Math.sin(Date.now() * 0.005 + i * 0.5) * 35 + Math.random() * 20);
        }
      }
      return arr;
    }

    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }

  public isAudioRunning(): boolean {
    return this.isRunning;
  }
}

export const audioEngine = new AudioEngine();
