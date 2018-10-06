function main(p) {

    // Setup
    p.size(600, 768);
    p.frameRate(60);

    let hw = p.width / 2;
    let hh = p.height / 2;

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
    }

    class UIObject extends GameObject {
        
        constructor(c) {
            super(c);
            this._bcolor = c.borderColor || p.color(57, 160, 237);
            this._bgcolor = c.backgroundColor || p.color(16, 29, 66);
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

        get backgroundColor() {
            return this._bgcolor;
        }

        get borderColor() {
            return this._bcolor;
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

            this.showRadius = true;
        }

        applyForce(f) {
            // f = m * a     a = f / m

            f.div(this.mass);
            this._acc.add(f);
        }

        move() {
            this._velocity.add(this.acceleration);
            this._pos.add(this.velocity);
        }

        resetAcceleration() {
            this._acc.mult(0);
        }

        run() {
            this.display();
            this.move();
            this.resetAcceleration();
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
    }

    class Ship extends Mover {
        constructor(c) {
            c = Object.assign({}, c);
            super(c);

            this._maxHp = 100;
            this._maxEnergy = 20;
            this._HP = this.maxHp;
            this._energy = this.maxEnergy;
        }

        display() {
            p.fill(255);
            p.stroke(150);

            p.triangle(this.xpos, this.ypos + this.size,
                this.xpos - this.size, this.ypos - this.size,
                this.xpos + this.size, this.ypos - this.size);
            
            
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

        get maxHp() {
            return this._maxHp;
        }

        get maxEnergy() {
            return this._maxEnergy;
        }
    }

    // UI

    const btnStart = new Button({
        pos: new p.PVector(hw, hh - 80),
        text: "Começar jogo",
        stage: 0,
        onClick: function() {
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

    let player = new Ship({});


    const drawUI = () => {
        if (Game.id == 0) {
            p.background(0);
        } else if (Game.id == 1) {
            p.background(22);
            player.run();
        }
        
        else {
            p.background(255);
        }

        Game.visibleButtons.forEach(btn => {
            btn.run();
        })
    }
    

    var stage0 = () => {
        Game.setStage(0);
        Game.setButtons(btnStart, btnUpgrade, btnOptions);
    }

    var stage1 = () => {
        Game.setStage(1);
        Game.setButtons();
    }

    stage1();

    // MAIN LOOP

    let GRAVITY = new p.PVector(0, 0.01);

    p.draw = () => {
        drawUI();
        // player.applyForce(GRAVITY);
    }

    // MOUSE INTERACTION

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




}