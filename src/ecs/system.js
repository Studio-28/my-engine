/**
 * Base class for Systems.
 */
export class System {
    constructor() {
        this.world = null;
    }

    /**
     * Called when the system is added to the world.
     * @param {import('./world.js').World} world
     */
    onAttach(world) {
        this.world = world;
    }

    /**
     * Update loop.
     * @param {number} dt
     */
    update(dt) { }
}
