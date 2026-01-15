// Subway Surfers Style Runner Engine
const runnerConfig = {
    type: Phaser.AUTO,
    width: 900,
    height: 500,
    parent: 'game-play-area',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: { preload: runnerPreload, create: runnerCreate, update: runnerUpdate }
};

let runnerPlayer, runnerLanes = [300, 450, 600];
let currentLane = 1;
let runnerActive = false;
let runnerGameInstance;
let obstacles, coins, powerups;
let score = 0;
let gameSpeed = 6;
let isHoverboardActive = false;
let hoverboardTimer = 0;

function runnerPreload() {
    this.load.image("runner-bg", "assets/subway_track_3d_bg_1768463098154.png");
    this.load.image("runner-player", "assets/jake_3d.png");
    this.load.image("runner-train", "assets/subway_train_front_3d_1768462922752.png");
    this.load.image("runner-barrier", "assets/road_barrier_3d_red_white_1768462937998.png");
    this.load.image("runner-coin", "assets/gold_coin_3d_1768462907593.png");
    this.load.image("runner-board", "assets/hoverboard_3d_neon_1768462979287.png");
}

function runnerCreate() {
    // Scrolling background sequence
    this.bg1 = this.add.image(450, 250, "runner-bg").setScale(1.5).setAlpha(0.7);
    this.bg2 = this.add.image(450, -250, "runner-bg").setScale(1.5).setAlpha(0.7);

    runnerPlayer = this.physics.add.sprite(runnerLanes[currentLane], 400, "runner-player").setScale(0.08);
    runnerPlayer.setDepth(10);

    obstacles = this.physics.add.group();
    coins = this.physics.add.group();

    // Input
    this.input.keyboard.on('keydown-LEFT', () => moveLane(-1));
    this.input.keyboard.on('keydown-RIGHT', () => moveLane(1));
    this.input.keyboard.on('keydown-UP', () => jump());
    this.input.keyboard.on('keydown-DOWN', () => slide());

    // Obstacle spawn timer
    this.time.addEvent({
        delay: 1500,
        callback: spawnObstacle,
        callbackScope: this,
        loop: true
    });

    // Coin spawn timer
    this.time.addEvent({
        delay: 800,
        callback: spawnCoin,
        callbackScope: this,
        loop: true
    });

    this.physics.add.overlap(runnerPlayer, obstacles, (p, o) => {
        if (isHoverboardActive) {
            o.destroy();
            deactivateHoverboard();
        } else {
            gameOver();
        }
    }, null, this);
    this.physics.add.overlap(runnerPlayer, coins, collectCoin, null, this);
}

function runnerUpdate() {
    if (!runnerActive) return;

    // Background scrolling
    this.bg1.y += gameSpeed;
    this.bg2.y += gameSpeed;
    if (this.bg1.y >= 750) this.bg1.y = -250;
    if (this.bg2.y >= 750) this.bg2.y = -250;

    // Lane interpolation
    let targetX = runnerLanes[currentLane];
    runnerPlayer.x = Phaser.Math.Linear(runnerPlayer.x, targetX, 0.2);

    // Obstacle movement
    obstacles.children.iterate(obj => {
        if (obj) {
            obj.y += gameSpeed;
            if (obj.y > 600) obj.destroy();
        }
    });

    coins.children.iterate(coin => {
        if (coin) {
            coin.y += gameSpeed;
            if (coin.y > 600) coin.destroy();
        }
    });

    score += 0.1;
    document.getElementById('gameScore').innerText = "Score: " + Math.floor(score);
}

function moveLane(dir) {
    if (!runnerActive) return;
    currentLane = Phaser.Math.Clamp(currentLane + dir, 0, 2);
}

function jump() {
    if (!runnerActive || runnerPlayer.isJumping) return;
    runnerPlayer.isJumping = true;
    // Animation via scale/y
    runnerPlayer.scene.tweens.add({
        targets: runnerPlayer,
        y: 300,
        scale: 0.25,
        duration: 400,
        yoyo: true,
        onComplete: () => runnerPlayer.isJumping = false
    });
}

function slide() {
    if (!runnerActive || runnerPlayer.isJumping) return;
    runnerPlayer.scene.tweens.add({
        targets: runnerPlayer,
        scaleY: 0.1,
        y: 420,
        duration: 300,
        yoyo: true
    });
}

function activateHoverboard() {
    if (isHoverboardActive) return;
    isHoverboardActive = true;
    runnerPlayer.setTint(0x00ffff);
    // Add board visual or effect
    console.log("Hoverboard Activated!");
}

function deactivateHoverboard() {
    isHoverboardActive = false;
    runnerPlayer.clearTint();
}

function spawnObstacle() {
    if (!runnerActive) return;
    const lane = Phaser.Math.Between(0, 2);
    const isTrain = Phaser.Math.Between(0, 1) === 0;
    const type = isTrain ? "runner-train" : "runner-barrier";
    const obstacle = obstacles.create(runnerLanes[lane], -100, type);
    obstacle.setScale(isTrain ? 0.15 : 0.1);
}

function spawnCoin() {
    if (!runnerActive) return;
    const lane = Phaser.Math.Between(0, 2);
    const coin = coins.create(runnerLanes[lane], -100, "runner-coin");
    coin.setScale(0.05);
}

function collectCoin(player, coin) {
    coin.destroy();
    score += 50;
}

function gameOver() {
    runnerActive = false;
    document.getElementById('gameStatus').innerText = "CRASHED!";
    document.getElementById('gameStatus').style.color = "#ff0000";
}

// Integration APIs
window.runnerMove = (dir) => moveLane(dir);
window.runnerJump = () => jump();
window.runnerSlide = () => slide();

document.getElementById('startGameBtn').addEventListener('click', () => {
    document.getElementById('gameStartOverlay').style.display = 'none';
    runnerActive = true;
    score = 0;
    if (!runnerGameInstance) {
        runnerGameInstance = new Phaser.Game(runnerConfig);
    } else {
        runnerGameInstance.scene.scenes[0].scene.restart();
    }
});
