import io from 'socket.io-client'
import { useState } from 'react'

let socket = null;

const OnConnectToServerCB = () => {
    if (socket)
        console.log('Connected to server  - socket id is ' + socket.id + socket.connected);
}

const OnDisConnectToServerCB = () => console.log('dis-connected from server')

// const OnMessageFromServerCB = (msg) => {
//     console.log('received new message - ' + msg);
// }

const useSocket = (msgCallBack) => {
    const [connected, SetConnected] = useState('false');

    if (socket === null || !connected) {
        console.log('creating socket ');
        socket = io("http://10.140.202.77:8080/");
        socket.on('connect', msg => { SetConnected(true); OnConnectToServerCB(msg) })
        socket.on('disconnect', msg => OnDisConnectToServerCB(msg))
        //socket.on('chat-message', msg => OnMessageFromServerCB(msg))
        //socket.on('chat-message', msg => msgCallBack(msg))
    }
    else
        return socket;
}

export default useSocket;