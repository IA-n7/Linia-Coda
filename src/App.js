import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graphic from './Graphic.js';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
      HELLOOOOO
      <Graphic />
      </div>
    );
  }
}

export default App;
