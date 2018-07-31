import React, { Component } from 'react';
import './App.css';
import db from './config/firebase.js';
import User from "./User.js";
import FloatingActionButtons from './button.js';
import ComplexGrid from './gridLayout.js';
import Graphic from "./Graphic.js";
import { createMuiTheme, MuiThemeProvider, getMuiTheme } from '@material-ui/core/styles';
import { blueGrey, red } from '@material-ui/core/colors';
import QueueSelect from "./QueueSelect.js";



const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[300],
      main: blueGrey[700],
      dark: blueGrey[900],
    },
    secondary: {
      light: red[500],
      main: red[800],
      dark: red[900],
    }
  },
});


class App extends Component {
   constructor() {
     super();
     this.state = {
       user: "Beyonce",
       name:  "I sure love MnM"
     };
   }

    componentDidMount() {
      console.log('Component Mounted')
    }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
      <ComplexGrid />
      </MuiThemeProvider>
      )
    }
}

export default App;
