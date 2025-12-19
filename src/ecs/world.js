import { Entity } from './entity.js';

export class World {
    constructor() {
        this.entities = [];
        this.systems = [];
        this.entitiesToAdd = [];
        this.entitiesToRemove = new Set();
    }

    /**
     * Creates and adds a new entity.
     * @returns {Entity}
     */
    createEntity() {
        const entity = new Entity();
        this.entitiesToAdd.push(entity);
        return entity;
    }

    /**
     * Adds a system to the world.
     * @param {import('./system.js').System} system
     */
    addSystem(system) {
        this.systems.push(system);
        system.onAttach(this);
    }

    /**
     * Update all systems and manage entity lifecycle.
     * @param {number} dt
     */
    update(dt) {
        // Basic lifecycle management (add/remove at start of frame)
        if (this.entitiesToAdd.length > 0) {
            this.entities.push(...this.entitiesToAdd);
            this.entitiesToAdd = [];
        }

        // TODO: Handle removal (destroyEntity)

        for (const system of this.systems) {
            system.update(dt);
        }
    }

    /**
     * Helper to get entities with specific components.
     * Optimization: This is O(N) every frame. A real ECS would cache this queries.
     * For v1, this is acceptable for small number of entities.
     * @param {Function[]} componentClasses
     * @returns {Entity[]}
     */
    getEntitiesWith(componentClasses) {
        return this.entities.filter(entity => {
            if (!entity.active) return false;
            return componentClasses.every(c => entity.hasComponent(c));
        });
    }
}
