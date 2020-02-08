const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  let fileToLoad = './index.html';
  let type = 'text/html';

  if (req.url.includes('reset.css')) {
    fileToLoad = './reset.css';
    type = 'text/css';
  } else if (req.url.includes('style.css')) {
    fileToLoad = './style.css';
    type = 'text/css';
  } else if (req.url.includes('lib.js')) {
    fileToLoad = './lib.js';
    type = 'text/javascript';
  }

  fs.readFile(fileToLoad, (err, data) => {
    if (err || !data) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
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
