const express = require('express');
const app = express();
const http = require('http');
const WebSocket = require('ws');
const port = process.env.PORT || 6969;
const server = http.createServer(express);
const webSocketServer = new WebSocket.Server({ server: server });

app.use(express.static(__dirname + "/"));

function dummy(){};

function heartbeat() {
    this.isAlive = true;
}

webSocketServer.on('connection', (webSocketClient) => {
    webSocketClient.isAlive = true;
    webSocketClient.on('pong', heartbeat)

    webSocketClient.on('message', (message) => {
        webSocketServer.clients.forEach((client) => {
            if (client !== webSocketClient && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    })
});

const interval = setInterval(function ping(){
    webSocketServer.clients.forEach((client) => {
        if (client.isAlive === false) {
            return client.terminate();
        }
            client.isAlive = false;
            client.ping(dummy);
    });
}, 20000);

webSocketServer.on('close', function close(){
    clearInterval(interval);
})

server.listen(port, () => {
    console.log(`Server is listening on ${port}!`)
});
