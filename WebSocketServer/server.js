const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const socketServer = new WebSocket.Server({ server });

socketServer.on('connection', (webSocketClient) => {
    webSocketClient.on('message', (incomingMessage) => {
        socketServer.clients.forEach((client) => {
            if (client !== webSocketClient && client.readyState === WebSocket.OPEN) {
                client.send(incomingMessage);
            }
        });
    });
});

server.listen(port, () => {
    console.log(`Server is listening on ${port}!`)
});
