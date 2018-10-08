loadLoot = p =>
    class Loot extends Mover {
        constructor(master) {
            super({})
            this._pos = master.pos.get();
            this._power = new p.PVector(0, 0.05);
            this._maxSpeed = 1;
        }

        display() {
            fill(255);
            ellipse(this.xpos, this.ypos, 20, 20);
        }

        customAction() {
            let dir = PVector.sub(player.pos, this.pos);

            if (dir.mag() < player.magnetRadius) {
                dir.normalize();
                let x = dir.x * player.magnetForce;

                this.applyForce(new PVector(x, this._power.y));
            }
        }
    }