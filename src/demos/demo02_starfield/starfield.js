import { createProgram } from '../../core/utils/shader';
const VERTEX = `attribute vec2 aPosition; varying vec2 vUv; void main(){ vUv=aPosition*0.5+0.5; gl_Position=vec4(aPosition,0.0,1.0); }`;
const FRAGMENT = `precision mediump float; uniform float uTime; varying vec2 vUv; void main(){ vec2 p=vUv*2.0-1.0; float d=length(p); float c=0.0; for(int i=0;i<4;i++){ float fi=float(i); float s=sin(uTime*0.6+fi*1.7); float c2=cos((p.x*8.0+fi)*0.7+s); c += 0.08/(abs(d*1.4 - 0.1*fi + c2)); } vec3 col=vec3(0.1,0.3,0.6)*c + vec3(0.03,0.02,0.05); gl_FragColor=vec4(col,1.0); }`;
export class StarfieldDemo {
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
