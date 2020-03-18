(() => {
    const canvas = document.getElementById("game-canvas");
    const engine = new GameEngine(window, canvas);
    engine.addGameItem(new Ball({x: canvas.width / 2, y: canvas.height / 2}, 20));
    engine.start();
})();