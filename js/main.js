function main(p) {

    GameObject = loadGameObject();
    Game = loadGame(p);
    UIObject = loadUIObject(p);
    Button = loadButton(p);
    Mover = loadMover(p);
    Bullet = loadBullet(p);
    Ship = loadShip(p);
    Player = loadPlayer(p);

    Game.loadGame();
    loadUIManager();
    loadControls(p);

    spawnEnemy = () => {
        if (Game.timer == 120) {
            Game.addEnemy(new Ship(p.random(20, p.width - 20), -50));
            Game.reset();
        }
    }

    player = new Player();
    stage0();

    p.draw = () => {
        drawUI();
        manageKeys();
    }
}