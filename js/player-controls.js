loadControls = (p) => {
    
    manageKeys = () => {
        // W 87
        if (keys[87]) {
            player.moveUp();
        }

        // S 83
        if (keys[83]) {
            player.moveDown();
        }

        // A 65
        if (keys[65]) {
            player.moveLeft();
        }

        // D 68
        if (keys[68]) {
            player.moveRight();
        }

        // 1 49
        if (keys[1]) {
            player.changeMode();
        }
    }

    // MOUSE

    p.mouseClicked = () => {
        Game.visibleButtons.forEach(btn => {
            if (btn.isUnderMouse()) {
                return btn.handleClick();
            }
        })
    }
    p.mouseMoved = () => {
        let underMouse = false;
        for (var i = 0; i < Game.visibleButtons.length; i++) {
            let btn = Game.visibleButtons[i];

            if (btn.isUnderMouse()) {
                underMouse = true;
                break;
            }
        }

        if (underMouse) {
            p.cursor(p.HAND);
        } else {
            p.cursor(p.ARROW);
        }
    }

    // Keyboard
    p.keyPressed = () => {
        let key = p.keyCode;
        // console.log(key);

        if (key >= 49 && key <= 57) {
            player.weaponMode(key - 48);
        } else {
            keys[key] = true;
        }
    }

    p.keyReleased = () => {
        let key = p.keyCode;

        keys[key] = false;
    }
}