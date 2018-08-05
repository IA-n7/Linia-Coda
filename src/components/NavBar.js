import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import SearchBarContainer from './SearchBarContainer.js';
import * as firebase from 'firebase'
//import SearchBarContainer from './SearchBar.js';



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
   nav: {
     zIndex: 1,
   }
};

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    const { classes } = this.props;

    NavBar.propTypes = {
      classes: PropTypes.object.isRequired,
    };
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
            </IconButton>
            <Typography variant="title" color="inherit">
              LINIA CODA
            </Typography>
            <div className="test">
              <Button variant="contained" color="secondary" onClick={this.logout}>LOGOUT</Button>
            </div>
          </Toolbar>
        </AppBar>
        <SearchBarContainer geocodeAddress={this.props.geocodeAddress}/>
      </div>
    );
  }

}

export default withStyles(styles)(NavBar);

// export default NavBar;
