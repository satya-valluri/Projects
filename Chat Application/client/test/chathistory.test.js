const ChatHistoryReducer = require('../src/redux/reducers/ChatHistoryReducer');
const AddChatAction =  require('../src/redux/actions/ChatHistoryActions');

test('Test Add Chat', () => {
    const initialState = {
        blob: []
    }
    payload = {
        sender: "user",
        msg: "Hello there"
    }
    const action = AddChatAction(payload);

    const finalState = { blob : [{sender: "user", msg: "Hello there"}] }

    expect(ChatHistoryReducer(initialState, action)).toEqual(finalState)
})


/*
state = {
blob : [{sender:"IronMan", msg:"I am the strongest"} , {sender:"SpiderMan", msg:"I am Incredible"}]
}
*/