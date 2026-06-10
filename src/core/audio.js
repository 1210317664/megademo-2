export class AudioSystem {
    constructor() {
        this.muted = false;
    }
    async init() {
        this.ctx = new AudioContext();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.15;
        this.masterGain.connect(this.ctx.destination);
    }
    setMuted(value) {
        this.muted = value;
        if (this.masterGain)
            this.masterGain.gain.value = value ? 0 : 0.15;
    }
    async playTrack(buffer) {
        if (!this.ctx)
            await this.init();
        if (!this.ctx || !this.masterGain)
            return;
        this.current?.stop();
        const source = this.ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;
        source.connect(this.masterGain);
        source.start();
        this.current = source;
    }
    stop() {
        this.current?.stop();
        this.current = undefined;
    }
}
