loadGame = p =>
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

        static loadGame() {
            this.enemies = [];
            this.enemyBullets = [];
            this.playerBullets = [];
            this._paused = false;
            this._timer = 0;
        }

        static get paused() {
            return this._paused;
        }

        static togglePause() {
            this._paused = !this._paused;
        }

        static addEnemy(e) {
            this.enemies.push(e);
        }

        static addBulletE(b) {
            this.enemyBullets.push(b);
        }

        static addBulletP(b) {
            this.playerBullets.push(b);
        }

        static runPlayerBullets() {
            for (var i = this.playerBullets.length - 1; i >= 0; i--) {
                let bullet = this.playerBullets[i];

                bullet.run();

                if (bullet.leftScreen) {
                    this.playerBullets.splice(i, 1);
                }
            }
        }

        static runEnemyBullets() {
            for (var i = this.enemyBullets.length - 1; i >= 0; i--) {
                let bullet = this.enemyBullets[i];

                bullet.run();

                if (bullet.leftScreen) {
                    this.enemyBullets.splice(i, 1);
                }

                if (this.checkCollision(bullet, player)) {
                    this.enemyBullets.splice(i, 1);
                    
                }
            }
        }

        static checkCollision(bullet, ship) {
            let minDistance = bullet.size + ship.size;
            let distance = PVector.sub(bullet.pos, ship.pos);

            if (distance.mag() < minDistance) {
                return true;
            }
            return false;            
        }

        static runEnemies() {
            for (var i = this.enemies.length - 1; i >= 0; i--) {
                let enemy = this.enemies[i];

                enemy.run();

                if (enemy.leftScreen) {
                    this.enemies.splice(i, 1);
                }
            }
        }

        static reset() {
            this._timer = 0;
        }

        static update() {
            this._timer++;
        }

        static get timer() {
            return this._timer;
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

        static run() {
            this.runEnemyBullets();
            this.runEnemies();
            this.runPlayerBullets();
            this.update();
        }

    }