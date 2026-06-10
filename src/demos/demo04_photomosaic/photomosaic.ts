import type { DemoModule, DemoOptions } from '../../core/interfaces';

export class PhotoMosaicDemo implements DemoModule {
  private gl!: WebGLRenderingContext;
  init(gl: WebGLRenderingContext, options: DemoOptions) { this.gl = gl; }
  resize() {}
  update() {}
  render() { this.gl.clearColor(0.08, 0.12, 0.18, 1); this.gl.clear(this.gl.COLOR_BUFFER_BIT); }
  dispose() {}
}
