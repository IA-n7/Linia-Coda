import React, { Component } from "react";
import "./App.css";
import "./User.css";
// eslint-disable-next-line
import * as firebase from "firebase";
// eslint-disable-next-line
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
    let preserveState = sessionStorage.getItem("categoryDisplay");
    this.setState({ categoriesDisplay: preserveState });

    this.getData();
  }

  render() {
    return (
<<<<<<< HEAD
      <MuiThemeProvider theme={theme}>

      <div>
        HELLOOOOO
      <Graphic />
      {/*<CenteredGrid />*/}

      {/* USER COMPONENT RENDERING */}
      <User
       changeCategoriesDisplay={this.changeCategoriesDisplay}
       categoriesDisplay={this.state.categoriesDisplay}/>
      </div>

      </MuiThemeProvider>
    );
  }
}

//    constructor() {
//      super();
//      this.state = {
//        user: "Nicholas"
//      };
//    }
//    componentDidMount() {
//      db.collection("users").add({
//        first: "Ada",
//        email: "ada@mail.com"
//      })
//      .then(function(docRef) {
//          console.log("Document written with ID: ", docRef.id);
//      })
//      .catch(function(error) {
//          console.error("Error adding document: ", error);
//      });
//      let usersRef = db.collection("users")

//      usersRef.get().then(function(results) {
//        if(results.empty) {
//          console.log("No documents found!");
//        } else {
//          results.forEach(function (doc) {
//            console.log("Document data:", doc.data().first);
//          });
//          console.log("Document data:", results.docs[0].data());
//        }
//      }).catch(function(error) {
//          console.log("Error getting documents:", error);
//      });
//   }

export default App;
