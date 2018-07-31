import React, { Component } from "react";
import * as firebase from 'firebase'
import db from './config/firebase.js'
import "./Landing.css";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import SignUpForm from "./SignUpForm";
const auth = firebase.auth();

class Landing extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.authListener();
  }

  render() {
    return (
      <SignUpForm loggedUser={this.props.loggedUser} authListener={this.props.authListener} />
    );
  }
}

export default Landing;
