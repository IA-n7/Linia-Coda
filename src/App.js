import React, { Component } from "react";
import "./App.css";
// eslint-disable-next-line
import * as firebase from "firebase";
// eslint-disable-next-line
import db from "./config/firebase.js";
import Landing from "./Landing.js";
import User from "./User.js";
import Graphic from "./Graphic.js";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { blueGrey, red } from "@material-ui/core/colors";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import ("./Landing.css");
const auth = firebase.auth();
let message;



const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[300],
      main: blueGrey[700],
      dark: blueGrey[900]
    },
    secondary: {
      light: red[500],
      main: red[800],
      dark: red[900]
    }
  }
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedUser: null
    };
  }
  
  authListener = () => auth.onAuthStateChanged(user => {
    if (user) {
      this.setState({ loggedUser: user });
      console.log(this.state.loggedUser)
    } else {
      this.setState({ loggedUser: null });
      console.log(this.state.loggedUser)
    }
  });

  componentDidMount() {
    this.authListener();
  }

  render() {
    
    if (this.state.loggedUser == null) {
      message = <p>You ain't, son</p>
    } else {
      message = <p>Hi, you're logged in bigman</p>
    }

    return (
      <MuiThemeProvider theme={theme}>
        
        <div>
          HELLOOOOO
        <div>
          
        {message}
      <Landing authListener={this.authListener} loggedUser={this.state.loggedUser} />

      </div>
          <Graphic />
          {/* USER COMPONENT RENDERING */}
          <User />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
