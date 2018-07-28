import React, { Component } from 'react';
import './App.css';
import Graphic from './Graphic.js';
import * as firebase from 'firebase';
import { db } from 'firebase'


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
      )
    }
  }



export default App;
