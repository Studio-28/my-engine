import { Game, Scene, World, System, Component, Vector2 } from '../src/index.js';

// Components
class Position extends Component {
    constructor(x, y) {
        super();
        this.vec = new Vector2(x, y);
    }
}

class Velocity extends Component {
    constructor(x, y) {
        super();
        this.vec = new Vector2(x, y);
    }
}

class Renderable extends Component {
    constructor(color, size) {
        super();
        this.color = color;
        this.size = size;
    }
}

// Systems
class PhysicsSystem extends System {
    update(dt) {
        // Get entities with Position and Velocity
        const entities = this.world.getEntitiesWith([Position, Velocity]);

        for (const entity of entities) {
            const pos = entity.getComponent(Position);
            const vel = entity.getComponent(Velocity);

            pos.vec = pos.vec.add(vel.vec.scale(dt));

            // Bounce
            if (pos.vec.x < 0 || pos.vec.x > 800 - 50) vel.vec.x *= -1;
            if (pos.vec.y < 0 || pos.vec.y > 600 - 50) vel.vec.y *= -1;
        }
    }
}

class RenderSystem extends System {
    constructor(ctx) {
        super();
        this.ctx = ctx;
    }

    update(dt) {
        const entities = this.world.getEntitiesWith([Position, Renderable]);

        for (const entity of entities) {
            const pos = entity.getComponent(Position);
            const ren = entity.getComponent(Renderable);

            this.ctx.fillStyle = ren.color;
            this.ctx.fillRect(pos.vec.x, pos.vec.y, ren.size, ren.size);
        }
    }
}

class TestScene extends Scene {
    onEnter() {
        console.log('ECS Demo Scene Entered');
        this.world = new World();

        // Add Systems
        // Note: We need the context for rendering. Ideally Systems shouldn't draw directly 
        // but for a simple 2D engine usually a RenderSystem holds the context.
        // We'll pass it from the outside or better, the Scene draws by delegating to a system?
        // Let's manually trigger the render system in Draw for now, 
        // to separate Update (logic) from Draw (render) loops.

        this.physicsSystem = new PhysicsSystem();
        this.world.addSystem(this.physicsSystem);

        // Create 10 random entities
        for (let i = 0; i < 10; i++) {
            const e = this.world.createEntity();
            e.addComponent(new Position(Math.random() * 700, Math.random() * 500));
            e.addComponent(new Velocity((Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200));
            e.addComponent(new Renderable(`hsl(${Math.random() * 360}, 70%, 50%)`, 30));
        }
    }

    update(dt) {
        this.world.update(dt);
    }

    draw(ctx) {
        // We can use a system for drawing too, but usually it needs to happen in draw() cycle.
        // Let's instantiate a render system ad-hoc or keep it persistent but call a custom method.
        // Or just iterate manually here for the demo.
        // Let's accept that RenderSystem.update() is calling draw commands.
        // But we need to ensure it runs during draw phase.

        // For this demo, let's just make a render helper.
        // Doing "Systems" strictly in update loop is purist ECS. 
        // But for games we separate Update/Draw.

        // Let's iterate manually for rendering to show we can query ECS.
        const renderables = this.world.getEntitiesWith([Position, Renderable]);
        for (const entity of renderables) {
            const pos = entity.getComponent(Position);
            const ren = entity.getComponent(Renderable);
            ctx.fillStyle = ren.color;
            ctx.fillRect(pos.vec.x, pos.vec.y, ren.size, ren.size);
        }
    }
}

const game = new Game({ width: 800, height: 600 });
game.scene_manager.push(new TestScene());
game.start();
