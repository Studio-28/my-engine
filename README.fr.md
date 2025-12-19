# My Engine

> Moteur de jeu 2D minimaliste, robuste et sans magie pour le navigateur.

`@kenzoobryan/my-engine` est une bibliothèque JavaScript conçue pour les développeurs qui veulent garder le contrôle pur sur leur boucle de jeu. Pas d'éditeur, pas de dépendances lourdes, juste les briques essentielles pour construire des jeux comme Snake, Tetris ou des Shoot'em ups.

[Français](README.fr.md) | [English](README.md)

## Fonctionnalités Clés

- **Game Loop Solide** : Delta time géré, protection contre la spirale de la mort.
- **Scene Management** : Transitions simples entre Menu, Jeu et Game Over.
- **Rendu Canvas 2D** : Abstractions légères pour le dessin performant.
- **Input Unifié** : Clavier et Souris normalisés.
- **Zero Magic** : Pas de variables globales, pas de side-effects imprévisibles.

## Installation

```bash
npm install @kenzoobryan/my-engine
```

## Usage Rapide

```javascript
import { Game, Scene, World, System, Component, Vector2 } from '@kenzoobryan/my-engine';

// 1. Définir des Composants
class Position extends Component {
    constructor(x, y) { super(); this.vec = new Vector2(x, y); }
}
class Velocity extends Component {
    constructor(x, y) { super(); this.vec = new Vector2(x, y); }
}

// 2. Définir des Systèmes
class PhysicsSystem extends System {
    update(dt) {
        const entities = this.world.getEntitiesWith([Position, Velocity]);
        for (const entity of entities) {
            const pos = entity.getComponent(Position);
            const vel = entity.getComponent(Velocity);
            pos.vec = pos.vec.add(vel.vec.scale(dt));
        }
    }
}

// 3. Créer une Scène
class MainScene extends Scene {
    onEnter() {
        this.world = new World();
        this.world.addSystem(new PhysicsSystem());

        const player = this.world.createEntity();
        player.addComponent(new Position(100, 100));
        player.addComponent(new Velocity(50, 0));
    }

    update(dt) {
        this.world.update(dt);
        
        // Input Handling
        if (this.game.input.isKeyDown('Space')) {
            console.log("JUMP!");
        }
    }

    draw(ctx) {
        // ... Rendu ...
    }
}

// 4. Démarrer le jeu
const game = new Game({ width: 800, height: 600 });
game.scene_manager.push(new MainScene());
game.start();
```

## Documentation

- [Vision & Philosophie](docs/vision.md) : Pourquoi ce moteur ?
- [Architecture](docs/architecture.md) : Comment ça marche sous le capot ?
- [API Reference](docs/api.md) : Classes et méthodes.
- [Roadmap](docs/roadmap.md) : Futur du projet.

## Licence

MIT © Kenzoobryan
