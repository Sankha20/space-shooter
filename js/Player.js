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

            this._mode = 1;
            this.modes = [1, 2, 3];
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
            if (this.mode == 1) {
                let bullet = new Bullet(this);
                Game.addBulletP(bullet);
            } else if (this.mode == 2) {
                let b1 = new Bullet(this);
                let b2 = new Bullet(this);

                b1.pos.x -= 3;
                b2.pos.x += 3;

                Game.addBulletP(b1);
                Game.addBulletP(b2);
            }
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

        weaponMode(m) {
            console.log("Available weapon: " + (this.modes.indexOf(m) != -1));
            
            
            if (this.gReady && this.modes.indexOf(m) != -1) {
                this.mode = m;
                console.log("Changing Weapon Mode");
                
                this.resetGlobal();
            }
        }

        get enginePower() {
            return this._enginePower;
        }

        get mode() {
            return this._mode;
        }

        set mode(value) {
            this._mode = value;
        }
    }