// Web Audio API Continuous Ambient Automotive Soundtrack & Cockpit Engine
// Zero external network dependencies, infinite smooth loop, dynamic speed modulation.

class CockpitAudioManager {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscSub: OscillatorNode | null = null;
  private oscHarmonic: OscillatorNode | null = null;
  private oscPad1: OscillatorNode | null = null;
  private oscPad2: OscillatorNode | null = null;
  private filterLow: BiquadFilterNode | null = null;
  private filterPad: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private volume: number = 0.35;

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  public subscribe(cb: (playing: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public async start() {
    try {
      this.initContext();
      if (!this.ctx) return;

      if (this.ctx.state === "suspended") {
        await this.ctx.resume();
      }

      if (this.isPlaying) return;

      const now = this.ctx.currentTime;

      // 1. Master Output Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, now);
      this.masterGain.gain.exponentialRampToValueAtTime(this.volume, now + 1.2);
      this.masterGain.connect(this.ctx.destination);

      // 2. Electric Powertrain Sub-Hum (55Hz / A1)
      this.oscSub = this.ctx.createOscillator();
      this.oscSub.type = "sine";
      this.oscSub.frequency.setValueAtTime(55, now);

      this.oscHarmonic = this.ctx.createOscillator();
      this.oscHarmonic.type = "triangle";
      this.oscHarmonic.frequency.setValueAtTime(110, now);

      this.filterLow = this.ctx.createBiquadFilter();
      this.filterLow.type = "lowpass";
      this.filterLow.frequency.setValueAtTime(180, now);
      this.filterLow.Q.setValueAtTime(2.0, now);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.45, now);

      this.oscSub.connect(this.filterLow);
      this.oscHarmonic.connect(this.filterLow);
      this.filterLow.connect(subGain);
      subGain.connect(this.masterGain);

      // 3. Ethereal Scandinavian Automotive Chord Drone (Chords: A2 + E3 + A3)
      this.oscPad1 = this.ctx.createOscillator();
      this.oscPad1.type = "sine";
      this.oscPad1.frequency.setValueAtTime(164.81, now); // E3

      this.oscPad2 = this.ctx.createOscillator();
      this.oscPad2.type = "triangle";
      this.oscPad2.frequency.setValueAtTime(220.0, now); // A3

      this.filterPad = this.ctx.createBiquadFilter();
      this.filterPad.type = "bandpass";
      this.filterPad.frequency.setValueAtTime(320, now);
      this.filterPad.Q.setValueAtTime(3.5, now);

      const padGain = this.ctx.createGain();
      padGain.gain.setValueAtTime(0.18, now);

      this.oscPad1.connect(this.filterPad);
      this.oscPad2.connect(this.filterPad);
      this.filterPad.connect(padGain);
      padGain.connect(this.masterGain);

      // 4. Slow breathing modulation LFO (0.12 Hz = 8 sec breathing wave)
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = "sine";
      this.lfo.frequency.setValueAtTime(0.12, now);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(40, now);

      this.lfo.connect(lfoGain);
      lfoGain.connect(this.filterPad.frequency);

      // 5. Soft aerodynamic pink noise cushion
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.05;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(240, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.08, now);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      // Start all sound nodes
      this.oscSub.start(now);
      this.oscHarmonic.start(now);
      this.oscPad1.start(now);
      this.oscPad2.start(now);
      this.lfo.start(now);
      this.noiseNode.start(now);

      this.isPlaying = true;
      this.notify();
    } catch (e) {
      console.warn("Failed to start cockpit audio:", e);
      this.isPlaying = false;
      this.notify();
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      setTimeout(() => {
        try {
          this.oscSub?.stop();
          this.oscHarmonic?.stop();
          this.oscPad1?.stop();
          this.oscPad2?.stop();
          this.lfo?.stop();
          this.noiseNode?.stop();

          this.oscSub?.disconnect();
          this.oscHarmonic?.disconnect();
          this.oscPad1?.disconnect();
          this.oscPad2?.disconnect();
          this.lfo?.disconnect();
          this.noiseNode?.disconnect();
          this.masterGain?.disconnect();
        } catch {}

        this.isPlaying = false;
        this.notify();
      }, 650);
    } catch {
      this.isPlaying = false;
      this.notify();
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  // Modulate frequency based on simulated telemetry speed (0 - 250 km/h)
  public updateSpeed(speedKmH: number) {
    if (!this.ctx || !this.isPlaying || !this.oscSub || !this.filterLow) return;
    try {
      const clampedSpeed = Math.max(0, Math.min(260, speedKmH));
      const targetFreq = 55 + (clampedSpeed / 260) * 85; // 55Hz to 140Hz
      const targetCutoff = 180 + (clampedSpeed / 260) * 400; // 180Hz to 580Hz

      const now = this.ctx.currentTime;
      this.oscSub.frequency.setTargetAtTime(targetFreq, now, 0.2);
      this.filterLow.frequency.setTargetAtTime(targetCutoff, now, 0.2);
    } catch {}
  }

  // Play a short UI acoustic feedback chirp (Lock/Unlock, Mode, Fault)
  public playFeedback(type: "chirp" | "lock" | "warning" | "chime") {
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      gain.connect(this.ctx.destination);
      osc.connect(gain);

      if (type === "lock") {
        // High-tech solenoid dual-chirp
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === "chime") {
        // Soft Nordic glass harmonic
        osc.type = "triangle";
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1320, now + 0.08);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === "warning") {
        // Attention tone
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(370, now + 0.12);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {}
  }
}

export const cockpitAudio = new CockpitAudioManager();
