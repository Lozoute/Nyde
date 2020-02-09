const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let fileToLoad = './client/index.html';
  let type = 'text/html';

  if (req.url.includes('reset.css')) {
    fileToLoad = './client/reset.css';
    type = 'text/css';
  } else if (req.url.includes('style.css')) {
    fileToLoad = './client/style.css';
    type = 'text/css';
  } else if (req.url.includes('index.js')) {
    fileToLoad = './client/index.js';
    type = 'text/javascript';
  } else if (req.url.includes('Game.js')) {
    fileToLoad = './client/Game.js';
    type = 'text/javascript';
  }

  fs.readFile(fileToLoad, (err, data) => {
    if (err || !data) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.write(`Unable to load ${fileToLoad}`);
    } else {
      res.writeHead(200, { 'Content-Type': type, 'Content-Length': data.length });
      res.write(data);
    }
    res.end();
  });
});

server.listen(3000, () => {
  console.log('Nyde server listening on port 3000');
});
