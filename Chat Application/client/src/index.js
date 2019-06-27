import React, { useState,useRef } from 'react'
import ReactDOM from 'react-dom'
import { ConnectToServer, SendMessageToServer } from './socket'
import {RenderTitle , RenderChatList, RenderDumbButton,RenderDumbInput} from './components/chatui'


const ChatApp = () => {
    const [value, SetValue] = useState("")
    const [chatMessages, SetChatMessages] = useState([])

    let OnMessageFromServerCB = (msg)=>SetChatMessages(chatMessages.concat([{ sender: "user", msg }]))
    
    ConnectToServer(OnMessageFromServerCB)

    const handleInputChange = (e) => SetValue(e.target.value)

    const EnterKeyPressed = (e) => (e.key === 'Enter') ? sendMessage() : (true)
    const OnSendButtonPressed = (e) => sendMessage()
    const sendMessage = ()=>(value.length !== 0 || value) ? (SendMessageToServer(value),UpdateStore(value)) : (false)

    const UpdateStore = (msg) => {
        SetChatMessages(chatMessages.concat([{ sender: "user", msg }]))
        SetValue(' ')
    }

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