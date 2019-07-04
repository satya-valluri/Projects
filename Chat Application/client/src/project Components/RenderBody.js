import React, { useCallback, useEffect, useState } from 'react'
import { RenderChatList } from '../generic components/chatui'

import useSocket from '../socket'
import { useDispatch, useSelector } from 'react-redux'

import { AddChatAction } from '../redux/actions/ChatHistoryActions'

const chatMessages = [
    { sender: "user", msg: "Hi" },
]

const RenderBodyHelper = () => {

    const dispatch = useDispatch()

    const socket = useSocket();

    const cbfn = useCallback(
        (msg) => {
            dispatch(AddChatAction({ sender: "user", msg }))
        }, [dispatch]
    )

    useEffect(
        () => { 
            if (socket)
                socket.on('chat-message', cbfn)
        }, [socket, cbfn]
    )

    useSelector(state => {

        if (state.blob.length > 0)
            console.log('received data from store' + JSON.stringify(state.blob))

        return state.blob
    });

    console.log('rendering chat messages')

    return (
        <div >
            <RenderChatList chatEntries={chatMessages} />
        </div>
    )
}

export default RenderBodyHelper