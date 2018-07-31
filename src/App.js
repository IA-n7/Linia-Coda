import React, { Component } from "react";
import "./App.css";
// eslint-disable-next-line
import * as firebase from "firebase";
// eslint-disable-next-line
import { db, fire } from "./config/firebase.js";
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

  
  // authListener = () => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({ loggedUser: user });
  //       message = <p>Hi, you're logged in bigman</p>
  //     } else {
  //       // this.setState({ loggedUser: {} });
  //       message = <p>You ain't, son</p>
  //     }
  //   });
  // };
  
  signUpOnSubmit = e => {
    e.preventDefault();
    const fullName = document.getElementById("full-name-field");
    const email = document.getElementById("email-field");
    const password = document.getElementById("password-field");
    const passwordConfirm = document.getElementById("password-confirm-field");
    if (password.value === passwordConfirm.value) {
      auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      ).then((result) => {
        console.log(this.state.loggedUser);
      }).catch((e) => {
       console.log(e.message);
      });
    }
  };
  
  signInOnSubmit = e => {
    e.preventDefault();
    const email = document.getElementById("email-field");
    const password = document.getElementById("password-field");
    auth.signInWithEmailAndPassword(
      email.value,
      password.value
    ).then((result) => {
      console.log(this.state.loggedUser);
    }).catch((e) => {
      console.log(e.message);
    });
  };
  
  logout = () => {
    firebase.auth().signOut();
  };
  
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedUser: user });
        console.log(this.state.loggedUser)
      } else {
        this.setState({ loggedUser: null });
        console.log(this.state.loggedUser)
      }
    });
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
        <Paper className="paper-form">
          <h2 className="form-title">Sign Up</h2>
          <form autoComplete="off">
            <TextField
              name="name"
              label="Full Name"
              id="full-name-field"
              onChange={this.handleChange}
              margin="normal"
              />
            <br />
            <TextField
              name="email"
              label="Email"
              id="email-field"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <TextField
              name="Password"
              label="Password"
              type="password"
              id="password-field"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <TextField
              name="Password-confirm"
              label="Confirm Password"
              type="password"
              id="password-confirm-field"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <Button
              type="submit"
              color="primary"
              variant="raised"
              id="sign-up-submit"
              onClick={this.signUpOnSubmit}
            >
              Sign Up
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="raised"
              id="sign-in-submit"
              onClick={this.signInOnSubmit}
            >
              Sign In
            </Button>
          </form>
          <span className="sign-up-separator">___________________</span>
          <br/>
            <Button
              type="button"
              color="primary"
              variant="raised"
              id="logout-submit"
              onClick={this.logout}
            >
              Log Out
            </Button>
          {/* <GoogleButton className="google-sign-in" onClick={this.signInWithGoogle(this, new firebase.auth().GoogleAuthProvider())}/> */}
        </Paper>
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
