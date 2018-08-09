import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import db from '../config/firebase.js';
import * as firebase from "firebase";;

const styles = theme => ({
  button: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
});

class OpeningHours extends React.Component {
  state = {
    age: '',
    open: false,
    openingHours: "",
  };


  handleHours = event => {
    this.setState({
      openingHours: event.target.value
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log('YUUP')
    this.handleHours(event)
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

    detailsToDB = (event) => {
    event.preventDefault();
    var user = firebase.auth().currentUser;
    let openingHours = this.state.openingHours;

    db.collection('Business').doc(user.uid).update({
      openingHours: openingHours
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

    return (
      <div>
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Select Opening Hours</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.age}
            onChange={this.handleChange}
            inputProps={{
              name: 'age',
              id: 'demo-controlled-open-select',
            }}
          >
            <MenuItem value="">
              <em>None</em>
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
      {/*<Button
        type="submit"
        color="secondary"
        variant="raised"
        id="sign-up-submit"
        onClick={this.detailsToDB.bind(this)}
      >
      Confirm Hours
      </Button>*/}
        </FormControl>
      </form>
      </div>
    );
  }
}

OpeningHours.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OpeningHours);