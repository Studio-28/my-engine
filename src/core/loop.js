/**
 * The heartbeat of the engine.
 * Manages the timing and calls update/draw.
 */
export class GameLoop {
    /**
     * @param {function(number)} updateFn - Callback for update (dt in seconds)
     * @param {function()} drawFn - Callback for draw
     */
    constructor(updateFn, drawFn) {
        this.updateFn = updateFn;
        this.drawFn = drawFn;

        this.lastTime = 0;
        this.isRunning = false;
        this.animationFrameId = null;

        // Bind loop to preserve 'this' context
        this.loop = this.loop.bind(this);
    }

    /**
     * Starts the loop.
     */
    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.lastTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.loop);
    }

    /**
     * Stops the loop.
     */
    stop() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }

    /**
     * Main loop step.
     * @param {number} timestamp
     */
    loop(timestamp) {
        if (!this.isRunning) return;

        // Calculate delta time in seconds
        const dt = (timestamp - this.lastTime) / 1000;
        this.lastTime = timestamp;

        // Prevent huge dt steps (spiral of death / tab inactive)
        const safeDt = Math.min(dt, 0.1);

        this.updateFn(safeDt);
        this.drawFn();

        this.animationFrameId = requestAnimationFrame(this.loop);
    }
}
