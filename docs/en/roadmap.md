# Roadmap & Versioning

## Versioning Strategy
We follow **SemVer**.
- `0.x.x`: Unstable API, breaking changes possible at every minor release.
- `1.0.0`: First stable version, commitment to API compatibility.

## Milestones

### v0.1.0 - The Skeleton (Completed)
- Architecture setup.
- Basic Game Loop (`requestAnimationFrame`).
- Simple Canvas Rendering (clear + draw rect).
- Basic Scene Manager (stack).
- No ECS, no sound, no advanced input.

### v0.2.0 - Interactivity (Completed)
- Input System (Keyboard/Mouse).
- Robust Delta Time handling.
- Simple `Sprite` class (Future work, not yet in v0.2).

### v0.3.0 - ECS Lite (Completed)
- Implementation of the basic ECS pattern.
- World, Entity, Component, System.
- Migration of internal logic to systems (where applicable).

### v0.4.0 - Polish & Audio
- Audio Manager (WebAudio API wrapper).
- Asset Management (Loader with Promises).
- Support for simple spritesheets.

### v0.5.0 - Basic Physics
- AABB Collision.
- Simple collision resolution (displacement).
- Spatial Hash Grid for performance (if needed).

### v1.0.0 - Release Candidate
- Complete documentation and examples.
- Comprehensive unit tests.
- Public API freeze.
