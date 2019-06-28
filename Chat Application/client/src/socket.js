import io from 'socket.io-client'
import getip from './utilities/localip'

async function getserverURL() {    
    const ip = await getip()
    let urlbegin = "http://"
    let urlend = ":8080/"

    let url = String.prototype.concat(urlbegin,ip,urlend)
    //const url = "http://10.140.202.77:8080/";
    return url;
}

let socket;

async function ConnectToServer(cbOnMessage,cbOnConnection,cbOnDisConnection) {                
    if (!socket) {
        const data = await getserverURL();
        socket = io(data);
        //cbOnConnection();    
    }
    socket.on('connect', msg => cbOnConnection(msg))
    socket.on('chat-message', msg => cbOnMessage(msg))
    socket.on('disconnect', msg => cbOnDisConnection(msg))
}

const SendMessageToServer = (msg) => {
    socket.emit('chat-message', msg);
}
export { ConnectToServer, SendMessageToServer }
