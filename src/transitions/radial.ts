import type { TransitionModule, TransitionOptions } from '../core/interfaces';

export class RadialTransitionImpl implements TransitionModule {
  private elapsed = 0; private duration = 0.6; private finished = false;
  init(_gl: WebGLRenderingContext, _fromTexture: WebGLTexture, _toTexture: WebGLTexture, options: TransitionOptions) { this.duration = options.duration || 0.6; this.elapsed = 0; this.finished = false; }
  resize() {}
  update(dt: number) { this.elapsed += dt; if (this.elapsed >= this.duration) this.finished = true; }
  render() {}
  isFinished() { return this.finished; }
  dispose() {}
}
