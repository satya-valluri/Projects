import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'
import { ConnectToServer, SendMessageToServer } from './socket'
import { RenderTitle, RenderChatList, RenderDumbButton, RenderDumbInput } from './components/chatui'

const ChatApp = () => {
    const [value, SetValue] = useState("")
    const [connected, SetConnected] = useState(false)
    const [chatMessages, SetChatMessages] = useState([])

    let OnMessageFromServerCB = (msg) => SetChatMessages(chatMessages.concat([{ sender: "user", msg }]))
    //let OnMessageFromServerCB = useCallback((msg)=> SetChatMessages(chatMessages.concat([{ sender: "user", msg }])),[chatMessages]);

    let OnConnectToServerCB = () => { console.log('connection to server established'); SetConnected(true); }
    let OnDisConnectToServerCB = () => { console.log('connection to server lost'); SetConnected(false); }

    ConnectToServer(OnMessageFromServerCB, OnConnectToServerCB, OnDisConnectToServerCB);

    const handleInputChange = (e) => SetValue(e.target.value);
    const EnterKeyPressed = (e) => {
        if (e.key === 'Enter' && connected) {
            SetChatMessages(chatMessages.concat([{ sender: "user", msg: value }]));
            sendMessage()
        }
    }
    const OnSendButtonPressed = (e) => {
        if (connected){
            SetChatMessages(chatMessages.concat([{ sender: "user", msg: value }]) );
            sendMessage()
        }
    }
    const sendMessage = () => (value.length !== 0 || value) ? (SetValue(' '),SendMessageToServer(value)) : (true)

    return (
        <div>
            <div style={{ margin: "auto", width: "80vh", }}>
                <br />
                <RenderTitle />
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