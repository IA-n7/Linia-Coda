import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import * as firebase from 'firebase'
import { SettingsApplications } from '@material-ui/icons';
//import SearchBarContainer from './SearchBar.js';
import BusinessForm from './../businessForm/businessForm.js';
import SelectDays from './../businessForm/selectDays.js';
import db from '../config/firebase.js';
import logo from './logo.png';

const auth = firebase.auth();

const styles = theme => ({
  container: {
    flexGrow: 1,
   },
   flex: {
    flexGrow: 1,
   },
   appbar: {
    marginBottom: 30,
   },
   nav: {
     zIndex: 1,
   },
   button: {
    margin: theme.spacing.unit
   },
});



class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentLatLng: this.props.currentLatLng,
      businessName: "",
      businessAddress: "",
      businessPhoneNumber: "",
      BusinessEmail: "",
      mondayOpeningHours: "",
      scroll: 'paper',
      show: false,
      isBusiness: this.props.isBusiness,
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  logout = () => {
    firebase.auth().signOut();
  }

  // handleClickOpen = scroll => () => {
  //   this.setState({ open: true, scroll });
  // }

  // handleClose = () => {
  //   debugger
  //   let self = this;
  //   self.setState({ open: false });
  // }



  // handleClick() {
  //   console.log()
  // }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  handleName = event => {
    this.setState({
      businessName: event.target.value
    })
  }

  handleAddress = event => {
    this.setState({
      businessAddress: event.target.value
    })
  }

  handlePhoneNumber = event => {
      this.setState({
        businessPhoneNumber: event.target.value
      })
    }

  handleEmail = event => {
    this.setState({
      businessEmail: event.target.value
    })
  }

  handleDaysClose = () => {
    this.setState({ daysOpen: null });
  };

   detailsToDB = (event) => {
    event.preventDefault();
    var user = firebase.auth().currentUser;
    let businessName = this.state.businessName
    let businessAddress = this.state.businessAddress
    let businessPhoneNumber = this.state.businessPhoneNumber
    let businessEmail = this.state.businessEmail

    db.collection('business').doc(user.uid).update({
      businessName: businessName,
      businessAddress: businessAddress,
      businessPhoneNumber: businessPhoneNumber,
      businessEmail: businessEmail
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
  }

  render() {
    const { classes } = this.props;

    let businessSettings;

    if (this.state.isBusiness === true) {

      businessSettings =
          <div>
            <IconButton color="secondary" aria-label="Settings" onClick={this.handleShow}>
              <SettingsApplications />
            </IconButton>
              <Dialog
                open={this.state.show}
                onClose={this.handleClose}
              >
              <DialogTitle id="form-dialog-title">Edit Account Information</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To update your business' information, please fill out the form below.
                </DialogContentText>
                <TextField
                  autoFocus
                  value={this.state.businessName}
                  id="businessName"
                  label="Business Name"
                  onChange={this.handleName.bind(this)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  autoFocus
                  value={this.state.businessAddress}
                  id="businessAddress"
                  label="Business Address"
                  onChange={this.handleAddress.bind(this)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  autoFocus
                  value={this.state.businessPhoneNumber}
                  id="businessPhoneNumber"
                  label="Business Phone Number"
                  onChange={this.handlePhoneNumber.bind(this)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  fullWidth
                  margin="dense"
                />
                <TextField
                  autoFocus
                  value={this.state.businessEmail}
                  id="businessEmail"
                  label="Business Email"
                  onChange={this.handleEmail.bind(this)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  fullWidth
                  margin="dense"
                />
                <br/>
                <SelectDays />
              </DialogContent>

              <DialogActions>
                <Button
                  type="submit"
                  color="secondary"
                  variant="raised"
                  id="sign-up-submit"
                  onClick={this.detailsToDB.bind(this)}
                >
                  Submit
                </Button>
                <Button
                  onClick={this.handleClose}
                  color="secondary"
                > Cancel
                </Button>
              </DialogActions>
            </Dialog>
            </div>
    }

    NavBar.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={"nav-flex"}>

            <img src={logo} alt="logo" height="75rem" />

            <div className="test">
              {businessSettings}
              <Button variant="contained" className={"btn-white"} onClick={this.logout}>LOGOUT</Button>
            </div>


          </Toolbar>
        </AppBar>

      </div>
    );
  }

}

export default withStyles(styles)(NavBar);

























