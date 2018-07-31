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
      loggedUser: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }
  
  authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedUser: user });
        console.log(this.loggedUser);
      } else {
        this.setState({ loggedUser: null });
        console.log(this.loggedUser);        
      }
    });
  };
  
  signUpOnSubmit = e => {
    e.preventDefault();
    const auth = firebase.auth();
    const fullName = document.getElementById("full-name-field");
    const email = document.getElementById("email-field");
    const password = document.getElementById("password-field");
    const passwordConfirm = document.getElementById("password-confirm-field");
    if (password.value == passwordConfirm.value) {
      auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      ).then((result) => {
        this.state.loggedUser = result.user
        console.log(this.state.loggedUser)
      }).catch((e) => {
       console.log(e.message);
      });
    }
    window.location.reload();
  };

  signInOnSubmit = e => {
    e.preventDefault();
    const auth = firebase.auth();
    const email = document.getElementById("email-field");
    const password = document.getElementById("password-field");
    auth.signInWithEmailAndPassword(
      email.value,
      password.value
    ).then((result) => {
      this.state.loggedUser = result.user.uid
      console.log(this.state.loggedUser)
    }).catch((e) => {
      console.log(e.message);
    });
  };

  logout = () => {
    firebase.auth().signOut();
  };

  // componentDidMount() {
  //   this.authListener();
  //   console.log(this.user);
  // }

  render() {
    let message;
    if (this.state.loggedUser) {
      message = <p>Hi, you're logged in bigman</p>
    } else {
      message = <p>You ain't, son</p>
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

// constructor() {
//      super();
//      this.state = {
//        user: "Nicholas"
//      };
//    }
//    componentDidMount() {
//      db.collection("users").add({
//        first: "Ada",
//        email: "ada@mail.com"
//      })
//      .then(function(docRef) {
//          console.log("Document written with ID: ", docRef.id);
//      })
//      .catch(function(error) {
//          console.error("Error adding document: ", error);
//      });
//      let usersRef = db.collection("users")

//      usersRef.get().then(function(results) {
//        if(results.empty) {
//          console.log("No documents found!");
//        } else {
//          results.forEach(function (doc) {
//            console.log("Document data:", doc.data().first);
//          });
//          console.log("Document data:", results.docs[0].data());
//        }
//      }).catch(function(error) {
//          console.log("Error getting documents:", error);
//      });
//   }

export default App;
