import React, { Component } from 'react';
import { Math } from './math';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="App">
        <Math />
        <a
          href="https://github.com/HegarGarcia/ED2018"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    );
  }
}

export default App;
