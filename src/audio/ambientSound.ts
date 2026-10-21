class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;

  private notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]; // C Major Pentatonic chords

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
  }

  public playGentleChime(freqMultiplier = 1) {
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      const note = this.notes[Math.floor(Math.random() * this.notes.length)] * freqMultiplier;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, this.ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.2);

      osc.connect(filter);
      filter.connect(gain);
      if (this.masterGain) {
        gain.connect(this.masterGain);
      }

      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 2.3);
    } catch {
      // Graceful fallback
    }
  }

  public playHarmonicChord() {
    if (!this.ctx || this.isMuted) return;
    const chord = [261.63, 329.63, 392.00, 523.25];
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.03, this.ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.0);
        osc.connect(gain);
        if (this.masterGain) gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 3.2);
      }, idx * 120);
    });
  }

  public playPaperRustle() {
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    try {
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
      noise.connect(filter);
      filter.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);
      noise.start();
    } catch {
      // Audio is non-blocking
    }
  }

  public playTimeReverseSwoosh() {
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 1.2);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2200, this.ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.05, this.ctx.currentTime + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.4);
      osc.connect(filter);
      filter.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 1.45);
    } catch {
      // Audio is non-blocking
    }
  }

  public playHeartPulse() {
    if (!this.ctx || this.isMuted) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(130.81, this.ctx.currentTime); // C3
      osc.frequency.exponentialRampToValueAtTime(65.41, this.ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
      osc.connect(gain);
      if (this.masterGain) gain.connect(this.masterGain);
      osc.start(this.ctx.currentTime);
      osc.stop(this.ctx.currentTime + 0.55);
    } catch {
      // Audio is non-blocking
    }
  }

  public playDoorwayChime() {
    if (!this.ctx || this.isMuted) return;
    const chord = [329.63, 392.00, 523.25, 659.25, 783.99]; // E minor / G major ethereal chord
    chord.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || this.isMuted) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 3.8);
        osc.connect(gain);
        if (this.masterGain) gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 4.0);
      }, idx * 100);
    });
  }

  public startAmbience() {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;

    // Trigger initial chime
    this.playHarmonicChord();

    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying && !this.isMuted) {
        this.playGentleChime(Math.random() > 0.5 ? 1 : 1.5);
      }
    }, 3800);
  }

  public stopAmbience() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.08, this.ctx.currentTime);
    }
    if (!this.isMuted && !this.isPlaying) {
      this.startAmbience();
    }
    return !this.isMuted;
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      isMuted: this.isMuted,
    };
  }
}

export const ambientSound = new AmbientSoundManager();
