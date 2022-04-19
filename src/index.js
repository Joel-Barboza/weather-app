import React from 'react'
import ReactDOM from 'react-dom'
import ApiRequest from './components/ApiRequest.js'
import "./styles.css"
import Header from './components/Header'
import Main from './components/Main'


const App = () => {
    return (
        <div className="app">
            <Header />
            
            <Main />
            
        </div>
    )
}
ReactDOM.render(<App />, document.getElementById('root'))