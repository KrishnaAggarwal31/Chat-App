"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let usercount = 0;
let allSockets = []; //[socket1, socket2, socket3]
wss.on("connection", (socket) => {
    allSockets.push(socket);
    usercount = usercount + 1;
    console.log("user connected #" + usercount);
    socket.on("message", (message) => {
        console.log("message received " + message.toString());
        allSockets.forEach(s => {
            s.send(message.toString() + ": sent by the server");
        });
        // for (let i = 0; i < allSockets.length; i++) {
        //     const s = allSockets[i];
        //     s.send(message.toString() + ": sent from the server");
        // }       
    });
});
