# Vision & Design Principles

## 1. Raison d'être
**My Engine** existe pour combler le vide entre les moteurs de jeux massifs (Unity, Godot, Phaser) et les implémentations ad-hoc bricolées pour chaque petit projet.

Il s'adresse aux développeurs JavaScript qui veulent :
- **Comprendre** ce qui se passe sous le capot.
- **Contrôler** précisément la boucle de jeu et le rendu.
- **Éviter** le poids et la complexité des frameworks "tout compris".
- Créer des jeux 2D performants et maintenables sans réinventer la roue (game loop, time step, input handling).

## 2. Problèmes Résolus
Le développement de jeux JS "from scratch" souffre souvent de :
- **Boucles de jeu instables** (problèmes de delta time, spiral of death).
- **Gestion des entrées chaotique** (mélange d'event listeners et de polling).
- **Couplage fort** entre logique et rendu.
- **Difficulté à structurer** le code au-delà d'un prototype.

My Engine résout ces problèmes en fournissant une structure **solide mais minimale**.

## 3. Principes Fondamentaux

### Simplicité Radicale
Pas d'abstraction inutile. Si une fonctionnalité peut être implémentée par l'utilisateur en 10 lignes de code standard, elle n'a pas sa place dans le cœur du moteur.

### Prévisibilité & Déterminisme
Le moteur ne fait rien "dans votre dos".
- Pas de chargement automatique de ressources caché.
- Pas de systèmes qui s'activent "magiquement".
- L'ordre d'exécution est garanti et explicite.

### Contrôle Explicite
L'utilisateur doit appeler `update()` et `draw()`. L'utilisateur configure la boucle. L'utilisateur décide quand changer de scène. Le moteur est un **outil**, pas un cadre rigide.

### "Engine-Only"
My Engine est une bibliothèque, pas un framework. Il ne possède pas d'éditeur, de CLI, ou de gui. Il s'importe comme n'importe quelle dépendance npm : `import { Game } from '@kenzoobryan/my-engine'`.

## 4. Limitations du Scope (Non-goals)

Pour rester léger et maintenable, My Engine **refuse délibérément** de gérer :

- **Physique avancée** : Pas de Box2D intégré. Un système simple de collision AABB (Axis-Aligned Bounding Box) est fourni, mais pour la physique complexe, l'utilisateur doit intégrer une lib externe.
- **Rendu WebGL / Shaders** : Le rendu se fait exclusivement via l'API Canvas 2D. C'est suffisant pour la cible visée (Snake, Tetris, R-Type) et simplifie drastiquement le code.
- **Sons complexes** : Pas de moteur audio spatial 3D. Juste de quoi jouer des SFX et de la musique.
- **Réseau / Multijoueur** : Hors scope.
- **UI complexe** : Pas de système de boutons/menus in-engine. L'interface utilisateur doit être faite en HTML/CSS au-dessus du canvas.

## 5. Ce que le moteur ne doit jamais faire
- Polluer le scope global (`window`).
- Forcer une structure de fichiers.
- Cacher les erreurs (fail fast & loud).
- Assumer qu'il est le seul script sur la page.
