/**
 * Manages the stack of scenes (State machine).
 */
export class SceneManager {
    constructor() {
        this.scenes = [];
    }

    /**
     * Pushes a new scene onto the stack.
     * Pauses the previous one (conceptually) but it stays in memory.
     * @param {import('./scene.js').Scene} scene
     * @param {any} params
     */
    push(scene, params) {
        // Optionally call onExit/Pause on current top? 
        // For now simple stack behavior: Top is active.

        this.scenes.push(scene);
        scene.onEnter(params);
    }

    /**
     * Pops the current scene.
     */
    pop() {
        if (this.scenes.length === 0) return;

        const scene = this.scenes.pop();
        scene.onExit();

        if (this.scenes.length > 0) {
            // Could call onResume here on the new top
        }
    }

    /**
     * Replaces the current scene stack with a single new scene.
     * @param {import('./scene.js').Scene} scene 
     * @param {any} params 
     */
    switch(scene, params) {
        // Clear all existing
        while (this.scenes.length > 0) {
            this.pop();
        }
        this.push(scene, params);
    }

    /**
     * @returns {import('./scene.js').Scene|null}
     */
    current() {
        if (this.scenes.length === 0) return null;
        return this.scenes[this.scenes.length - 1];
    }

    update(dt) {
        const scene = this.current();
        if (scene) {
            scene.update(dt);
        }
    }

    draw(ctx) {
        const scene = this.current();
        if (scene) {
            scene.draw(ctx);
        }
    }
}
