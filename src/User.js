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
import QueueModal from "./components/QueueModal";

// eslint-disable-next-line
import { observer } from "mobx-react";
import MapContainer from "./components/MapContainer.js";
import BusinessList from "./user/BusinessList.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import QueueUpdate from './businessForm/QueueUpdate.js'

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    marginTop: 50
  },
  button: {
    width: 280
  },
  menu: {
    marginTop: 65
  },
  drawer: {
    width: 280
  }
});
// className={classes.menu}

// root: {
// width: 200,
// width: "100%",
// backgroundColor: theme.palette.background.paper,
// position: "relative",
// overflow: "auto"
// maxHeight: 300
// display: "flex"
// },

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
      modalShow: false,
      inQueue: false,
      categories: [
        "Clinics",
        "Restaurants",
        "Banks",
        "Hairdressers",
        "SAAQ",
      ],
      currentCategory: "",
      businesses: [],
      //currentLatLng: this.props.currentLatLng,
      modalBusiness: {}
    };
  }

  // DATA FETCHER
  getData = () => {
    db.collection("Business")
      .get()
      .then(businesses => {
        businesses.forEach(doc => {
          // PLACE ALL BUSINESS DATA IN STATE
          this.setState({
            businesses: [...this.state.businesses, doc.data()]
          });
          // SORT BUSINESSES BASED ON DISTANCE TO USER
          this.sortBusinesses();
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  };

  toRadians = degree => {
    return degree * (Math.PI / 180);
  };

  compare = (a, b) => {
    return a.distance - b.distance;
    // return 0;
  };

  // SORT BUSINESSES BASED ON DISTANCE TO USER
  sortBusinesses = () => {
    this.state.businesses.map(business => {
      let lat1 = business.businessLocation._lat;
      let lon1 = business.businessLocation._long;

      // HARDCODED, CHANGE TO LOGGEDUSER VALUES
      let lat2 = 45.496761799999994;
      let lon2 = -73.5703049;

      let R = 6371e3; // metres
      let φ1 = this.toRadians(lat1);
      let φ2 = this.toRadians(lat2);
      let Δφ = this.toRadians(lat2 - lat1);
      let Δλ = this.toRadians(lon2 - lon1);

      let a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      let d = R * c;

      business["distance"] = d;

      if (business.businessName === "Clinique OPUS") {
        console.log("LATITUDE: ", lat1);
        console.log("LONGITUDE: ", lon1);
        console.log("IS IT A NUMBER: ", d);
        console.log("business: ", business.distance);
      }
      return 1;
    });

    this.state.businesses.sort(this.compare);
    return 1;
  };

  formatClosing = closingHours => {
    let minutes;
    let hours;
    if (closingHours.length === 4) {
      hours = closingHours.slice(0, 2);

      if (parseInt(hours) > 12) {
        hours = parseInt(hours) - 12;
      }

      minutes = closingHours.slice(2, 4);
      closingHours = hours + ":" + minutes;
    }
    if (closingHours.length === 3) {
      hours = closingHours.slice(0, 1);
      minutes = closingHours.slice(1, 3);
      closingHours = hours + ":" + minutes;
    }
    return closingHours;
  };

  formatOpening = openingHours => {
    let minutes;
    let hours;
    if (openingHours.length === 4) {
      hours = openingHours.slice(0, 2);

      if (parseInt(hours) > 12) {
        hours = parseInt(hours) - 12;
      }

      minutes = openingHours.slice(2, 4);
      openingHours = hours + ":" + minutes;
    }
    if (openingHours.length === 3) {
      hours = openingHours.slice(0, 1);
      minutes = openingHours.slice(1, 3);
      openingHours = hours + ":" + minutes;
    }
    return openingHours;
  };

  // DISPLAYS JOIN QUEUE MODAL
  toggleModal = (businessInfo) => {
     this.setState({
       modalShow: !this.state.modalShow,
       modalBusiness: businessInfo
     });
   };



  // BUTTON HANDLER FOR QUEUE JOINING/EXITING
  toggleQueue = () => {
    this.setState({ inQueue: !this.state.inQueue });
  };

  // POPULATES CATEGORIES MENU
  populateCategories = () => {
    let categories = this.state.categories.map(category => {
      return (
        <MenuItem className="business" onClick={this.handleClose}>
          {category}
        </MenuItem>
      );
    });
    return categories;
  };

  // CLOSES GROW-MENU ON CLICK-AWAY
  handleToggle = event => {
    if (this.state.viewable === "inline") {
      this.setState({ viewable: "none" });
    } else {
      this.setState({ viewable: "inline" });
    }
    this.setState(state => ({ open: !state.open }));
  };

  // OPENS/CLOSES GROW-MENU ON CATEGORIES SELECT
  handleClose = event => {
    if (event.currentTarget.textContent === null) {
    } else {
      this.setState({ currentCategory: event.currentTarget.textContent });
    }

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

    let modal;

    if (this.state.modalShow === true) {
      modal = (
        <div>
        <QueueModal
          loggedUser={this.props.loggedUser}
          inQueue={this.state.inQueue}
          toggleQueue={this.toggleQueue}
          toggleModal={this.toggleModal}
          modalBusiness={this.state.modalBusiness}
          formatClosing={this.formatClosing}
          formatOpening={this.formatOpening}
        />
        <QueueUpdate
          loggedUser={this.props.loggedUser}
          inQueue={this.state.inQueue}
          toggleQueue={this.toggleQueue}
          toggleModal={this.toggleModal}
          modalBusiness={this.state.modalBusiness}
        />
        </div>
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.drawer}>
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
            <div className={classes.menu}>
              {/* CATEGORIES DROPDOWN */}
              <Button
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? "menu-list-grow" : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
                className={classes.button}
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
                        <MenuList>{this.populateCategories()}</MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>

              {/* BUSINESS LIST */}
              <div style={{ display: this.state.viewable }}>
                <BusinessList
                  businesses={this.state.businesses}
                  currentCategory={this.state.currentCategory}
                  renderQueueModal={this.renderQueueModal}
                  logguedUser={this.props.loggedUser}
                  toggleQueue={this.toggleQueue}
                  toggleModal={this.toggleModal}
                  inQueue={this.state.inQueue}
                  formatClosing={this.formatClosing}
                  formatOpening={this.formatOpening}
                />
              </div>
            </div>
          </Drawer>
        </div>

        {modal}

        {/* MAP */}
        <Paper className="map">
         <MapContainer currentCategory={this.state.currentCategory} currentLatLng={this.props.currentLatLng} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(User);

// export default User;
