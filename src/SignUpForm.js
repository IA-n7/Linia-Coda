import React, { Component } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import * as firebase from "firebase";
import { db, fire } from "./config/firebase.js";
import GoogleButton from "react-google-button";

let firebaseui = require("firebaseui");

class SignUpForm extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.authListener();
    console.log(this.state.user)
  }

  signUpOnSubmit = e => {
    e.preventDefault();
    const auth = firebase.auth();
    const fullName = document.getElementById("full-name-field");
    const email = document.getElementById("email-field");
    const password = document.getElementById("password-field");
    const passwordConfirm = document.getElementById("password-confirm-field");
    if (password.value === passwordConfirm.value) {
      auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      ).then((result) => {
        this.state.user = result.user.uid
      }).catch((e) => {
       console.log(e.message);
      });
    }
  };

  signInWithGoogle = provider => {
    firebase.auth().signInWithRedirect(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    return (
      <div>
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
          </form>
          <span className="sign-up-separator">___________________</span>
          {/* <GoogleButton className="google-sign-in" onClick={this.signInWithGoogle(this, new firebase.auth().GoogleAuthProvider())}/> */}
        </Paper>
      </div>
    );
  }
}

export default SignUpForm;
