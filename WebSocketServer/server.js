const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const url = require('url');

const port = 6969;
const server = http.createServer(express);
const webSocketServer1 = new WebSocket.Server({ noServer: true });
const webSocketServer2 = new WebSocket.Server({ noServer: true });

webSocketServer1.on('connection', (webSocketClient) => {
    webSocketClient.on('message', (incomingMessage) => {
        const message = incomingMessage ? JSON.parse(incomingMessage) : {};
        webSocketServer1.clients.forEach((client) => {
            if (client !== webSocketClient && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: message.type,
                    text: message.text,
                    user: message.user + ": ",
                }));
            }
        })
    })
});

webSocketServer2.on('connection', (webSocketClient) => {
    webSocketClient.on('message', (incomingMessage) => {
        const message = incomingMessage ? JSON.parse(incomingMessage) : {};
        webSocketServer2.clients.forEach((client) => {
            if (client !== webSocketClient && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({
                    type: message.type,
                    text: message.text,
                    user: message.user + ": ",
                }));
            }
        })
    })
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;

    if (pathname === '/wss1') {
        webSocketServer1.handleUpgrade(request, socket, head, function done(ws) {
            webSocketServer1.emit('connection', ws, request);
        });
    } else if (pathname === '/wss2') {
        webSocketServer2.handleUpgrade(request, socket, head, function done(ws) {
            webSocketServer2.emit('connection', ws, request);
        });
    }
});

server.listen(port, () => {
    console.log(`Server is listening on ${port}!`)
});
