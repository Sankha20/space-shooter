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

    // INTERACTION
    const manageKeys = () => {
        // W 87
        if (keys[87]) {
            player.moveUp();
        }

        // S 83
        if (keys[83]) {
            player.moveDown();
        }

        // A 65
        if (keys[65]) {
            player.moveLeft();
        }

        // D 68
        if (keys[68]) {
            player.moveRight();
        }
    }

    // MOUSE

    p.mouseClicked = () => {
        Game.visibleButtons.forEach(btn => {
            if (btn.isUnderMouse()) {
                return btn.handleClick();
            }
        })
    }
    p.mouseMoved = () => {
        let underMouse = false;
        for (var i = 0; i < Game.visibleButtons.length; i++) {
            let btn = Game.visibleButtons[i];

            if (btn.isUnderMouse()) {
                underMouse = true;
                break;
            }
        }

        if (underMouse) {
            p.cursor(p.HAND);
        } else {
            p.cursor(p.ARROW);
        }
    }

    // Keyboard
    p.keyPressed = () => {
        let key = p.keyCode;

        keys[key] = true;
    }

    p.keyReleased = () => {
        let key = p.keyCode;

        keys[key] = false;
    }
}