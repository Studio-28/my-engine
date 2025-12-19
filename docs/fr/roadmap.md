# Roadmap & Versioning

## Stratégie de Versioning
Nous suivons **SemVer**.
- `0.x.x` : API instable, changements cassants possibles à chaque mineure.
- `1.0.0` : Première version stable, engagement sur la compatibilité API.

## Jalons (Milestones)

### v0.1.0 - Le Squelette (Actuel)
- Mise en place de l'architecture.
- Game Loop basique (`requestAnimationFrame`).
- Rendu Canvas simple (clear + draw rect).
- Gestionnaire de scènes rudimentaire (stack).
- Pas d'ECS, pas de son, pas d'input avancé.

### v0.2.0 - Interactivité
- Système d'Input (Clavier/Souris).
- Gestion du Delta Time robuste (avec clamping).
- Ajout de la classe `Sprite` simple pour le rendu d'images.

### v0.3.0 - ECS Lite
- Implémentation du pattern ECS de base.
- World, Entity, Component, System.
- Migration de la logique interne vers des systèmes.

### v0.4.0 - Polish & Audio
- Audio Manager (WebAudio API wrapper).
- Gestion des assets (Loader avec Promesses).
- Support des spritesheets simples.

### v0.5.0 - Physics Basic
- Collision AABB.
- Résolution de collision simple (déplacement).
- Spatial Hash Grid pour les perfs (si nécessaire).

### v1.0.0 - Release Candidate
- Documentation complète et exemples.
- Tests unitaires couvrants.
- Gel de l'API publique.
