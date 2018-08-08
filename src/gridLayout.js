import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FloatingActionButtons from './button.js';
import Graphic from "./Graphic.js";
import BusinessForm from "./businessForm.js";
import GuestWeek from "./GuestWeek.js";
import QueueSelect from "./QueueSelect.js";


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

function CenteredGrid(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>NAV BAR GOES HERE</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}><BusinessForm /></Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}> <Graphic /> <FloatingActionButtons /></Paper>
        </Grid>
        {<Grid item xs={6}>
          <Paper className={classes.paper}> <QueueSelect /> </Paper>
        </Grid>}
        <Grid item xs={6}>
          <Paper className={classes.paper}> <GuestWeek /> <FloatingActionButtons /></Paper>
        </Grid>
      </Grid>
    </div>
  );
}

CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredGrid);