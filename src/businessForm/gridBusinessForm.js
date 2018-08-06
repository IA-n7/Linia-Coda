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
import SelectDays from './selectDays.js'
import OpeningHours from './hours.js'

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class GridBusinessForm extends React.Component {
  state = {
    age: '',
    open: false,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { classes } = this.props;

    return (

      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={6}>
            <Paper className={classes.paper}> <OpeningHours /> </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}> </Paper>
          </Grid>
          {<Grid item xs={6}>
            <Paper className={classes.paper}> </Paper>
          </Grid>}
          <Grid item xs={6}>
            <Paper className={classes.paper}> </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

GridBusinessForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GridBusinessForm);