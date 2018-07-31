import React, { Component } from "react";
import "./Landing.css";
import SignUpForm from "./SignUpForm";

class Landing extends Component {


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
