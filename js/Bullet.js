loadBullet = p =>
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