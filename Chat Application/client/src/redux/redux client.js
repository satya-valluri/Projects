// import React, { useState, useEffect, useRef } from 'react'
// import ReactDOM from 'react-dom'
// //import { Provider, useSelector, useDispatch } from 'react-redux'
// //import { AddChatAction } from './redux/actions/ChatHistoryActions'
// import Store from './redux/store'
// import { ConnectToServer, SendMessageToServer } from './socket'

// let id = 0;

// const App = () => {
//     const [value, SetValue] = useState("");
//     const [chatMessages,SetChatMessages] = useState([]);
//     //const dispatch = useDispatch();
//     useEffect(() => {
//         let OnMessageFromServerCB = (msg) => {
//             //dispatch(AddChatAction({ sender: "user", msg }))
//             console.log('received data from server');
//             SetChatMessages(chatMessages.concat([{sender:"user",msg}]))
//         }
//         ConnectToServer(OnMessageFromServerCB);
//     }, []);

//     // TODO : Why is use selected called twice 
//     //let chatArray = useSelector(state => {
//     //    return state.blob
//     //});

//     const inputRef = useRef(null);

//     const handleInputChange = (e) => SetValue(e.target.value)

//     const EnterKeyPressed = (e) => (e.key === 'Enter') ? sendMessage() : (true)
//     const OnSendButtonPressed = (e) => sendMessage()
//     const sendMessage = () => {
//         if (value.length === 0 || !value)
//             return;
//         SendMessageToServer(value)
//         UpdateStore(value)
//     }
//     const UpdateStore = (msg) => {
//         //dispatch(AddChatAction({ sender: "user", msg }));
//         SetChatMessages(chatMessages.concat([{sender:"user",msg}]))
//         SetValue(' ')
//     }

//     return (
//         <div>
//             <div style={{ margin: "auto", width: "80vh", }}>
//                 <br />
//                 <RenderTitle />
//                 <RenderChatList chatEntries={chatMessages} />
//                 <div className="form-group" style={{ "top": "1vh" }}>
//                     <RenderDumbInput inpref={inputRef} val={value} OnChangeCB={handleInputChange} OnKeyDownCB={EnterKeyPressed} />
//                     <RenderDumbButton OnClickCB={OnSendButtonPressed} />
//                 </div>
//             </div>
//         </div>
//     )
// }
// const RenderTitle = () => <div className='alert alert-primary form-group' role='alert' >cvhbcdgh</div>

// const RenderChatList = ({ chatEntries }) => {
//     const chatListStyle = { position: "relative", top: "1vh", border: "1px solid pink", height: "70vh", overflow: "auto" }
//     return (
//         <div className="form-group" style={chatListStyle}>
//             {
//                 chatEntries.map(element => {
//                     return <div key={id++} className='alert alert-light' role='alert'>{element.msg}</div>
//                 })
//             }
//         </div>
//     )
// }

// const RenderDumbInput = ({ inpref, val, OnChangeCB, OnKeyDownCB }) => {
//     return (
//         <div>
//             <textarea
//                 className='form-control'
//                 ref={inpref} value={val} onChange={OnChangeCB} onKeyDown={OnKeyDownCB}>
//             </textarea>
//             <br />
//         </div>
//     )
// }

// const RenderDumbButton = ({ OnClickCB }) => <button className="btn btn-primary" onClick={OnClickCB}> Send</button>

// //const ReduxApp = <Provider store={Store}><App /></Provider>
// ReactDOM.render(<App />, document.getElementById('root'));