loadUIManager = () => {
    stage0 = () => {
        Game.setStage(0);
        Game.setButtons(btnStart, btnUpgrade, btnOptions);
    }

    stage1 = () => {
        Game.loadGame();
        player = new Player();
        Game.setStage(1);
        Game.setButtons();
    }

    btnStart = new Button({
        pos: new PVector(halfWidth, halfHeight - 80),
        text: "Começar jogo",
        stage: 0,
        onClick: function () {
            stage1()
        }
    });

    console.log(halfWidth);
    

    btnUpgrade = new Button({
        pos: new PVector(halfWidth, halfHeight),
        text: "Melhorias",
    });

    btnOptions = new Button({
        pos: new PVector(halfWidth, halfHeight + 80),
        text: "Opções",
    });

    drawUI = () => {
        if (Game.id == 0) {
            p.background(0);
        } else if (Game.id == 1) {
            p.background(22);
            Game.run();
            spawnEnemy();
            player.run();
        } else {
            p.background(255);
        }

        Game.visibleButtons.forEach(btn => {
            btn.run();
        })
    }
}