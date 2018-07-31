import React, { Component } from "react";
import "./Landing.css";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import SignUpForm from "./SignUpForm";

class Landing extends Component {
  constructor(props) {
    super(props);
  }
  // componentDidMount() {
  //   console.log(this.props.authListener)
  // }

  render() {
    return (
      <p>
        {this.props.loggedUser == {} ? (
          console.log("")
        ) : (
          <SignUpForm
            loggedUser={this.props.loggedUser}
            authListener={this.props.authListener}
          />
        )}
      </p>
    );
  }
}

export default Landing;
