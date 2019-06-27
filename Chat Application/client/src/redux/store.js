import {createStore} from 'redux'
import {ChatHistoryReducer} from './reducers/ChatHistoryReducer'

const Store = createStore(ChatHistoryReducer);

export default Store;

