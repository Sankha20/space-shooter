loadGameObject = () =>
    class GameObject {

        constructor(c) {
            this._name = this.constructor.name;
            this._pos = c.pos || new PVector(200, 200);
            this._w = c.width || 200;
            this._h = c.height || 150;
            this._bcolor = c.borderColor || color(57, 160, 237);
            this._bgcolor = c.backgroundColor || color(16, 29, 66);
        }

        display() {
            p.fill(255);
            p.ellipse(this.xpos, this.ypos, 20, 20);
        }

        run() {
            this.display();
        }

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