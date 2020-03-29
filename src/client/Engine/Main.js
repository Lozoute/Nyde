(() => {
    const canvas = document.getElementById("game-canvas");
    const engine = new GameEngine(window, canvas);
    engine.addGameItem(new Block({x: canvas.width / 2, y: canvas.height / 2}, {x: 20, y: 10}));
    engine.addGameItem(new Block({x: canvas.width / 2 + 150, y: canvas.height / 2 + 5}, {x: 100, y: 15}));
    engine.start();
})();