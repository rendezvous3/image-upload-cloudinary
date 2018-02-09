import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Images from './components/images'

class App extends Component {
  render(){
    return(<div>
            <h5>React App</h5>
            <hr />
            <Images />
          </div>)
  }
}


ReactDOM.render(<App />, document.getElementById('root'))
