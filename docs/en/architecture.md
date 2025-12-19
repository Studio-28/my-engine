# Global Architecture

## Overview
My Engine follows a classic modular architecture for a game engine, centered around an authoritative **Game Loop** that orchestrates state updates (**Update**) and drawing (**Render**).

The system is designed to be composable. The kernel (`Core`) is minimalist, and specific functionalities (Input, ECS, Rendering) are modules that attach to it.

```mermaid
graph TD
    Boot[Boot / Entry Point] --> Core[Game Core]
    Core --> Loop[Game Loop]
    Loop --> |Update| SM[Scene Manager]
    Loop --> |Render| Renderer[Renderer 2D]
    
    SM --> |Management| ActiveScene[Active Scene]
    ActiveScene --> |Contains| ECS[Entity Component System]
    
    Input[Input System] --> |Injects Events| Core
    
    subgraph "Update Cycle"
        ECS
        Systems[Systems (Physics, Logic, etc)]
    end
```

## 1. Game Loop
The beating heart of the engine.
**Responsibilities:**
- Manage time (Time Step).
- Call `update(dt)` and `draw()` at regular intervals.
- Ensure simulation stability (Fixed Time Step for physics/logic).
- Handle pause and resume.

**Implementation:**
Uses `requestAnimationFrame` for vertical synchronization.
Uses an "accumulator" pattern for delta time to decouple rendering speed from simulation speed.

**Invariants:**
- `update(dt)` always receives a positive time.
- The game must not "spiral" (spiral of death) if the framerate drops (clamping max `dt`).

## 2. Scene Management
Manages the lifecycle of game screens (Menu, Game, Game Over).
**Responsibilities:**
- Store a stack or reference to the active scene.
- Initialize (`onEnter`) and clean up (`onExit`) scenes.
- Transfer control of the game loop to the active scene.

**Scene Lifecycle:**
1. `constructor()`: Configuration.
2. `onEnter(params)`: Activation, loading specific assets.
3. `update(dt)`: Frame-by-frame logic.
4. `draw(ctx)`: Frame-by-frame rendering.
5. `onExit()`: Cleanup, unsubscribing from events.

## 3. Entity / Component System (ECS)
To favor composition over inheritance.
**Note:** My Engine implements a "lite" ECS.
- **Entity**: Just a unique ID (and a component container).
- **Component**: A pure data object (Data Bag), e.g., `Position { x, y }`, `Velocity { vx, vy }`.
- **System**: The logic that iterates over entities possessing a specific set of components.

**Example:**
`MovementSystem` iterates over all entities having `Position` and `Velocity` and updates `Position`.

**Responsibilities:**
- Performant Entity Creation/Destruction (Object Pool if necessary, but simple JS objects for v1).
- Fast entity querying by component signature.

## 4. Input System
Abstraction of input devices.
**Responsibilities:**
- Normalize keyboard/mouse/touch events.
- Provide a "pollable" state (e.g., `Input.isKeyDown('Space')`) for the game loop.
- Handle action mapping (e.g., "JUMP" -> Space or Button A).

**What it does not do:**
- Handle complex gestures (swipe, pinch) by default (possible extension).

## 5. Rendering Pipeline 2D
The abstraction of the Canvas API.
**Responsibilities:**
- Manage the 2D context (`CanvasRenderingContext2D`).
- Clear the screen at the start of the frame.
- Manage rendering order (Z-indexing / Layers).
- Optimize draw calls (batching if possible, otherwise direct draw for v1).
- Manage camera/viewport (global transformations).

**Coordinates:**
- Origin (0,0) at top-left by default.
- Y downwards.
- Logical coordinate system (World) vs screen coordinates (Screen). The Renderer manages the transformation matrix.

## 6. Global Lifecycle
1. **Boot**: User instantiates `Game({ width, height, parent })`.
2. **Init**: Engine creates Canvas, initializes subsystems.
3. **Load**: (Optional) Global asset preloading.
4. **Start**: User calls `game.start()`.
5. **Loop**: The loop runs indefinitely.
6. **Stop**: `game.stop()` ends `requestAnimationFrame`.
7. **Destroy**: DOM and listener cleanup.
