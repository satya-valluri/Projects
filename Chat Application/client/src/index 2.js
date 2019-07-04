import React, { useState, useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'

//custom imports
import useConnectToServer from './socket2'
import { RenderTitle, RenderChatList, RenderDumbButton, RenderDumbInput } from './components/chatui'

const ChatApp = () => {
    console.log('rendering chat app');
    
    const [value, SetValue] = useState("")
    const [CBInitialized, setCBInitialized] = useState(false);
    const [connected, SetConnected] = useState(false)
    const [chatMessages, SetChatMessages] = useState([])
    let socket = useConnectToServer();

    const OnConnectToServerCB = useCallback(
        () => {
            if (socket) {
                console.log('Connected to server  - socket id is ' + socket.id + socket.connected);
                SetConnected(true)
            }
        }, [socket]);

    const OnDisConnectToServerCB = useCallback(
        () => {
            console.log('dis-connected from server'); SetConnected(false)
        }, []);

    const OnMessageFromServerCB = (msg) => {
        console.log('OnMessageFromServerCB function - executed');
        
        console.log('received new message' + msg);
        SetChatMessages(chatMessages.concat([{ sender: "user", msg }]))
    }

    const initializeCallbacks = useCallback(
        () => {
            if (socket) {
                console.log('initializing callbacks')
                socket.on('connect', msg => OnConnectToServerCB(msg))
                socket.on('disconnect', msg => OnDisConnectToServerCB(msg))
                setCBInitialized(true);
            }
        });

    if (socket) socket.on('chat-message', msg => OnMessageFromServerCB(msg))

    const doNothing = () => { }

    (!CBInitialized && socket) ? initializeCallbacks() : doNothing();

    const handleInputChange = (e) => SetValue(e.target.value)

    const EnterKeyPressed = (e) => {
        //check for a way to trim white space characters before any character - using regular expressions
        if (e.key === 'Enter' && connected && socket) {
            if (value.length === 1 && !(/\s/.test(value)))
                SetChatMessages(chatMessages.concat([{ sender: "user", msg: value }]));
            sendMessage()
        }
    }
    const OnSendButtonPressed = (e) => {
        if (connected) {
            SetChatMessages(chatMessages.concat([{ sender: "user", msg: value }]));
            sendMessage()
        }
    }
    const sendMessage = () => (value.length !== 0 && value) ? (SetValue(''), console.log('sending messages to server'), socket.emit('chat-message', value)) : (true)

    if (!connected)
        return (<div>Connecting to chat - server</div>)
    else
        return (
            <div>
                <div style={{ margin: "auto", width: "50vh" }}>
                    <br />
                    <RenderChatList chatEntries={chatMessages} />
                    <div className="form-group" style={{ "top": "1vh" }}>
                        <RenderDumbInput val={value} OnChangeCB={handleInputChange} OnKeyDownCB={EnterKeyPressed} />
                        <RenderDumbButton OnClickCB={OnSendButtonPressed} />
                    </div>
                </div>
            </div>
        )
}

ReactDOM.render(<ChatApp />, document.getElementById('root'));