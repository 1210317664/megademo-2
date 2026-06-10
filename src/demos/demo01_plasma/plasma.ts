import type { DemoModule, DemoOptions } from '../../core/interfaces';
import { createProgram } from '../../core/utils/shader';

const VERTEX = `attribute vec2 aPosition; varying vec2 vUv; void main(){ vUv=aPosition*0.5+0.5; gl_Position=vec4(aPosition,0.0,1.0); }`;
const FRAGMENT = `precision mediump float; uniform float uTime; varying vec2 vUv; void main(){ float x=vUv.x; float y=vUv.y; float c=sin(x*12.0+uTime*1.6)+cos(y*10.0-uTime*1.2)+sin((x+y)*8.0-uTime*0.8); vec3 col=0.5+0.5*cos(c*3.14159+vec3(0.0,2.0,4.0)); gl_FragColor=vec4(col,1.0); }`;

export class PlasmaDemo implements DemoModule {
  private gl!: WebGLRenderingContext; private program?: WebGLProgram; private buffer?: WebGLBuffer; private time=0;
  init(gl: WebGLRenderingContext, options: DemoOptions) { this.gl=gl; this.program=createProgram(gl, VERTEX, FRAGMENT); this.buffer=gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW); }
  resize() {}
  update(dt:number){ this.time += dt; }
  render(){ if(!this.program||!this.buffer) return; const gl=this.gl; gl.useProgram(this.program); gl.bindBuffer(gl.ARRAY_BUFFER,this.buffer); const pos=gl.getAttribLocation(this.program,'aPosition'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0); const uTime=gl.getUniformLocation(this.program,'uTime'); if(uTime) gl.uniform1f(uTime,this.time); gl.drawArrays(gl.TRIANGLE_STRIP,0,4); }
  dispose(){ if(this.program) this.gl.deleteProgram(this.program); if(this.buffer) this.gl.deleteBuffer(this.buffer); }
}
