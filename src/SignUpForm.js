import React, { Component } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import * as firebase from "firebase";
import db from "./config/firebase.js";
import GoogleButton from "react-google-button";
import FacebookLogin from 'react-facebook-login';
const auth = firebase.auth();

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullNameLabel: "Full Name",
      phoneNumberLabel: "Phone Number",
      passwordConfirmLabel: "Password Confirm"
    }
  }

  signInWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signInWithFacebook = () => {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  signUpOnSubmit = e => {
    e.preventDefault();
    const fullName = document.getElementById("full-name-field");
    const email = document.getElementById("email-field");
    const phoneNumber = document.getElementById("phone-number-field")
    const password = document.getElementById("password-field");
    const passwordConfirm = document.getElementById("password-confirm-field");
    if (password.value === passwordConfirm.value) {
      auth.createUserWithEmailAndPassword(
        email.value,
        password.value
      ).then((result) => {
        db.collection("Users").doc(result.user.uid).set({
          fullName: fullName.value,
          email: email.value,
          phoneNumber: phoneNumber.value
        })
        fullName.value = "";
        email.value = "";
        password.value = "";
        passwordConfirm.value = "";
        phoneNumber.value = "";
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
      console.log("Signed In")
    }).catch((e) => {
      console.log(e.message);
    });
    email.value = "";
    password.value = "";
  };

  switchToSignIn = e => {
    e.preventDefault();
    const paperForm = document.getElementById("paper-form");
    const formTitle = document.getElementById("form-title");
    const fullName = document.getElementById("full-name-field");
    const phoneNumber = document.getElementById("phone-number-field");
    const passwordConfirm = document.getElementById("password-confirm-field");
    const signUpButton = document.getElementById("sign-up-submit");
    const signInButton = document.getElementById("sign-in-submit");
    const switchToSignIn = document.getElementById("switch-to-signin-submit")
    const switchToSignUp = document.getElementById("switch-to-signup-submit")
    this.setState({
      fullNameLabel: null,
      phoneNumberLabel: null,
      passwordConfirmLabel: null
    })
    formTitle.innerText = "Sign In"
    formTitle.style.marginBottom = "-45px"
    fullName.style.display = "none";
    phoneNumber.style.display = "none";
    passwordConfirm.style.display = "none";
    signUpButton.style.display = "none";
    signInButton.style.display = "inline";
    switchToSignIn.style.display = "none";
    switchToSignUp.style.display = "inline";
    paperForm.style.marginTop = "100px"
  }

  switchToSignUp = e => {
    e.preventDefault();
    const paperForm = document.getElementById("paper-form")
    const formTitle = document.getElementById("form-title");
    const fullName = document.getElementById("full-name-field");
    const phoneNumber = document.getElementById("phone-number-field");
    const passwordConfirm = document.getElementById("password-confirm-field");
    const signUpButton = document.getElementById("sign-up-submit");
    const signInButton = document.getElementById("sign-in-submit");
    const switchToSignIn = document.getElementById("switch-to-signin-submit")
    const switchToSignUp = document.getElementById("switch-to-signup-submit")
    this.setState({
      fullNameLabel: "Full Name",
      phoneNumberLabel: "Phone Number",
      passwordConfirmLabel: "Password Confirm"
    })
    formTitle.innerText = "Sign Up"
    formTitle.style.marginBottom = "0px"
    fullName.style.display = "inline";
    phoneNumber.style.display = "inline";
    passwordConfirm.style.display = "inline";
    signUpButton.style.display = "inline";
    signInButton.style.display = "none";
    switchToSignIn.style.display = "inline";
    switchToSignUp.style.display = "none";
    paperForm.style.marginTop = "40px"
  }

  logout = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    this.props.authListener();
  }

  render() {
    return (
      <div>
      <Paper id="paper-form" elevation="20">
      <Typography id="form-title" component="h2" variant="display1">Sign Up</Typography>
      <form autoComplete="off">
        <TextField
          name="name"
          label={this.state.fullNameLabel}
          id="full-name-field"
          onChange={this.handleChange}
          margin="normal"
          />
        <br />
        <TextField
          name="phoneNumber"
          label={this.state.phoneNumberLabel}
          id="phone-number-field"
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
          label={this.state.passwordConfirmLabel}
          type="password"
          id="password-confirm-field"
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <Button
          type="submit"
          color="secondary"
          variant="raised"
          id="sign-up-submit"
          onClick={this.signUpOnSubmit}
        >
          Sign Up
        </Button>
        <Button
          type="submit"
          color="secondary"
          variant="raised"
          id="sign-in-submit"
          onClick={this.signInOnSubmit}
        >
          Sign In
        </Button>
        <br />
        <br/>
        <Button
          type="submit"
          color="primary"
          variant="raised"
          id="switch-to-signin-submit"
          onClick={this.switchToSignIn}
        >
          Already have an account?
        </Button>
        <Button
          type="submit"
          color="primary"
          variant="raised"
          id="switch-to-signup-submit"
          onClick={this.switchToSignUp}
        >
          Don't have an account? Sign Up!
        </Button>
        <br/>
      </form>
      <span className="sign-up-separator">___________________</span>
      <br/>
      <GoogleButton className="google-sign-in" onClick={this.signInWithGoogle}/>
      <span className="sign-up-separator">___________________</span>
      <br/>
      <br/>
      <div className="fb-login-button" onClick={this.signInWithFacebook} data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
      
    </Paper>
      </div>
    );
  }
}

export default SignUpForm;
