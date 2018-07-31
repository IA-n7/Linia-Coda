import React, { Component } from "react";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import * as firebase from "firebase";
import db from "./config/firebase.js";
import GoogleButton from "react-google-button";
const auth = firebase.auth();

class SignUpForm extends Component {
  constructor(props) {
    super(props);

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
        db.collection("users").doc(result.user.uid).set({
          fullName: fullName.value,
          email: email.value,
          phoneNumber: phoneNumber.value
        })

      }).catch((e) => {
       console.log(e.message);
      });
    }
    fullName.value = "";
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";
    phoneNumber.value = "";
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

  logout = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    this.props.authListener();
  }

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
          name="phoneNumber"
          label="Phone Number"
          id="phone-number-field"
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
    );
  }
}

export default SignUpForm;
