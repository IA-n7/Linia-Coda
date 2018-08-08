import React, { Component } from 'react';
import db from './config/firebase.js'
import {initFirestorter, Collection} from 'firestorter';
import { Paper, Typography, TextField, Button } from "@material-ui/core";

class BusinessForm extends Component {
  render() {
    return (
        <Paper className="paper-form">
          <h2 className="form-title">Business Details</h2>
          <form autoComplete="off">
            <TextField
              name="name"
              label="Business Name"
              id="full-name-field"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <TextField
              name="email"
              label="Business Email"
              id="email-field"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <TextField
              name="hours"
              label="Hours of Operation"
              type="password"
              id="hours-field"
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <TextField
              name="Password-confirm"
              label="Avg Appointment"
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
              Edit Business Information
            </Button>
          </form>
          {/* <GoogleButton className="google-sign-in" onClick={this.signInWithGoogle(this, new firebase.auth().GoogleAuthProvider())}/> */}
        </Paper>
    )}
  }

export default BusinessForm