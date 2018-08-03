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
      viewable: "inline"
    };
  }

  handleToggle = () => {
    if (this.state.viewable === "inline") {
      this.setState({ viewable: "none" });
    } else {
      this.setState({ viewable: "inline" });
    }
    this.setState(state => ({ open: !state.open }));
  };

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

  componentDidMount() {}

  render() {
    const { open } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="drawer-container">
          <Drawer className="business-pane" variant="permanent" anchor="left">
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
                        <MenuItem onClick={this.handleClose}>Hello</MenuItem>
                        <MenuItem onClick={this.handleClose}>I</MenuItem>
                        <MenuItem onClick={this.handleClose}>Will</MenuItem>
                        <MenuItem onClick={this.handleClose}>Be</MenuItem>
                        <MenuItem onClick={this.handleClose}>A</MenuItem>
                        <MenuItem onClick={this.handleClose}>Category</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>

            {/* BUSINESS LIST */}
            <div style={{ display: this.state.viewable }}>
              <BusinessList />
            </div>
          </Drawer>
        </div>

        {/* MAP */}
        <Paper className="map">
          <MapContainer currentLatLng={this.props.currentLatLng} />
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default User;
