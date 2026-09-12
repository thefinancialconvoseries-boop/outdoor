/**
 * Studio-Grade Generative Afro-Lounge Instrumental Sound Engine
 * Uses Web Audio API to produce an authentic, sophisticated 60-second soundtrack:
 * - 0-10s: Ambient coastal anticipation drone, gentle breeze & kalimba bell
 * - 10-20s: Warm electric Rhodes chords, soft organic shakers
 * - 20-38s: Dynamic Afrobeat rhythmic groove, melodic kalimba/marimba riffs, warm bassline
 * - 38-47s: Intimate emotional string pads & reflective acoustic plucks
 * - 47-53s: Minimalist cinematic pause & rhythmic heartbeat pulse
 * - 53-60s: Warm golden-hour resolution chime & ocean tide swell
 */

export class InvitationAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Ocean ambient noise nodes
  private oceanGain: GainNode | null = null;
  private oceanFilter: BiquadFilterNode | null = null;
  private oceanNoise: AudioBufferSourceNode | null = null;

  private isRunning: boolean = false;
  private isMuted: boolean = false;
  private volume: number = 0.8;
  private loopInterval: number | null = null;
  private currentPlaybackSec: number = 0;

  constructor() {
    // Initialized lazily on first user interaction
  }

  public init() {
    if (this.ctx) return;

    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return;

    this.ctx = new AudioCtxClass();

    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.005, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.2, this.ctx.currentTime);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    this.startAmbientOcean();
  }

  private startAmbientOcean() {
    if (!this.ctx || !this.masterGain) return;

    // Generate 5 seconds of soft pink noise for ocean swell
    const bufferSize = this.ctx.sampleRate * 5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.03;
      b6 = white * 0.115926;
    }

    this.oceanNoise = this.ctx.createBufferSource();
    this.oceanNoise.buffer = buffer;
    this.oceanNoise.loop = true;

    this.oceanFilter = this.ctx.createBiquadFilter();
    this.oceanFilter.type = 'lowpass';
    this.oceanFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    this.oceanGain = this.ctx.createGain();
    this.oceanGain.gain.setValueAtTime(0.2, this.ctx.currentTime);

    this.oceanNoise.connect(this.oceanFilter);
    this.oceanFilter.connect(this.oceanGain);
    this.oceanGain.connect(this.masterGain);

    this.oceanNoise.start();

    // Ocean swell LFO simulation
    this.modulateOceanFilter();
  }

  private modulateOceanFilter() {
    if (!this.ctx || !this.oceanFilter) return;
    const now = this.ctx.currentTime;
    // Slow 8-second wave ebb and flow
    this.oceanFilter.frequency.setValueAtTime(260, now);
    this.oceanFilter.frequency.linearRampToValueAtTime(550, now + 4);
    this.oceanFilter.frequency.linearRampToValueAtTime(260, now + 8);
  }

  /**
   * Synthesize single marimba / kalimba bell tone (wooden resonance)
   */
  private playKalimba(freq: number, time: number, velocity: number = 0.35) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Overtone for wooden chime resonance
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 3.01, time);

    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.15 * velocity, time);
    gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.3);

    gain.gain.setValueAtTime(velocity, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 1.2);

    osc.connect(gain);
    osc2.connect(gain2);
    gain2.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc2.start(time);
    osc.stop(time + 1.2);
    osc2.stop(time + 0.4);
  }

  /**
   * Synthesize warm Rhodes-style electric piano chord
   */
  private playRhodesChord(freqs: number[], time: number, duration: number = 2.0, velocity: number = 0.25) {
    if (!this.ctx || !this.masterGain) return;

    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(velocity / freqs.length, time + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(time);
      osc.stop(time + duration);
    });
  }

  /**
   * Deep warm Afrobeat bass note
   */
  private playBass(freq: number, time: number, duration: number = 0.6) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, time);
    filter.frequency.exponentialRampToValueAtTime(80, time + duration);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + duration);
  }

  /**
   * Subtle Afro shaker tap
   */
  private playShaker(time: number, accent: boolean = false) {
    if (!this.ctx || !this.masterGain) return;

    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(6500, time);

    const gain = this.ctx.createGain();
    const vol = accent ? 0.08 : 0.04;
    gain.gain.setValueAtTime(vol, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(time);
    noise.stop(time + 0.05);
  }

  /**
   * Sync soundtrack to playback position (called periodically or on timeupdate)
   */
  public syncPlayback(currentSec: number, isPlaying: boolean) {
    this.currentPlaybackSec = currentSec;

    if (!isPlaying) {
      this.pause();
      return;
    }

    if (!this.isRunning) {
      this.resume();
    }
  }

  public resume() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isRunning = true;
    if (this.loopInterval === null) {
      // Run beat scheduler every 250ms
      this.loopInterval = window.setInterval(() => this.scheduleMusicalEvents(), 250);
    }
  }

  public pause() {
    this.isRunning = false;
    if (this.loopInterval !== null) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
  }

  private lastScheduledBeat: number = -1;

  private scheduleMusicalEvents() {
    if (!this.ctx || !this.isRunning) return;

    const sec = this.currentPlaybackSec;
    // Measure at ~98 BPM => 1 beat every 0.612s
    const beatIndex = Math.floor(sec / 0.612);

    if (beatIndex === this.lastScheduledBeat) return;
    this.lastScheduledBeat = beatIndex;

    const now = this.ctx.currentTime;
    const barBeat = beatIndex % 4;

    // 0 - 10s: THE HOOK & EVENT REVEAL
    // Atmospheric ambient drone, subtle oceanic calm and high kalimba droplet
    if (sec < 10) {
      if (sec % 3 < 0.6) {
        this.modulateOceanFilter();
      }
      if (barBeat === 0) {
        // High crystalline bell
        const bellNotes = [587.33, 880, 1174.66, 659.25]; // D5, A5, D6, E5
        const note = bellNotes[Math.floor(sec / 2.5) % bellNotes.length];
        this.playKalimba(note, now, 0.2);
      }
      return;
    }

    // 10 - 20s: THE PURPOSE
    // Introducing warm Rhodes chords & light shaker
    if (sec >= 10 && sec < 20) {
      // Soft shaker on every beat
      this.playShaker(now, barBeat === 0);

      // Chords every 4 beats
      if (barBeat === 0) {
        const chordIndex = Math.floor((sec - 10) / 2.5) % 4;
        const chords = [
          [293.66, 349.23, 440.0, 523.25], // Dm7 (D4, F4, A4, C5)
          [233.08, 293.66, 349.23, 440.0], // Bbmaj7 (Bb3, D4, F4, A4)
          [196.0, 293.66, 349.23, 440.0],  // Gm7 (G3, D4, F4, A4)
          [220.0, 293.66, 329.63, 440.0],  // A7sus (A3, D4, E4, A4)
        ];
        this.playRhodesChord(chords[chordIndex], now, 2.2, 0.28);
        this.playBass(chords[chordIndex][0] / 2, now, 1.2);
      }

      if (barBeat === 2) {
        this.playKalimba(587.33, now + 0.1, 0.15); // subtle motif
      }
      return;
    }

    // 20 - 38s: THE EXPERIENCE
    // Uplifting Afrobeat syncopation, marimba riffs, rhythmic shaker
    if (sec >= 20 && sec < 38) {
      this.playShaker(now, barBeat === 0 || barBeat === 2);
      this.playShaker(now + 0.3, false); // 8th note shaker swing

      // Syncopated bassline
      const bassNotes = [73.42, 73.42, 98.0, 110.0, 82.41]; // D2, G2, A2, E2
      const bNote = bassNotes[barBeat % bassNotes.length];
      this.playBass(bNote, now, 0.4);

      // Melodic kalimba / marimba interplay
      const scale = [440, 523.25, 587.33, 659.25, 783.99, 880];
      const melody1 = scale[(beatIndex * 2) % scale.length];
      const melody2 = scale[(beatIndex * 3 + 1) % scale.length];

      this.playKalimba(melody1, now + 0.15, 0.25);
      if (barBeat % 2 === 1) {
        this.playKalimba(melody2, now + 0.45, 0.2);
      }

      // Warm background chord support
      if (barBeat === 0) {
        this.playRhodesChord([293.66, 440.0, 523.25, 659.25], now, 1.8, 0.2);
      }
      return;
    }

    // 38 - 47s: THE HUMAN MOMENT
    // Soften pace, emotional, aspirational string and kalimba drops
    if (sec >= 38 && sec < 47) {
      if (barBeat === 0) {
        // Intimate Fmaj9 / Dm9
        const chords = [
          [349.23, 440.0, 523.25, 659.25], // Fmaj7
          [293.66, 349.23, 440.0, 587.33], // Dm9
          [392.0, 493.88, 587.33, 698.46],  // G9
        ];
        const chord = chords[Math.floor((sec - 38) / 3) % chords.length];
        this.playRhodesChord(chord, now, 2.8, 0.32);
        this.playBass(chord[0] / 4, now, 1.5);
      }

      // Gentle kalimba raindrops
      const gentleKalimba = [659.25, 783.99, 880, 1046.5];
      const note = gentleKalimba[beatIndex % gentleKalimba.length];
      this.playKalimba(note, now + 0.2, 0.18);
      return;
    }

    // 47 - 53s: EXCLUSIVITY
    // Clean, minimalist, clock pulse emphasizing "STRICTLY BY INVITATION"
    if (sec >= 47 && sec < 53) {
      // Subdued heartbeat pulse
      if (barBeat === 0 || barBeat === 2) {
        this.playBass(55.0, now, 0.25); // Deep A1
        this.playKalimba(440, now, 0.08); // Pristine click
      }
      return;
    }

    // 53 - 60s: FINAL INVITATION
    // Warm golden hour resolution, gentle African guitar arpeggios & ocean wind
    if (sec >= 53) {
      if (barBeat === 0) {
        // Triumphant D major / D sus resolution (hopeful, inviting)
        this.playRhodesChord([293.66, 369.99, 440.0, 587.33], now, 3.2, 0.35); // D major
        this.playBass(73.42, now, 2.0);
        this.modulateOceanFilter();
      }

      const goldenNotes = [587.33, 739.99, 880, 1174.66];
      this.playKalimba(goldenNotes[beatIndex % goldenNotes.length], now + 0.15, 0.22);
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getAnalyserData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(16);
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);
    return data;
  }
}
