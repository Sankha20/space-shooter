loadPlayer = p =>
    class Player extends Ship {
        constructor(c) {
            super(p.width / 2, p.height - 100);
            this.sprite = p.loadImage(playerImage);
            this._team = 1;
            this._power = new p.PVector();
            this._enginePower = 1;
            this._damage = 50;
            this._atkSpeed = 30;            
        }

        playerAction() {
            this.break();
        }

        borderCollision() {
            if (this.xpos + this.size > width) {
                this.velocity.x *= -0.7;
                this.pos.x = width - this.size;
            } else if (this.xpos - this.size < 0) {
                this.velocity.x *= -0.7;
                this.pos.x = this.size;
            }

            if (this.ypos + this.size > height) {
                this.velocity.y *= -5;
                this.pos.y = height - this.size;
            } else if (this.ypos - this.size < 0) {
                this.velocity.y *= -5;
                this.pos.y = this.size;
            }
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
            friction.mult(-0.1);
            this._velocity.add(friction);

            if (this.velocity.mag() < 0.5) {
                this._velocity.mult(0);
            }

        }

        get enginePower() {
            return this._enginePower;
        }
    }