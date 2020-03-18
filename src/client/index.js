(() => {
/*  const canvas = document.getElementById("game-canvas");
  const game = new Game(window, canvas);

  game.start();*/
 const socket = new WebSocket('ws://localhost:3000');

  socket.addEventListener('open', (e) => {
    console.log('Socket opened on client side');
    socket.send('Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hello World!Hellooooooooo@');
  });

  socket.addEventListener('message', (e) => {
    console.log('Received message from the server: ', event.data);
  });
/*  const request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/files');
  request.addEventListener('load', (event) => {
    const files = event.target.response.split('\r\n');

    for (const file of files) {
      if (file.includes('.js')) {
        const script = document.createElement('script');
        script.setAttribute('src', `./${file}`);
        document.body.appendChild(script);
      } else if (file.includes('.css')) {
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('type', 'text/css');
        style.setAttribute('href', `./${file}`)
        document.head.appendChild(style);
      }
    }
  });
  request.send();*/
})();
