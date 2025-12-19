/**
 * Base class for all game scenes.
 */
export class Scene {
    constructor() { }

    /**
     * Called when the scene becomes active.
     * @param {any} params - Optional parameters passed during transition
     */
    onEnter(params) { }

    /**
     * Called when the scene is leaving.
     */
    onExit() { }

    /**
     * Update logic.
     * @param {number} dt - Delta time in seconds
     */
    update(dt) { }

    /**
     * Draw logic.
     * @param {CanvasRenderingContext2D} ctx
     */
    draw(ctx) { }
}
