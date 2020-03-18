const crypto = require('crypto');

let wsServer = null;

function handleSocketData(socket, data) {
  const fin = !!(data[0] & 0b10000000);
  const rsv1 = !!(data[0] & 0b01000000);
  const rsv2 = !!(data[0] & 0b00100000);
  const rsv3 = !!(data[0] & 0b00010000);
  const opcode = data[0] & 0b00001111;
  const isMasked = !!(data[1] & 0b10000000);
  const len = data[1] & 0b01111111;

  const maskingKey = data.slice(2, 6);

  const message = data.slice(6);

  for (let i = 0; i < message.length; ++i) {
    message[i] = message[i] ^ maskingKey[i % maskingKey.length];
  }

  console.log(message.toString());

  if (message.toString() === 'Hello Server!') {
    const msgToSend = 'Ping From NYDE';
    socket.write(Buffer.concat([Buffer.from([0b10001001, 0xFF & msgToSend.length]), Buffer.from(msgToSend)]));
  }
}

function createWebSocketServer(httpServer) {
  httpServer.on('upgrade', (request, socket) => {
    if (request.method === 'GET' && request.headers.upgrade === 'websocket') {
      console.log('Client is requesting a protocol change to WebSocket');
      const acceptKey = crypto.createHash('sha1').update(request.headers['sec-websocket-key'] + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
      socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
        'Upgrade: WebSocket\r\n' +
        'Connection: Upgrade\r\n' +
        'Sec-WebSocket-Accept: ' + acceptKey + '\r\n' +
        '\r\n');
      socket.on('data', handleSocketData.bind(this, socket));
    }
  })
}

module.exports = {
  handleSocketData,
  createWebSocketServer
};
