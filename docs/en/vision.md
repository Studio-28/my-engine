# Vision & Design Principles

## 1. Reason for Existence
**My Engine** exists to fill the void between massive game engines (Unity, Godot, Phaser) and ad-hoc implementations cobbled together for every small project.

It targets JavaScript developers who want to:
- **Understand** what happens under the hood.
- **Control** precisely the game loop and rendering.
- **Avoid** the weight and complexity of "batteries-included" frameworks.
- Create performant and maintainable 2D games without reinventing the wheel (game loop, time step, input handling).

## 2. Problems Solved
"From scratch" JS game development often suffers from:
- **Unstable game loops** (delta time issues, spiral of death).
- **Chaotic input handling** (mixing event listeners and polling).
- **Tight coupling** between logic and rendering.
- **Difficulty structuring** code beyond a prototype.

My Engine solves these problems by providing a **solid yet minimal** structure.

## 3. Core Principles

### Radical Simplicity
No useless abstraction. If a feature can be implemented by the user in 10 lines of standard code, it does not belong in the engine's core.

### Predictability & Determinism
The engine does nothing "behind your back".
- No hidden automatic asset loading.
- No systems that activate "magically".
- Execution order is guaranteed and explicit.

### Explicit Control
The user must call `update()` and `draw()`. The user configures the loop. The user decides when to switch scenes. The engine is a **tool**, not a rigid framework.

### "Engine-Only"
My Engine is a library, not a framework. It has no editor, CLI, or GUI. It is imported like any other npm dependency: `import { Game } from '@kenzoobryan/my-engine'`.

## 4. Scope Limitations (Non-goals)

To remain lightweight and maintainable, My Engine **deliberately refuses** to handle:

- **Advanced Physics**: No built-in Box2D. A simple AABB collision system is provided, but for complex physics, the user must integrate an external lib.
- **WebGL / Shaders Rendering**: Rendering is done exclusively via the 2D Canvas API. This is sufficient for the target (Snake, Tetris, R-Type) and drastically simplifies the code.
- **Complex Audio**: No 3D spatial audio engine. Just enough to play SFX and music.
- **Network / Multiplayer**: Out of scope.
- **Complex UI**: No in-engine button/menu system. UI should be done in HTML/CSS on top of the canvas.

## 5. What the engine must never do
- Pollute the global scope (`window`).
- Enforce a file structure.
- Hide errors (fail fast & loud).
- Assume it is the only script on the page.
