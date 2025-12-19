import { Game, Scene, Vector2 } from '../src/index.js';

constructor(game) {
    super();
    this.game = game;
}

onEnter() {
    console.log('Demo Scene Entered');
    this.pos = new Vector2(100, 100);
    this.vel = new Vector2(100, 50); // Pixel per second
    this.speed = 200;
}

update(dt) {
    const input = this.game.input;
    const dir = new Vector2(0, 0);

    // Input Handling
    if (input.isKeyDown('ArrowUp') || input.isKeyDown('KeyW')) dir.y -= 1;
    if (input.isKeyDown('ArrowDown') || input.isKeyDown('KeyS')) dir.y += 1;
    if (input.isKeyDown('ArrowLeft') || input.isKeyDown('KeyA')) dir.x -= 1;
    if (input.isKeyDown('ArrowRight') || input.isKeyDown('KeyD')) dir.x += 1;

    if (dir.length() > 0) {
        this.pos = this.pos.add(dir.normalize().scale(this.speed * dt));
    }

    // Mouse Teleport
    if (input.isMouseButtonDown(0)) { // Left Click
        const mousePos = input.getMousePosition();
        this.pos.x = mousePos.x - 25; // Center
        this.pos.y = mousePos.y - 25;
    }

    // Bounds check (Keep inside)
    if (this.pos.x < 0) this.pos.x = 0;
    if (this.pos.y < 0) this.pos.y = 0;
    if (this.pos.x > 800 - 50) this.pos.x = 800 - 50;
    if (this.pos.y > 600 - 50) this.pos.y = 600 - 50;
}

draw(ctx) {
    // Draw Red Square
    ctx.fillStyle = 'red';
    ctx.fillRect(this.pos.x, this.pos.y, 50, 50);

    // Draw Info
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('My Engine Phase 2 Demo', 10, 30);
    ctx.font = '16px Arial';
    ctx.fillText('Arrows/WASD to move, Left Click to teleport', 10, 60);
}
}

const game = new Game({
    width: 800,
    height: 600,
    parent: document.body
});

game.scene_manager.push(new DemoScene(game));
game.start();

console.log('Game Started');
