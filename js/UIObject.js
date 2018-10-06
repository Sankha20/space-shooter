loadUIObject = p =>
    class UIObject extends GameObject {

        constructor(c) {
            super(c);
            this._highlight = c.highlight || p.color(26, 39, 76);
            this._fcolor = c.frontgroundColor || p.color(255);
            this._text = c.text || "New " + this.name;
            this._fSize = c.fontSize || 14;
        }

        display() {
            p.stroke(this.borderColor);
            p.strokeWeight(1);
            p.fill(this.backgroundColor);
            p.rectMode(p.CENTER, p.CENTER);

            p.rect(this.xpos, this.ypos, this.width, this.height);
        }

        inRange(x, y = null) {
            if (!y) {
                y = x.y;
                x = x.x;
            }

            return (
                this.xpos - this.halfWidth < x &&
                this.xpos + this.halfWidth > x &&

                this.ypos - this.halfHeight < y &&
                this.ypos + this.halfHeight > y
            );
        }

        isUnderMouse() {
            return this.inRange(p.mouseX, p.mouseY);
        }

        run() {
            this.display();
        }

        get text() {
            return this._text;
        }

        get fontSize() {
            return this._fSize;
        }

        get width() {
            return this._w;
        }

        get highlightColor() {
            return this._highlight;
        }

        get halfWidth() {
            return this._w / 2;
        }

        get halfHeight() {
            return this._h / 2;
        }

        get height() {
            return this._h;
        }

        get fontColor() {
            return this._fcolor;
        }
    }