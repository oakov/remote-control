import Jimp from 'jimp';
import { httpServer } from './src/http_server/index';
import robot from 'robotjs';
import { createWebSocketStream, WebSocketServer } from 'ws';
import { HTTP_PORT, WEBSOCKET_PORT } from './src/constants';
import processingData from './src/data_processing';

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: WEBSOCKET_PORT });

wss.on('connection', (ws) => {
  console.log(`WebSocket started on port: ${WEBSOCKET_PORT}!\n`);

  const duplex = createWebSocketStream(ws, {
    encoding: 'utf-8',
    decodeStrings: false,
  });

  duplex.on('data', (chunk) => {
    console.log(`Received ${chunk} of data.`);
    processingData(chunk).then((answer) => {
      duplex.write(answer);
      console.log(`Command "${chunk}" received and result "${answer}" sent`);
    });
  });
});

wss.on('close', () => {
  console.log('WebSocket closed!\n');

  wss.on('wsClientError', () => {
    console.log('WebSocket jkjkjb!\n');
  });
});
