import React, { useState, useRef, useCallback } from 'react'
import { RenderDumbInput, RenderDumbButton } from '../generic components/chatui'
import useSocket from '../socket'

const RenderTail = () => {
    const socket = useSocket();
    const iRef = useRef();
    const [val, SetVal] = useState('');

    const OnChangeCB = useCallback(
        (e) => {
            SetVal(e.target.value)
        }, []
    )

    const OnKeyDownCB = (e) => {
        if (e.key === 'Enter' && val.length > 1) {
            socket.emit('chat-message', val)
            clearValues()
        }
    }

    const OnSendCB = useCallback(
        (e) => {
            socket.emit('chat-message', val)
            clearValues()
        }
        , [val, socket]);

    const clearValues = () => {
        iRef.current.value = ''
        SetVal("");
    }
    
    return (
        <div>
            <RenderDumbInput rf={iRef} val={val} OnChangeCB={OnChangeCB} OnKeyDownCB={OnKeyDownCB} />
            <RenderDumbButton OnSendCB={OnSendCB} />
        </div>
    )
}

export default RenderTail;