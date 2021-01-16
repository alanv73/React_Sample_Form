import React, { Component } from 'react'
import Main from '../main';
import './App.css';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sample Form</h1>
        </header>
        <div className="container">
          <Main />
        </div>
      </div>
    );
  }
}

export default App;
