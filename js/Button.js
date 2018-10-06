loadButton = p =>
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
            p.strokeWeight(1);
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