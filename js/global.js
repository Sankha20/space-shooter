function entryPoint(p) {

    loadEngine(p);

    // Images
    enemy1 = "./media/enemy1.png";
    playerImage = "./media/p1.png"

    // Functions
    map = (x, y, a, b, n) => (n - x) * (b - a) / (y - x) + a;

    debui = (...msg) => {
        textAlign(p.CENTER, p.CENTER);
        fill(150);
        text(msg.join(' '), p.width / 2, p.height / 2);
    }

    // Variables
    player = null;
    keys = [];
    halfWidth = width / 2;
    halfHeight = height / 2;

    main(p);
}