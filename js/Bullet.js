loadBullet = p =>
    class Bullet extends Mover {
        constructor(master) {
            super({});
            this._pos = master.pos.get();
            this._power = new p.PVector(0, 1);
            this._maxSpeed = 10;
            this._bgcolor = p.color(0, 0, 255);
            this._size = 10;
            this._damage = master.damage;

            if (master._team == 1) {
                this._power = new p.PVector(0, -1);
                this._bgcolor = color(255, 0, 0);
            } 
        }

        display() {
            p.fill(255);
            p.stroke(this.backgroundColor);
            p.strokeWeight(2);
            p.ellipse(this.xpos, this.ypos, this.size / 2, this.size);
        }

        checkEdges() {
            if (this.ypos + this.size / 2 > height ||
                this.ypos - this.size / 2 < 0 ||
                this.xpos - this.size / 2 < 0 ||
                this.xpos + this.size / 2 > width ) {
                this.escape();
            }
        }
    }