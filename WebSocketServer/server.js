const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const port = process.env.PORT || 6969;
const server = http.createServer(express);
const webSocketServer = new WebSocket.Server({ server: server });

app.use(express.static(__dirname + "/"));

webSocketServer.on('connection', (webSocketClient) => {
    webSocketClient.on('message', (message) => {
        webSocketServer.clients.forEach((client) => {
            if (client !== webSocketClient && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    })
});

server.listen(port, () => {
    console.log(`Server is listening on ${port}!`)
});
