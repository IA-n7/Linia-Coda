import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FloatingActionButtons from '../button.js';
import Graphic from "./Graphic.js";
import BusinessForm from "./businessForm.js";
import GuestWeek from "./GuestWeek.js";
import QueueSelect from "./QueueSelect.js";
import db from "../config/firebase.js";
import QueueUpdate from './QueueUpdate.js'


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});



class GridLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


render() {
  const classes = this.props.classes;
  const getBusinessID = () => {
    db.collection("Business").doc(this.props.loggedUser).get().then(doc => {
      console.log(doc.data().businessName)
    });
    console.log(this.props.loggedUser)
  }
    console.log('IS THIS A THING', this.props.loggedUser)
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
{/*
          <Grid item xs={6}>
            <Paper className={classes.paper}> <BusinessForm loggedUser={this.props.loggedUser}/> </Paper>
          </Grid>*/}
          <Grid item xs={6}>
            <Paper className={classes.paper}> <QueueUpdate loggedUser={this.props.loggedUser}/> </Paper>
          </Grid>
          {<Grid item xs={6}>
            <Paper className={classes.paper}> <Graphic loggedUser={this.props.loggedUser}/> </Paper>
          </Grid>}
{/*          <Grid item xs={6}>
            <Paper className={classes.paper}> <GuestWeek loggedUser={this.props.loggedUser}/> </Paper>
          </Grid>
          {/*<Grid item xs={6}>
            <Paper className={classes.paper}> <QueueSelect loggedUser={this.props.loggedUser}/> </Paper>
          </Grid>*/}

        </Grid>
      </div>
    );
  }
}

GridLayout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridLayout);