(() => {
  const canvas = document.getElementById("game-canvas");
  const game = new Game(window, canvas);

  game.start();
})();
