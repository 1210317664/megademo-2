import type { DemoModule, DemoOptions } from './interfaces';
import { createFramebuffer, createSolidTexture } from './utils/texture';
import { AudioSystem } from './audio';

export class MegaDemoPlayer {
  private gl: WebGLRenderingContext;
  private canvas: HTMLCanvasElement;
  private audio = new AudioSystem();
  private logicalWidth = 320;
  private logicalHeight = 200;
  private currentDemo: DemoModule | null = null;
  private nextDemo: DemoModule | null = null;
  private fbo?: ReturnType<typeof createFramebuffer>;
  private currentTexture?: WebGLTexture;
  private lastTime = 0;
  private running = false;
  private uiVisible = true;
  private testMode = false;
  private demoList = ['plasma', 'starfield', 'copper', 'wave', 'bob'];
  private currentDemoId = 'plasma';
  private autoSwitchTimer = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) throw new Error('WebGL1 not available');
    this.gl = gl;
    this.resize();
    this.gl.clearColor(0, 0, 0, 1);
    this.gl.disable(this.gl.DEPTH_TEST);
  }

  async init() {
    await this.audio.init();
    this.running = true;
    this.lastTime = performance.now();
    this.autoSwitchTimer = 0;
    await this.loadDemo(this.pickRandomDemo());
    this.loop();
  }

  private loop = () => {
    if (!this.running) return;
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    this.update(dt);
    this.render();
    requestAnimationFrame(this.loop);
  };

  private update(dt: number) {
    this.currentDemo?.update(dt);
    if (!this.testMode) {
      this.autoSwitchTimer += dt;
      if (this.autoSwitchTimer >= 6) {
        this.autoSwitchTimer = 0;
        void this.loadDemo(this.pickRandomDemo());
      }
    }
  }

  private render() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.currentDemo?.render();
  }

  resize() {
    const ratio = Math.min(window.innerWidth / this.logicalWidth, window.innerHeight / this.logicalHeight);
    const w = Math.floor(this.logicalWidth * ratio);
    const h = Math.floor(this.logicalHeight * ratio);
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;
    this.currentDemo?.resize(w, h);
  }

  async loadDemo(id: string) {
    this.currentDemoId = id;
    const demo = await this.createDemo(id);
    this.currentDemo?.dispose();
    this.currentDemo = demo;
    const options: DemoOptions = {
      id,
      variantId: 0,
      logicalWidth: this.logicalWidth,
      logicalHeight: this.logicalHeight,
      textures: {},
      audioTrackId: 'ambient',
      bpm: 120,
      beatOffsetSec: 0,
      params: {},
    };
    this.currentDemo.init(this.gl, options);
    this.currentDemo.resize(this.canvas.width, this.canvas.height);
    this.updateStatus();
  }

  private async createDemo(id: string): Promise<DemoModule> {
    switch (id) {
      case 'plasma':
        const { PlasmaDemo } = await import('../demos/demo01_plasma/plasma');
        return new PlasmaDemo();
      case 'starfield':
        const { StarfieldDemo } = await import('../demos/demo02_starfield/starfield');
        return new StarfieldDemo();
      case 'copper':
        const { CopperBarsDemo } = await import('../demos/demo03_copperbars/copperbars');
        return new CopperBarsDemo();
      case 'wave':
        const { WaveDemo } = await import('../demos/demo05_wave/wave');
        return new WaveDemo();
      case 'bob':
        const { BobDemo } = await import('../demos/demo06_bob/bob');
        return new BobDemo();
      default:
        const { PhotoMosaicDemo } = await import('../demos/demo04_photomosaic/photomosaic');
        return new PhotoMosaicDemo();
    }
  }

  toggleUI() {
    this.uiVisible = !this.uiVisible;
    document.getElementById('ui')?.classList.toggle('hidden', !this.uiVisible);
  }

  cycleDemo() {
    const currentIndex = this.demoList.indexOf(this.currentDemoId);
    const next = this.demoList[(currentIndex + 1) % this.demoList.length];
    void this.loadDemo(next);
  }

  pickRandomDemo() {
    const current = this.currentDemoId;
    const candidates = this.demoList.filter((id) => id !== current);
    return candidates[Math.floor(Math.random() * candidates.length)] || this.demoList[0];
  }

  updateStatus() {
    document.getElementById('demoChip')!.textContent = `Demo: ${this.currentDemoId}`;
    document.getElementById('modeChip')!.textContent = `Mode: ${this.testMode ? 'Test' : 'Normal'}`;
  }

  setTestMode(value: boolean) {
    this.testMode = value;
    this.updateStatus();
  }

  setMuted(value: boolean) { this.audio.setMuted(value); }
}
