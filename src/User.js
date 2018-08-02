import React, { Component } from "react";
import {
  Button,
  Drawer,
  ClickAwayListener,
  MenuItem,
  MenuList,
  Popper,
  Grow,
  Paper
} from "@material-ui/core";
// eslint-disable-next-line
import {
  createMuiTheme,
  MuiThemeProvider,
  // eslint-disable-next-line
  getMuiTheme
} from "@material-ui/core/styles";
import { blueGrey, red } from "@material-ui/core/colors";
// eslint-disable-next-line
import * as firebase from "firebase";
import db from "./config/firebase.js";
// eslint-disable-next-line
import { initFirestorter, Collection } from "firestorter";
// eslint-disable-next-line
import { observer } from "mobx-react";
import MapContainer from "./components/MapContainer.js";
import BusinessList from "./user/BusinessList.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: 200,
    // maxWidth: 300,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto"
    // maxHeight: 300
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[300],
      main: blueGrey[700],
      dark: blueGrey[900]
    },
    secondary: {
      light: red[500],
      main: red[800],
      dark: red[900]
    }
  }
});

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      viewable: "inline",
      categories: [
        "Clinics",
        "Bakery",
        "Restaurant",
        "RAMQ",
        "Bank",
        "Emergency"
      ],
      businesses: []
    };
  }

  // DATA FETCHER
  getData = () => {
    const allCities = db
      .collection("Business")
      .get()
      .then(businesses => {
        businesses.forEach(doc => {
          // console.log(doc.id, "=>", doc.data().businessName);
          this.setState({
            businesses: [...this.state.businesses, doc.data()]
          });
          // console.log("BUSINESSES", this.state.businesses);
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  populateCategories = () => {
    let categories = this.state.categories.map(category => {
      return <MenuItem onClick={this.handleClose}>{category}</MenuItem>;
    });
    return categories;
  };

  // OPENS/CLOSES GROW-MENU ON CATEGORIES SELECT
  handleToggle = () => {
    if (this.state.viewable === "inline") {
      this.setState({ viewable: "none" });
    } else {
      this.setState({ viewable: "inline" });
    }
    this.setState(state => ({ open: !state.open }));
  };

  // CLOSES GROW-MENU ON CLICK-AWAY
  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    if (this.state.viewable === "inline") {
      this.setState({ viewable: "none" });
    } else {
      this.setState({ viewable: "inline" });
    }
    this.setState({ open: false });
  };

  componentDidMount() {
    // RETRIEVE ALL BUSINESS DATA
    this.getData();
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;

    User.propTypes = {
      classes: PropTypes.object.isRequired
    };

    return (
      <MuiThemeProvider theme={theme}>
        <div className="drawer-container">
          <Drawer
            className={classes.root}
            variant="permanent"
            anchor="left"
            style={
              this.state.color === "blue"
                ? {
                    "--background-start": "#2196F3",
                    "--background-end": "#21CBF3",
                    "--box-shadow": "rgba(33, 203, 243, .3)"
                  }
                : {
                    "--background-start": "#FE6B8B",
                    "--background-end": "#FF8E53",
                    "--box-shadow": "rgba(255, 105, 135, .3)"
                  }
            }
          >
            {/* CATEGORIES DROPDOWN */}
            <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              aria-owns={open ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              Categories
            </Button>
            <Popper
              open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList className="categories">
                        {this.populateCategories()}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            {/* BUSINESS LIST */}
            <div style={{ display: this.state.viewable }}>
              <BusinessList businesses={this.state.businesses} />
            </div>
          </Drawer>
        </div>

        {/* MAP */}
        <Paper className="map">
          <MapContainer />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(User);

// export default User;
