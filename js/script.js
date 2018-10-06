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

        // Getters
        get name() {
            return this._name;
        }

        get pos() {
            return this._pos;
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

        get xpos() {
            return this.pos.x;
        }

        get text() {
            return this._text;
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


    const drawUI = () => {
        if (Game.id == 0) {
            p.background(0);
        } else if (Game.id == 1) {
            p.background(22);
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

    p.draw = () => {
        drawUI();
    }

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