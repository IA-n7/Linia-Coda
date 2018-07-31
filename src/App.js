import React, { Component } from 'react';
import './App.css';
import db from './config/firebase.js'
import User from "./User.js";
import FloatingActionButtons from './button.js'
import ComplexGrid from './gridLayout.js'
import Graphic from "./Graphic.js";

class App extends Component {
   constructor() {
     super();
     this.state = {
       user: "Nicholas",
       name:  "I sure love MnM"
     };
   }

    componentDidMount() {
      console.log('Component Mounted')
    }

  render() {

    return (
      <div>
      <h3>App.js</h3>
    <ComplexGrid />


      </div>

      )
    }
}

export default App;
