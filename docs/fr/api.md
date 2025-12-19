# API Reference (v0.1.0)

## Stabilité & Versioning
My Engine utilise le **Semantic Versioning 2.0.0**.
- **API Publique Stable** : Tout ce qui est documenté ici est considéré comme stable pour une version majeure donnée.
- **Interne** : Les modules préfixés par `_` ou non exportés dans l'index principal sont privés.

## Modules Exportés

### Core
`import { Game } from '@kenzoobryan/my-engine'`

#### `class Game`
Le point d'entrée principal.
- **Constructor**
    - `new Game(config: GameConfig)`
    - `config`: `{ width: number, height: number, parent: HTMLElement }`
- **Méthodes**
    - `start()`: Lance la boucle de jeu.
    - `stop()`: Arrête la boucle.
    - `scene_manager`: Accès au gestionnaire de scènes.

### Scene Management
`import { Scene } from '@kenzoobryan/my-engine'`

#### `class Scene`
Classe de base pour toutes les scènes du jeu.
- **Méthodes à surcharger**
    - `onEnter(params?: any)`: Appelée à l'activation.
    - `update(dt: number)`: Appelée à chaque frame logique. `dt` en secondes.
    - `draw(ctx: CanvasRenderingContext2D)`: Appelée à chaque frame de rendu.
    - `onExit()`: Appelée à la désactivation.

### Entity Component System (ECS)
`import { Entity, Component, System, World } from '@kenzoobryan/my-engine'`

#### `class World`
Le conteneur des entités et systèmes.
- **Méthodes**
    - `createEntity(): Entity`: Crée une nouvelle entité vide.
    - `addSystem(system: System)`: Enregistre un système logique.
    - `update(dt: number)`: Met à jour tous les systèmes.

#### `class Entity`
- **Méthodes**
    - `addComponent(component: Component): Entity`: Ajoute une donnée à l'entité.
    - `getComponent(cls: Class): Component`: Récupère une donnée.
    - `removeComponent(cls: Class)`: Supprime une donnée.
    - `hasComponent(cls: Class): boolean`: Vérifie la présence d'une donnée.

### Math
`import { Vector2 } from '@kenzoobryan/my-engine'`

#### `class Vector2`
- **Constructor**: `new Vector2(x, y)`
- **Méthodes**:
    - `add(v: Vector2): Vector2`
    - `sub(v: Vector2): Vector2`
    - `scale(s: number): Vector2`
    - `length(): number`
    - `normalize(): Vector2`

### Input
`import { Input } from '@kenzoobryan/my-engine'`

#### `class Input` (Singleton)
- **Méthodes**
    - `isKeyDown(key: string): boolean`: Vérifie si une touche est enfoncée.
    - `isMouseButtonDown(button: number): boolean`: Vérifie un clic souris.
    - `getMousePosition(): {x, y}`: Position relative au canvas.

## Règles d'exposition
Le package npm aura un point d'entrée unique `index.js`.
Les sous-modules peuvent être importés mais l'API publique est celle exposée par la racine.
```javascript
// Bon
import { Game, Scene } from '@kenzoobryan/my-engine';

// Mauvais (Risqué, API non garantie)
import { Game } from '@kenzoobryan/my-engine/dist/core/game';
```
