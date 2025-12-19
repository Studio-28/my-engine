# Architecture Globale

## Vue d'ensemble
My Engine suit une architecture modulaire classique pour un moteur de jeu, centrée sur une **Game Loop** autoritaire qui orchestre la mise à jour des états (**Update**) et le dessin (**Render**).

Le système est conçu pour être composable. Le noyau (`Core`) est minimaliste, et les fonctionnalités spécifiques (Input, ECS, Rendu) sont des modules qui s'y greffent.

```mermaid
graph TD
    Boot[Boot / Entry Point] --> Core[Game Core]
    Core --> Loop[Game Loop]
    Loop --> |Update| SM[Scene Manager]
    Loop --> |Render| Renderer[Renderer 2D]
    
    SM --> |Gestion| ActiveScene[Active Scene]
    ActiveScene --> |Contient| ECS[Entity Component System]
    
    Input[Input System] --> |Injecte Events| Core
    
    subgraph "Update Cycle"
        ECS
        Systems[Systems (Physics, Logic, etc)]
    end
```

## 1. Game Loop
Le cœur battant du moteur.
**Responsabilités :**
- Gérer le temps (Time Step).
- Appeler `update(dt)` et `draw()` à intervalles réguliers.
- Garantir la stabilité de la simulation (Fixed Time Step pour la physique/logique).
- Gérer la pause et la reprise.

**Implémentation :**
Utilise `requestAnimationFrame` pour la synchronisation verticale.
Utilise un pattern "accumulateur" pour le delta time afin de découpler la vitesse de rendu de la vitesse de simulation.

**Invariants :**
- `update(dt)` reçoit toujours un temps positif.
- Le jeu ne doit pas "spiraler" (spiral of death) si le framerate chute (clamp du `dt` max).

## 2. Scene Management
Gère le cycle de vie des écrans du jeu (Menu, Jeu, Game Over).
**Responsabilités :**
- Stocker une pile ou une référence vers la scène active.
- Initialiser (`onEnter`) et nettoyer (`onExit`) les scènes.
- Transférer le contrôle de la boucle de jeu à la scène active.

**Cycle de vie d'une Scène :**
1. `constructor()`: Configuration.
2. `onEnter(params)`: Activation, chargement de ressources spécifiques.
3. `update(dt)`: Logique frame par frame.
4. `draw(ctx)`: Rendu frame par frame.
5. `onExit()`: Nettoyage, désabonnement aux événements.

## 3. Entity / Component System (ECS)
Pour favoriser la composition sur l'héritage.
**Note :** My Engine implémente un ECS "lite".
- **Entity** : Juste un ID unique (et un conteneur de components).
- **Component** : Un objet de données pur (Data Bag), ex: `Position { x, y }`, `Velocity { vx, vy }`.
- **System** : La logique qui itère sur les entités possédant un jeu spécifique de composants.

**Exemple :**
`MovementSystem` itère sur toutes les entités ayant `Position` et `Velocity` et met à jour `Position`.

**Responsabilités :**
- Création/Destruction d'entités performante (Object Pool si nécessaire, mais simple JS objects pour v1).
- Requêtage rapide des entités par signature de composants.

## 4. Input System
Abstraction des périphériques d'entrée.
**Responsabilités :**
- Normaliser les événements clavier/souris/touch.
- Fournir un état "pollable" (ex: `Input.isKeyDown('Space')`) pour la boucle de jeu.
- Gérer le mapping d'actions (ex: "JUMP" -> Space ou Button A).

**Ce qu'il ne fait pas :**
- Gérer les gestes complexes (swipe, pinch) par défaut (extension possible).

## 5. Rendering Pipeline 2D
L'abstraction du Canvas API.
**Responsabilités :**
- Gérer le contexte 2D (`CanvasRenderingContext2D`).
- Effacer l'écran ("Clear") au début de la frame.
- Gérer l'ordre de rendu (Z-indexing / Layers).
- Optimiser les appels de dessin (batching si possible, sinon direct draw pour v1).
- Gérer la caméra/viewport (transformations globales).

**Coordonnées :**
- Origine (0,0) en haut à gauche par défaut.
- Y vers le bas.
- Système de coordonnées logique (Monde) vs coordonnées écran (Screen). Le Renderer gère la matrice de transformation.

## 6. Lifecycle Global
1. **Boot** : L'utilisateur instancie `Game({ width, height, parent })`.
2. **Init** : Le moteur crée le Canvas, initialise les sous-systèmes.
3. **Load** : (Optionnel) Préchargement global des assets.
4. **Start** : L'utilisateur lance `game.start()`.
5. **Loop** : La boucle tourne indéfiniment.
6. **Stop** : `game.stop()` met fin à `requestAnimationFrame`.
7. **Destroy** : Nettoyage du DOM et des écouteurs.
