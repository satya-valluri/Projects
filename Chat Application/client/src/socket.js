import io from 'socket.io-client'

const serverURL = "http://localhost:5000/"

let socket = io(serverURL);

function ConnectToServer(cb){
 socket.on('chat-message',msg=>cb(msg))    
}

function SendMessageToServer(msg){
    socket.emit('chat-message', msg);
}
export {ConnectToServer, SendMessageToServer}