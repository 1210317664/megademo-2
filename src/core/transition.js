export class FadeTransition {
    constructor() {
        this.duration = 0.6;
        this.elapsed = 0;
        this.finished = false;
    }
    init(gl, fromTexture, toTexture, options) {
        this.gl = gl;
        this.fromTexture = fromTexture;
        this.toTexture = toTexture;
        this.duration = options.duration || 0.6;
        this.elapsed = 0;
        this.finished = false;
    }
    resize() { }
    update(dt) { this.elapsed += dt; if (this.elapsed >= this.duration)
        this.finished = true; }
    render() { }
    isFinished() { return this.finished; }
    dispose() { }
}
