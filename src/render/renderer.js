/**
 * Handles the 2D Rendering Context.
 */
export class Renderer {
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {number} width
     * @param {number} height
     */
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;

        this.resize(width, height);
    }

    /**
     * Resizes the canvas.
     * @param {number} width
     * @param {number} height
     */
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        // Resetting width/height resets context state (like smoothing), likely want to re-apply expected defaults here if any.
        this.ctx.imageSmoothingEnabled = false; // Pixel art friendly by default
    }

    /**
     * Clears the entire screen.
     * @param {string} color - Optional clear color (hex/css string)
     */
    clear(color = '#000000') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /**
     * Returns the raw 2D context for custom drawing.
     * @returns {CanvasRenderingContext2D}
     */
    getContext() {
        return this.ctx;
    }
}
