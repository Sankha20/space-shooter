function main(p) {

    // Setup
    p.size(600, 768);
    p.frameRate(60);

    let hw = p.width / 2;
    let hh = p.height / 2;

    let keys = [];

    const map = (x, y, a, b, n) => (n - x) * (b - a) / (y - x) + a;

    // Carregando imagens

    let player = null;

    let enemy1 = "./media/enemy1.png";
    let p1 = "./media/p1.png"

    // Classe estática para manter as informações do jogo
    class Game {

        static id() {
            if (id === undefined) {
                return 5;
            } else {
                return id;
            }
        }

        static visibleButtons() {
            if (visibleButtons === undefined) {
                return [];
            } else {
                return visibleButtons;
            }
        }

        static loadGame() {
            this.enemies = [];
            this.enemyBullets = [];
            this.playerBullets = [];
            this._paused = false;
            this._timer = 0;
        }

        static get paused() {
            return this._paused;
        }

        static togglePause() {
            this._paused = !this._paused;
        }

        static addEnemy(e) {
            this.enemies.push(e);
        }

        static addBulletE(b) {
            this.enemyBullets.push(b);
        }

        static addBulletP(b) {
            this.playerBullets.push(b);
        }

        static runPlayerBullets() {
            for (var i = this.playerBullets.length - 1; i >= 0; i--) {
                let bullet = this.playerBullets[i];

                bullet.run();

                if (bullet.leftScreen) {
                    this.playerBullets.splice(i, 1);
                }
            }
        }

        static runEnemyBullets() {
            for (var i = this.enemyBullets.length - 1; i >= 0; i--) {
                let bullet = this.enemyBullets[i];

                bullet.run();

                if (bullet.leftScreen) {
                    this.enemyBullets.splice(i, 1);
                }
            }
        }

        static runEnemies() {
            for (var i = this.enemies.length - 1; i >= 0; i--) {
                let enemy = this.enemies[i];

                enemy.run();

                if (enemy.leftScreen) {
                    this.enemies.splice(i, 1);
                }
            }
        }

        static spawnEnemy() {
            if (this.timer == 120) {
                Game.addEnemy(new Ship(p.random(20, p.width - 20), -50));
                this.reset();
            }
        }

        static reset() {
            this._timer = 0;
        }

        static update() {
            this._timer++;
        }

        static get timer() {
            return this._timer;
        }

        static run() {
            debui(p.frameRate);
            if (!this.paused) {
                this.runEnemyBullets();
                this.runEnemies();
                this.runPlayerBullets();
                this.update();
                this.spawnEnemy();              
            }
        }

        static setButtons(...args) {
            this.visibleButtons = [];

            args.forEach(btn => {
                this.visibleButtons.push(btn);
            })
        }

        static setStage(_id) {
            this.id = _id;
        }

    }

    Game.loadGame();

    // Functions
    const debui = (...msg) => {
        p.textAlign(p.CENTER, p.CENTER);
        p.fill(150);
        p.text(msg.join(' '), p.width / 2, p.height / 2);
    }

    // Classes
    class GameObject {

        constructor(c) {
            this._name = this.constructor.name;
            this._pos = c.pos || new p.PVector(200, 200);
            this._w = c.width || 200;
            this._h = c.height || 150;
            this._bcolor = c.borderColor || p.color(57, 160, 237);
            this._bgcolor = c.backgroundColor || p.color(16, 29, 66);
        }

        display() {
            p.fill(255);
            p.ellipse(this.xpos, this.ypos, 20, 20);
        }

        run() {
            this.display();
        }

        // Getters
        get name() {
            return this._name;
        }

        get pos() {
            return this._pos;
        }

        get xpos() {
            return this.pos.x;
        }

        get ypos() {
            return this.pos.y;
        }

        get backgroundColor() {
            return this._bgcolor;
        }

        get borderColor() {
            return this._bcolor;
        }
    }

    class UIObject extends GameObject {

        constructor(c) {
            super(c);
            this._highlight = c.highlight || p.color(26, 39, 76);
            this._fcolor = c.frontgroundColor || p.color(255);
            this._text = c.text || "New " + this.name;
            this._fSize = c.fontSize || 14;
        }

        display() {
            p.stroke(this.borderColor);
            p.strokeWeight(1);
            p.fill(this.backgroundColor);
            p.rectMode(p.CENTER, p.CENTER);

            p.rect(this.xpos, this.ypos, this.width, this.height);
        }

        inRange(x, y = null) {
            if (!y) {
                y = x.y;
                x = x.x;
            }

            return (
                this.xpos - this.halfWidth < x &&
                this.xpos + this.halfWidth > x &&

                this.ypos - this.halfHeight < y &&
                this.ypos + this.halfHeight > y
            );
        }

        isUnderMouse() {
            return this.inRange(p.mouseX, p.mouseY);
        }

        run() {
            this.display();
        }

        // Getters



        get text() {
            return this._text;
        }

        get fontSize() {
            return this._fSize;
        }

        get width() {
            return this._w;
        }

        get highlightColor() {
            return this._highlight;
        }

        get halfWidth() {
            return this._w / 2;
        }

        get halfHeight() {
            return this._h / 2;
        }

        get height() {
            return this._h;
        }

        get fontColor() {
            return this._fcolor;
        }
    }

    class Button extends UIObject {
        constructor(c) {
            c = Object.assign({
                height: 70,
            }, c);
            super(c);

            this._stage = c.stage || 0;
            this._onClick = c.onClick || (() => {
                console.log("CLICK | BTN: " + this.text);
            });
        }

        display() {
            p.stroke(this.borderColor);
            p.strokeWeight(1);
            p.rectMode(p.CENTER, p.CENTER);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(this.fontSize);
            p.textFont(p.loadFont('monospace'));

            if (this.isUnderMouse()) {
                p.fill(this.highlightColor);
            } else {
                p.fill(this.backgroundColor);
            }
            p.rect(this.xpos, this.ypos, this.width, this.height, 10);

            p.fill(this.fontColor);
            p.text(this.text, this.xpos - this.halfWidth, this.ypos - this.halfHeight - 3, this.width, this.height);
        }

        handleClick() {
            if (Game.id == this.stage) {
                this._onClick();
            }
        }

        get stage() {
            return this._stage;
        }
    }

    class Mover extends GameObject {
        constructor(c) {

            c = Object.assign({}, c);

            super(c);

            this._size = c.size || 20;

            this._mass = 1;
            this._acc = new p.PVector();
            this._velocity = new p.PVector();
            this._maxSpeed = 4;
            this._power = new p.PVector(0, 0.005);

            this.showRadius = false;
            this._leftScreen = false;
        }

        applyForce(f) {
            // f = m * a     a = f / m

            f.div(this.mass);
            this._acc.add(f);
        }

        move() {
            this._velocity.add(this.acceleration);
            this._velocity.limit(this.maxSpeed);
            this._pos.add(this.velocity);
        }

        resetAcceleration() {
            this._acc.mult(0);
        }

        customAction() {}

        run() {
            this.checkEdges();
            this.display();
            this.applyForce(this.power);
            this.move();
            this.resetAcceleration();
            this.customAction();
        }

        checkEdges() {
            if (this.ypos - this.size > p.height) {
                this.escape();
            }
        }

        display() {
            p.fill(255);
            p.stroke(150);

            p.ellipse(this.xpos, this.ypos, this.size, this.size);

            p.stroke(255, 0, 0);
            p.strokeWeight(3);
            p.point(this.xpos, this.ypos + this.size);

            if (this.showRadius) {
                p.noFill();
                p.stroke(100, 150, 220);
                p.strokeWeight(1);
                p.ellipse(this.xpos, this.ypos, this.size * 2, this.size * 2);
            }
        }

        escape() {
            this._leftScreen = true;
        }

        get leftScreen() {
            return this._leftScreen;
        }

        get maxSpeed() {
            return this._maxSpeed;
        }

        get size() {
            return this._size;
        }

        get mass() {
            return this._mass;
        }

        get velocity() {
            return this._velocity;
        }

        get acceleration() {
            return this._acc;
        }

        get halfSize() {
            return this.size / 2;
        }

        get power() {
            return this._power;
        }

        set power(p) {
            this._power = p;
        }
    }

    class Bullet extends Mover {
        constructor(master) {
            super({});
            this._pos = master.pos.get();
            this._power = new p.PVector(0, 1);
            this._maxSpeed = 10;
            this._bgcolor = p.color(0, 0, 255);

            if (master._team == 1) {
                this._power = new p.PVector(0, -1);
                this._bgcolor = p.color(255, 0, 0);
            }
        }

        display() {
            p.fill(255);
            p.stroke(this.backgroundColor);
            p.strokeWeight(2);
            p.ellipse(this.xpos, this.ypos, 5, 10);
        }

        checkEdges() {
            if (this.ypos + this.size > p.height ||
                this.ypos + this.size / 2 < 0) {
                this.escape();
            }
        }
    }

    class Ship extends Mover {
        constructor(x, y) {
            let c = {
                pos: new p.PVector(x, y)
            };
            super(c);

            this._maxHp = 100;
            this._maxEnergy = 20;
            this._HP = this.maxHp;
            this._energy = this.maxEnergy;

            this.sprite = p.loadImage(enemy1);

            this._isDead = false;
            this._timer = 0;
            this._team = 0;
        }

        drawHpBar() {
            let padding = 8;
            let mapHp = map(0, this.maxHp, 0, this.size * 2, this.hp);

            p.stroke(0, 255, 0);
            p.strokeWeight(1);
            p.fill(0, 200, 0);
            p.rectMode(p.CENTER);
            p.rect(this.xpos,
                this.ypos - this.size - padding,
                mapHp,
                4);
        }

        customAction() {
            this.update();
            this.shipAction();
            this.playerAction();
        }

        playerAction() {};

        shipAction() {
            if (this.timer > 60) {
                this.reset();
                this.shoot();
            }
        }

        shoot() {
            let bullet = new Bullet(this);

            Game.addBulletE(bullet);
        }

        display() {
            this.renderImage();
            if (this.showRadius) {
                p.noFill();
                p.stroke(100, 150, 220);
                p.strokeWeight(1);
                p.ellipse(this.xpos, this.ypos, this.size * 2, this.size * 2);
            }

            this.drawHpBar();
        }

        renderImage() {
            p.imageMode(p.CENTER);
            p.pushMatrix();
            p.translate(this.xpos, this.ypos);
            p.scale(1, -1);
            p.image(this.sprite, 0, 0, this.size * 2, this.size * 2);
            p.popMatrix();
        }

        reset() {
            this._timer = 0;
        }

        update() {
            this._timer++;
        }

        get timer() {
            return this._timer;
        }

        checkDeath() {
            if (this.hp <= 0) {
                this.die();
            }
        }

        die() {
            this._isDead = true;
        }

        get isDead() {
            return this._isDead;
        }

        get hp() {
            return this._HP;
        }

        get maxHp() {
            return this._maxHp;
        }

        get maxEnergy() {
            return this._maxEnergy;
        }
    }

    class Player extends Ship {
        constructor() {
            super(p.width / 2, p.height - 100);
            this.sprite = p.loadImage(p1);
            this._team = 1;
            this._power = new p.PVector();
            this._enginePower = 1;
        }

        playerAction() {
            this.break();
        }

        moveUp() {
            let f = new p.PVector(0, -this.enginePower)
            this.applyForce(f);
        }

        moveDown() {
            let f = new p.PVector(0, this.enginePower)
            this.applyForce(f);
        }

        moveLeft() {
            let f = new p.PVector(-this.enginePower, 0)
            this.applyForce(f);
        }

        moveRight() {
            let f = new p.PVector(this.enginePower, 0)
            this.applyForce(f);
        }

        shoot() {
            let bullet = new Bullet(this);

            Game.addBulletP(bullet);
        }

        break () {
            let friction = this.velocity.get();
            friction.normalize();
            friction.mult(-0.05);
            this._velocity.add(friction);

            if (this.velocity.mag() < 0.5) {
                this._velocity.mult(0);
            }

        }

        get enginePower() {
            return this._enginePower;
        }
    }

    // UI

    const btnStart = new Button({
        pos: new p.PVector(hw, hh - 80),
        text: "Começar jogo",
        stage: 0,
        onClick: function () {
            stage1()
        }
    });

    const btnUpgrade = new Button({
        pos: new p.PVector(hw, hh),
        text: "Melhorias",
    });

    const btnOptions = new Button({
        pos: new p.PVector(hw, hh + 80),
        text: "Opções",
    });

    const drawUI = () => {
        if (Game.id == 0) {
            p.background(0);
        } else if (Game.id == 1) {
            p.background(22);
            Game.run();
            player.run();
        } else {
            p.background(255);
        }

        Game.visibleButtons.forEach(btn => {
            btn.run();
        })
    }

    player = new Player();

    var stage0 = () => {
        Game.setStage(0);
        Game.setButtons(btnStart, btnUpgrade, btnOptions);
    }

    var stage1 = () => {
        Game.loadGame();
        Game.setStage(1);
        Game.setButtons();
    }

    stage1();

    // MAIN LOOP

    // Controls

    const manageKeys = () => {
        if (keys[87]) {
            player.moveUp();
        }
        if (keys[83]) {
            player.moveDown();
        }
        if (keys[65]) {
            player.moveLeft();
        }
        if (keys[68]) {
            player.moveRight();
        }
    }

    let GRAVITY = new p.PVector(0, 0.01);

    p.draw = () => {
        drawUI();

        if (!Game.paused) {
            manageKeys();
        }
    }

    // MOUSE INTERACTION

    p.mouseClicked = () => {
        if (Game.paused) {
            Game.togglePause();
        }
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

        if (p.mouseX > p.width || p.mouseX < 0 ||
            p.mouseY > p.height || p.mouseY < 0) {
            Game.togglePause();
        }
    }

    // Keyboard Interaction

    // 87, 65, 83, 68
    p.keyPressed = () => {
        let key = p.keyCode;
        console.log(p.keyCode);

        keys[key] = true;
    }

    p.keyReleased = () => {
        let key = p.keyCode;
        console.log(p.keyCode);

        keys[key] = false;
    }
}