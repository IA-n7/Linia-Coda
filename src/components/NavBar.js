import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import SearchBarContainer from './SearchBarContainer.js';


const styles = {
  container: {
    flexGrow: 1,
   },
   flex: {
    flexGrow: 1,
   },
   appbar: {
    marginBottom: 30,
   },
};

const NavBar = (props) => {
  const {classes} = props;
  return (
    <div className={classes.container}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.flex}>
            LINIA CODA
          </Typography>
          <Button variant="contained" color="primary">LOGOUT</Button>
        </Toolbar>
      </AppBar>
      <SearchBarContainer geocodeAddress={props.geocodeAddress} />
    </div>



  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(NavBar);