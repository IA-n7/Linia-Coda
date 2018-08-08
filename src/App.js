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
      currentLatLng: {
        lat: 45.4961,
        lng: -73.5693
      }
    };
  }

  geocodeAddress = address => {
    this.geocoder = new window.google.maps.Geocoder();
    this.geocoder.geocode({ address: address }, this.handleResults.bind(this));
  };

  handleResults(results, status) {
    if (status === window.google.maps.GeocoderStatus.OK) {
      this.setState({
        currentLatLng: {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
      });

      // this.map.setCenter(results[0].geometry.location);
      // this.marker.setPosition(results[0].geometry.location);
    } else {
      console.log(
        "Geocode was not successful for the following reason: " + status
      );
    }
  }

  authListener = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedUser: user });
        console.log(this.state.loggedUser);
      } else {
        this.setState({ loggedUser: null });
        console.log(this.state.loggedUser);
      }
      this.setState({ loading: false });
    });
  };

  componentDidMount() {
    this.authListener();
  }

  render = () => {
    let loading;
    let user;
    let mapContainer;
    let landing;
    let navbar;
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
            geocodeAddress={this.geocodeAddress.bind(this)} />
        );
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
        {/* <div>
       { (this.state.loggedUser) &&
            <GridLayout loggedUser={this.state.loggedUser} />
        }

        </div> */}
      </MuiThemeProvider>
    );
  };
}

export default App;
