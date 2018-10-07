loadShip = p =>
    class Ship extends Mover {
        constructor(x, y) {
            let c = {
                pos: new p.PVector(x, y)
            };
            super(c);

            this._team = 0;

            this._maxHp = 100;
            this._maxEnergy = 20;
            this._HP = this.maxHp;
            this._energy = this.maxEnergy;
            this._defense = 0;

            this.sprite = p.loadImage(enemy1);

            this._isDead = false;
            this._immune = false;

            this._atkSpeed = Random(45, 60);
            this._timer = Random(0, this._atkSpeed);
        }

        shipAction() {
            if (this.timer > this.atkSpeed) {
                this.reset();
                this.shoot();
            }
        }

        bounce(obj) {
            let dir = PVector.sub(obj.pos, this.pos);
            let x = dir.x;
            let vx = this.velocity.mag();
            let f = new PVector(-x * (vx + 1) / 5, 0);

            this.applyForce(f);
            this.takeDamage(obj);
        }

        borderCollision() {
            if (this.xpos + this.size > width) {
                this.velocity.x *= -0.7;
                this.pos.x = width - this.size;
            } else if (this.xpos - this.size < 0) {
                this.velocity.x *= -0.7;
                this.pos.x = this.size;
            }
        }

        customAction() {
            this.update();
            this.shipAction();
            this.playerAction();
            this.borderCollision();
            this.break();
        }

        break () {
            let friction = this.velocity.get();
            friction.normalize();
            friction.y = 0;
            friction.mult(-0.1);
            this._velocity.add(friction);
        }

        takeDamage(attacker) {
            if (!this.immune) {
                let damage = attacker.damage - this.defense;
                this._HP -= damage;

                this.checkDeath();
            }
        }

        get defense() {
            return this._defense;
        }

        get immune() {
            return this._immune;
        }

        set immune(value) {
            this._immune = value;
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

        playerAction() {};

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

        checkDeath() {
            if (this.hp <= 0) {
                this._isDead = true;
            }
        }

        get timer() {
            return this._timer;
        }

        get atkSpeed() {
            return this._atkSpeed;
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