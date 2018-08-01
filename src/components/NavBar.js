import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import * as firebase from 'firebase'
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
        <SearchBarContainer />
      </div>
    );
  }
}


// NavBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };


export default NavBar;
