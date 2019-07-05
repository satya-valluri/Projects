import React, { useCallback, useEffect} from 'react'
import { RenderChatList } from '../generic components/chatui'

import useSocket from '../socket'
import { useDispatch, useSelector } from 'react-redux'

import { AddChatAction } from '../redux/actions/ChatHistoryActions'

let id = 0;

const RenderBody = () => { 

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

    const objArr = useSelector(state => {
        return { arr: state.blob }
    });

    return (
        <div >
             <RenderChatList key={id++} chatEntries={objArr.arr}/>            
        </div>
    )
}

export default RenderBody