const fs = require('fs');
const crypto = require('crypto');
const { Server, METHODS, STATUS_CODES } = require('http');

const server = new Server();

server.on('request', (request, response) => {
  if (request.method === 'GET' && request.url === '/') {
    fs.readFile('./src/client/index.html', (fileError, fileData) => {
      if (fileError) {
        response.writeHead(500, 'Nop');
        response.end();
      } else {
        response.writeHead(200, 'Ok', { 'Content-Type': 'text/html', 'Content-Length': fileData.byteLength });
        response.end(fileData);
      }
    })
  }

  if (request.method === 'GET' && request.url === '/index.js') {
    fs.readFile('./src/client/index.js', (fileError, fileData) => {
      if (fileError) {
        response.writeHead(500, 'Nop');
        response.end();
      } else {
        response.writeHead(200, 'Ok', { 'Content-Type': 'text/javascript', 'Content-Length': fileData.byteLength });
        response.end(fileData);
      }
    })
  }
});

server.on('upgrade', (request, socket) => {
  if (request.method === 'GET' && request.headers.upgrade === 'websocket') {
    console.log('Client is requesting a protocol change to WebSocket');
    const acceptKey = crypto.createHash('sha1').update(request.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
    socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
      'Upgrade: WebSocket\r\n' +
      'Connection: Upgrade\r\n' +
      'Sec-WebSocket-Accept: ' + acceptKey + '\r\n' +
      '\r\n');
    socket.on('data', (data) => {
      const fin = !!(data[0] & 0b10000000);
      const rsv1 = !!(data[0] & 0b01000000);
      const rsv2 = !!(data[0] & 0b00100000);
      const rsv3 = !!(data[0] & 0b00010000);
      const opcode = data[0] & 0b00001111;
      const isMasked = !!(data[1] & 0b10000000);
      let len = data[1] & 0b01111111;
      let maskingKey = data.slice(2, 6);
      let message = data.slice(6);

      if (len === 126) {
        len = data.slice(2, 4).readUInt16BE();
        maskingKey = data.slice(4, 8);
        message = data.slice(8);
      }

      if (len === 127) {
        len = data.slice(2, 10).readBigUInt64BE();
        maskingKey = data.slice(10, 14);
        message = data.slice(14);
      }



      for (let i = 0; i < message.length; ++i) {
        message[i] = message[i] ^ maskingKey[i % maskingKey.length];
      }

      console.log(message.toString());

      if (message.toString() === 'Hello Server!') {
        const msgToSend = 'Ping From NYDE';
        socket.write(Buffer.concat([Buffer.from([0b10001001, 0xFF & msgToSend.length]), Buffer.from(msgToSend)]));
      }
    });
  }
});

server.on('listening', () => {
  console.log('Nyde server listening on port 3000');
});

server.listen(3000);

/*const server = http.createServer();
const wsServer = http.createServer();

server.on('request', (req, res) => {
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
  console.log('Nyde http server listening on port 3000');
});

wsServer.on('upgrade', (req, socket, head) => {
  console.log('lele');
});

wsServer.listen(4000, () => {
  console.log('Nyde web socket server listening on port 4000');
});*/
