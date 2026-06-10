import { createProgram } from '../../core/utils/shader';
const VERTEX = `attribute vec2 aPosition; varying vec2 vUv; void main(){ vUv=aPosition*0.5+0.5; gl_Position=vec4(aPosition,0.0,1.0); }`;
const FRAGMENT = `precision mediump float; uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv*2.0-1.0; float r=length(p); float pulse=0.25+0.15*sin(uTime*4.0); float glow=exp(-abs(r-pulse)*18.0); vec3 col = vec3(0.9,0.25,0.55)*glow + vec3(0.15,0.7,1.0)*(1.0-glow); gl_FragColor=vec4(col,1.0); }`;
export class BobDemo {
    constructor() {
        this.time = 0;
    }
    init(gl, options) { this.gl = gl; this.program = createProgram(gl, VERTEX, FRAGMENT); this.buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW); }
    resize() { }
    update(dt) { this.time += dt; }
    render() { if (!this.program || !this.buffer)
        return; const gl = this.gl; gl.useProgram(this.program); gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer); const pos = gl.getAttribLocation(this.program, 'aPosition'); gl.enableVertexAttribArray(pos); gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0); const uTime = gl.getUniformLocation(this.program, 'uTime'); if (uTime)
        gl.uniform1f(uTime, this.time); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
    dispose() { if (this.program)
        this.gl.deleteProgram(this.program); if (this.buffer)
        this.gl.deleteBuffer(this.buffer); }
}
