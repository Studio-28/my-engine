# API Reference (v0.3.0)

## Stability & Versioning
My Engine uses **Semantic Versioning 2.0.0**.
- **Stable Public API**: Everything documented here is considered stable for a given major version.
- **Internal**: Modules prefixed with `_` or not exported in the main index are private.

## Exported Modules

### Core
`import { Game } from '@kenzoobryan/my-engine'`

#### `class Game`
The main entry point.
- **Constructor**
    - `new Game(config: GameConfig)`
    - `config`: `{ width: number, height: number, parent: HTMLElement }`
- **Methods**
    - `start()`: Starts the game loop.
    - `stop()`: Stops the loop and cleans up inputs.
    - `scene_manager`: Access to the scene manager.
    - `input`: Access to the input system.

### Scene Management
`import { Scene } from '@kenzoobryan/my-engine'`

#### `class Scene`
Base class for all game scenes.
- **Methods to Override**
    - `onEnter(params?: any)`: Called on activation.
    - `update(dt: number)`: Called every logic frame. `dt` in seconds.
    - `draw(ctx: CanvasRenderingContext2D)`: Called every render frame.
    - `onExit()`: Called on deactivation.

### Entity Component System (ECS)
`import { Entity, Component, System, World } from '@kenzoobryan/my-engine'`

#### `class World`
Container for entities and systems.
- **Methods**
    - `createEntity(): Entity`: Creates a new empty entity.
    - `addSystem(system: System)`: Registers a logic system.
    - `update(dt: number)`: Updates all systems.

#### `class Entity`
- **Methods**
    - `addComponent(component: Component): Entity`: Adds data to the entity.
    - `getComponent(cls: Class): Component`: Retrieves data.
    - `removeComponent(cls: Class)`: Removes data.
    - `hasComponent(cls: Class): boolean`: Checks for presence of data.

### Math
`import { Vector2 } from '@kenzoobryan/my-engine'`

#### `class Vector2`
- **Constructor**: `new Vector2(x, y)`
- **Methods**:
    - `add(v: Vector2): Vector2`
    - `sub(v: Vector2): Vector2`
    - `scale(s: number): Vector2`
    - `length(): number`
    - `normalize(): Vector2`

### Input
`import { Input } from '@kenzoobryan/my-engine'`

#### `class Input` (Singleton via Game)
- **Methods**
    - `isKeyDown(key: string): boolean`: Checks if a key is pressed.
    - `isMouseButtonDown(button: number): boolean`: Checks a mouse click.
    - `getMousePosition(): {x, y}`: Position relative to the canvas.

## Exposure Rules
The npm package has a single entry point `index.js`.
Submodules can be imported, but the public API is what is exposed by the root.
```javascript
// Good
import { Game, Scene } from '@kenzoobryan/my-engine';

// Bad (Risky, API not guaranteed)
import { Game } from '@kenzoobryan/my-engine/dist/core/game';
```
