import { Renderer } from '../render/renderer.js';
import { GameLoop } from './loop.js';
import { SceneManager } from '../scene/scene_manager.js';
import { Input } from '../input/input.js';

export class Game {
    /**
     * @param {Object} config
     * @param {number} config.width
     * @param {number} config.height
     * @param {HTMLElement} config.parent
     */
    constructor(config = {}) {
        this.config = config;
        this.width = config.width || 800;
        this.height = config.height || 600;
        this.parent = config.parent || document.body;

        // Initialize Canvas
        this.canvas = document.createElement('canvas');
        this.parent.appendChild(this.canvas);

        // Initialize Subsystems
        // Initialize Subsystems
        this.renderer = new Renderer(this.canvas, this.width, this.height);
        this.input = new Input();
        this.input.init(this.canvas);

        this.scene_manager = new SceneManager();
        this.loop = new GameLoop(
            (dt) => this.update(dt),
            () => this.draw()
        );
    }

    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();
        this.input.destroy();
    }

    update(dt) {
        this.scene_manager.update(dt);
    }

    draw() {
        this.renderer.clear();
        const ctx = this.renderer.getContext();
        this.scene_manager.draw(ctx);
    }
}
