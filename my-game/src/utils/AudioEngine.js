import * as Tone from 'tone';

class AudioEngine {
    constructor() {
        this.players = new Tone.Players().toDestination();
    }

    // Naya track load karne ke liye (Backend URL se)
    async addTrack(trackId, url) {
        return new Promise((resolve) => {
            this.players.add(trackId, url, () => {
                resolve();
            });
        });
    }

    play() {
        if (Tone.context.state !== 'running') Tone.start();
        Tone.Transport.start();
        this.players.fadeIn = 0.1;
        // Saare loaded tracks ko ek saath play karo
        Object.keys(this.players._players).forEach(id => {
            this.players.player(id).start(0).loop = true;
        });
    }

    stop() {
        Tone.Transport.stop();
        Object.keys(this.players._players).forEach(id => {
            this.players.player(id).stop();
        });
    }

    // Yeh hai asli magic: Speed control (On the fly)
    setSpeed(value) {
        // value: 0.5 (slow) to 2.0 (fast)
        Tone.Transport.bpm.value = 120 * value;
        // Har player ki playback rate update karo
        Object.keys(this.players._players).forEach(id => {
            this.players.player(id).playbackRate = value;
        });
    }
}

export const audioEngine = new AudioEngine();