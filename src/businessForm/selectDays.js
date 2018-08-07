import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import OpeningHours from './hours.js';
import ClosingHours from './ClosingHours.js';
import Button from '@material-ui/core/Button';
import db from '../config/firebase.js';
import * as firebase from "firebase";;

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(10),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(8),
    color: theme.palette.text.secondary,
  },
});

class SelectDays extends React.Component {
  state = {
    expanded: null,
    mondayOpeningHours: ""
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false
    });
  };

  render() {
    const { classes } = this.props;
    const { expanded } = this.state;

    return (

<div className={classes.root}>

        <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Select Monday Hours</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <div >
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><OpeningHours /></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><ClosingHours /></Paper>
                </Grid>
              </Grid>

            </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

         <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Select Tuesday Hours</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <div >
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><OpeningHours /></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><ClosingHours /></Paper>
                </Grid>
              </Grid>
            </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

        <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Select Wednesday Hours</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <div >
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><OpeningHours /></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><ClosingHours /></Paper>
                </Grid>
              </Grid>
            </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

         <ExpansionPanel expanded={expanded === 'panel4'} onChange={this.handleChange('panel4')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Select Thursday Hours</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <div >
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><OpeningHours /></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><ClosingHours /></Paper>
                </Grid>
              </Grid>
            </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>


        <ExpansionPanel expanded={expanded === 'panel5'} onChange={this.handleChange('panel5')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Select Friday Hours</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <div >
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><OpeningHours /></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><ClosingHours /></Paper>
                </Grid>
              </Grid>
            </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

         <ExpansionPanel expanded={expanded === 'panel6'} onChange={this.handleChange('panel6')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Select Saturday Hours</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <div >
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><OpeningHours /></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><ClosingHours /></Paper>
                </Grid>
              </Grid>
            </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>

         <ExpansionPanel expanded={expanded === 'panel7'} onChange={this.handleChange('panel7')}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Select Sunday Hours</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
            <div >
              <Grid container spacing={24}>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><OpeningHours /></Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper className={classes.paper}><ClosingHours /></Paper>
                </Grid>
              </Grid>
            </div>
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>


      </div>
    );
  }
}

SelectDays.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectDays);