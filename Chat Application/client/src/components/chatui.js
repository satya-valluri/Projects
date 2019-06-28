import React from 'react'
let id = 0;

const RenderTitle = () => <div className='alert alert-primary form-group' role='alert' >Chat App</div>

const RenderChatList = ({ chatEntries }) => {
    const chatListStyle = { position: "relative", top: "1vh", border: "1px solid pink", height: "70vh", overflowY: "auto" }
    return (
        <div className="form-group" style={chatListStyle} onScroll={(e) => console.log('scrolling')}>
            {
                chatEntries.map(element => {
                    return (
                        <div>
                            <hr></hr>
                            <div key={id++} className='alert alert-light' role='alert'>{element.msg}</div>
                        </div>
                    )

                })
            }
        </div>
    )
}

const RenderDumbInput = ({ val, OnChangeCB, OnKeyDownCB }) => {
    return (
        <div>
            <textarea className='form-control'
                value={val} onChange={OnChangeCB} onKeyDown={OnKeyDownCB}>
            </textarea>
            <br />
        </div>
    )
}

const RenderDumbButton = ({ OnClickCB }) => <button className="btn btn-primary" onClick={OnClickCB}> Send</button>

export { RenderTitle, RenderChatList, RenderDumbButton, RenderDumbInput }