import React, { Component } from "react";
import "./App.css";
import "./User.css";
import * as firebase from "firebase";
import db from "./config/firebase.js";
import {initFirestorter, Collection} from 'firestorter';
import {observer} from 'mobx-react';
import User from "./User.js";
import Graphic from "./Graphic.js";
import { createMuiTheme, MuiThemeProvider, getMuiTheme } from '@material-ui/core/styles';
import { blueGrey, red } from '@material-ui/core/colors'
import CenteredGrid from './gridLayout.js'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[300],
      main: blueGrey[700],
      dark: blueGrey[900],
    },
    secondary: {
      light: red[500],
      main: red[800],
      dark: red[900],
    }
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriesDisplay: "inline"
    };

    // BINDING FUNCTION TO SEND AS PROPS
    this.changeCategoriesDisplay = this.changeCategoriesDisplay.bind(this);
  }

  getData = () => {
      db.collection('Business').doc('DxbucRUhcSzfvgSDML6J').get().then(doc => {
        let name = doc.data().Name

        this.setState({
           name
          })
        return name
    })
  }

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
    // ENSURES ROOT WILL DISPLAY CATEGORIES TO LOGGED IN USER
    if (window.location.pathname === "/") {
      sessionStorage.setItem("categoryDisplay", "inline");
    }

    // PRESERVING STATE OF CATEGORY SELECTION DISPLAY
    let preservedState = sessionStorage.getItem("categoryDisplay");
    this.setState({ categoriesDisplay: preservedState });

    // BACK/FORWARD BUTTON HANDLER
    document.onmouseover = function() {
      // USER MOUSE WITHIN PAGE
      window.innerDocClick = true;
    }
    document.onmouseleave = function() {
      // USER MOUSE LEFT PAGE
      window.innerDocClick = false;
    }
    window.onpopstate = function () {
      if (!window.innerDocClick && window.location.pathname === "/") {
        sessionStorage.setItem("categoryDisplay", "inline");
        window.location.reload();
      } else {
        sessionStorage.setItem("categoryDisplay", "none")
        window.location.reload();
      }
    }

    this.getData();
  }


  render() {
    return (
      <MuiThemeProvider theme={theme}>

      <div>
        HELLOOOOO
      {/* <Graphic /> */}
      {/* <CenteredGrid /> */}

      <User
       changeCategoriesDisplay={this.changeCategoriesDisplay}
       categoriesDisplay={this.state.categoriesDisplay}/>
      </div>

      </MuiThemeProvider>
    );
  }
}

export default App;
