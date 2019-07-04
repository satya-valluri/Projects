/*
This hook returns the socket object 
*/
import io from 'socket.io-client'
import { useState, useEffect } from 'react'

const useConnectToServer = () => {

    let [socket,setSocket] = useState(null);
    useEffect(() => {        
        console.log('creating a socket to node server 10.140.202.77:8080')
        socket = io("http://10.140.202.77:8080/");    
        setSocket(socket)
    }, []); //Executes only once

    return socket;
}

export default useConnectToServer;