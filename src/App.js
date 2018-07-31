import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import MapContainer from './components/MapContainer.js';
import { createMuiTheme, MuiThemeProvider, getMuiTheme } from '@material-ui/core/styles';
import { blueGrey, red } from '@material-ui/core/colors';

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


  render() {
    console.log(window.google);
    return (
    <MuiThemeProvider theme={theme}>
      <div>
        <NavBar />
        <MapContainer />
      </div>
    </MuiThemeProvider>
  );
 }
}

export default App;
