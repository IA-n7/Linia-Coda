import React, { Component } from "react";
import { Paper, Typography, TextField, Button, Switch } from "@material-ui/core";
import * as firebase from "firebase";
import db from "./config/firebase.js";
const auth = firebase.auth();

class BusinessSignUp extends Component {
    constructor(props) {
      super(props)
    }

  signUpBusiness = e => {
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
        db.collection("Business").doc(result.user.uid).set({
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

    render(){
      return(
    <div>
      <Paper id="paper-form" elevation="20">
      <Typography id="form-title" component="h2" variant="display1">Register Business</Typography>
      <form autoComplete="off">
        <TextField
          name="name"
          label= "Business Name"
          id="full-name-field"
          onChange={this.handleChange}
          margin="normal"
          />
        <br />
        <TextField
          name="phoneNumber"
          label= "Phone Number"
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
          label= "Password Confirm"
          type="password"
          id="password-confirm-field"
          onChange={this.handleChange}
          margin="normal"
        />

{/*. DONT FORGET THE LCOAITON nchajcsk */}

        <br />
        <p>Want to register your business?</p>
        <Switch color="secondary" checked="true" onChange={this.props.businessFormToTrue}/>

        <br />
        <Button
          type="submit"
          color="secondary"
          variant="raised"
          id="sign-up-submit"
          onClick={this.signUpBusiness}
        >
          Sign Up
        </Button>

        <br/>
      </form>
    </Paper>
      </div>
      )
    }

}

export default BusinessSignUp;



firebase.User

