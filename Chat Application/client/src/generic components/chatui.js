import React, { useRef, useEffect } from 'react'

let id = 0;

const RenderTitle = ({ title }) => (<div className='alert alert-primary form-group' role='alert' >{title}</div>)

const RenderChatList = ({ chatEntries }) => {

    const xRef = useRef(null);
    useEffect(
        () => {
            if (xRef.current.scrollHeight > xRef.current.clientHeight)
                xRef.current.scrollIntoView( { behavior: 'smooth', block: 'center', inline: 'start' } );
        }
    ) 

    const chatListStyle = { position: "relative", top: "1vh", border: "1px solid pink", height: "70vh", overflowY: "auto" }
    const chatItemStyle = { border: "1px solid grey", margin: '2px' }

    return (
        <div className="form-group" ref={xRef} style={chatListStyle}>
            {
                chatEntries.map(
                    element => (<div key={id++}><div className='alert alert-light' style={chatItemStyle} role='alert'>{element.msg}</div></div>)
                )
            }
        </div>
    )
}

const RenderDumbInput = ({ rf, val, OnChangeCB, OnKeyDownCB }) => {
    return (
        <div className="input-group mb-3">
            <input ref={rf} type="text" className="form-control" placeholder="Type your chat here" aria-label="Username" aria-describedby="basic-addon1"
                value={val}
                onChange={OnChangeCB}
                onKeyDown={OnKeyDownCB}
            />
            <br />
        </div>
    )
}

const RenderDumbButton = ({ OnSendCB }) => {
    return <button className="btn btn-primary" onClick={OnSendCB}> Send</button>
}


export { RenderTitle, RenderChatList, RenderDumbButton, RenderDumbInput }