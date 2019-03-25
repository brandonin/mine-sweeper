import React, { Component } from 'react';
import Board from './Board';
import Game from './Game';
import './App.css';

class App extends Component {
  handleClick = (value) => {
    console.log('hello', value)
  }

  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
