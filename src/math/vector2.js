/**
 * Simple 2D Vector class.
 */
export class Vector2 {
    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds another vector to this one.
     * @param {Vector2} v
     * @returns {Vector2} New vector
     */
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    /**
     * Subtracts another vector from this one.
     * @param {Vector2} v
     * @returns {Vector2} New vector
     */
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }

    /**
     * Multiplies this vector by a scalar.
     * @param {number} s
     * @returns {Vector2} New vector
     */
    scale(s) {
        return new Vector2(this.x * s, this.y * s);
    }

    /**
     * Calculates the length (magnitude) of the vector.
     * @returns {number}
     */
    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns a normalized vector (length = 1).
     * @returns {Vector2}
     */
    normalize() {
        const len = this.length();
        if (len === 0) return new Vector2(0, 0);
        return new Vector2(this.x / len, this.y / len);
    }
}
