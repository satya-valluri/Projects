//import React from 'react'

const initialState = {
    blob: []
}

const ChatHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CHAT' :
            return AddChat(state, action.payload);
        default :
            return state;
    }
}

/* 
initialState = {
blob : [{sender:"IronMan", msg:"I am the strongest"} , {sender:"SpiderMan", msg:"I am Incredible"}]
}
*/

const AddChat = (state, payload) => {
    const newState ={};
    Object.assign(newState,state);
    newState.blob.push(payload);
    return newState;
}

export { ChatHistoryReducer }
//module.exports = ChatHistoryReducer

