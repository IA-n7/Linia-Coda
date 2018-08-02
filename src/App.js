import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MapContainer from "./components/MapContainer.js";
import QueueModal from "./components/QueueModal";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Paper, Typography, TextField, Button } from "@material-ui/core";
import { blueGrey, red } from "@material-ui/core/colors";
import "./User.css";
import { observer } from "mobx-react";
import * as firebase from "firebase";
// eslint-disable-next-line
import db from "./config/firebase.js";
import { initFirestorter, Collection } from "firestorter";
import Landing from "./Landing.js";
import User from "./User.js";
import Graphic from "./Graphic.js";
import CenteredGrid from "./gridLayout.js";
import("./Landing.css");
const loadingSpinner = require('./img/lg.palette-rotating-ring-loader.gif')
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
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      categoriesDisplay: "inline",
      modalShow: false
    };
    // BINDING FUNCTION TO SEND AS PROPS
    this.changeCategoriesDisplay = this.changeCategoriesDisplay.bind(this);
  }

  authListener = () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedUser: user });
          console.log(this.state.loggedUser);
          this.setState({ loading: false })

        } else {
          this.setState({ loggedUser: null });
          console.log(this.state.loggedUser);
        }
      })  
    })
  };

  getData = () => {
    db.collection("Business")
      .doc("YYMc8S7qv2wPRfYWlqfP")
      .get()
      .then(doc => {
        let name = doc.data().businessName;

        this.setState({
          name
        });
        return name;
      });
  };

  // CHANGES STATE OF THE CATEGORY SELECTION DISPLAY
  // STORES STATE IN SESSION STORAGE FOR PRESERVATION
  changeCategoriesDisplay = () => {
    if (this.state.categoriesDisplay === "inline") {
      sessionStorage.setItem("categoryDisplay", "none");
      this.setState({ categoriesDisplay: "none" });
    }
    if (this.state.categoriesDisplay === "none") {
      sessionStorage.setItem("categoryDisplay", "inline");
      this.setState({ categoriesDisplay: "inline" });
    }
  };
  
  componentDidMount() {
    this.authListener();

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
    };
    document.onmouseleave = function() {
      // USER MOUSE LEFT PAGE
      window.innerDocClick = false;
    };
    window.onpopstate = function() {
      if (!window.innerDocClick && window.location.pathname === "/") {
        sessionStorage.setItem("categoryDisplay", "inline");
        window.location.reload();
      } else {
        sessionStorage.setItem("categoryDisplay", "none");
        window.location.reload();
      }
    };

    this.getData();

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

  toggleModal = e => {
    this.setState({
      modalShow: !this.state.modalShow
    })
  }
  
  render = () => {

    let loading;
    let user;
    let mapContainer;
    let landing;
    let navbar;
    let modal;
    let modalButton;
    if (this.state.loading == false) {
      if (this.state.loggedUser != null) {
        user = (
          <User
            changeCategoriesDisplay={this.changeCategoriesDisplay}
            categoriesDisplay={this.state.categoriesDisplay}
          />
        );
        mapContainer = <MapContainer />;
        navbar = <NavBar />;
        modalButton = <Button
                        color="secondary"
                        variant="raised" 
                        onClick={this.toggleModal}>
                        Toggle Modal
                        </Button>
        if (this.state.modalShow === true) {
          modal = <QueueModal />
        }
  
      } else {
        landing = (
          <Landing
            loggedUser={this.state.loggedUser}
          />
        );
      } 
    } else {
      loading = <img src={loadingSpinner} style={{position:"absolute", left:"40%", top:"35%"}} alt=""/>
    } 


    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {loading}
          {navbar}
          {modalButton}
          {modal}
          
          {landing}
          {/* {mapContainer} */}
        </div>

        <div>
          {/* <Graphic /> */}
          {/*<CenteredGrid />*/}
          {user}
        </div>
      </MuiThemeProvider>
    );
  };
}

export default App;
