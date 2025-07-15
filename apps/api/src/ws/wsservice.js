const websocket = require('ws');
const was = new websocket.Server({ port: 8080 });
was.on('connection', (ws) => {
  console.log('New client connected');  

  ws.send('Welcome to the WebSocket server!');


    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Response from HT : You sent ${message}`); // Echo the message back to the client
        // Handle incoming messages
    });

    setInterval(() => {
        ws.send('Totally there are : ' + was.clients.size + ' clients connected');
    }, 5000); 

    
});

// export class WsService {
//   private wss: websocket.Server;

//   constructor() {
//     this.wss = new websocket.Server({ port: 8080 });
//     this.wss.on('connection', (ws) => {
//       console.log('New client connected');
//       ws.on('message', (message) => {
//         console.log(`Received message: ${message}`);
//         // Handle incoming messages
//       });
//       ws.on('close', () => {
//         console.log('Client disconnected');
//       });
//     });
//   }

//   public sendMessageToAllClients(message: string): void {
//     this.wss.clients.forEach((client) => {
//       if (client.readyState === websocket.OPEN) {
//         client.send(message);
//       }
//     });
//   }
// }