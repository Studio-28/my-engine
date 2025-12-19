import { Vector2 } from '../math/vector2.js';

/**
 * Handles Keyboard and Mouse interactions.
 */
export class Input {
    constructor() {
        this.keys = new Set();
        this.mouseButtons = new Set();
        this.mousePosition = new Vector2(0, 0);

        // Bind handlers
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
    }

    /**
     * Initializes event listeners.
     * @param {HTMLElement} target - The DOM element to listen for mouse events (usually canvas)
     */
    init(target) {
        this.target = target;

        // Keyboard (Global)
        window.addEventListener('keydown', this.onKeyDown);
        window.addEventListener('keyup', this.onKeyUp);

        // Mouse (Target)
        target.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp); // Listen on window to catch drag-release outside
        target.addEventListener('mousemove', this.onMouseMove);

        // Prevent context menu on right click
        target.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    /**
     * Cleans up event listeners.
     */
    destroy() {
        window.removeEventListener('keydown', this.onKeyDown);
        window.removeEventListener('keyup', this.onKeyUp);

        if (this.target) {
            this.target.removeEventListener('mousedown', this.onMouseDown);
            this.target.removeEventListener('mousemove', this.onMouseMove);
        }
        window.removeEventListener('mouseup', this.onMouseUp);
    }

    /**
     * @param {KeyboardEvent} e 
     */
    onKeyDown(e) {
        this.keys.add(e.code);
    }

    /**
     * @param {KeyboardEvent} e 
     */
    onKeyUp(e) {
        this.keys.delete(e.code);
    }

    /**
     * @param {MouseEvent} e 
     */
    onMouseDown(e) {
        this.mouseButtons.add(e.button);
    }

    /**
     * @param {MouseEvent} e 
     */
    onMouseUp(e) {
        this.mouseButtons.delete(e.button);
    }

    /**
     * @param {MouseEvent} e 
     */
    onMouseMove(e) {
        const rect = this.target.getBoundingClientRect();
        this.mousePosition.x = e.clientX - rect.left;
        this.mousePosition.y = e.clientY - rect.top;
    }

    /**
     * Checks if a specific key is currently held down.
     * @param {string} code - e.g. "ArrowUp", "Space", "KeyA"
     * @returns {boolean}
     */
    isKeyDown(code) {
        return this.keys.has(code);
    }

    /**
     * Checks if a specific mouse button is currently held down.
     * @param {number} button - 0: Left, 1: Middle, 2: Right
     * @returns {boolean}
     */
    isMouseButtonDown(button) {
        return this.mouseButtons.has(button);
    }

    /**
     * Returns the current mouse position relative to the canvas.
     * @returns {Vector2}
     */
    getMousePosition() {
        return this.mousePosition;
    }
}

// Export singleton instance for simplicity, or let Game manage it.
// Decision: Let Game manage it to avoid global state issues and allow multiple game instances.
