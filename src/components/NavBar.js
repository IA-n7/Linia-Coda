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
};

class NavBar extends Component {
  constructor(props) {
    super(props)
  }

  logout = () => {
    firebase.auth().signOut();
  };

  componentDidMount() {
    this.props.authListener
  }

  render() {
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


// NavBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


export default NavBar;
