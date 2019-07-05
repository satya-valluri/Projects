import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import Store from './redux/store'
import RenderHead from './project Components/RenderHead'
import RenderBody from './project Components/RenderBody'
import RenderTail from './project Components/RenderTail'


const ChatApp = () => {
    return (
        <div style={{ margin: "auto", width: "80vh",}} >
            <Provider store={Store}>
                <RenderHead />
                <RenderBody />                
                <RenderTail />
            </Provider>
        </div>
    )
}

ReactDOM.render(<ChatApp />, document.getElementById('root'))
