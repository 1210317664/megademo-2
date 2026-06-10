export class RadialTransitionImpl {
    constructor() {
        this.elapsed = 0;
        this.duration = 0.6;
        this.finished = false;
    }
    init(_gl, _fromTexture, _toTexture, options) { this.duration = options.duration || 0.6; this.elapsed = 0; this.finished = false; }
    resize() { }
    update(dt) { this.elapsed += dt; if (this.elapsed >= this.duration)
        this.finished = true; }
    render() { }
    isFinished() { return this.finished; }
    dispose() { }
}
