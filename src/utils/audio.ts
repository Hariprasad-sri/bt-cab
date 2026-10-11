// Web Audio API Procedural Sound Engine for BT CAB
// High-fidelity luxury engine humming, chime on click, and mode switches without external file dependencies.

class SoundEngine {
  private ctx: AudioContext | null = null;
  private engineOsc: OscillatorNode | null = null;
  private engineGain: GainNode | null = null;
  private subOsc: OscillatorNode | null = null;
  private isMuted: boolean = true;
  private isRunning: boolean = false;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;

    if (!this.isMuted) {
      this.startEngineHum();
      this.playChime(660, 0.15);
    } else {
      this.stopEngineHum();
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public playChime(freq = 520, duration = 0.12) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio chime error:', e);
    }
  }

  public playModeSwitch() {
    if (this.isMuted) return;
    this.playChime(440, 0.08);
    setTimeout(() => this.playChime(880, 0.14), 60);
  }

  public setSpeedPitch(speedFactor: number) {
    if (!this.engineOsc || !this.ctx || this.isMuted) return;
    const baseFreq = 42 + speedFactor * 35;
    this.engineOsc.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.2);
    if (this.subOsc) {
      this.subOsc.frequency.setTargetAtTime(baseFreq * 0.5, this.ctx.currentTime, 0.2);
    }
  }

  private startEngineHum() {
    if (this.isRunning || !this.ctx) return;
    try {
      this.engineOsc = this.ctx.createOscillator();
      this.subOsc = this.ctx.createOscillator();
      this.engineGain = this.ctx.createGain();

      this.engineOsc.type = 'sawtooth';
      this.engineOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

      this.subOsc.type = 'sine';
      this.subOsc.frequency.setValueAtTime(22.5, this.ctx.currentTime);

      // Low pass filter for deep, muffled luxury V12 / electric purr
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);

      this.engineGain.gain.setValueAtTime(0.02, this.ctx.currentTime);

      this.engineOsc.connect(filter);
      this.subOsc.connect(filter);
      filter.connect(this.engineGain);
      this.engineGain.connect(this.ctx.destination);

      this.engineOsc.start();
      this.subOsc.start();
      this.isRunning = true;
    } catch (e) {
      console.warn('Engine hum error:', e);
    }
  }

  private stopEngineHum() {
    if (!this.isRunning || !this.ctx) return;
    try {
      if (this.engineGain) {
        this.engineGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.1);
      }
      setTimeout(() => {
        if (this.engineOsc) {
          this.engineOsc.stop();
          this.engineOsc.disconnect();
          this.engineOsc = null;
        }
        if (this.subOsc) {
          this.subOsc.stop();
          this.subOsc.disconnect();
          this.subOsc = null;
        }
        this.isRunning = false;
      }, 150);
    } catch (e) {
      console.warn('Stop engine hum error:', e);
    }
  }
}

export const soundEngine = new SoundEngine();
