import { Component } from './component.js';

let nextId = 0;

export class Entity {
    constructor() {
        this.id = nextId++;
        this.components = new Map();
        this.active = true;
    }

    /**
     * Adds a component to the entity.
     * @param {Component} component
     * @returns {Entity} this (for chaining)
     */
    addComponent(component) {
        this.components.set(component.constructor, component);
        return this;
    }

    /**
     * Removes a component.
     * @param {Function} componentClass
     */
    removeComponent(componentClass) {
        this.components.delete(componentClass);
    }

    /**
     * Retrieves a component.
     * @param {Function} componentClass
     * @returns {Component|undefined}
     */
    getComponent(componentClass) {
        return this.components.get(componentClass);
    }

    /**
     * Checks if entity has a component.
     * @param {Function} componentClass
     * @returns {boolean}
     */
    hasComponent(componentClass) {
        return this.components.has(componentClass);
    }
}
