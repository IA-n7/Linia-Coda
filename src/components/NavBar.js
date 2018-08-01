import React from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchBarContainer from './SearchBar.js';


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
      <SearchBarContainer />
    </div>



  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(NavBar);
