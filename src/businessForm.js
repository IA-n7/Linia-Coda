import React from 'react';
import * as firebase from "firebase";
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
import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import SelectDays from './selectDays.js'

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

class BusinessForm extends React.Component {
  constructor(){
    super()
    this.state = {
      businessName: "",
      businessAddress: "",
      businessPhoneNumber: "",
      businessEmail: ""
    };
  }

  onOpenData = () => {
    let businessName;
    var user = firebase.auth().currentUser;
    console.log('UUUSSSERR', user)
      // db.collection('business').doc(user.uid).get().then(function(doc) {
      //   businessName = doc.data().businessName
      // }).catch(function(error) {
      //   console.log("Error getting document:", error);
      // });
      // this.setState({
      //   businessName: businessName
      // })
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

    db.collection('business').doc(user.uid).set({
      businessName: businessName,
      businessAddress: businessAddress,
      businessPhoneNumber: businessPhoneNumber,
      businessEmail: businessEmail,
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
    const { anchorEl } = this.state;


    return (

      <div >
      <Grid container spacing={12}>
      <Grid item xs={12}>
      <Paper className={classes.paper}>
      <form className={classes.container} noValidate autoComplete="off">
      <TextField
        value={this.state.businessName}
        id="businessName"
        label="Business Name"
        onChange={this.handleName.bind(this)}
          InputLabelProps={{
            shrink: true,
          }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="businessAddress"
        label="Business Address"
        onChange={this.handleAddress.bind(this)}
          InputLabelProps={{
            shrink: true,
          }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="businessPhoneNumber"
        label="Business Phone Number"
        onChange={this.handlePhoneNumber.bind(this)}
          InputLabelProps={{
            shrink: true,
          }}
        fullWidth
        margin="normal"
      />
      <TextField
        id="businessEmail"
        label="Business Email"
        onChange={this.handleEmail.bind(this)}
          InputLabelProps={{
            shrink: true,
          }}
        fullWidth
        margin="normal"
      />
      <SelectDays />
      <Button
        type="submit"
        color="secondary"
        variant="raised"
        id="sign-up-submit"
        onClick={this.detailsToDB.bind(this)}
      >
      Update Business Details
      </Button>

      </form>


      </Paper>
      </Grid>
      </Grid>
      </div>
      );
  }
}


BusinessForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BusinessForm);