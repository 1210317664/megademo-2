export interface DemoOptions {
  id: string;
  variantId: number;
  logicalWidth: number;
  logicalHeight: number;
  textures: Record<string, string>;
  imagesMeta?: Record<string, { width: number; height: number }>;
  audioTrackId?: string;
  bpm?: number;
  beatOffsetSec?: number;
  params?: Record<string, unknown>;
}

export interface TransitionOptions {
  duration: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  params?: Record<string, unknown>;
}

export interface DemoModule {
  init(gl: WebGLRenderingContext, options: DemoOptions): void;
  resize(width: number, height: number): void;
  update(dt: number): void;
  render(): void;
  dispose(): void;
}

export interface TransitionModule {
  init(gl: WebGLRenderingContext, fromTexture: WebGLTexture, toTexture: WebGLTexture, options: TransitionOptions): void;
  resize(width: number, height: number): void;
  update(dt: number): void;
  render(): void;
  isFinished(): boolean;
  dispose(): void;
}
