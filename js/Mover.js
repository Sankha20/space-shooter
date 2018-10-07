loadMover = p =>
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

            this._damage = 10;

        }

        get damage() {
            return this._damage;
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