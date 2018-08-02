import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import db from './config/firebase.js';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import * as firebase from "firebase";
const auth = firebase.auth();

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

function geocodeAddress(address){
   this.geocoder = new window.google.maps.Geocoder();
   this.geocoder.geocode({ 'address': address }, this.handleResults.bind(this))
 }

function handleResults(results, status){
   if (status === window.google.maps.GeocoderStatus.OK) {
     this.setState({
        currentLatLng: {
           lat: results[0].geometry.location.lat(),
           lng: results[0].geometry.location.lng()
         }
      })
     } else {
       console.log("Geocode was not successful for the following reason: " + status);
     }
   }


class BusinessForm extends React.Component {
  constructor(){
    super()
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

  saveButton = e => {
    e.preventDefault();
    console.log('thiis', e)
    const businessName = document.getElementById("businessName");
    const businessAddress = document.getElementById("businessAddress");
    const businessPhoneNumber = document.getElementById("businessPhoneNumber");
    const businessEmail = document.getElementById("businessEmail");
    const openingHours = document.getElementById("openingHours");
    const closingHours = document.getElementById("closingHours");

    const user = firebase.auth().currentUser;

    db.collection('business').doc(user.uid).set({
      businessName: businessName.value,
      businessAddress: businessAddress.value,
      businessPhoneNumber: businessPhoneNumber.value,
      businessEmail: businessEmail.value,
      openingHours: openingHours.value,
      closingHours: closingHours.value
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.log("Error writing document", error);
    });
  };

  render() {
    const { classes } = this.props;

     let usersRef = db.collection("users")

    return (
      <form className={classes.container} noValidate autoComplete="off">
          <Select
            value={this.state.openingHours}
            id='openingHours'
            onChange={this.handleOpening}
            displayEmpty
            name="Opening Hours"
            className={classes.selectEmpty}
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
            id='closingHours'
            onChange={this.handleClosing}
            name="Closing Hours"
            className={classes.selectEmpty}
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
        <TextField
          id="businessName"
          label="Business Name"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="businessAddress"
          label="Business Address"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="businessPhoneNumber"
          label="Business Phone Number"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          id="businessEmail"
          label="Business Email"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          color="secondary"
          variant="raised"
          id="sign-up-submit"
          onClick={this.saveButton}
        >
          Update Business Details
        </Button>
      </form>
    );
  }
}


BusinessForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BusinessForm);