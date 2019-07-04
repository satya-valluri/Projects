const express = require('express');
const http = require('http');
const socketio = require('socket.io');

{console.clear()}

const app = express();
app.get('/', (req, res) => {
    console.log(`${new Date().toLocaleString('en-US')} ->HTTP  request received..!`);
    res.send('<h4> Hello <br/> You are connected to NodeJS Server Running a Chat App</h4>');
})

const server = http.createServer(app);
server.listen(8080, () => {
    console.log(`${new Date().toLocaleString('en-US')} ->HTTP Server listening on port 8080`);
})

const ioConnection = socketio(server); 

//Listen on the connection event for incoming sockets
ioConnection.on('connection', (socket) => {
    
    console.log(`${new Date().toLocaleString('en-US')} ->Server::Socket - New Connection Received`);
    socket.on('chat-message', (msg) => {
       //console.log(`Message ${new Date().toLocaleString('en-US')} : ${msg}`);
       ioConnection.emit('chat-message',msg) //to all        
       //socket.broadcast.emit('chat-message',msg)// to all other than sender.
    })

    socket.on('disconnect', () => {
        console.log(`${new Date().toLocaleString('en-US')} ->client disconnected from a socket`);
    })
})
    