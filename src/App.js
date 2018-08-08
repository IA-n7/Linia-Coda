// import React, { Component } from 'react';
// import './App.css';
// import db from './config/firebase.js';
// import User from "./User.js";
// import FloatingActionButtons from './button.js';
// import ComplexGrid from './gridLayout.js';
// import Graphic from "./Graphic.js";
// import { createMuiTheme, MuiThemeProvider, getMuiTheme } from '@material-ui/core/styles';
// import { blueGrey, red } from '@material-ui/core/colors';
// import QueueSelect from "./QueueSelect.js";


import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import MapContainer from "./components/MapContainer.js";
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
import GridLayout from "./businessForm/gridLayout.js";
import("./Landing.css");
const loadingSpinner = require("./img/lg.palette-rotating-ring-loader.gif");
const auth = firebase.auth();

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
      dark: red[900]
    }
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      isBusiness: false,
      currentLatLng: {
        lat: 45.4961,
        lng: -73.5693
      },
      isBusiness: false,
    }
    this.geocodeAddress = this.geocodeAddress.bind(this);
  }


  geocodeAddress = address => {
    this.geocoder = new window.google.maps.Geocoder();
    this.geocoder.geocode({ address: address }, this.handleResults.bind(this));
  };


  handleResults = (results, status) => {

    if (status === window.google.maps.GeocoderStatus.OK) {
      this.setState({
        currentLatLng: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
      });

      console.log("APP", this.state.currentLatLng)

    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
      );
    }
  }

  authListener = () => {
    auth.onAuthStateChanged(user => {
      user.isBusiness = true
      if (user) {
        this.setState({ loggedUser: user });
      } else {
        this.setState({ loggedUser: null });
      }
      this.setState({ loading: false });
      console.log(this.state.loggedUser);
    });
  };


  businessFormToTrue () {
    if (this.state.isBusiness === true) {
      this.setState({
        isBusiness: false
      })
    } else {
      this.setState({
        isBusiness: true
      })
    }
  }

  componentDidMount() {
    this.authListener();
}

  render = () => {
    let loading;
    let user;
    let mapContainer;
    let landing;
    let navbar;
    let gridLayout;
    if (this.state.loading == false) {
      if (this.state.loggedUser != null) {
        user = (
          <User
            currentLatLng={this.state.currentLatLng}
            loggedUser={this.state.loggedUser}
          />
        );

        mapContainer = <MapContainer />;
        navbar = (
          <NavBar
            authListener={this.authListener}
            geocodeAddress={this.geocodeAddress.bind(this)}
            isBusiness={this.state.isBusiness} />

        );
        gridLayout = <GridLayout loggedUser={this.state.loggedUser} />

      } else {
        landing = <Landing loggedUser={this.state.loggedUser} />;
      }
     } else {
      loading = (
        <img
          src={loadingSpinner}
          style={{ position: "absolute", left: "40%", top: "35%" }}
          alt=""
        />
      );
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>
     {loading}
        {navbar}
         {landing}
        </div>
        <div className="map-size">
          {user}
        </div>
        <div>
            {gridLayout}
        </div>
      </MuiThemeProvider>
    );
  };
}

export default App;
