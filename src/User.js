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
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    marginTop: 50
  },
  button: {
    width: 280,

  },
  menu: {
    width: 280,
    marginTop: 50

  },
  drawer: {
    width: 200
  }
});
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
      categories: [
        "Clinics",
        "Bakery",
        "Restaurant",
        "RAMQ",
        "Bank",
        "Emergency",
        "Hairdressers",
        ""
      ],
      currentCategory: "",
      businesses: []
    };
    this.renderQueueModal = this.renderQueueModal.bind(this);
  }

  // DATA FETCHER
  getData = () => {
    db.collection("Business")
      .get()
      .then(businesses => {
        businesses.forEach(doc => {
          this.setState({
            businesses: [...this.state.businesses, doc.data()]
          });

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
    return 0;
  };

  sortBusinesses = () => {
    let sortedBusinesses = [];
    this.state.businesses.map(business => {
      // console.log("PROPS: ", this.props.loggedUser)
      // console.log("LATITUDE, BUSINESS: ", business.businessLocation._lat)
      // console.log("LONGITUDE, BUSINESS: ", business.businessLocation._long)
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
    });

    this.state.businesses.sort(this.compare);
  };

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

  renderQueueModal = event => {};

  componentDidMount() {
    // RETRIEVE ALL BUSINESS DATA
    this.getData();
    setTimeout(() => {}, 2000);
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;

    User.propTypes = {
      classes: PropTypes.object.isRequired
    };

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
                  <Paper classes={{docked: classes.menu}}>
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
              />
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
