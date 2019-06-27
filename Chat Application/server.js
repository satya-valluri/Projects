const express = require('express');
const http = require('http');
const socketio = require('socket.io');

{console.clear()}

const app = express();
app.get('/', (req, res) => {
    console.log(`${new Date().toLocaleString('en-US')} ->HTTP  request received..!`);
    res.send('<h1> Hello </h1>');
})

const server = http.createServer(app);
server.listen(5000, () => {
    console.log(`${new Date().toLocaleString('en-US')} ->HTTP Server listening on port 4000`);
})

const ioConnection = socketio(server); 

//Listen on the connection event for incoming sockets
ioConnection.on('connection', (socket) => {
    
    console.log(`${new Date().toLocaleString('en-US')} ->Server::Socket - New Connection Received`);
    
    socket.on('chat-message', (msg) => {
        console.log(`${new Date().toLocaleString('en-US')} : ${msg}`);
        //ioConnection.emit('chat-message',msg) //to all        
       socket.broadcast.emit('chat-message',msg)// to all other than sender.
    })

    socket.on('disconnect', () => {
        console.log(`${new Date().toLocaleString('en-US')} ->client disconnected from a socket`);
    })
})
    