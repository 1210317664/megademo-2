import type { TransitionModule, TransitionOptions } from './interfaces';

export class FadeTransition implements TransitionModule {
  private gl!: WebGLRenderingContext;
  private fromTexture!: WebGLTexture;
  private toTexture!: WebGLTexture;
  private duration = 0.6;
  private elapsed = 0;
  private finished = false;

  init(gl: WebGLRenderingContext, fromTexture: WebGLTexture, toTexture: WebGLTexture, options: TransitionOptions) {
    this.gl = gl; this.fromTexture = fromTexture; this.toTexture = toTexture;
    this.duration = options.duration || 0.6;
    this.elapsed = 0; this.finished = false;
  }
  resize() {}
  update(dt: number) { this.elapsed += dt; if (this.elapsed >= this.duration) this.finished = true; }
  render() { /* simple placeholder */ }
  isFinished() { return this.finished; }
  dispose() {}
}
