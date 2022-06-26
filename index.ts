import { httpServer } from './src/http_server/index';
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

  duplex.on('data', (data) => {
    processingData(data).then((answer) => {
      duplex.write(answer);
      process.stdout.write(
        `Command "${data}" received and result "${answer}" sent.\n`
      );
    });
  });

  ws.on('close', () => {
    duplex.destroy();
    wss.close();
  });
});

wss.on('close', () => {
  console.log('WebSocket closed!\n');
  process.exit();
});
