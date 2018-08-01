import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MapContainer from "./components/MapContainer.js";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { blueGrey, red } from "@material-ui/core/colors";
import "./User.css";
import * as firebase from "firebase";
// eslint-disable-next-line
import db from "./config/firebase.js";
import Landing from "./Landing.js";
import User from "./User.js";
import Graphic from "./Graphic.js";
import CenteredGrid from "./gridLayout.js";
import("./Landing.css");
const auth = firebase.auth();

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

class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedUser: null,
      categoriesDisplay: "inline"
    };
    // BINDING FUNCTION TO SEND AS PROPS
    this.changeCategoriesDisplay = this.changeCategoriesDisplay.bind(this);
  }

  authListener = () =>
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedUser: user });
        console.log(this.state.loggedUser);
      } else {
        this.setState({ loggedUser: null });
        console.log(this.state.loggedUser);
      }
    });

  // CHANGES STATE OF THE CATEGORY SELECTION DISPLAY
  // STORES STATE IN SESSION STORAGE FOR PRESERVATION
  changeCategoriesDisplay() {
    if (this.state.categoriesDisplay === "inline") {
      sessionStorage.setItem("categoryDisplay", "none");
      this.setState({ categoriesDisplay: "none" });
    }
    if (this.state.categoriesDisplay === "none") {
      sessionStorage.setItem("categoryDisplay", "inline");
      this.setState({ categoriesDisplay: "inline" });
    }
  }

  componentDidMount() {
    this.authListener();
    // ENSURES ROOT WILL DISPLAY CATEGORIES TO LOGGED IN USER
    if (window.location.pathname === "/") {
      sessionStorage.setItem("categoryDisplay", "inline");
    }

    // PRESERVING STATE OF CATEGORY SELECTION DISPLAY
    let preserveState = sessionStorage.getItem("categoryDisplay");
    this.setState({ categoriesDisplay: preserveState });

    document.onmouseover = function() {
      //User's mouse is inside the page.
      window.innerDocClick = true;
    };

    document.onmouseleave = function() {
      //User's mouse has left the page.
      window.innerDocClick = false;
    };

    window.onhashchange = function() {
      if (window.innerDocClick) {
        //Your own in-page mechanism triggered the hash change
      } else {
        //Browser back button was clicked
        this.setState({ categoriesDisplay: preserveState });
      }
    };
  }

  render() {
    let user;
    let mapContainer;
    let landing;
    let navbar;
    if (this.state.loggedUser == null) {
      landing = <Landing
      authListener={this.authListener}
      loggedUser={this.state.loggedUser}
    />
    } else {
      user = <User
      changeCategoriesDisplay={this.changeCategoriesDisplay}
      categoriesDisplay={this.state.categoriesDisplay}
    />
      mapContainer = <MapContainer />
      navbar = <NavBar authListener={this.authListener}/>
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {navbar}
          {landing}
          {mapContainer}
        </div>

        <div>
          {/*<CenteredGrid />*/}
        {user}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
