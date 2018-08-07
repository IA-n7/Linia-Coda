import React, { Component } from "react";
import { Paper, Typography, TextField, Button, Switch } from "@material-ui/core";
import * as firebase from "firebase";
import db from "./config/firebase.js";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const auth = firebase.auth();

class BusinessSignUp extends Component {
  constructor(props){
    super(props)
    this.state = {
      businessName: "",
      businessAddress: "",
      businessPhoneNumber: "",
      businessEmail: "",
      openingHours: "",
      closingHours: ""
    };
  }

  handleOpening = event => {
    this.setState({
      openingHours: event.target.value
    });
  };

  handleClosing = event => {
    this.setState({
      closingHours: event.target.value
    });
  };

  signUpBusiness = e => {
    e.preventDefault();
    const businessName = document.getElementById("business-full-name-field");
    const businessAddress = document.getElementById("business-full-name-field");
    const businessPhoneNumber = document.getElementById("business-phone-number-field");
    const businessEmail = document.getElementById("business-email-field");
    const businessPassword = document.getElementById('business-password-field');
    const businessConfirmPassword = document.getElementById('business-password-confirm-field');
    const openingHours = document.getElementById("business-opening-hours-field");
    const closingHours = document.getElementById("business-closing-hours-field");


    if (businessPassword.value === businessConfirmPassword.value) {
      auth.createUserWithEmailAndPassword(
        businessEmail.value,
        businessPassword.value
      ).then((result) => {
        db.collection("business").doc(result.user.uid).set({
          businessName: businessName.value,
          businessAddress: businessAddress.value,
          businessPhoneNumber: businessPhoneNumber.value,
          businessEmail: businessEmail.value,
          openingHours: openingHours.value,
          closingHours: closingHours.value
        })
        businessPassword.value = "";
        businessConfirmPassword.value = "";
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
          id="business-full-name-field"
          onChange={this.handleChange}
          margin="normal"
          />
          <br />
         <TextField
          name="name"
          label= "Business Address"
          id="business-full-name-field"
          onChange={this.handleChange}
          margin="normal"
          />
        <br />
        <TextField
          name="phoneNumber"
          label= "Phone Number"
          id="business-phone-number-field"
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <TextField
          name="email"
          label="Email"
          id="business-email-field"
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <TextField
          name="Password"
          label="Password"
          type="password"
          id="business-password-field"
          onChange={this.handleChange}
          margin="normal"
        />
        <br />
        <TextField
          name="Password-confirm"
          label= "Password Confirm"
          type="password"
          id="business-password-confirm-field"
          onChange={this.handleChange}
          margin="normal"
        />
<Select
            value={this.state.openingHours}
            id='business-opening-hours-field'
            onChange={this.handleOpening}
            displayEmpty
            name="Opening Hours"
          >
            <MenuItem>
              <em>Opening Hours</em>
            </MenuItem>
            <MenuItem value={1}>1am</MenuItem>
            <MenuItem value={2}>2am</MenuItem>
            <MenuItem value={3}>3am</MenuItem>
            <MenuItem value={4}>4am</MenuItem>
            <MenuItem value={5}>5am</MenuItem>
            <MenuItem value={6}>6am</MenuItem>
            <MenuItem value={7}>7am</MenuItem>
            <MenuItem value={8}>8am</MenuItem>
            <MenuItem value={9}>9am</MenuItem>
            <MenuItem value={10}>10am</MenuItem>
            <MenuItem value={11}>11am</MenuItem>
            <MenuItem value={12}>12pm</MenuItem>
            <MenuItem value={13}>1pm</MenuItem>
            <MenuItem value={14}>2pm</MenuItem>
            <MenuItem value={15}>3pm</MenuItem>
            <MenuItem value={16}>4pm</MenuItem>
            <MenuItem value={17}>5pm</MenuItem>
            <MenuItem value={18}>6pm</MenuItem>
            <MenuItem value={19}>7pm</MenuItem>
            <MenuItem value={20}>8pm</MenuItem>
            <MenuItem value={21}>9pm</MenuItem>
            <MenuItem value={22}>10pm</MenuItem>
            <MenuItem value={23}>11pm</MenuItem>
            <MenuItem value={24}>12pm</MenuItem>
          </Select>
          <Select
            value={this.state.closingHours}
            id='business-closing-hours-field'
            onChange={this.handleClosing}
            name="Closing Hours"
          >
            <MenuItem>
              <em>Closing Hours</em>
            </MenuItem>
            <MenuItem value={1}>1am</MenuItem>
            <MenuItem value={2}>2am</MenuItem>
            <MenuItem value={3}>3am</MenuItem>
            <MenuItem value={4}>4am</MenuItem>
            <MenuItem value={5}>5am</MenuItem>
            <MenuItem value={6}>6am</MenuItem>
            <MenuItem value={7}>7am</MenuItem>
            <MenuItem value={8}>8am</MenuItem>
            <MenuItem value={9}>9am</MenuItem>
            <MenuItem value={10}>10am</MenuItem>
            <MenuItem value={11}>11am</MenuItem>
            <MenuItem value={12}>12pm</MenuItem>
            <MenuItem value={13}>1pm</MenuItem>
            <MenuItem value={14}>2pm</MenuItem>
            <MenuItem value={15}>3pm</MenuItem>
            <MenuItem value={16}>4pm</MenuItem>
            <MenuItem value={17}>5pm</MenuItem>
            <MenuItem value={18}>6pm</MenuItem>
            <MenuItem value={19}>7pm</MenuItem>
            <MenuItem value={20}>8pm</MenuItem>
            <MenuItem value={21}>9pm</MenuItem>
            <MenuItem value={22}>10pm</MenuItem>
            <MenuItem value={23}>11pm</MenuItem>
            <MenuItem value={24}>12pm</MenuItem>
          </Select>

{/*. DONT FORGET THE LCOAITON nchajcsk */}
        <br />
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

